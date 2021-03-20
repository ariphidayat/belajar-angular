FROM node:15.10.0 AS build-stage

ARG configuration=production

WORKDIR /app

COPY . /app/

RUN npm install

RUN npm run build -- --output-path=./dist/out --configuration $configuration


FROM nginx:1.18.0

COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
