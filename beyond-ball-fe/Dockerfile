# Use Node.js to build and serve the React app
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the application source code
COPY . ./

# Expose the React development server port
EXPOSE 3000

# Start the React development server
CMD ["npm", "run", "dev"]