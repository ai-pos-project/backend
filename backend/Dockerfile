FROM node:20.4-alpine

WORKDIR /app

COPY . .


RUN addgroup -S appgroup && adduser -S appuser -G appgroup \ 
    && npm ci \
    && npx tsc \
    && npm ci --omit=dev --omit=optional \
    && npm cache clean --force

RUN chown -R appuser:appgroup /app/dist

USER root

EXPOSE 3000

CMD node dist/app.js