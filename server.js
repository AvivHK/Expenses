// Server setup
const express = require('express')
const app = express()
const api = require('./server/routes/api')
const bodyParser = require('body-parser')
const data = require('./expenses')
const Expense = require('./server/models/Expense')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



// Mongoose setup
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/expenseDB', {useNewUrlParser: true })

app.use('/', api)

const port = 4200
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})


