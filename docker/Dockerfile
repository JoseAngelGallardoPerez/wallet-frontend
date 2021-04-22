FROM node:12-alpine as builder
ARG NODE_ENV
ARG API_BASE_URL
ARG API_DOMAIN
ENV NODE_ENV "$NODE_ENV"
ENV API_BASE_URL "$API_BASE_URL"
ENV API_DOMAIN "$API_DOMAIN"

RUN apk update && apk add git

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force
RUN npm install -g yargs@16.1.0 dotenv@8.2.0

RUN mkdir /ng-app

WORKDIR /ng-app
COPY . .

RUN rm -rf ./node_modules
## make extra-webpack.config.js empty - disable gzipping
RUN > extra-webpack.config.js

RUN npm i

## Build the angular app in production mode and store the artifacts in dist folder
RUN cp ./docker/set-env.ts ./set-env.ts
RUN npx ts-node ./set-env.ts --environment=prod
RUN npm run build


### STAGE 2: Setup ###

FROM nginx:1.13.3-alpine

## Copy our default nginx config
#COPY nginx/default.conf /etc/nginx/conf.d/
COPY --from=builder /ng-app/docker/default.nginx /etc/nginx/conf.d/default.conf

ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist/default-application /usr/share/nginx/html
COPY --from=builder /ng-app/docker/fetch_whitelisted_domain.py /
COPY --from=builder /ng-app/docker/replace_api_url.sh /

CMD ["sh", "replace_api_url.sh"]
