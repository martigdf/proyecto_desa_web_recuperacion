# Dockerfile for Mongo service
FROM mongo:latest
COPY ./*.js /docker-entrypoint-initdb.d/
USER node:node