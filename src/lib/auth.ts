import bcrypt from 'bcryptjs';
import { prisma } from './prisma';
import type { User } from '@prisma/client';

const SALT_ROUNDS = 12;
const SESSION_DURATION_DAYS = 7;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateSessionToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function createSession(userId: string): Promise<string> {
  const token = generateSessionToken();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_DURATION_DAYS);

  await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });

  return token;
}

export async function validateSession(token: string): Promise<User | null> {
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session) return null;

  // Check if session is expired
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: session.id } });
    return null;
  }

  return session.user;
}

export async function deleteSession(token: string): Promise<void> {
  await prisma.session.deleteMany({ where: { token } });
}

export async function deleteAllUserSessions(userId: string): Promise<void> {
  await prisma.session.deleteMany({ where: { userId } });
}

export async function createUser(email: string, password: string, name?: string): Promise<User> {
  const hashedPassword = await hashPassword(password);

  return prisma.user.create({
    data: {
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
    },
  });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = await getUserByEmail(email);
  if (!user) return null;

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) return null;

  return user;
}

// Cookie helpers
export function getSessionCookie(token: string): string {
  const maxAge = SESSION_DURATION_DAYS * 24 * 60 * 60;
  return `session=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;
}

export function getExpiredSessionCookie(): string {
  return 'session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0';
}

export function parseSessionCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  return cookies['session'] || null;
}

export async function updateUserPassword(
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return { success: false, error: 'Utilisateur non trouvé' };
  }

  const isValid = await verifyPassword(currentPassword, user.password);
  if (!isValid) {
    return { success: false, error: 'Mot de passe actuel incorrect' };
  }

  if (newPassword.length < 8) {
    return { success: false, error: 'Le nouveau mot de passe doit contenir au moins 8 caractères' };
  }

  const hashedPassword = await hashPassword(newPassword);
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  return { success: true };
}

const PASSWORD_RESET_EXPIRY_HOURS = 1;

export async function createPasswordResetToken(email: string): Promise<{ token: string; userId: string } | null> {
  const user = await getUserByEmail(email);
  if (!user) return null;

  // Delete any existing tokens for this user
  await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

  // Generate new token
  const token = generateSessionToken();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + PASSWORD_RESET_EXPIRY_HOURS);

  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt,
    },
  });

  return { token, userId: user.id };
}

export async function validatePasswordResetToken(token: string): Promise<string | null> {
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  });

  if (!resetToken) return null;

  // Check if expired
  if (resetToken.expiresAt < new Date()) {
    await prisma.passwordResetToken.delete({ where: { id: resetToken.id } });
    return null;
  }

  return resetToken.userId;
}

export async function resetPassword(token: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
  if (newPassword.length < 8) {
    return { success: false, error: 'Le mot de passe doit contenir au moins 8 caractères' };
  }

  const userId = await validatePasswordResetToken(token);
  if (!userId) {
    return { success: false, error: 'Lien de réinitialisation invalide ou expiré' };
  }

  const hashedPassword = await hashPassword(newPassword);

  // Update password and delete token
  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    }),
    prisma.passwordResetToken.deleteMany({ where: { userId } }),
    // Optionally invalidate all sessions for security
    prisma.session.deleteMany({ where: { userId } }),
  ]);

  return { success: true };
}
