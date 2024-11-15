FROM node:20-alpine
#RUN chown -R node:node .
WORKDIR /data-source
RUN npm i -g fastify-cli
USER node:node
EXPOSE 5000
CMD [ "npm","start" ]