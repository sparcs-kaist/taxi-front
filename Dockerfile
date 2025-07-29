#
# First stage: build the app
#
FROM node:22.12.0 AS builder

WORKDIR /app

# Install pnpm
RUN npm install --global pnpm@10.13.1

# pnpm fetch does require only lockfile
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm fetch

COPY . ./
RUN pnpm --filter-prod @taxi/web... install --offline && \
    pnpm --filter-prod @taxi/web... build

#
# Second stage: serve the app
#
FROM nginx:1.26.3-alpine

# Set default environment variables
ENV REACT_APP_BACK_URL=https://taxi.sparcs.org/api \
    REACT_APP_FRONT_URL=https://taxi.sparcs.org \
    REACT_APP_OG_URL=https://og-image.taxi.sparcs.org

# Install node & react-inject-env
RUN apk add --no-cache nodejs npm && \
    npm install --global react-inject-env@2.1.0

COPY --from=builder /app/packages/web/build /app/build/
COPY serve /app/serve/
RUN chmod +x /app/serve/

EXPOSE 80
CMD ["sh", "-c", "envsubst '$$REACT_APP_FRONT_URL $$REACT_APP_OG_URL' < /app/serve/default.conf.template > /etc/nginx/conf.d/default.conf && npx react-inject-env set -d /app/build/ && nginx -g 'daemon off;'"]
