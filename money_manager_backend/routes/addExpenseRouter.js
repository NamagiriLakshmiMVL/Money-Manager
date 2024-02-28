const express = require("express")
const addExpenseModel = require("../model/addExpenseModel")
const router = express.Router()

router.post("/adding-expenses", async (req, res) => {
    try {
        const newExpense = new addExpenseModel(req.body)
        await newExpense.save()
        res.send("Added Successfully")
    }
    catch (err) {
        res.send(err)
    }
})

router.get("/getting-expenses", async (req, res) => {
    try {
        const allExpenses = addExpenseModel.find()
        res.send(allExpenses)
    }
    catch (err) {
        res.send(err)
    }

})

module.exports = router