# admin-panel [WIP]
A full-stack admin panel application.

This is more of a Proof of Concept that developers can look/learn into and can serve for demo purposes as well. A bootstrap material too perhaps. Depending on what happens after I finish this, I might build another one that has real application; turning the client side of this into a package, and giving it extensible and modular components that plugs in the admin panel and connect to your own API.



### Demo: <a href="https://kcv-admin-panel.netlify.app" target="_blank" rel="noopener noreferrer">Admin Panel</a> (on-going development)
[![codekcv](https://circleci.com/gh/codekcv/admin-panel.svg?style=shield)](https://app.circleci.com/pipelines/github/codekcv/admin-panel)



### How To Run Locally
Clone/download repository, cd into it, then run:

##### Command: `npx lerna bootstrap && yarn start`  
**OR**  
##### Command: `docker-compose up`

---

> **Default ports** @ **client**: 3000 | **server**: 4000  |  **database**: 5432(docker) | **adminer**: 8080(docker)  
> **Note**: [Yarn](https://yarnpkg.com/) needed for low level implemented workspaces. Lerna is for control.  
> **Note**: Latter command comes with containerized database. Else, setup a database that [Prisma](https://www.prisma.io/) supports.

---

## Front-End Technologies
[TypeScript](https://www.typescriptlang.org/), [React](http://reactjs.org/), [Redux](https://redux-toolkit.js.org/), [Ant Design](https://ant.design/), [React Hook Form](https://react-hook-form.com/), [Apollo Client](https://www.apollographql.com/docs/react/), [react-i18next](https://react.i18next.com/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Back-End Technologies
[TypeScript](https://www.typescriptlang.org/), [NestJS](https://nestjs.com/), [GraphQL](https://graphql.org/), [PostgreSQL](https://www.postgresql.org/), [Nexus](https://nexusjs.org/), [Prisma](https://www.prisma.io/), [Passport](http://www.passportjs.org/)

---
### QA
Q. Why not use Nx for monorepo architecture?  
Q. Why Yarn's workspaces instead of NPM 7's new workspaces?  
Q. Why Redux and Apollo Client together?  
Q. Why not use CSS-in-JS or utility classes?  
Q. Why NestJS over plain Express?  
Q. Why PostgreSQL over MongoDB?  
Q. Why Prisma over TypeORM?  
Q. Why Nexus over Type-GraphQL?  
Q. Why not use serverless functions?


---
### Todos
- [x] Comeback and update this list.

##### Front-End
- [ ] Re-do client from CRA to using NextJS.
- [ ] (?) Move from Ant Design to Chakra UI or do my own UI components.

##### Back-End
- [ ] Setup PostgreSQL database (AWS RDS for live, Docker for local).
- [ ] Initial Model Definitions via Prisma - [Admin, User, Items].
- [ ] GraphQL Schema based on the models.
- [ ] GraphQL API endpoints for type Admin.
- [ ] Authorization.
- [ ] Sessions.

##### Development
- [x] Continue with monorepo structure.
- [x] Git hook pre-commit linting.
- [ ] Git conventional commit messages enforce pre-commit hook.
- [ ] CircleCI workflow conditionals for monorepo, trigger jobs for relevant package/s only.
- [ ] I'm also going to replicate this in https://nx.dev/. So I'll have another separate repository using that architecture.
