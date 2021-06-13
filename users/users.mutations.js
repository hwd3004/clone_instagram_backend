import client from '../client'
import bcrypt from 'bcrypt'

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
  },
}
