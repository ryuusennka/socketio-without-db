FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "yarn.lock", "npm-shrinkwrap.json*", "./"]
RUN yarn install --silent && mv node_modules ../
COPY . .
EXPOSE 10404
RUN chown -R node /usr/src/app
USER node
CMD ["yarn", "start"]
