FROM node:9.11 AS build
COPY . /app
WORKDIR /app
RUN npm install

FROM node:9.11-slim AS runtime
COPY --from=build /app /app
WORKDIR /app
CMD [ "node", "src/index.js" ]
