FROM node:24-trixie AS base
RUN mkdir -p /app && chown node:node /app
WORKDIR /app

FROM base AS build
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY --chown=node:node package.json pnpm-lock.yaml pnpm-workspace.yaml ./
USER node
RUN pnpm install
COPY --chown=node:node . .
RUN pnpm build-food-db
RUN pnpm run build

FROM build AS dev
ENV NODE_ENV=development
CMD ["pnpm", "run", "dev"]

FROM node:24-trixie-slim AS final
RUN mkdir -p /app && chown node:node /app
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY --chown=node:node package.json pnpm-lock.yaml pnpm-workspace.yaml ./
USER node
RUN pnpm install --frozen-lockfile --prod && pnpm store prune
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/food.db ./food.db
CMD ["node", "dist/src/main.js"]
