# Built by GitHub Actions and deployed by Gust (.github/workflows/gust-deploy.yml).
FROM node:24-slim AS base
ENV PNPM_HOME=/pnpm PATH=/pnpm:$PATH
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Read when the pages are prerendered, so it has to be here and not only at runtime.
ARG SITE_INDEXABLE=false
ENV SITE_INDEXABLE=$SITE_INDEXABLE NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

FROM node:24-slim AS run
WORKDIR /app
# Gust checks health with wget or curl inside the container; the slim image has neither.
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0 NEXT_TELEMETRY_DISABLED=1
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
# Next writes its image and data cache here.
RUN mkdir -p .next/cache && chown node:node .next/cache
USER node
EXPOSE 3000
CMD ["node", "server.js"]
