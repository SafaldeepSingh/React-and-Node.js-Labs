'use strict'

const { strict } = require('assert')
const fs = require('fs')
const path = require('path')

function logMsgSync(message){
    if (!fs.existsSync('log')) {
        fs.mkdirSync('log')
    //     console.log('Directory created:  log')
    }
    try{
        fs.appendFileSync('log/server_log.log',message + "\n");
    }catch(err){
        console.log(err);
    }
    console.log("Successfully logged");

}

function appendLogFile(message){
    fs.appendFile('log/server_log.log',message + "\n", (err) => {
        if(err) console.log(err)
        else console.log("Successfully logged")
    })
}
function logMsg(message){
    if(!fs.existsSync('log'))
    {
        fs.mkdir(path.join(__dirname,'log'),(err) => {
            if(err){
                console.log("Error creating directory", err)
                return
            }
            appendLogFile(message)
        })
    }else{
        appendLogFile(message)
    }
}
// logMsgSync("test1");
// logMsgSync("test2");

logMsg("test1");
logMsg("test2");

