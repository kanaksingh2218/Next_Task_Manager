import nodemailer from 'nodemailer';

interface EmailOptions {
    email: string;
    subject: string;
    message: string;
    html?: string;
}

const sendEmail = async (options: EmailOptions) => {
    let host = process.env.SMTP_HOST;
    let port = parseInt(process.env.SMTP_PORT || '587');
    let user = process.env.SMTP_EMAIL;
    let pass = process.env.SMTP_PASSWORD?.replace(/\s/g, '');

    // Fallback to test account if credentials are not provided or are placeholders
    const isPlaceholder = (val?: string) => !val || val.includes('your-') || val.includes('your_') || val.includes('enter-');

    if (isPlaceholder(user) || isPlaceholder(pass)) {
        console.log('No valid SMTP credentials found. Creating a test account with Ethereal...');
        const testAccount = await nodemailer.createTestAccount();
        host = testAccount.smtp.host;
        port = testAccount.smtp.port;
        user = testAccount.user;
        pass = testAccount.pass;
    }

    // Modern nodemailer often prefers 'service' for well-known providers
    const transporterConfig: any = {
        auth: {
            user,
            pass
        }
    };

    if (host === 'smtp.gmail.com') {
        transporterConfig.service = 'gmail';
    } else {
        transporterConfig.host = host;
        transporterConfig.port = port;
        transporterConfig.secure = port === 465;
    }

    const transporter = nodemailer.createTransport(transporterConfig);

    const message = {
        from: `${process.env.FROM_NAME || 'TaskFlow'} <${process.env.FROM_EMAIL || 'noreply@taskflow.com'}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html
    };

    try {
        const info = await transporter.sendMail(message);
        console.log('Message sent: %s', info.messageId);

        // If using a test account, log the URL to view the email
        if (host?.includes('ethereal.email')) {
            console.log('--------------------------------------------------');
            console.log('PREVIEW URL (Test Email): %s', nodemailer.getTestMessageUrl(info as any));
            console.log('--------------------------------------------------');
        }
    } catch (error) {
        console.error('Nodemailer Error:', error);
        throw error; // Re-throw to be caught by the controller
    }
};

export default sendEmail;
