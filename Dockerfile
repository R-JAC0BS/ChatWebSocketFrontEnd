# 1) Build da aplicação React
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# 2) Imagem para servir o conteúdo estático via Nginx
FROM nginx:alpine

# Copia o build gerado para a pasta padrão do nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expõe porta padrão do nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]