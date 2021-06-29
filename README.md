# [WIP] admin-panel
A full-stack admin panel application. The name admin panel is a placeholder.

This is more of a Proof of Concept that developers can look/learn into and can serve for demo purposes as well. A bootstrap material too perhaps. Depending on what happens after I finish this, I might build another one that has real application; turning the client side of this into a package, and giving it extensible and modular components that plugs in the admin panel and connect to your own API.

> #### Update: I have plan on pivoting this into a headless CMS for a specific market. But for now, I will build as is to settle myself and of what stacks to use and weaving the architecture.

### Demo: <a href="https://kcv-admin-panel.netlify.app" target="_blank" rel="noopener noreferrer">Admin Panel</a> (on-going development) `demo1user|demo1pass`
### GraphQL API: https://kcv-server-test.herokuapp.com/
*(**Note**: Database is ephemeral. Changes will reset after a while. This is intended.)*


[![codekcv](https://circleci.com/gh/codekcv/admin-panel.svg?style=shield)](https://app.circleci.com/pipelines/github/codekcv/admin-panel) [![Netlify Status](https://api.netlify.com/api/v1/badges/1c25043f-9715-4b31-b377-bffcf4fdfa65/deploy-status)](https://app.netlify.com/sites/kcv-admin-panel/deploys)

### How To Run Locally
1. `git clone https://github.com/codekcv/admin-panel.git`
2. `cd admin-panel`
3. `npx lerna bootstrap && yarn start`
4. `docker-compose up`

---

> **Default ports** @ **client**: 3000 | **server**: 4000  |  **database**: 5432(docker) | **adminer**: 8080(docker)  
> **Note**: [Yarn](https://yarnpkg.com/) needed for low level implemented workspaces. [Lerna](https://github.com/lerna/lerna) is for control.  
> **Note**: Docker compose for local containerized database. Else, setup a database that [Prisma](https://www.prisma.io/) supports.

---

## Front-End Technologies
[TypeScript](https://www.typescriptlang.org/), [React](http://reactjs.org/), [React Router](https://reactrouter.com/), [Redux](https://redux-toolkit.js.org/), [Recharts](https://recharts.org/), [Ant Design](https://ant.design/), [React Hook Form](https://react-hook-form.com/), [Apollo Client](https://www.apollographql.com/docs/react/), [react-i18next](https://react.i18next.com/), [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Back-End Technologies
[TypeScript](https://www.typescriptlang.org/), [GraphQL](https://graphql.org/), [Apollo Server](https://www.apollographql.com/docs/apollo-server/), [Nexus](https://nexusjs.org/), [Prisma](https://www.prisma.io/),  [PostgreSQL](https://www.postgresql.org/),  [Passport](http://www.passportjs.org/)  

## Development
**[WIP]** Since this is a monorepo structure, I'm using [Lerna](https://github.com/lerna/lerna) to handle the packages. We also don't want the CI to build everything everytime. Using CircleCI and setting up workflows for client or server that triggers on who had updated(I'm yet to write a bash script for this). When client workflow passes, it will deploy to Netlify through webhook. This is also good, saves time in CI building the client and move to another workflow or job. For server, it will be containerized with Docker and send the image to Heroku's container registry. Going to try github Actions too.

I might on switch to using serverless. Considering that GraphQL requests are exact, no underfetch or overfetching compared to RESTful, I think it's pretty sweet to call serverless functions with them. And not having to worry with scaling and provisioning server at start and focus first on the actual GraphQL API server and client interactions.

I also use type-first approach in writing my GraphQL API using Nexus. Because it's type safe, predictable, and awesome.

---
### QA
Q. Why not use Nx for monorepo architecture?  

**Q. Why not use CSS-in-JS or utility classes?**  
**A**. I'm becoming less fan of CSS-in-JS especially those that run at runtime(e.g. styled-components). I've seen its performance hit compared compared to just CSS. There are CSS-in-JS that compiles at build time, so I'm looking my eye on that. But I want to get back to normal CSS because I'm using Ant Design anyway. And thus CSS Modules is enough just to override some few things to adjust to my UI.

**Q. Why not use NestJS?**  
**A**. NestJS was initially in the stack, but I removed. It's great for RESTful architecture but its MVC paradigm is a mismatch for GraphQL I think. And the benchmark is not good with too many layers. The layering wasn't even an abstraction, it just added complexity but GraphQL is pretty straight forward.

Q. Why Yarn's workspaces instead of NPM 7's new workspaces?  

**Q. Why Redux and Apollo Client together?**  
**A**. Apollo Client will handle network data states, but global access states likes UI state, settings, etc goes to Redux.

Q. Why PostgreSQL over MongoDB(noSQL)?  
Q. Why Prisma over TypeORM?  
Q. Why Nexus over Type-GraphQL?  
Q. Why not just use serverless functions?

---
### Todos
- [x] Comeback and update this list.

##### Front-End
- [x] Scaffold layout and routing
- [x] Login Screen
- [x] Logging in loading and success notification feedback.
- [x] Logging out integration and notification feedback.
- [x] Header Buttons UI | Search - Notification - Setting.
- [ ] Re-do client from CRA to using NextJS.
- [ ] (?) Move from Ant Design to Chakra UI or do my own UI components.
- [ ] Item directory components. Create/Edit/Delete Button/Modal.
- [ ] Error handling. Will be menu/paged based not per component. This is better approach considering UX.
- [ ] Table Edit Customer Info Modal.
- [ ] Implement optimistic response when sending mutation.




##### Back-End
- [x] Replace NestJS from the stack with Apollo Server.
- [ ] Setup PostgreSQL database (AWS RDS(?) for live, Docker for local).
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
- [ ] (?) Might try https://nx.dev/. Update: Mixed. After looking at it, I can see its limitations though.
