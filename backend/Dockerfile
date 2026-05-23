FROM node:18-alpine
WORKDIR /app
RUN npm init -y && npm install express mongoose
COPY server.js .
EXPOSE 5000
CMD ["node", "server.js"]