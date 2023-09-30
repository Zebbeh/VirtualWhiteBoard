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
                   userId: req.authUser.sub,
                   color: req.body.color
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
// update a post
router.patch('/:id', async (req,res) => {
    try {
        const post = await prisma.Post.update({
            where: {
                id: req.params.id,
            },
            data: {
                content: req.body.content,
                title: req.body.title,
                color: req.body.color
            },
        })
        res.send({
            msg: 'Post patched',
            id: req.params.id,
            post: post
        })
    } catch (error) {
        console.error(error)
    }
})

module.exports = router