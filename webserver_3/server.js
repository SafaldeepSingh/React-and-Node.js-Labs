'use strict'

const express = require('express')
const app = express()
const officeController = require('./src/office')
app.use(express.json())

app.get('/offices', (req, res) => {
    officeController.getAll().then(offices => {
        res.status(200).json({
            status: 'Success',
            offices: offices
        })
    }).catch(error => {
        res.status(200).json({
            status: 'Failed',
            error: error
        })
    })
})
app.get('/offices/:id', (req, res) => {
    const id = parseInt(req.params.id)
    officeController.get(id).then(office => {
        res.status(200).json({
            status: 'Success',
            office: office
        })
    }).catch(error => {
        res.status(200).json({
            status: 'Failed',
            error: error
        })
    })
})

app.post('/offices', (req, res) => {
    const office = req.body
    officeController.add(office).then(status => {
        res.status(200).json({
            status: 'Success'
        })
    }).catch(error => {
        res.status(200).json({
            status: 'Failed',
            error: error
        })
    })
})

app.put('/offices/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const office = req.body
    officeController.update(id, office).then(status => {
        res.status(200).json({
            status: 'Success'
        })
    }).catch(error => {
        res.status(200).json({
            status: 'Failed',
            error: error
        })
    })
})
app.delete('offices/:id', (req, res) => {
    const id = parseInt(req.params.id)
    officeController.delete(id).then(status => {
        res.status(200).json({
            status: 'Success'
        })
    }).catch(error => {
        res.status(200).json({
            status: 'Failed',
            error: error
        })
    })
})
app.listen(8000, () => console.log('Server started at port 8000'))
