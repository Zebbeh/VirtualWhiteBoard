const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


// Get user boards
router.get('/', async (req,res) => {

    const user = await prisma.users.findUnique({
        where: { id: req.authUser.sub, },
    })

    console.log("boards GET")
    res.send({
        msg: 'boards',
        board: user.board,
        authorizedUserId: req.authUser.sub
    })
})

module.exports = router