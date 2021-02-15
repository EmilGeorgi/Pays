const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('data.json')
const middlewares = jsonServer.defaults({noCors: true})
 
let originalSend = server.response.send;
server.response.send = function ( body ) {
    this.setHeader( 'X-Total-Count', body.length)
    originalSend.call( this, body );
};

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)
 
// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})
 
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
//   res.header. 
    next()
})
// Use default router
server.use(router)
server.listen(3004, () => {
  console.log('JSON Server is running')
})