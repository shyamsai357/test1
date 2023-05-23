#installing Node
FROM node:14.17.0-alpine as build-step

#creating parent directory app
RUN mkdir -p /app

#keeping working directory as app
WORKDIR /app

#copying package.json to app directory
COPY package.json /app

#installing all packages in package.json with npm
RUN npm install

#copying everything to app directory except docker Ignore files present in .dockerIgnore
COPY . /app

#build project with production configuration
RUN npm run build --prod

#insalling nginx
FROM nginx:1.20.1

#copying required file from node container(location) to nginx container(location)
COPY --from=build-step /app/dist/compare-tool /usr/share/nginx/html

#allowing angular serve through 4200 port
EXPOSE 4200:80