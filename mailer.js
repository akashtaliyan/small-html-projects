const nodemailer = require("nodemailer");

module.exports = async ({email,pass}) => {
	let getTransporter = async () => {
		nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 587,
			secure: false,
			auth: {
				user: email,
				pass: pass,
			},
		});
	};
    const transporter = await getTransporter()

	const sendMail = (to,subject,message)=>{
        let info = await transporter.sendMail({
            from: email, // sender address
            to: to, // list of receivers
            subject: message.subject, // Subject line
            text: message.text, // plain text body
            html: message.html, // html body
        });
        return info
    }
};
