FROM node:19
WORKDIR /app
COPY package.json .
RUN npm install --save-dev
RUN npm i ts-node -g
COPY . .
ENV NODE_ENV=production
CMD ["node", "dist/index"]