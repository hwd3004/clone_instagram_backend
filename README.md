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

# 2. Create Account part One



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

