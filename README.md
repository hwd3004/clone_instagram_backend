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