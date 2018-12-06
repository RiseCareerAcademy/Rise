FROM node:10.14.0-alpine

# Create app directory
WORKDIR /user/app

RUN apk add sqlite

RUN npm i -g pm2
RUN npm i -g rtail

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

RUN npm install --production

# Bundle app source
COPY config config
COPY constants constants
COPY db db
COPY public public
COPY routes routes
COPY utils utils
COPY .env .env
COPY package.json package.json
COPY README.md README.md
COPY server.js server.js
COPY ecosystem.config.js ecosystem.config.js

ENV PORT=80
ENV NODE_ENV="production"

EXPOSE 80
EXPOSE 8080

CMD ["npm", "run", "serve:prod"]
