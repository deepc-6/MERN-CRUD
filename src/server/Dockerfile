FROM node:10

# Create app directory and use it as the working directory
RUN mkdir -p /app/server
WORKDIR /app/server

# Install app dependencies
# Bundle app source
COPY . /app/server

RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

CMD [ "yarn", "dev" ]
