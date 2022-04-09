const server = require('fastify')();
const sites = require('./routes/site')
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

// Register Sites domain routes
server.register(sites, {
    prefix: "/api/v1/sites"
})

server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})