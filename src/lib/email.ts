import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'AC-ingiénierie <noreply@AC-ingiénierie.fr>';

export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject: 'Réinitialisation de votre mot de passe - AC-ingiénierie',
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0;">
                  <tr>
                    <td style="padding: 40px;">
                      <h1 style="margin: 0 0 24px; font-size: 24px; font-weight: 600; color: #1a1a1a;">
                        Réinitialisation de votre mot de passe
                      </h1>
                      <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.5; color: #4a4a4a;">
                        Vous avez demandé à réinitialiser votre mot de passe pour votre compte AC-ingiénierie.
                      </p>
                      <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.5; color: #4a4a4a;">
                        Cliquez sur le bouton ci-dessous pour définir un nouveau mot de passe :
                      </p>
                      <a href="${resetUrl}" style="display: inline-block; padding: 14px 28px; background-color: #2d5016; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 500;">
                        Réinitialiser mon mot de passe
                      </a>
                      <p style="margin: 24px 0 0; font-size: 14px; line-height: 1.5; color: #666666;">
                        Ce lien expirera dans 1 heure.
                      </p>
                      <p style="margin: 16px 0 0; font-size: 14px; line-height: 1.5; color: #666666;">
                        Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email.
                      </p>
                      <hr style="margin: 32px 0; border: none; border-top: 1px solid #e0e0e0;">
                      <p style="margin: 0; font-size: 12px; color: #999999;">
                        AC-ingiénierie - Services en développement durable
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      text: `
Réinitialisation de votre mot de passe - AC-ingiénierie

Vous avez demandé à réinitialiser votre mot de passe pour votre compte AC-ingiénierie.

Cliquez sur le lien ci-dessous pour définir un nouveau mot de passe :
${resetUrl}

Ce lien expirera dans 1 heure.

Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email.

AC-ingiénierie - Services en développement durable
      `.trim(),
    });

    if (error) {
      console.error('Email send error:', error);
      return { success: false, error: 'Erreur lors de l\'envoi de l\'email' };
    }

    return { success: true };
  } catch (err) {
    console.error('Email send exception:', err);
    return { success: false, error: 'Erreur lors de l\'envoi de l\'email' };
  }
}
