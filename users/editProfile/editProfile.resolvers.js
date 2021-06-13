import bcrypt from 'bcrypt'
import client from '../../client'
import jwt from 'jsonwebtoken'

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, username, email, password: newPassword },

      // server.js / const server 안에 있는 context 안에 있는 token
      { token },
    ) => {
      // jwt.verify(token, secretOrPublicKey)
      // 유저가 준 토큰과 시크릿 키를 이용하여 해독된 토큰을 리턴함
      const { id } = await jwt.verify(token, process.env.SECRET_KEY)
      let uglyPassword = null
      if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10)
      }

      // prisma에 undefined를 보내면 데이터베이스 그 값들을 보내지 않는다.
      const updatedUser = await client.user.update({
        where: {
          id,
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
