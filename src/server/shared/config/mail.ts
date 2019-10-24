//Copyright @Bene

import * as SMTPTransport from 'nodemailer/lib/smtp-transport';

export const FROM = '"John Doe" <nnvv0011@hs-karlsruhe.de>';

export const MAIL_CONFIG: SMTPTransport.Options = {
    // host: 'localhost', // default
    host: '127.0.0.1',

    port: 25000,

    // HS Karlsruhe:
    // port: 25
    // host: 'smtp.hs-karlsruhe.de',

    secure: false,

    // Googlemail:
    // service: 'gmail',
    // auth: {
    //     user: 'user@gmail.com',
    //     pass: 'mypassword'
    // }

    priority: 'normal',
    logger: true,
    headers: {'X-ProvidedBy': 'Software Engineering'},
};






