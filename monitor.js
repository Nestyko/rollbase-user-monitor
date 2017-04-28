const R = require("ramda")
const api = require("./api")
const moment = require("moment")

const todayString = moment().format("D_MMM_YYYY")

const log = require('simple-node-logger').createSimpleLogger(`logs/rb_users_monitor${todayString}.log`);



const monitorUsers = (sessionId, transporter) => {
    api.getUserList(sessionId)
        .then(users => {
            if(users.length){
                //ok
                /*const success = {
                    date: new Date()
                    , status: "ok"
                }*/
                log.info({
                    status: "ok", 
                    message: "There are users in the system",
                    count: users.length
                })
            }else{
                /*const error = {
                    date: new Date()
                    , status: "error"
                    , message: "No Users in the tenant"
                    , data: users
                }*/
                log.error({status: "error", message: "No users on the system", data: users})
                transporter.sendEmail({
                    subject: "No Users in Rollbase"
                    , text: `There are no users in rollbase, detected at: ${new Date()}`
                    , html: `
                        <h2>There are no users in rollbase</h2>
                        <ul>
                            <li>Detected at: ${new Date()}</li>
                        </ul>
                    `
                }).then(() => {
                    console.log("Email Sent to the email list")
                }).catch((error) => {
                    console.error(error)
                    console.error("Error Sending the message")
                })
            }
        }).catch(error => {
            log.warn("Connection Error")
        })
}

module.exports = {
    monitorUsers
}