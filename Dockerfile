FROM node:16-alpine

# Copy repository
WORKDIR /usr/src/app
COPY . .

# Install requirements
RUN npm ci

# Run container
EXPOSE 8080
ENTRYPOINT npx react-inject-env set && npx http-server build
