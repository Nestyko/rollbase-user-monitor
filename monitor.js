const R = require("ramda")
const api = require("./api")
const moment = require("moment")

const todayString = moment().format("D_MMM_YYYY")

const log = require('simple-node-logger').createSimpleLogger(`logs/rb_users_monitor${todayString}.log`);

const monitorUsers = (sessionId) => {
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
            }
        }).catch(error => {
            log.warn("Connection Error")
        })
}

module.exports = {
    monitorUsers
}