import { protectedResolver } from '../../users/users.utils'

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      // file의 데이터타입은 임시로 String으로 함
      async (_, { file, caption }, { loggedInUser }) => {
        if (caption) {
          // caption이 존재한다면 parsing 작업을 해야함
          // I love #food 같은 캡션에 있는 문장 안의 해시태그 키워드들만 추출해야함
          // 해당 해쉬태그를 create하게 하고, 이미 있다면 get하게 함
        }

        // 파싱된 해쉬태그에와 홤께 사진 저장
        // 사진을 해당 해쉬태그에 추가
      },
    ),
  },
}
