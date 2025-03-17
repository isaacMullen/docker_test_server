# setting a base image
FROM node:22-bullseye

# Set the working directory inside the container
WORKDIR /docker_test_server

# Copy package.json and package-lock.json (if available) before installing dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Set environment variable for the port
ENV PORT=9000

# Expose the port the app will run on
EXPOSE 9000

# Start the application
CMD [ "node", "index.js" ]
