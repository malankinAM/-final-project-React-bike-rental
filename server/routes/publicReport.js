const {Router} = require('express')
const Report = require('../models/Report')
const router = Router()


router.post('/', async (req, res) => {
    try {
        const {licenseNumber, type, ownerFullName, color, date, description} = req.body
        const report = new Report({
            licenseNumber, type, ownerFullName, color, date, description
        })
        console.log(report)
        await report.save()
        res.status(201).json({message: 'Сообщение о краже создано'})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong, try again"})
    }
})

module.exports = router