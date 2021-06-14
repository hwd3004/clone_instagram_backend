// File System. 파일을 처리하는 node.js 기본 라이브러리
import { createWriteStream } from 'fs'

import bcrypt from 'bcrypt'
import client from '../../client'
import { protectedResolver } from '../users.utils'

// node.js 명령어로, 호출한 프로젝트 디렉토리의 절대경로를 알려줌
// console.log(process.cwd())

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser },
) => {
  const { filename, createReadStream } = await avatar

  // 모든 파일을 변수 readStream에 받음
  const readStream = createReadStream()

  // uploads 폴더에 파일을 생성할 수 있지만, graphql 서버는
  // graphql만 담당하므로 apollo-server-express가 필요
  const writeStream = createWriteStream(process.cwd() + '/uploads/' + filename)
  readStream.pipe(writeStream)

  let uglyPassword = null
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10)
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      username,
      email,
      bio,
      ...(uglyPassword && { password: uglyPassword }),
    },
  })
  if (updatedUser.id) {
    return {
      ok: true,
    }
  } else {
    return {
      ok: false,
      error: 'Could not update profile.',
    }
  }
}

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
}
