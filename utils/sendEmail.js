const nodemailer = require('nodemailer');

exports.sendEmail = async (email, subject, payload) => {
    console.log('Sending Email...');
    try{
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'fjintha@gmail.com',
              pass: process.env.ADMIN_PASSWORD
            }
          });

        var mailOptions = {
            from : 'fjintha@gmail.com',
            to: email,
            subject: subject,
            text: JSON.stringify(payload)
        };

        await transporter.sendMail(mailOptions, (err, data) => {
            if(err){
                console.log('Error in sendMail: ', err);
                return false;
            }
            console.log('Email Sent Successfully.')
            return true
        })
    }catch(error){
        console.log('Error while sending email: ', error);
        return false;
    }
}