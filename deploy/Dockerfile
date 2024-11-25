# Use the official Node.js image as the base image
FROM node:current-bullseye-slim
  # Set the working directory
WORKDIR /app

RUN npm install -g pnpm

  # Copy package.json and package-lock.json
COPY package.json pnpm-lock.yaml ./

  # Install dependencies
RUN pnpm install

  # Copy the rest of the application code
COPY . .

  # Build the application
RUN pnpm run build

  # Expose the port the app runs on
EXPOSE 3000

  # Command to run the application
ENTRYPOINT ["pnpm", "start"]