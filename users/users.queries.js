import client from '../client'

export default {
  Query: {
    seeProfile: (_, { username }) =>
    // findUnique가 findFirst와 다른 점은, 유니크한 필드만 찾는 것
    // username, email, id같은 것
      client.user.findUnique({
        where: {
          username,
        },
      }),
  },
}
