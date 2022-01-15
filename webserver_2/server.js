'use strict'

const express = require('express')
const path =  require('path')
const app = express()
const dao = require('./src/tableinfile')
const filepath = path.join(__dirname, 'users.json')

app.use(express.urlencoded())
app.use(express.json())

app.get('/users', (req, res) => {
    dao.getTable(filepath).then(users => {
        res.status(200)
        res.send(users)
    }).catch(error => {
        res.status(500)
        res.send(error)
    })
})

app.get('/users/:id', (req, res) =>{
    const id = req.params.id
    dao.getRec(filepath,id).then(user => {
        res.status(200)
        res.send(user)
    }).catch(error => {
        res.status(500)
        res.send(error)
    })
})

app.post('/users', (req,res) => {
    const newUser = {
        id: req.body.id,
        userName : req.body.userName,
        age : req.body.age
}
    dao.addRec(filepath, newUser).then(status => {
        if(status!="Success"){
            res.status(500)
            res.send("Something went wrong")
            return
        }
        res.status(200)
        res.send("Successfully Added")

    })
})

app.put('/users/:id', (req,res) => {
    const newData = {
        id:parseInt(req.params.id),
        userName: req.body.userName,
        age: req.body.age
    }
    dao.updateRec(filepath, newData).then(status => {
        if(status!="Success"){
            res.status(500)
            res.send("Record Not Found")
            return
        }
        res.status(200)
        res.send("Successfully Updated")
    })
})


app.listen(8000, () => {
    console.log("App started listening on 8000");
})