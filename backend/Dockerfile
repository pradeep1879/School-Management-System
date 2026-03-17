FROM node:20-alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install --ignore-scripts

COPY . .

# generate prisma client
RUN npx prisma generate --schema=./src/prisma/schema.prisma

EXPOSE 3000

CMD ["npm","start"]
