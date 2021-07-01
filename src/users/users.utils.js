import jwt from 'jsonwebtoken'
import client from '../client'

export const getUser = async (token) => {
  try {
    if (!token) {
      return null
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY)
    const user = await client.user.findUnique({ where: { id } })
    if (user) {
      return user
    } else {
      return null
    }
  } catch {
    return null
  }
}

export function protectedResolver(ourResolver) {
  return function (root, args, context, info) {
    // info는 서버에서 어떤 작동이 일어나는지에 대한 모든 정보를 알려줌
    if (!context.loggedInUser) {
      const query = info.operation.operation === 'query'
      if (query) {
        return null
      } else {
        return {
          ok: false,
          error: 'Please log in to perform this action.',
        }
      }
    }
    return ourResolver(root, args, context, info)
  }
}
