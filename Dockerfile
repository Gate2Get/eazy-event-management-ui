# Stage 1: Build React application
FROM node:18 as build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve React application with Nginx
FROM nginx:alpine

# Copy built app from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Remove default nginx index page
RUN rm -f /usr/share/nginx/html/index.html

# Copy custom nginx configurations
COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
