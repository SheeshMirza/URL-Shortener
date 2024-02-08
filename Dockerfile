# Use the latest Node.js image as the base image
FROM node:latest

# Set the working directory in the container
ENV WORKDIR /home/backend
RUN mkdir ${WORKDIR}
WORKDIR ${WORKDIR}

# Copy necessary files to the working directory
COPY src ${WORKDIR}/src
COPY package.json ${WORKDIR}/package.json
COPY package-lock.json ${WORKDIR}/package-lock.json

# Install dependencies using npm ci
RUN npm ci

# Specify the command to run the application
CMD ["node", "src/index.js"]