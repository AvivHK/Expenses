const express = require('express')
const router = express.Router()
const moment = require('moment')
const Expense = require('../models/Expense')

router.get('/expenses', function (req, res) {
    Expense.find({}, function (err, expense) {
        res.send(expense)
    }).sort({ date: -1 })
})

router.post('/new', function (req, res) {
    let { name, amount, group, date } = req.body;
    if (isNaN(date)) {
        date = moment().format('LLLL')
    }
    const eToAdd = new Expense({ name, amount, group, date })
    eToAdd.save()
    res.end()
})

router.put('/update')

router.get('/expenses/:group/:total?', function (req, res) {
    const { group, total } = req.params
    if (total == "true") {
        Expense.aggregate([{
            $group: {
                group: "$group",
                cost: {
                    $count: "$amount"
                }
            }
        }],
            function (err, expenses) {
                res.send(expenses)
            })
    }
    Expense.find({ group: group }, function (err, expenses) {
        res.send(expenses)
    })

})




module.exports = router