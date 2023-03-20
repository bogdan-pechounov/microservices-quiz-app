FROM node:18-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm i
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install --global serve
# COPY ./dist .
CMD ["serve", "-l", "5173"]