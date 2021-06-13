import client from '../client'

export default {
  Mutation: {
    // async await는 필수
    createAccount: async (
      _,
      { firstName, lastName, username, email, password },
    ) => {
      // check if username or email are already on DB.
      // findFirst는 조건에 맞는 첫번째 사용자를 리턴함
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
      console.log(existingUser)
      // hash password
      // save and return the user
    },
  },
}
