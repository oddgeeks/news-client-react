# specify a base image
FROM node:16-alpine

# set the working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# use exact node version

RUN nvm use

# install dependencies
RUN npm install

# copy the source code
COPY . .

# build the React app
RUN npm run build

# expose port 3000
EXPOSE 3000

# start the React app
CMD ["npm", "start"]