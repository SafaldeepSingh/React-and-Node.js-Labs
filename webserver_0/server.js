'use strict'

console.log('NodeJs Interpreter starts executing Javascript code')
const firstModule = require('./src/myfirstmodule/index.js')

console.log(firstModule.a)
firstModule.hello()
