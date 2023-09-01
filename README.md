# Chat to your database

This is an experimental app to test the abilities of LLMs to query SQL databases using [SQL Agents](https://github.com/Syed007Hassan/Langchain) provided by Langchain.
To use it, you should add your OPENAI_API_KEY to the .env file in api folder.

```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Installing the app

```bash!
cd api
npm install
```

```bash
cd client
npm install
```

## Running the app

```bash
/api
nodemon or npm run start
/client
npm run dev
```

## Sample database SQLite
![Sample northwind database](https://user-images.githubusercontent.com/1945179/233065892-25edda54-01a2-467d-8a72-b96a30c71a5a.png)

## See it in action

https://github.com/Syed007Hassan/NextJs-Langchain-Agents-SQL/assets/104893311/2616a2b5-0512-47f0-8271-014a6d243213

## Sample database PostgreSQL
![DVDRental](https://github.com/Syed007Hassan/NextJs-Langchain-Agents-SQL/assets/104893311/ec2eda87-8f98-42da-9b2e-db2ed1998d29)

## See it in action

![pg res](https://github.com/Syed007Hassan/NextJs-Langchain-Agents-SQL/assets/104893311/4c8c94a2-5025-425b-ba5c-19b6036af534)

**Currently I have set SQLite and PostgreSQL connections only, but using TypeORM you can set any Database. To further extend this project, fork this repo and make PRs.**



