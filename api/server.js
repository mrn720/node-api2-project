// implement your server here
const express = require("express")
const router = require("./posts/posts-router")

const server = express()
// require your posts router and connect it here
const PostRouter = require("./posts/posts-router")

server.use(express.json())
server.use("/api/posts", PostRouter)

server.get('/', (req,res) => {
    res.send(`
    <h1>Welcome</h1>
    `)
})

module.exports = server