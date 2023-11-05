# Stage 1: Build the React app
FROM node:alpine as builder

# Copy the package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Create a directory for the app
WORKDIR /react-ui

# Copy the app source code
COPY . .

# Build the project
RUN npm run build



# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Remove the default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy the built app from the build stage to the nginx directory
COPY --from=builder /react-ui/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
