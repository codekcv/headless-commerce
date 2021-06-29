# admin-panel [WIP]
A full-stack admin panel application.

This is more of a Proof of Concept that developers can look/learn into and can serve for demo purposes as well. A bootstrap material too perhaps. Depending on what happens after I finish this, I might build another one that has real application; turning the client side of this into a package, and giving it extensible and modular components that plugs in the admin panel and connect to your own API.

> #### Update: I have plan on pivoting this into a headless CMS for a specific market. But for now, I will build as is to settle myself and of what stacks to use and weaving the architecture.

### Demo: <a href="https://kcv-admin-panel.netlify.app" target="_blank" rel="noopener noreferrer">Admin Panel</a> (on-going development) `user1demo|pass1demo`

[![codekcv](https://circleci.com/gh/codekcv/admin-panel.svg?style=shield)](https://app.circleci.com/pipelines/github/codekcv/admin-panel) [![Netlify Status](https://api.netlify.com/api/v1/badges/1c25043f-9715-4b31-b377-bffcf4fdfa65/deploy-status)](https://app.netlify.com/sites/kcv-admin-panel/deploys)

### How To Run Locally
1. `git clone https://github.com/codekcv/admin-panel.git`
2. `cd admin-panel`
3. `npx lerna bootstrap && yarn start`
4. `docker-compose up`

---

> **Default ports** @ **client**: 3000 | **server**: 4000  |  **database**: 5432(docker) | **adminer**: 8080(docker)  
> **Note**: [Yarn](https://yarnpkg.com/) needed for low level implemented workspaces. Lerna is for control.  
> **Note**: Latter command comes with containerized database. Else, setup a database that [Prisma](https://www.prisma.io/) supports.

---

## Front-End Technologies
[TypeScript](https://www.typescriptlang.org/), [React](http://reactjs.org/), [Redux](https://redux-toolkit.js.org/), [Ant Design](https://ant.design/), [React Hook Form](https://react-hook-form.com/), [Apollo Client](https://www.apollographql.com/docs/react/), [react-i18next](https://react.i18next.com/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Back-End Technologies
[TypeScript](https://www.typescriptlang.org/), [GraphQL](https://graphql.org/), [Apollo Server](https://www.apollographql.com/docs/apollo-server/), [Nexus](https://nexusjs.org/), [Prisma](https://www.prisma.io/),  [PostgreSQL](https://www.postgresql.org/),  [Passport](http://www.passportjs.org/)  
(NestJS was initially in the stack, but I removed. It's great for RESTful architecture but its MVC paradigm is a mismatch for GraphQL I think. And the benchmark is not good with too many layers.)

## Development
[wip] Since this is a monorepo structure, we don't want the CI to build everything everytime. Using CircleCI and setting up workflows for client or server that triggers on who had updated. When client workflow passes, it will deploy to Netlify through webhook. This is also good, saves time in CI building the client and move to another workflow or job. For server, it will be containerized with Docker and send the image to Heroku's container registry. Going to try github Actions too.

I might on switch to using serverless. Considering that GraphQL requests are exact, no underfetch or overfetching compared to RESTful, I think it's pretty sweet to call serverless functions with them. And not having to worry with scaling and provisioning server at start and focus first on the actual GraphQL API server and client interactions.

I also use type-first approach in writing my GraphQL API using Nexus. Because it's type safe, predictable, and awesome.

---
### QA (I will answer in other time)
Q. Why not use Nx for monorepo architecture?  
Q. Why not use CSS-in-JS or utility classes?  
Q. Why not use NestJS?  
Q. Why Yarn's workspaces instead of NPM 7's new workspaces?  
Q. Why Redux and Apollo Client together?  
Q. Why PostgreSQL over MongoDB(noSQL)?  
Q. Why Prisma over TypeORM?  
Q. Why Nexus over Type-GraphQL?  
Q. Why not just use serverless functions?

---
### Todos
- [x] Comeback and update this list.

##### Front-End
- [ ] Re-do client from CRA to using NextJS.
- [ ] (?) Move from Ant Design to Chakra UI or do my own UI components.
- [ ] Item directory components

##### Back-End
- [x] Replace NestJS from the stack with Apollo Server.
- [x] Setup PostgreSQL database (AWS RDS for live, Docker for local).
- [ ] Initial Model Definitions via Prisma - [Admin, User, Items].
- [x] GraphQL Schema based on the models.
- [ ] GraphQL API endpoints for type Admin.
- [ ] Authentication
- [ ] Authorization
- [ ] (?) Should I switch to serverless functions? Seems great with GraphQL's exact requests.

##### Development
- [x] Continue with monorepo structure.
- [x] Git hook pre-commit linting.
- [ ] Git conventional commit messages enforce pre-commit hook.
- [ ] CircleCI workflow conditionals for monorepo, trigger jobs for relevant package/s only.
- [ ] I'm also going to replicate this in https://nx.dev/. So I'll have another separate repository using that architecture.
