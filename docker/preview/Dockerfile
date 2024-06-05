FROM node:18-alpine as server_dist

WORKDIR /server_dist

# Only copy over the packages files of all required packages.

# This will ensure that we don't have to install all dependencies

# again if any source files change.

COPY ../../package*.json ../../lerna.json ../../tsconfig.json ./
COPY ../../packages/editor/* ./packages/editor/

# Install dependencies and bootstrap packages

RUN npm ci --unsafe-perm

# Now copy over source files and assets

#COPY ../../packages/editor/* ./packages/editor/src
#COPY ../../packages/editor/webpack.config.js ./packages/editor/webpack.config.js

RUN npm run build:preview

FROM node:18-alpine as server_dist2

WORKDIR /server_dist2/packages/editor

COPY --from=server_dist /server_dist/packages/server/editor/dist/ssr/package\*.json .

RUN npm install

COPY --from=server_dist /server_dist/packages/server/editor/dist/ssr/ .

# FROM node:16.13.1-buster-slim

# EXPOSE 3020

# WORKDIR /desktop

# COPY --from=server_dist2 /server_dist2/packages/server/ .

# ENTRYPOINT ["npm", "run"]

# CMD [ "server"]


FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

#RUN npm install
RUN npm install -g pm2 
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY --from=server_dist2 /server_dist2/packages/editor .

EXPOSE 8090
CMD pm2-docker start index.js

