FROM node:20.4-alpine AS builder

WORKDIR /app

COPY . .

RUN npm ci \ 
    && npx tsc \
    && npm cache clean --force

    
FROM node:20.4-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN addgroup -S appgroup && adduser -S appuser -G appgroup \ 
    && npm ci --omit=dev --omit=optional \
    && npm cache clean --force \
    && chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000

CMD node dist/app.js