FROM node:10

# Create app directory and use it as the working directory
RUN mkdir -p /app/client
WORKDIR /app/client

# Install app dependencies
# Bundle app source
COPY . /app/client

RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

CMD [ "yarn", "start" ]
