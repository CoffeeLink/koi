FROM node:alpine

RUN apk add g++ make python

RUN mkdir -p /usr/src

WORKDIR /usr/src

COPY . /usr/src

RUN yarn install

RUN yarn build

ENV HOST 0.0.0.0

EXPOSE 7000

CMD yarn start
