FROM node:19
WORKDIR /app
COPY package.json .
RUN npm install --save-dev
COPY . .
RUN ["node", "--require", "ts-node/register", "src/index.ts"]