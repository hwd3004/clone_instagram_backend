# 1. 셋업

vscode - extension - .gitignore

    .gitignore 생성 -> ctrl + shift + p -> node

yarn add apollo-server graphql

yarn add nodemon --save-dev

https://babeljs.io/setup#installation -> Node

    yarn add @babel/core @babel/cli @babel/preset-env @babel/node --save-dev

    ```
    "scripts": {
        "start": "nodemon babel-node server.js"
    }
    ```

https://www.prisma.io/

    yarn add prisma -D

    yarn prisma init

https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

    prisma 패키지 설치

yarn add dotenv

yarn add graphql-tools

yarn add @prisma/client

---

# 4.0 Create Account part One

/prisma/schema.prisma

```

...

model User {
  id        Int      @id @default(autoincrement())
  firstName String
  lastName  String?
  username  String   @unique
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

작성 후 yarn prisma migrate dev

    Error: P1001: Can't reach database server at `localhost`:`5432`

    오류가 뜨면 .env에 비밀번호 설정

    Enter a name for the new migration:은 user_model

---

# 4.1 Create Account part Two

---

# 4.2 Create Account part Three

패스워드 해쉬 작업

yarn add bcrypt

    설치 시 에러가 떴는데, yarn-error.log에 operation permit error라고 되어있어서, 파워쉘을 관리자 권한으로 실행하여서 설치하였다.

users.mutations.js

```
...
import bcrypt from 'bcrypt'
....
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
...
```

yarn prisma studio

    로컬:5555포트에서 패스워드가 해쉬 암호화가 잘되었는지 확인 가능

---

# 4.3 seeProfile

---

# 4.4 login

yarn add jsonwebtoken

    설치만 해놓음

---

# 4.5 login Part Two and Refactor

password generator 웹사이트에서 SECRET_KEY 생성

---

# 4.6 Divide and Conquer

---

# 4.7 updateProfile

---

# 4.8 authentication part One

---

# 4.9 authentication part Two

---

# 4.10 authentication part Three

---

# 4.11 Protecting Resolvers part One

---

# 4.12 Protecting Resolvers part Two

```
<!-- x 변수는 resolver 함수를 받는다 -->
const x = (resolver)

<!-- resolver 함수는 다른 함수(graphql resolver가 가진 값들을 받음)를 리턴할 것이다 -->
const x = (resolver) => (root, args, context, info) => {}


const x = (resolver) => (root, args, context, info) => {
    <!-- 유저가 로그인한 상태 체크 -->
    if(!context.loggedInUser){
        return {
            ok: false,
            error: "log in please"
        }
    }

    <!-- graphql resolver와 같은 argument를 가진 함수 리턴 -->
    return resolver(root, args, context, info)
}

<!-- 예전 문법 -->
function x(resolver){
    return function(root, args, context, info){
        if(!context.loggedInUser){
            return {
                ok: false,
                error: "log in please"
            }
        }
    }
}

```

# 4.13 Recap

---

# 4.14 File Upload part One

/prisma/schema.prisma

```
model User {
    ...
    bio    String?
    avatar String?
}
```

users/editProfile/editProfile.resolvers.js에 bio 추가

users/editProfile/editProfile.typeDefs.js에 bio: String 추가

users/users.typeDefs.js에 bio: String avatar: String 추가

yarn prisma migrate dev

이름은 bio_avatar

prisma studio 재실행

---

# 4.15 File Upload part Two

파일 업로드 테스트를 위한 altair graphql client 설치

altair에서

```
mutation($bio: String, $avatar: Upload){
  editProfile(bio: $bio, avatar: $avatar){
    ok
    error
  }
}
```

editProfile.resolvers.js에서

```
const resolverFn = async (...) => {
    ...
    console.log(avatar)
    ...
}
...
```

콘솔창을 확인해보면

```
Promise {
  {
    filename: '20200825_002352.jpg',
    mimetype: 'image/jpeg',
    encoding: '7bit',
    createReadStream: [Function: createReadStream]
  }
}
```

---

# 4.16 File Upload part Three

1. 포트 4000이 이미 사용되고 있다는 에러가 뜨면,

   nodemon이 서버를 새로 시작하려고 했는데 이전 프로세스가 죽지 않은 경우이다

   package.json을 수정하면 된다

   ```
   "scripts": {
       "start": "nodemon --exec babel-node server.js --delay 2s"
   },
   ```

2. alitair에서 파일 업로드 테스티 "Maximum call stack size exceeded" 에러가 생길 수 있다

   yarn을 사용 중인 경우에는

   package.json에 추가

   ```
   ...
   "resolutions": {
   "**/**/fs-capacitor": "^6.2.0",
   "**/graphql-upload": "^11.0.0"
   }
   ...
   ```

   npm 사용시 package.json에 추가

   ```
   ...
   "resolutions": {
       "fs-capacitor": "^6.2.0",
       "graphql-upload": "^11.0.0"
   }
   ...
   ```

   package.json의 scripts 부분에

   ```
   "scripts": {
       "preinstall": "npx npm-force-resoulutions",
   }
   ```

   node_moudles 폴더를 지우고 npm install

---

# 4.17 File Upload part Four

```
import { createWriteStream } from 'fs'

...

// node.js 명령어로, 호출한 프로젝트 디렉토리의 절대경로를 알려줌
console.log(process.cwd())

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

  ...

```

---

# 4.18 Ejecting from Apollo Server

yarn add express apollo-server-express

에러 발생

    error An unexpected error ouccured: "EPERM: operation not permitted

    http://flummox-engineering.blogspot.com/2019/01/yarn-on-windows-file-read-only-error-eperm-operation-not-permitted-open.html

    node_modules 폴더의 속성에 읽기 전용을 체크 해제 후 설치

    그래도 안되서 node_moudles 폴더 삭제 후 yarn install

    이후에 yarn add express apollo-server-express 해주니 잘되었다

yarn add morgan

graphql 플레이그라운드에 접속하려면 로컬:4000/graphql로 해야한다

---

# 4.19 Changing Avatar

---

# 4.20 Followers part One

/prisma/schema.prisma

```
...
followers User[] @relation("FollowRelation", references: [id])
following User[] @relation("FollowRelation", references: [id])
...
```

yarn prisma migrate dev

yarn prisma studio

---

# 4.21 Following User

---

# 4.22 Unfollow User and See Followers

---

# 4.23 Followers Pagination part One

https://www.prisma.io/docs/concepts/components/prisma-client/pagination

Offeset pagination과 Cursor-based pagination이 있다

---

# 4.24 Followers Pagination part Two

https://www.prisma.io/docs/concepts/components/prisma-client/pagination

Offset pagination의 장점 - 어떤 페이지로든 갈 수 있다

단점 - 만약 20만개의 아이템을 스킵하고 10개의 아이템을 가지고 오려면, 데이터베이스는 20만개의 데이터를 가져와야 한다