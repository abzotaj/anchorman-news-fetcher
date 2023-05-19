FROM node:16-alpine as builder

ENV REACT_APP_ENV='###_REACT_APP_ENV_###'

EXPOSE 8000 80

WORKDIR /app

COPY package.json .

COPY .. .

RUN npm install

RUN npm run build

ENTRYPOINT ["npm", "run", "dev"]