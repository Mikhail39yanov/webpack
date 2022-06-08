import express from 'express'
import reactDOM from 'react-dom/server'
import { Header } from '../shared/Header'
import { indexTemplate } from './indexTemplate'

const app = express()

app.use('/static', express.static('./dist/client'))

app.get('/', (request, response) => {
  response.send(
    indexTemplate(reactDOM.renderToString(Header()))
  )
})

app.listen(3000, () => {
  console.log('Server started on port http://localhost:3000')
})