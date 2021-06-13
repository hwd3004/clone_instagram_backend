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

