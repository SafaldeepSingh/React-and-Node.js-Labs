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
    fs.writeFileSync(filepath,JSON.stringify(datas))
}
function addRec(filepath, newData){
    getTable(filepath).then(data => {
        data.push(newData)
        // console.log(data);
        fs.writeFileSync(filepath,JSON.stringify(data))
    }).catch(error => console.log(error))
}
function updateRec(filepath, newData){
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
            console.log("Record not Found")
        else{
            // console.log(data);
            fs.writeFileSync(filepath,JSON.stringify(data))
        }
    }).catch(error => console.log(error))

}

module.exports = {
    getTable: getTable,
    getRec: getRec,
    saveTable: saveTable,
    addRec: addRec,
    updateRec: updateRec
}