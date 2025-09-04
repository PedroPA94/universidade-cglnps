# Etapa 1: build Angular
FROM node:20 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:prod

# Etapa 2: servidor Nginx
FROM nginx:alpine
COPY --from=build /app/dist/universidade-cglnps-frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
