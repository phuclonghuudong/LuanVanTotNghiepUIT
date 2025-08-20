const verifyEmailTemplate = ({ name, otp }) => {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
    <style>
      @media (prefers-color-scheme: dark) {
        body, table {
          background-color: #121212 !important;
          color: #f4f4f4 !important;
        }
        .header {
          background-color: #2e7d32 !important;
          color: #ffffff !important;
        }
        .otp-box {
          background-color: #1b5e20 !important;
          color: #ffffff !important;
        }
        .footer {
          background-color: #1e1e1e !important;
          color: #aaaaaa !important;
        }
      }
    </style>

    <table align="center" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <tr>
        <td style="background: #ffffff; text-align: center; ">
          <img src="https://res.cloudinary.com/dqywxoayz/image/upload/v1754992997/PHPMol/pxasjpgoyiwofx7k9bij.jpg" alt="MOLXIPI Logo" style="max-width: 500px; height: auto;" />
        </td>
      </tr>
      <tr>
        <td class="header" style="background: #4CAF50; padding: 20px; text-align: center; color: white; font-size: 22px; font-weight: bold;">
          Verify Email
        </td>
      </tr>
      <tr>
        <td style="padding: 30px; color: #333333; font-size: 16px; line-height: 1.6;">
          <p>Dear <strong>${name}</strong>,</p>
          <p>You requested a password reset. Please use the following OTP code to reset your password:</p>
          <div style="margin: 20px 0; text-align: center;">
            <span class="otp-box" style="display: inline-block; background: #e8f5e9; padding: 15px 30px; font-size: 24px; font-weight: bold; color: #2e7d32; border-radius: 6px; letter-spacing: 2px;">
              ${otp}
            </span>
          </div>
          <p>This OTP is valid for <strong>3 minutes</strong> only. Enter this code on the PHPMol website to proceed with resetting your password.</p>
          <p style="margin-top: 30px;">Thanks,<br><strong>MOLXIPI Team</strong></p>
        </td>
      </tr>
      <tr>
        <td class="footer" style="background: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          &copy; ${new Date().getFullYear()} MOLXIPI. All rights reserved.
        </td>
      </tr>
    </table>
  </div>
  `;
};

module.exports = verifyEmailTemplate;
