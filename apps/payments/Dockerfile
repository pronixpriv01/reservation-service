FROM node:alpine As development

ARG APP_DIR_PATH=/usr/src/app

WORKDIR ${APP_DIR_PATH}

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine as procuction

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG APP_DIR_PATH=/usr/src/app

WORKDIR ${APP_DIR_PATH}

COPY package.json package-lock.json ./

RUN npm install --only=production

COPY --from=development ${APP_DIR_PATH}/dist ./dist

CMD ["node", "dist/apps/payments/main"]