FROM node:16.17.0

# Working dir
WORKDIR /usr/src/app

# Copy files from Build
COPY package*.json ./

# Install Files
RUN npm install 

# Copy SRC
COPY . .

# Open Port
EXPOSE 3030

# Docker Command to Start Service
CMD [ "node", "app.js" ]