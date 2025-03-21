ARG FRONT_URL=https://taxi.sparcs.org
ARG BACK_URL=https://taxi.sparcs.org/api
ARG OG_IMAGE_URL=https://og-image.taxi.sparcs.org

FROM node:16.15.1-slim AS base

FROM base AS manager
RUN npm install -g pnpm@latest-8 react-inject-env@2.1.0

FROM manager AS builder
ARG FRONT_URL
ARG BACK_URL
ARG OG_IMAGE_URL
ENV REACT_APP_FRONT_URL=$FRONT_URL
ENV REACT_APP_BACK_URL=$BACK_URL
ENV REACT_APP_OG_URL=$OG_IMAGE_URL
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm fetch
COPY . .
RUN pnpm --filter-prod @taxi/web... install --offline
RUN pnpm --filter-prod @taxi/web... build
RUN npx react-inject-env set

FROM nginx:1.27.4 AS production
ARG FRONT_URL
ARG BACK_URL
ARG OG_IMAGE_URL
ENV REACT_APP_FRONT_URL=$FRONT_URL
ENV REACT_APP_BACK_URL=$BACK_URL
ENV REACT_APP_OG_URL=$OG_IMAGE_URL
COPY --from=builder /app/packages/web/build /app/build/
COPY serve /app/serve/
COPY serve/default.conf.template /etc/nginx/templates/
RUN chmod +x /app

EXPOSE 80
