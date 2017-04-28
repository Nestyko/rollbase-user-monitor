require('dotenv').config()
const express = require("express")
const nodemailer = require("nodemailer")
const app = express()
const api = require("./api")
const monitor = require("./monitor")
const emailService = require("./email.service")


const loginName = process.env.RB_USERNAME
const password = process.env.RB_PASSWORD

const time = process.argv[4] || process.env.REFRESH_RATE || 5




app.get("/", function (req, res) {
    res.send("Hello World!")
})




app.listen(3000, function () {
    console.log("Example app listening on port 3000!")
    api.getSessionId(loginName, password)
        .then(sessionId => {
            console.log("Successfully Loged In")
            emailService.loadTransporter()
                .then((transporter) => {
                    const interval = setInterval(() => {
                        monitor.monitorUsers(sessionId, transporter)
                    }, 1000 * 60 * time)
                    
                }).catch((error) => {
                    console.error(error)
                    console.error("Error loading email conf")
                })
        })
        .catch(error => {
            console.error(error)
        })
})