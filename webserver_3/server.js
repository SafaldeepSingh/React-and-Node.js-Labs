'use strict'

const express = require('express')
const app = express()
const officeController = require('./src/office')

app.get('/offices', (req, res) => {
    officeController.
})

app.listen(8000, () => console.log('Server started at port 8000'))
