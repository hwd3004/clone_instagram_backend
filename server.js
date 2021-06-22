require('dotenv').config()
import http from 'http'
import express from 'express'
import logger from 'morgan'
import { ApolloServer } from 'apollo-server-express'
import { resolvers, typeDefs } from './schema'
import { getUser } from './users/users.utils'

const PORT = process.env.PORT

const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(req.headers.token),
      }
    } else {
      const {
        connection: { context },
      } = ctx
      return {
        loggedInUser: context.loggedInUser,
      }
    }
  },
  subscriptions: {
    onConnect: async ({ token }) => {
      if (!token) {
        throw new Error("You can't listen.")
      }
      const loggedInUser = await getUser(token)
      return {
        loggedInUser,
      }
    },
  },
})

const app = express()

// morgan은 nodeJS에서 사용되는 로그 관리를 위한 미들웨어
app.use(logger('tiny'))

// apollo 서버에 express 서버를 줌
// applyMiddleware는 logger 다음에 작성해야함
apollo.applyMiddleware({ app })

app.use('/static', express.static('uploads'))

const httpServer = http.createServer(app)
apollo.installSubscriptionHandlers(httpServer)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
