import client from '../../client'

export default {
  Query: {
    seeFollowing: async (_, { username, lastId }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      })
      if (!ok) {
        return {
          ok: false,
          error: 'User not found',
        }
      }

      // 변수명 lastId 는 end_cursor로 이해하면 될 듯 하다
      // 마지막으로 조회한 lastId(end_cursor)를 기준으로 한다
      // 전달받은 lastId가 없다면 첫 페이지부터 보여주고,
      // 전달받은 lastId가 있다면, 해당 lastId부터 take의 수만큼 skip한 페이지를 보여준다
      const following = await client.user
        .findUnique({ where: { username } })
        .following({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        })
      return {
        ok: true,
        following,
      }
    },
  },
}
