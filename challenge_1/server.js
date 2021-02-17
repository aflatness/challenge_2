const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./data/db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

router.render = (req, res) => {
  res.jsonp({
    body: res.locals.data.map(({ date, description, category2 }) => {
        date = date.replace(/^\-(.*)/, '$1 B.C.').replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$3/$1')
        return {date, description, category2};
      })
  })
}

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})