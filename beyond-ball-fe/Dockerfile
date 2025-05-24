# Base Stage (shared)
FROM node:18 AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Development Stage
FROM base AS dev
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Build Stage (generating static files for prod)
FROM base AS build
COPY . .
RUN npm run build -- --mode=production

# Production Stage
FROM nginx:alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# docker buildx build --platform linux/amd64 --target prod -t katie493/beyond-ball-fe:latest --push .