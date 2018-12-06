
const nodemailer = require('nodemailer');

module.exports.email = function () {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rita02056@gmail.com',
            pass: process.env.GMAIL_PASSWORD,
        },
    });
}
