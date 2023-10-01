const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


// Get user boards
router.get('/user/:id', async (req,res) => {

    try {
        const user = await prisma.User.findUnique({
            where: { id: req.params.id },
        })
        if (req.authUser.sub == user.id){
            console.log("boards GET")
            res.send({
                msg: 'boards',
                board: user.board,
                authorizedUserId: req.authUser.sub
            })
        } else {
            res.send({
                msg: 'Error',
                text: 'No permission'
            })
        }
        
    } catch (error) {
        console.error("Error getting user boards:", error);
        res.status(500).send({error: "Internal server"})
    }
    
})
router.get('/:id', async (req,res) => {
    const userBoards = req.authUser.board
    try {
        const board = await prisma.Board.findUnique({
            where: {id: req.params.id },
        })
        if (userBoards.includes(board.name)){
            console.log("Get board")
            res.send({
                msg: 'board',
                board: board.name,
                createdAt: board.createdAt,
                creator: board.userId
            })
        } else {
            res.status(401).send({error: "Not allowed to see this board"})
        }
    } catch (error) {
        console.error(error)
    }
})




// TODO needs to take a closer look at!
router.post('/', async (req,res) => { 
    try{
        const board = await prisma.Board.create({
            data: {
                userId: req.authUser.sub,
                name: req.body.name,
            },
        });
        const responseData = {
            id: board.id,
            name: board.name,
            createdAt: board.createdAt,
            updatedAt: board.updatedAt,
            userId: board.userId,
            // Add any other relevant properties you want to include
        };

        res.json(responseData)
    } catch (error) {
        console.error("Error creating board:", error);
        res.status(500).send({error: "Internal Server Error"});
    }finally {
        await prisma.$disconnect(); // Disconnect Prisma client
    }
});

module.exports = router