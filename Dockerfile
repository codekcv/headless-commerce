FROM node:16

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN npx lerna bootstrap

EXPOSE 3000 4000

CMD [ "yarn", "start" ]