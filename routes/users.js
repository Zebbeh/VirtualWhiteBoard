const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
require('dotenv').config()


// Login route
router.post('/', async (req, res) => {

    const hash = await bcrypt.hash(req.body.password, 12)

    const user = await prisma.users.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            password: hash
        },
    })
    console.log("user created:", user)
    res.send({ msg: 'user created', id: user.id })
})



module.exports = router