const R = require("ramda")
const axios = require("axios") //Axios: https://github.com/mzabriskie/axios
const { restUrl } = require("./config")

const getSessionId = function (loginName, password) {
    return axios.get(restUrl + "/login", {
        params: {
            loginName
            , password
            , output: "json"
        }
    }).then(res => {
        //console.log(res.data)
        return res.data.sessionId
    }).catch(error => {
        console.error("Error login", error)
    })

}


const getUserList = (sessionId) => {
    return axios.get(restUrl+"/selectQuery",{
        params:{
            sessionId
            , startRow: 0
            , maxRows: 100
            , query: "SELECT id, loginName FROM User"
            , output: "json"
            , 
        }
    }).then(res => {
        //console.log(res.data)
        return res.data
    }).catch(error => {
        console.error("Error getting the users", error)
    })
}

module.exports = {
    getSessionId
    , getUserList
}