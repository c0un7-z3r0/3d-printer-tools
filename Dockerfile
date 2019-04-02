# build environment
FROM node:current as builder
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN yarn

COPY . /app
RUN yarn build
