'use strict'

const myModule = require('./src/tableinfile')
const path = require('path')
const assert = require('assert')

const filepath = path.join(__dirname,'users.json')
// myModule.getTable(filepath).then(data => {
//     console.log(data);
// }).catch(error => console.log(error))

// myModule.getRec(filepath,100).then(record => {
//     console.log(record)
// }).catch(error => console.log(error))

const datas = [
    {
        "id": 10,
        "userName": "mvachon",
        "age": 12
    },
    {
        "id": 11,
        "userName": "jcote",
        "age": 66
    },
    {
        "id": 12,
        "userName": "pmartineau",
        "age": 99
    }
]
myModule.saveTable(filepath,datas)
const data =     {
    "id": 13,
    "userName": "pma",
    "age": 45
}

// myModule.addRec(filepath,data)
const toUpdate = {
    "id": 12,
    "userName": "new",
    "age": 45
}
// myModule.updateRec(filepath, toUpdate)
