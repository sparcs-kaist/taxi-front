FROM node:16-alpine

# Copy repository
WORKDIR /usr/src/app
COPY . .

# Install curl (for taxi-docker)
RUN apk update && apk add curl

# Install requirements
RUN npm install && \
    npm install react-inject-env@2.1.0 --save && \
    npm install serve@14.1.2 -g

# build
RUN npm run build

# serve
EXPOSE 80
CMD ["sh", "-c", "npx react-inject-env set && serve -s build -l 80"]
# EXPOSE 8080
# ENTRYPOINT npx react-inject-env set && npx http-server build
