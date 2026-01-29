import bcrypt from 'bcryptjs';
import * as nodePath from 'node:path';
import { fileURLToPath } from 'node:url';
import * as runtime from '@prisma/client/runtime/client';

const config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id        String    @id @default(cuid())\n  email     String    @unique\n  password  String\n  name      String?\n  role      Role      @default(ADMIN)\n  createdAt DateTime  @default(now())\n  updatedAt DateTime  @updatedAt\n  sessions  Session[]\n}\n\nmodel Session {\n  id        String   @id @default(cuid())\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n  token     String   @unique\n  expiresAt DateTime\n  createdAt DateTime @default(now())\n}\n\nenum Role {\n  ADMIN\n  EDITOR\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"}],"dbName":null},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"},{"name":"token","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import('node:buffer');
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import('@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs'),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import('@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs');
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

runtime.Extensions.getExtensionContext;
({
  DbNull: runtime.NullTypes.DbNull,
  JsonNull: runtime.NullTypes.JsonNull,
  AnyNull: runtime.NullTypes.AnyNull
});
runtime.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
runtime.Extensions.defineExtension;

globalThis["__dirname"] = nodePath.dirname(fileURLToPath(import.meta.url));
const PrismaClient = getPrismaClientClass();

const prisma = globalThis.prisma ?? new PrismaClient({
  datasourceUrl: "prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza18yUWxoelFoZE1KMkVSTXQ1OTJsRlYiLCJhcGlfa2V5IjoiMDFLRzRESEhKOVFGSzBITThTMzRSUVNHSDMiLCJ0ZW5hbnRfaWQiOiJlMTg1ZGJkMzFhMTk0ODUwZmNlMTkwMzVhYTViYmYwM2YzNzdlMWJmYWZmYzEzYjMyYzA1MDUwZWFmYTQ0ZDhhIiwiaW50ZXJuYWxfc2VjcmV0IjoiYjAxNjAwMWMtZDI3YS00YTczLWExNzgtMDIxOGVjNDIxZTVlIn0.CgB__MuemUXYgEEHIKtAAUKIoMpsflSC_6GiMI_ws-4"
});

const SALT_ROUNDS = 12;
const SESSION_DURATION_DAYS = 7;
async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}
async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}
function generateSessionToken() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}
async function createSession(userId) {
  const token = generateSessionToken();
  const expiresAt = /* @__PURE__ */ new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_DURATION_DAYS);
  await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt
    }
  });
  return token;
}
async function validateSession(token) {
  if (!token) return null;
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true }
  });
  if (!session) return null;
  if (session.expiresAt < /* @__PURE__ */ new Date()) {
    await prisma.session.delete({ where: { id: session.id } });
    return null;
  }
  return session.user;
}
async function deleteSession(token) {
  await prisma.session.deleteMany({ where: { token } });
}
async function createUser(email, password, name) {
  const hashedPassword = await hashPassword(password);
  return prisma.user.create({
    data: {
      email: email.toLowerCase(),
      password: hashedPassword,
      name
    }
  });
}
async function getUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email: email.toLowerCase() }
  });
}
async function authenticateUser(email, password) {
  const user = await getUserByEmail(email);
  if (!user) return null;
  const isValid = await verifyPassword(password, user.password);
  if (!isValid) return null;
  return user;
}
function getSessionCookie(token) {
  const maxAge = SESSION_DURATION_DAYS * 24 * 60 * 60;
  return `session=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;
}
function getExpiredSessionCookie() {
  return "session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0";
}
function parseSessionCookie(cookieHeader) {
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(";").reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split("=");
    acc[key] = value;
    return acc;
  }, {});
  return cookies["session"] || null;
}

export { prisma as a, authenticateUser as b, createSession as c, deleteSession as d, getExpiredSessionCookie as e, getUserByEmail as f, getSessionCookie as g, createUser as h, parseSessionCookie as p, validateSession as v };
