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

router.put('/update/:group1/:group2', function(req, res){
    let {group1,group2} = req.body
    Expense.findOneAndUpdate({group: group1}, {group: group2}, {new: true}, function(err,expense){
        res.send(expense)
    })
})

router.get('/expenses/:group1/:total?', function (req, res) {
    const { group1, total } = req.params
    if (total == "true") {
        Expense.aggregate([
            {$match: {group: group1}},
            {$group: {_id: group1, total: {$sum: "$amount"}}}
        ],
            function (err, expenses) {
                res.send(expenses)
            })
    }
    else { 
        Expense.find({ group: group }, function (err, expenses) {
            res.send(expenses)

        })
    }
})

router.get('/expenses/:d1/:d2', function(req,res){
    const {d1,d2 }= req.params
    if(!d1){
        res.redirect("/expenses")
    }
    else if(!d2){
        d2 = moment().format('LLLL')
    }
    Expense.find({$and:[ {data: {$gt:d1}},
    {data:{$lt:d2}}]}, function(err,expenses){
        res.send(expenses)
    })
})





module.exports = router