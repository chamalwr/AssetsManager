FROM node:16.14 AS base
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
RUN npm install -g rimraf
RUN rm -f package.json


FROM node:16.14-alpine AS prod
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package.json ./
RUN npm i --only=production
RUN rm -f package**.json


FROM base AS build
COPY . .
RUN npm run build

FROM prod AS assets-manager-prod
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
RUN chown node:node -R /usr/src/app/dist
USER node
CMD [ "npm", "run", "start:prod" ]


