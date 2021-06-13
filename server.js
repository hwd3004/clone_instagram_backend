require('dotenv').config()
import { ApolloServer } from 'apollo-server'
import schema from './schema'

const PORT = process.env.PORT

const server = new ApolloServer({
  schema,
  context: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjIzNjAwNDQ1fQ.TH110awK0e5iq3KnBxCvShyIJRRG02yGegTQC41kEq8',
  },
})

server
  .listen(PORT)
  .then(() => console.log(`Server is running on http://localhost:${PORT}`))
