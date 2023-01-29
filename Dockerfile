###
### base
###
FROM node:18.10.0-bullseye-slim AS base

# define environment variable that needs to be used for .npmrc file
ARG NPM_TOKEN

# install package "procps" so that "ps" command is available. Needed for correct signal handling when shutting down node app.
RUN apt-get update -y && \
    apt-get install -y \
    procps && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# create app folder with correct rights for node user
RUN mkdir /app && chown -R node:node /app

# set workdir
WORKDIR /app

# copy necessary files and change owner to node
COPY --chown=node:node .npmrc package.json pnpm-lock.yaml ./

###
### development
###
FROM base  AS development

# add node_modules binaries to PATH variable
ENV PATH="${PATH}:/app/node_modules/.bin"
ENV CYPRESS_CACHE_FOLDER="/tmp/cypress-cache"

# install pnpm
RUN npm install -g pnpm@7.17.1

# change owner of all files to node
COPY --chown=node:node . .

# set node as user
USER node

# install dependencies
RUN pnpm config set store-dir ~/.local/share/pnpm/store
RUN pnpm install --frozen-lockfile

# add local bin to PATH env
ENV PATH="$PATH:~/.local/bin"

### development
FROM development as app-development

# port for Angular app
EXPOSE 4208

### api-development
FROM development as api-development

# port for NestJS app
EXPOSE 3333

###
### production
###
FROM base AS production

# set node env
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# set node as user
USER node

### api-production
FROM production as api-production

# @TODO we shouldn't copy this, instead we should extend a "source" stage that contains all necessary artifacts
COPY --from=api-development /app/ .

# port for NestJS app
EXPOSE 3333

# run node on built dist
CMD [ "node", "dist/apps/api/main"]
