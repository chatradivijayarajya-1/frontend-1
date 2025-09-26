# Use Nginx to serve static files
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy all frontend files directly
COPY . .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
