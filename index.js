// require your server and launch it here
const server = require('./api/server.js')

const port = 1234

server.listen(port, () => {
    console.log('Server running on port 1234')
})