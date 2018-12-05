FROM mhart/alpine-node

WORKDIR /usr/src/app

COPY package.json .

RUN yarn

COPY sls-mount .

CMD ["yarn", "start"]