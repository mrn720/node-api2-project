// implement your posts router here
const Posts = require('./posts-model')
const express = require("express")
const router = express.Router()

router.get('/', (req, res) => {
    Posts.find(req.query)
        .then(posts => {
            res.status(200).json(posts)})
        .catch(err => {
            res.status(500).json({message: "The posts information could not be retrieved"})
        })
})

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if(post) {
                res.status(200).json(post)
            }else{
                res.status(404).json({message: "The post with the specified ID does not exist"})
            }
        })
        .catch(err => {
            res.status(500).json({message: "The post information could not be retrieved"})
        })
})

router.post('/', async (req, res) => {
    const changes = req.body

    try{
        if(!changes.title || !changes.contents) {
            res.status(400).json({message: "Please provide title and contents for the post"})
        } else {
            const newPost = await Posts.insert(changes)
            res.status(201).json(newPost)
        }
    }
    catch(err){res.status(500).json({message: "There was an error while saving the post to the database"})}
})

router.put('/:id', (req, res) => {
    const changes = req.body;
    const postID = req.params.id
    Posts.update(postID, changes)
        .then(post => {
            if(!changes.title || !changes.contents) {
                res.status(400).json({message: "Please provide title and contents for the post"})
            } else {
                if(post){
                    res.status(200).json(post)
                } else {
                    res.status(404).json({message: "The post with the specified ID does not exist"})
                }
            }
        })
        .catch(err => {
            res.status(500).json({message: "The post information could not be modified"})
        })
})

router.delete('/:id', (req,res) => {
    const postID = req.params.id
    Posts.remove(postID)
        .then(post => {
            if(post){
                res.status(200).json({message: "Post removed."})
            }else{
                res.status(404).json({message: "The post with the specified ID does not exist"})
            }
        })
        .catch(err => {
            res.status(500).json({message: "The post could not be removed"})
        })
})



module.exports = router