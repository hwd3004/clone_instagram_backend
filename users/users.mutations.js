import client from '../client'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

export default {
  Mutation: {
    // async await는 필수
    createAccount: async (
      _,
      { firstName, lastName, username, email, password },
    ) => {
      // check if username or email are already on DB.
      // findFirst는 조건에 맞는 첫번째 사용자를 리턴함
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        })
        if (existingUser) {
          throw new Error('This username/password is already taken.')
        }
        const uglyPassword = await bcrypt.hash(password, 10)
        return client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        })
      } catch (e) {
        return e
      }
    },

    login: async (_, { username, password }) => {
      const user = await client.user.findFirst({ where: { username } })
      if (!user) {
        return {
          ok: false,
          error: 'User not found.',
        }
      }

      // bcrypt.compare(data, encrypted)
      // 사용자가 입력한 패스워드를 bcrypt가 데이터베이스에 있는 해쉬 패스워드와 비교한다
      const passwordOk = await bcrypt.compare(password, user.password)
      if (!passwordOk) {
        return {
          ok: false,
          error: 'Incorrect password.',
        }
      }

      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY)
      return {
        ok: true,
        token,
      }
    },
  },
}
