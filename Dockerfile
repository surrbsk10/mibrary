FROM mhart/alpine-node

# create app directory
RUN mkdir -p /usr/src/app && echo "mibrary"
WORKDIR /usr/src/app

# install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# bundle app source
COPY . /usr/src/app/

EXPOSE 8080

CMD ["npm", "run", "start"]
