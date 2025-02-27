FROM node:22.11.0-alpine3.18

ENV NODE_ENV=production

RUN apt-get update && apt-get install -y git build-essential

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm@10.5.0 && pnpm install --frozen-lockfile

COPY . .

RUN pnpm build
