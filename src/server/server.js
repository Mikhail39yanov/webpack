import express from 'express'
import reactDOM from 'react-dom/server'
import { App } from '../App'
import { indexTemplate } from './indexTemplate'

const app = express()

app.use('/static', express.static('./dist/client'))

app.get('/', (request, response) => {
  response.send(
    indexTemplate(reactDOM.renderToString(App()))
  )
})

app.listen(3000, () => {
  console.log('Server started on port http://localhost:3000')
})