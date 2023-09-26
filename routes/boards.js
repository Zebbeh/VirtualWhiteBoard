const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


// Get user boards
router.get('/', async (req,res) => {

    const board = await prisma.users.board.findUnique({
        where: {userId: req.authUser.sub, },
    })

    console.log("boards GET")
    console.log(res)
    res.send({
        msg: 'boards',
        board: board,
        authorizedUserId: req.authUser.sub
    })
})

module.exports = router