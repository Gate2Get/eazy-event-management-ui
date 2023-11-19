# Use the official Node.js image as the base image
FROM node:18.18.2

# Install pnpm
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code to the container
COPY . .

# Build the TypeScript code
RUN pnpm run build

# Expose the port that your Vite application will run on
EXPOSE 80

# Command to start the application
CMD ["pnpm", "run", "start"]
