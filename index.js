const express = require("express")
const app = express()
const api = require("./api")
const monitor = require("./monitor")

const loginName = process.argv[2]
const password = process.argv[3]
const time = process.argv[4] || 5

app.get("/", function(req, res){
    res.send("Hello World!")
})



app.listen(3000, function() {
    console.log("Example app listening on port 3000!")
    api.getSessionId(loginName, password)
        .then(sessionId => {
            console.log("Successfully Loged In")
            const interval = setInterval(() => {
                monitor.monitorUsers(sessionId)
            }, 1000*60*time)
        })
        .catch(error => {
            console.error(error)
        })
})