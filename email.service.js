const nodemailer = require('nodemailer')
const fs = require("fs")
const path = require("path")

const loadEmailsFromFile = () => {
	return new Promise((resolve, reject) => {
		const emailFilePath = path.join(__dirname, "email_list.json")
		fs.readFile(emailFilePath, { encoding: 'utf-8' }, (err, data) => {
			if (err) {
				return reject(err)
			}
			return resolve(JSON.parse(data).emails)
		})
	})

}




module.exports = {
	loadTransporter: function () {
		const email = process.env.EMAIL;
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL,
				pass: process.env.EMAIL_PASSWORD,
			}
		})

		return new Promise((resolve, reject) => {
			loadEmailsFromFile().then(emails => {
				let mailOptions = {
					from: email, // sender address
					to: emails.join(','), // list of receivers
					subject: 'Hello ✔', // Subject line
					text: 'Hello world ?', // plain text body
					html: '<b>Hello world ?</b>' // html body
				}
				resolve({
					sendMail: (options) => {
						return new Promise((resolve, reject) => {
							transporter.sendMail(Object.assign({}, mailOptions, options), (error, info) => {
								if (error) {
									return reject(error)
								}
								return resolve(info)
							})
						})

					}
				})
			}).catch(reject)
		})
	}
}