'use strict'

const DB = require('./../dao')

function getAll () {
    return new Promise((resolve, reject) => {
        DB.connect()
        DB.query('Select * from offices order by officecode', (offices) => {
            resolve(offices.rows)
            DB.disconnect()
        })
    })
}
function get (id) {
    return new Promise((resolve, reject) => {
        DB.connect()
        DB.queryParams('Select * from offices where officecode = $1', [id], (offices) => {
            if (offices.rowCount === 0) reject(new Error('Failed'))
            resolve(offices.rows[0])
            DB.disconnect()
        })
    })
}

function add (office) {
    return new Promise((resolve, reject) => {
        DB.connect()
        let sql = 'Select * from offices where officecode = $1'
        DB.queryParams(sql, [office.code], (data) => {
            if (data.rowCount) {
                reject(new Error('Office with this Id Already Exist'))
            }
        })
        sql = 'Insert into offices (officecode, city, phone, addressline1, addressline2, state, country, postalcode, territory)' +
         'values($1,$2,$3,$4,$5,$6,$7,$8,$9)'
        const params = [office.code, office.city, office.phone, office.addressline1, office.addressline2, office.state, office.country, office.postalcode, office.territory]
        DB.queryParams(sql, params, (data) => {
            resolve('Success')
            DB.disconnect()
        })
    })
}

function update (id, office) {
    return new Promise((resolve, reject) => {
        const sql = 'update offices set city = $1, phone = $2, addressline1 = $3, addressline2 = $4, state = $5' +
        ', country = $6, postalcode = $7, territory = $8, officecode = $9 ' +
        'where officecode = $10'
        const params = [office.city, office.phone, office.addressline1, office.addressline2,
            office.state, office.country, office.postalcode, office.territory, office.code, id]
        DB.connect()
        DB.queryParams(sql, params, (data) => {
            resolve('Success')
            DB.disconnect()
        })
    })
}

function deleteOne (id) {
    return new Promise((resolve, reject) => {
        DB.connect()
        DB.queryParams('delete from offices where officecode = $1', [id], (data) => {
            resolve('Success')
            DB.disconnect()
        })
    })
}

module.exports = {
    getAll: getAll,
    get: get,
    add: add,
    update: update,
    delete: deleteOne
}
