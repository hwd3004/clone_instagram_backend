import bcrypt from 'bcrypt'
import client from '../../client'
import jwt from 'jsonwebtoken'

export default {
  Mutation: {
    editProfile: async (
      _,
      // server.js / const server / schema, context
      { firstName, lastName, username, email, password: newPassword },
      { loggedInUser, protectResolver },
    ) => {
      protectResolver(loggedInUser)

      let uglyPassword = null
      if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10)
      }

      // prisma에 undefined를 보내면 데이터베이스 그 값들을 보내지 않는다.
      const updatedUser = await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          firstName,
          lastName,
          username,
          email,

          // if (uglyPassword) { return password : uglyPassword }
          ...(uglyPassword && { password: uglyPassword }),
        },
      })
      if (updatedUser.id) {
        return {
          ok: true,
        }
      } else {
        return {
          ok: false,
          error: 'Could not update profile.',
        }
      }
    },
  },
}
