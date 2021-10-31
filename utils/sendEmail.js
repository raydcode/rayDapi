const nodemailer = require("nodemailer");



const sendEmail=async(options)=> {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ,
    port: process.env.SMTP_PORT,
   
    auth: {
      user: process.env.SMTP_EMAIL, 
      pass: process.env.SMTP_PASSWORD, 
    },
  });

  // send mail with defined transport object
  let message = {
    from: `${process.env.SMTP_NAME} <${process.env.SMTP_EMAIL}>`, 
    to: options.email,
    subject:options.subject, 
    text: options.message, 
   
  };


  let info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);



}

module.exports = sendEmail;
