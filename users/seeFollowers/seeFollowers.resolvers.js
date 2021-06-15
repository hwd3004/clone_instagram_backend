import client from '../../client'

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
          // prisma에서 pagination 기능 지원
          take: 5,
          skip: (page - 1) * 5,
        })
      return {
        ok: true,
        followers,
      }
    },
  },
}
