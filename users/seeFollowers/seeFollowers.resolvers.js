import client from '../../client'

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      const ok = await client.user.findUnique({
        where: { username },

        // where: { username }만 하면 유저의 모든 정보를 가져온다
        // select를 사용하여 특정 필드만 선택하게 해야한다
        select: { id: true },
      })
      if (!ok) {
        return {
          ok: false,
          error: 'User not found',
        }
      }

      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
          // prisma에서 pagination 기능 지원
          take: 5,
          skip: (page - 1) * 5,
        })

      // 그냥 수만 세려면 findMany가 아닌 count를 쓰면 된다
      const totalFollowers = await client.user.count({
        where: { following: { some: { username } } },
      })

      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5),
      }
    },
  },
}
