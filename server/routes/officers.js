const {Router} = require('express')
const bcrypt = require("bcryptjs")
const {check, validationResult} = require("express-validator")
const User = require('../models/User')
const router = Router()


//  /api/officers
router.get('/', async (req, res) => {
    try {
        const officer = await User.find()
        res.json(officer)
    } catch (e) {
        console.log(e.message)
        res.status(500).json({message:"Error"})
    }
})
router.get('/:id', async (req, res) => {
    try {
        const report = await User.findById(req.params.id)
        res.json(report)
    } catch (e) {
        console.log(e.message)
        res.status(500).json({message:"Error"})
    }
})
router.post('/', [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 8 символов').isLength({min: 8})
], async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }
        const {email, firstName, lastName, password, clientId} = req.body
        const candidateEmail = await User.findOne({email})
        const candidateId = await User.findOne({clientId})
        if (candidateEmail || candidateId) {
            return res.status(400).json({message: "Пользователь существует"})
        }
        const firstOfficer = await User.find()
        const officer = new User({
            email,
            firstName,
            lastName,
            password,
            clientId,
            approved: !Boolean(firstOfficer.length)
        })
        await officer.save()
        res.status(201).json({message: 'Сотрудник добавлен'})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong, try again"})
    }
})
router.put("/:id", async (req, res) => {
    try {
        const {
            firstName, lastName, password, approved
        } = req.body
        if (password !== undefined){
            const encryptedPassword = await bcrypt.hash(password, 10)
            await User.findByIdAndUpdate(req.params.id, {
                firstName, lastName , password : encryptedPassword, approved
            })
            res.json({message: "Данные сотрудника изменены"})
        } else {
            await User.findByIdAndUpdate(req.params.id, {
                firstName, lastName, approved
            })
            res.json({message: "Данные сотрудника изменены"})
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong, try again"})
    }
})
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json({message: "Сотрудник удален"})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong, try again"})
    }

})

module.exports = router