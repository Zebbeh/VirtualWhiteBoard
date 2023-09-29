const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
require('dotenv').config()


// New post
router.post('/', async (req, res) => {
    try {
            const post = await prisma.Post.create({
                data: {
                   title: req.body.title,
                   content: req.body.content,
                   userId: req.authUser.sub
                },
            })
            console.log("post created:", post)
            res.send({ msg: 'post created', id: post.id})  
    } catch (error) {
        console.error(error)
    }
    
    
})
// Delete a post by id
router.delete('/:id', async (req,res) => {
    try {
        const post = await prisma.Post.delete({
            where: {id: req.params.id}
        })
        res.send({
            msg: 'post deleted',
            post: post
        })
    } catch (error) {
        console.log(error)
        res.send({
            msg: 'ERROR',
            error: error
        })
        
    }
})

module.exports = router