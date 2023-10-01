const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth.js')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
require('dotenv').config()


// Login route
router.post('/login', async (req, res) => {
    try {
        const user = await prisma.User.findUnique({
            where: {email: req.body.email}
        })

        if (user == null) {
            return res.status(404).send({msg: 'ERROR', error: 'User not found'})
        }

        const match = await bcrypt.compare(req.body.password, user.password)

        if (!match) {
            return res.status(401).send({msg: 'ERROR', error: 'Wrong password'})
        }

        const token = await jwt.sign({ 
            sub: user.id, 
            email: user.email, 
            name: user.name,
            board: user.board,
            expiresIn: '1d'
        }, process.env.JWT_SECRET)

        res.send({token: token, msg: "Login successful", userId: user.id})

    } catch (error) {
        console.log(error)
    }

})

// New user
router.post('/', async (req, res) => {
    

    const hash = await bcrypt.hash(req.body.password, 12)

    const user = await prisma.User.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            board: req.body.board,
            password: hash
        },
    })
    console.log("user created:", user)
    res.send({ msg: 'user created', id: user.id })
})
// Patch user
router.patch('/:id', auth, async (req,res) => {
    if(req.params.id != req.authUser.sub) {
        res.status(403).send({
            msg: 'ERROR',
            error: 'Cannot patch other users'
        })
    }
    try {
        let hash = null
    if (req.body.password){
        hash = await bcrypt.hash(req.body.password, 12)
    }

    const user = await prisma.User.update({
        where: {
            id: req.params.id,
        },
        data: {
            password: hash,
            name: req.params.name,
            board: req.params.board
        }
    })
    res.send({
        msg: 'Patch',
        id: req.params.id,
        user: user
    })
    } catch (error) {
        console.error(error)
    }
    
})


module.exports = router