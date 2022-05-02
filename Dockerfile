FROM node:16
WORKDIR /usr/src/is4tech-test
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD npm run build && npm start
