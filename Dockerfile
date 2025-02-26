FROM node

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install --global corepack@latest
RUN npm corepack enable pnpm

RUN pnpm install --frozen-lockfile

RUN pnpm build