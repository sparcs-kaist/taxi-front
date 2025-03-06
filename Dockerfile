ARG back_url=https://taxi.sparcs.org/api
ARG front_url=https://taxi.sparcs.org
ARG og_url=https://og-image.taxi.sparcs.org

FROM node:16.15.1-slim AS base

FROM base AS manager
RUN npm install -g pnpm@latest-8 react-inject-env@2.1.0

FROM manager AS builder
ARG back_url
ARG front_url
ARG og_url
ENV REACT_APP_BACK_URL=$back_url
ENV REACT_APP_FRONT_URL=$front_url
ENV REACT_APP_OG_URL=$og_url
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm fetch
COPY . .
RUN pnpm --filter-prod @taxi/web... install --offline --frozen-lockfile
RUN pnpm --filter-prod @taxi/web... build
RUN npx react-inject-env set

FROM nginx:1.27.4 AS production
ARG back_url
ARG front_url
ARG og_url
ENV REACT_APP_BACK_URL=$back_url
ENV REACT_APP_FRONT_URL=$front_url
ENV REACT_APP_OG_URL=$og_url
COPY --from=builder /app/packages/web/build /app/build/
COPY serve /app/serve/
COPY serve/default.conf.template /etc/nginx/templates/
RUN chmod +x /app

EXPOSE 80
