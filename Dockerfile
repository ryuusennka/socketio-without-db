FROM node:14.16.0-slim
ENV PORT=10404
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "yarn.lock", "./"]
RUN yarn install
COPY . .
EXPOSE 10404
CMD ["yarn", "start"]
