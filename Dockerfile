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

# Copy repository
COPY . .

# Install requirements
RUN npm install --global pnpm@8.6.6 serve@14.1.2; \
    pnpm install; \
    pnpm install react-inject-env@2.1.0 --save

# Build
RUN pnpm run build; \
    chmod 711 /root

# Serve with injected environment variables
EXPOSE 80
CMD ["sh", "-c", "envsubst '$$REACT_APP_FRONT_URL $$REACT_APP_OG_URL' < serve/default.conf > /etc/nginx/conf.d/default.conf && npx react-inject-env set && nginx -g 'daemon off;'"]
