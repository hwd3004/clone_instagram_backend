import client from '../../client'
import { protectedResolver } from '../../users/users.utils'

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      // file의 데이터타입은 임시로 String으로 함
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObj = []

        if (caption) {
          // caption이 존재한다면 parsing 작업을 해야함
          // I love #food 같은 캡션에 있는 문장 안의 해시태그 키워드들만 추출해야함
          // 해당 해쉬태그를 create하게 하고, 이미 있다면 get하게 함

          // 정규표현식(Regular Expression) 사용
          // 패턴을 통해 String 내에 있는 특정 String을 추출
          // # -> 해쉬 기호, [\w] -> 텍스트의 마지막 character까지 이어지는 문자의 집합
          // 영어만 하려면 /#[\w]+/g
          const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣\w]+/g)
          // console.log(hashtags)

          hashtagObj = hashtags.map((hashtag) => ({
            where: { hashtag },
            create: { hashtag },
          }))
          console.log(hashtagObj)
        }

        // 파싱된 해쉬태그에와 홤께 사진 저장
        // 사진을 해당 해쉬태그에 추가
        return client.photo.create({
          data: {
            file,
            caption,

            user: {
              connect: {
                id: loggedInUser.id,
              },
            },

            // 우선 해당 해시태그들이 이미 존재하는지 찾아보고,
            // 존재하지 않는다면 새로 만들어줘야한다
            // Prisma가 이 작업을 수월하게 처리해주는게 connectOrCreate이다
            // 필드값이 unique해야만 connectOrCreate를 사용할 수 있다
            ...(hashtagObj.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObj,
              },
            }),
          },
        })
      },
    ),
  },
}
