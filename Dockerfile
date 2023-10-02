###
### base - this is the "base" stage, that will be the foundation for ALL other stages
###
FROM node:18.10.0-bullseye-slim AS base

# set node env
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# create app folder with correct rights for node user
RUN mkdir /app && chown -R node:node /app

# set workdir
WORKDIR /app

# procps: necessary so that "ps" command is available. Needed for correct signal handling when shutting down node app.
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
    procps && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# set node as user
USER node





###
### ci - this is the "ci" stage, that will be used for the CI pipeline
###
FROM base AS ci

# set node env
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# add node_modules binaries and local-bin to PATH variable
ENV PATH="${PATH}:/app/node_modules/.bin:~/.local/bin"
ENV CYPRESS_CACHE_FOLDER="/tmp/cypress"
ENV ANSIBLE_CONFIG=/app/ansible/ansible.cfg

# set root as user
USER root

# INSTALL PACKAGES:
# - ca-certificates: necessary for checking out with git
# - git: necessary for nx
# - python3, make and g++: necessary to compile x86 based packages to arm
# - lib*, xauth and xvfb are necessary for cypress
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
    ca-certificates \
    git \
    python3  \
    make  \
    g++ \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    xvfb && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# install pnpm
RUN npm install -g pnpm@7.17.1 && npm cache clean --force

# set node as user
USER node

# configure pnpm (for node user)
RUN pnpm config set store-dir ~/.local/share/pnpm/store





###
### production - this the "production" stage, that will be used for deployable containers
###
FROM base AS production

COPY --chown=node:node artifact ./

# port for NestJS app
EXPOSE 3333

# run node on built dist
CMD [ "node", "main"]





###
### development - this the "development" stage, that will be used for local containers
### This stage will be used inside docker-compose
###
FROM ci AS development

# set root as user (better for local development because of mounted volumes)
USER root

# copy necessary files and change owner to node
COPY .npmrc package.json pnpm-lock.yaml ./

# configure pnpm (for root user)
RUN pnpm config set store-dir ~/.local/share/pnpm/store

# install dependencies
RUN pnpm install --frozen-lockfile

# ports for Angular and NestJS apps
EXPOSE 4200
EXPOSE 3333



