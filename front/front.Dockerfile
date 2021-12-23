FROM node:14-alpine3.14 as build-stage

RUN mkdir /front
WORKDIR /front
COPY package.json /front/package.json
RUN npm install --silent

COPY . /front

FROM scratch

COPY --from=build-stage . .
WORKDIR /front
RUN rm README.md front.Dockerfile 

ENTRYPOINT [ "npm", "start" ]