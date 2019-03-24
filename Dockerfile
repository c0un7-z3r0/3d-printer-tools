# build environment
FROM node:current as builder
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN yarn

COPY . /app
RUN yarn build

# production environment
FROM nginx:1.15.9-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
