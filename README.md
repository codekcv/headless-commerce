# admin-panel [WIP]
A full-stack admin panel application.

This is more of a Proof of Concept that developers can look/learn into and can serve for demo purposes as well. Depending on what happens after I finish this, I might build another one that has real application; turning the client side of this into a package, and giving it extensible and modular components that plugs in the admin panel and connect to your own API.

### Demo: <a href="https://kcv-admin-panel.netlify.app" target="_blank" rel="noopener noreferrer">Admin Panel</a> (on-going development)
[![codekcv](https://circleci.com/gh/codekcv/admin-panel.svg?style=shield)](https://app.circleci.com/pipelines/github/codekcv/admin-panel)

### Run Locally:
1. `git clone https://github.com/codekcv/admin-panel.git`
2. `cd admin-panel`
3. `npx lerna bootstrap`
4. `yarn start`

> Default ports @ **client**: 3000 | **server**: 4000  
> **Note**: Use yarn. I'm using its low level implementation of workspaces and Lerna for control and stuff.

---

## Front-End Technologies
TypeScript, React, Redux, Ant Design, React Hook Form, Apollo Client, react-i18next, React Testing Library

## Back-End Technologies
TypeScript, NestJS, Express, PostgreSQL, TypeGraphQL, PrismaJS, Passport, Apollo Server

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
