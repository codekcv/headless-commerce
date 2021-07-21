# headless-commerce
[![Server CI/CD](https://github.com/codekcv/headless-commerce/actions/workflows/server.yml/badge.svg)](https://github.com/codekcv/headless-commerce/actions/workflows/server.yml) [![Client CI/CD](https://github.com/codekcv/headless-commerce/actions/workflows/client.yml/badge.svg)](https://github.com/codekcv/headless-commerce/actions/workflows/client.yml)

_(No official name yet. This is still work in progress.)_  
A pluggable headless E-commerce focused CMS solution for storefront websites that you can install as a package to give you a backend client that can live inside a protected route in your front-end for the merchant to access and manage their commerce content and view analysis.

<!-- [![Netlify Status](https://api.netlify.com/api/v1/badges/1c25043f-9715-4b31-b377-bffcf4fdfa65/deploy-status)](https://app.netlify.com/sites/kcv-admin-panel/deploys)

This is more of a Proof of Concept that developers can look/learn into and can serve for demo purposes as well. A bootstrap material too perhaps. Depending on what happens after I finish this, I might build another one that has real application; turning the client side of this into a package, and giving it extensible and modular components that plugs in the admin panel and connect to your own API.

> #### Update: I have plan on pivoting this into a headless CMS for a specific market. But for now, I will build as is to settle myself and of what stacks to use and weaving the architecture. -->

### - DEMO
**Sample Storefront**: {...} `To do`  
**Back-End CMS Client**: <a href="https://kcv-admin-panel.netlify.app" target="_blank" rel="noopener noreferrer">Admin Panel</a> `Username: demo` `Password: demo`  
**GraphQL API**: [Endpoint](https://warm-inlet-33728.herokuapp.com/graphql) `Add header token after login for auth` `Bearer {token}`  
*(**Note**: Demo database is ephemeral. Changes will reset after a while. This is intended, dev purposes.)*

### How To Install (Note: _Not yet published_)  
`npm install {@pkg-name}` or `yarn add {@pkg-name}`  

### Usage Guide
{To do}

---

### How To Run Locally:
1. `npm install`
2. `npm run prisma:init`
3. `npm start`

**Prerequisites:**  
1. _Provide environment variables._  
2. _Running database server that [Prisma](https://www.prisma.io/docs/reference/database-reference/supported-databases) supports._

**Environment Variables:**  
Client - _NEXT_PUBLIC_GRAPHQL_ENDPOINT_  
Server - _DATABASE_URL_ | _ACCESS_TOKEN_SECRET_ | _REFRESH_TOKEN_SECRET_

---

> **Default ports** @ **client**: 3000 | **server**: 4000  |  **database**: 5432(docker) | **adminer**: 8080(docker)  
> **Note**: You may use [docker](https://www.docker.com/)-compose for containerized development database.

---

## Front-End Technologies
[TypeScript](https://www.typescriptlang.org/), [NextJS](https://nextjs.org/), [Redux](https://redux-toolkit.js.org/), [Recharts](https://recharts.org/), [Ant Design](https://ant.design/), [React Hook Form](https://react-hook-form.com/), [Apollo Client](https://www.apollographql.com/docs/react/), [react-i18next](https://react.i18next.com/), [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Back-End Technologies
[TypeScript](https://www.typescriptlang.org/), [Koa](https://koajs.com/), [Apollo Server](https://www.apollographql.com/docs/apollo-server/), [GraphQL](https://graphql.org/), [Nexus](https://nexusjs.org/), [Prisma](https://www.prisma.io/),  [PostgreSQL](https://www.postgresql.org/), [Redis](https://github.com/luin/ioredis), [JWT](https://jwt.io/), [GraphQL Shield](https://graphql-shield.vercel.app/)

<!-- ## Development
**[WIP]** Since this is a monorepo structure, I'm using [Lerna](https://github.com/lerna/lerna) to handle the packages. We also don't want the CI to build everything everytime. Using CircleCI and setting up workflows for client or server that triggers on who had updated(I'm yet to write a bash script for this). When client workflow passes, it will deploy to Netlify through webhook. This is also good, saves time in CI building the client and move to another workflow or job. For server, it will be containerized with Docker and send the image to Heroku's container registry. Going to try github Actions too.

I might switch to using serverless. Considering that GraphQL requests are exact, no underfetch or overfetching compared to RESTful, I think it's pretty sweet to call serverless functions with them. And not having to worry with scaling and provisioning server at start and focus first on the actual GraphQL API server and client interactions.

I also use code-first approach in writing my GraphQL API using Nexus. Because it's type safe, predictable, and awesome.

### Auth Strategy
Authentication with JWT. Try access -> https://kcv-admin-panel.netlify.app/dashboard

Authorization -> Middleware layer using GraphQL Shield. I'm yet to create Admin and Super Admin roles though.

Session Maintain -> Using access token + refresh token technique.  
(_Access token is in-memory and short lived. Refresh token in cookies+httponly and longer expire date._) -->

---

#### Kanban Project Tracker | `To Do - In Progress - Done - Notes`
* **Front-End Tasks** - https://github.com/codekcv/admin-panel/projects/1  
* **Back-End Tasks** - https://github.com/codekcv/admin-panel/projects/2  
* **DevOps Tasks** - https://github.com/codekcv/admin-panel/projects/3

---

### QA
**Q. Why not use CSS-in-JS or utility classes?**  
**A**. I do not want runtime performance costs of CSS-in-JS or utility classes' styling paradigm. Besides, I'm using Ant Design anyway and thus some CSS Modules are enough to override style properties if needed.

**Q. Why Redux and Apollo Client together?**  
**A**. Apollo Client will handle network data states, but global access states for UI, settings, etc. goes to Redux. Also, performance.

**Q. Why not use NestJS?**  
**A**. NestJS was initially in the stack, but I removed. I want to use GraphQL Nexus as my code-first approach but it doesn't work well with it.

<!-- **Q. Why PostgreSQL over MongoDB(noSQL)?**  
**A**. -->

**Q. Why Prisma over TypeORM?**  
**A**. Just my preference. I believe Prisma is the next thing.

**Q. Why Nexus over Type-GraphQL?**  
**A**. Types are stronger and works well with Prisma.

<!-- Q. Why not just use serverless functions?
A. ... -->
