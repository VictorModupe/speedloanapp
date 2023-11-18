const nodemailer = require('nodemailer');
const mailMessages = require('./mailMessages');
const fs = require('fs');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_SETUP_EMAIL,
    pass: process.env.MAIL_SETUP_PASSWORD,
  },
});
async function sendEmailToUser(to,subject,type,priority,data) {    
      try {
        const info = await transporter.sendMail({
            from: "SPEEDLOAN",
            to: to,
            subject: subject,
            html: mailMessages[type](data),
            priority,
            headers:{
                contentType: 'text/html',
                charset: 'UTF-8',
            }
    
          });
          return info
      } catch (error) {
        if (error) {
            console.log('Error sending email:', error);
          }
      }
      
}
module.exports = {sendEmailToUser,}