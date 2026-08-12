# ==============================
# Stage 1: Build Angular app
# ==============================
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files first for better Docker caching
COPY package*.json ./

RUN npm ci

# Copy application source
COPY . .

# Production build
RUN npm run build -- --configuration production


# ==============================
# Stage 2: Serve with Nginx
# ==============================
FROM nginx:alpine

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Angular 22 application output
COPY --from=build /app/dist/vendor-contract-management-ui/browser /usr/share/nginx/html

# Custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]