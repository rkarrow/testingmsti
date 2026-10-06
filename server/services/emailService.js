const nodemailer = require('nodemailer');

// Create reusable transporter
const getTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass,
    },
  });
};

/**
 * Send an email notification for a certificate verification or general enquiry
 */
const sendNotificationEmail = async ({ name, email, phone, subject, message, enquiryType }) => {
  const transporter = getTransporter();
  
  if (!transporter) {
    console.log('ℹ️ EMAIL_USER or EMAIL_PASS not configured in .env. Skipping SMTP dispatch.');
    return { sent: false, reason: 'unconfigured' };
  }

  const isVerification = enquiryType === 'Certificate Verification';
  const recipientEmail = isVerification
    ? (process.env.CERTIFICATE_EMAIL || 'certificate.department@msti.lk')
    : (process.env.ADMIN_EMAIL || process.env.EMAIL_USER);

  const emailSubject = subject || (isVerification 
    ? `🎓 Certificate Verification Request: ${name}`
    : `📩 New Website Enquiry from ${name}`);

  // Professional Maritime-styled HTML template
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 20px; color: #1e293b; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .header { background: #0f172a; color: #ffffff; padding: 24px; text-align: center; border-bottom: 3px solid #2563eb; }
        .header h1 { margin: 0; font-size: 20px; letter-spacing: 0.5px; }
        .header p { margin: 6px 0 0 0; font-size: 13px; color: #94a3b8; }
        .badge { display: inline-block; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: bold; text-transform: uppercase; margin-top: 10px; background: #1e40af; color: #ffffff; }
        .content { padding: 28px 24px; }
        .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .meta-table td { padding: 10px 12px; font-size: 14px; border-bottom: 1px solid #e2e8f0; }
        .meta-table td.label { font-weight: 600; color: #475569; width: 35%; background: #f8fafc; }
        .meta-table td.value { color: #0f172a; }
        .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #2563eb; padding: 16px; border-radius: 6px; font-family: monospace; font-size: 13px; line-height: 1.6; white-space: pre-wrap; color: #334155; }
        .footer { background: #f8fafc; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
        .button { display: inline-block; background: #2563eb; color: #ffffff !important; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 13px; margin-top: 15px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>⚓ MSTI Maritime Academy</h1>
          <p>Official Verification & Communications Desk</p>
          <span class="badge">${enquiryType || 'General Enquiry'}</span>
        </div>
        <div class="content">
          <p style="font-size: 15px; margin-top: 0;">A new <strong>${enquiryType || 'enquiry'}</strong> has been received via the official website portal:</p>
          
          <table class="meta-table">
            <tr>
              <td class="label">Full Name</td>
              <td class="value"><strong>${name}</strong></td>
            </tr>
            <tr>
              <td class="label">Contact Email</td>
              <td class="value"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
            </tr>
            <tr>
              <td class="label">Phone / D.O.B</td>
              <td class="value">${phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td class="label">Subject</td>
              <td class="value">${subject || 'N/A'}</td>
            </tr>
          </table>

          <p style="font-weight: 600; font-size: 13px; margin-bottom: 8px; color: #475569;">Request & Verification Details:</p>
          <div class="message-box">${message}</div>

          <div style="text-align: center;">
            <a href="mailto:${email}?subject=RE: ${encodeURIComponent(subject || 'Certificate Verification')}" class="button">
              ✉️ Reply to ${name}
            </a>
          </div>
        </div>
        <div class="footer">
          This email was automatically dispatched by the MSTI Maritime Academy Web Portal.<br>
          Recipient: <strong>${recipientEmail}</strong> • Timestamp: ${new Date().toLocaleString()}
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"MSTI Web Portal" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      replyTo: email, // Direct reply to the student!
      subject: emailSubject,
      text: `${subject}\n\nFrom: ${name} (${email})\nPhone: ${phone}\n\nDetails:\n${message}`,
      html: htmlContent,
    });

    console.log(`✉️ Notification email successfully dispatched to ${recipientEmail} (ID: ${info.messageId})`);
    return { sent: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email dispatch failed:', error.message);
    return { sent: false, error: error.message };
  }
};

/**
 * Send a security alert email when someone fails to log in to the Admin Panel
 */
const sendLoginAlertEmail = async ({ attemptedEmail, ipAddress, userAgent, reason }) => {
  const transporter = getTransporter();

  if (!transporter) {
    console.log('ℹ️ EMAIL_USER or EMAIL_PASS not configured. Skipping login alert email.');
    return { sent: false, reason: 'unconfigured' };
  }

  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
  const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Colombo' });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f1f5f9; margin: 0; padding: 20px; color: #1e293b; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .header { background: #7f1d1d; color: #ffffff; padding: 24px; text-align: center; border-bottom: 3px solid #ef4444; }
        .header h1 { margin: 0; font-size: 20px; letter-spacing: 0.5px; }
        .header p { margin: 6px 0 0 0; font-size: 13px; color: #fca5a5; }
        .alert-badge { display: inline-block; padding: 5px 14px; border-radius: 999px; font-size: 11px; font-weight: bold; text-transform: uppercase; margin-top: 10px; background: #ef4444; color: #ffffff; }
        .content { padding: 28px 24px; }
        .warning-box { background: #fef2f2; border: 1px solid #fecaca; border-left: 4px solid #ef4444; padding: 16px; border-radius: 6px; margin-bottom: 20px; }
        .warning-box p { margin: 0; font-size: 14px; color: #991b1b; }
        .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .meta-table td { padding: 10px 12px; font-size: 14px; border-bottom: 1px solid #e2e8f0; }
        .meta-table td.label { font-weight: 600; color: #475569; width: 40%; background: #f8fafc; }
        .meta-table td.value { color: #0f172a; font-family: monospace; }
        .footer { background: #f8fafc; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
        .action-note { background: #fffbeb; border: 1px solid #fde68a; padding: 12px 16px; border-radius: 6px; font-size: 13px; color: #92400e; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚨 MSTI Admin Panel — Security Alert</h1>
          <p>Unauthorized Login Attempt Detected</p>
          <span class="alert-badge">⚠️ Security Warning</span>
        </div>
        <div class="content">
          <div class="warning-box">
            <p>⚠️ <strong>Someone tried to log in to your Admin Panel with invalid credentials.</strong> If this was not you, your panel may be under attack. Please review immediately.</p>
          </div>

          <table class="meta-table">
            <tr>
              <td class="label">📧 Attempted Email</td>
              <td class="value">${attemptedEmail || 'Unknown'}</td>
            </tr>
            <tr>
              <td class="label">🌐 IP Address</td>
              <td class="value">${ipAddress || 'Unknown'}</td>
            </tr>
            <tr>
              <td class="label">❌ Failure Reason</td>
              <td class="value">${reason || 'Invalid credentials'}</td>
            </tr>
            <tr>
              <td class="label">🕐 Time (Sri Lanka)</td>
              <td class="value">${timestamp}</td>
            </tr>
            <tr>
              <td class="label">💻 Browser / Device</td>
              <td class="value" style="font-size:12px;">${(userAgent || 'Unknown').substring(0, 120)}</td>
            </tr>
          </table>

          <div class="action-note">
            💡 <strong>What to do:</strong> If you see many alerts from an unknown IP, consider changing your Admin password immediately via the Admin Panel → Security & Password section.
          </div>
        </div>
        <div class="footer">
          This is an automated security alert from the MSTI Maritime Academy Web Portal.<br>
          Alert sent to: <strong>${adminEmail}</strong> • ${timestamp}
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"MSTI Security Alert 🚨" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      subject: `🚨 Admin Login Alert — Failed Attempt from ${ipAddress || 'Unknown IP'} [${timestamp}]`,
      text: `SECURITY ALERT\n\nSomeone tried to log in to your Admin Panel.\n\nAttempted Email: ${attemptedEmail}\nIP Address: ${ipAddress}\nReason: ${reason}\nTime: ${timestamp}\nBrowser: ${userAgent}\n\nIf this was not you, change your password immediately.`,
      html: htmlContent,
    });

    console.log(`🚨 Login alert email sent to ${adminEmail} (ID: ${info.messageId})`);
    return { sent: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Login alert email failed:', error.message);
    return { sent: false, error: error.message };
  }
};

module.exports = {
  sendNotificationEmail,
  sendLoginAlertEmail,
};
