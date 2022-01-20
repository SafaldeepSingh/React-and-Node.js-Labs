const fs = require('fs')
const { get } = require('http')

function getTable(filepath){
    return new Promise(function(resolve, reject) {
        fs.readFile(filepath, (err,data) => {
            if(err){
                console.log("something went wrong in getTable")
                reject(new Error(err))
            }
            // console.log(JSON.parse(data))
            resolve(JSON.parse(data))
        })

    })
}

function getRec(filepath, id){
    return new Promise(function(resolve,reject) {
        getTable(filepath).then(data => {
            let flag = false
            data.forEach(element => {
                if(element.id == id){
                    resolve(element)
                }
            });
            if(!flag)
                reject(new Error("Record not Found"))

        }).catch(error => console.log(error))
    })
}

function saveTable(filepath, datas){
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath,JSON.stringify(datas), (err) => {
            if(err){
                resolve(err)
            }else{
                resolve("Success")
            }
        })

    })
}
function addRec(filepath, newData){
    return new Promise((resolve, reject) => {
        getTable(filepath).then(data => {
            for(let i=0; i<data.length ; i++){
                if(data[i].id == newData.id)
                    reject("Already Exist")
            }
            data.push(newData)
            // console.log(data);
            fs.writeFileSync(filepath,JSON.stringify(data))
            resolve("Success")
        }).catch(error => reject(error))
    })
}
function updateRec(filepath, newData){
    return new Promise((resolve, reject) => {
        getTable(filepath).then(data => {
            let flag = false
            data.forEach((element, index) => {
                if(element.id == newData.id){
                    data[index] = newData
                    // console.log(element)
                    flag = true
                }
            });
            if(!flag)
                resolve("Record Not Found")
            else{
                // console.log(data);
                fs.writeFileSync(filepath,JSON.stringify(data))
                resolve("Success")
            }
        }).catch(error => console.log(error))

    })

}

function deleteREC (fileName, id) {
    return new Promise((resolve, reject) => {
        getTable(fileName).then(data => {
            let recordExist = data.reduce((total, element)=>{
                return total || (element.id == id)
            }, false)
            if(!recordExist)
                reject(new Error("Doesnt Exist"))
            let newData = data.filter((element) => {
                return element.id!= id
            })
            saveTable(fileName, newData).then(status =>{
                resolve("Success")
            }).catch(error => reject(new Error(error)))
        })
    })

}

module.exports = {
    getTable: getTable,
    getRec: getRec,
    saveTable: saveTable,
    addRec: addRec,
    updateRec: updateRec,
    deleteRec: deleteREC
}