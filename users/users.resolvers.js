import client from '../client'

// 데이터베이스가 아닌, 스키마에 필드 만들기
export default {
  User: {
    // 내가 팔로잉하는 유저 수를 세기 위해서는(목록을 가져오는게 아니라 수만 셈)
    // 내 id를 팔로우 리스트에 가지고 있는 사람만 셈
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),

    // 나를 팔로잉하는 사람이 몇 명인지 세기 위해서는
    // 사람들의 리스트에 내 id를 가진 사람이 몇 명인지 세면 됨
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),

    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false
      }
      return id === loggedInUser.id
    },

    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false
      }
      const exists = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      })
      return Boolean(exists)
    },
  },
}
