FROM nginx:1.24.0
WORKDIR /root

# Install curl & node & npm (from nvm)
ENV NODE_VERSION v16.15.0
RUN apt-get -qq update; \
    apt-get -qq install curl; \
    curl https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash; \
    . /root/.nvm/nvm.sh; \
    nvm install $NODE_VERSION; \
    nvm alias default $NODE_VERSION; \
    nvm use --delete-prefix default
ENV PATH /root/.nvm/versions/node/$NODE_VERSION/bin:$PATH

# Install base dependencies
RUN npm install --global pnpm@8.6.6 serve@14.1.2 react-inject-env@2.1.0

# Copy lockfile and prefetch depdendencies
COPY pnpm-lock.yaml .
RUN pnpm fetch

# Copy repository
COPY . .

# Build
RUN pnpm --filter @taxi/web... install --offline; \
    pnpm --filter @taxi/web... build

# Move built files to root
RUN mv /root/packages/web/build .
RUN chmod 711 /root

# Set default environment variables
ENV REACT_APP_BACK_URL=https://taxi.sparcs.org/api \
    REACT_APP_FRONT_URL=https://taxi.sparcs.org \
    REACT_APP_OG_URL=https://og-image.taxi.sparcs.org

# Serve with injected environment variables
EXPOSE 80
CMD ["sh", "-c", "envsubst '$$REACT_APP_FRONT_URL $$REACT_APP_OG_URL' < serve/default.conf > /etc/nginx/conf.d/default.conf && npx react-inject-env set && nginx -g 'daemon off;'"]
