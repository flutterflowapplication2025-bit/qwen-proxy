FROM node:18-slim
WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY server.js .
ENV PORT=8000
CMD ["node", "server.js"]
