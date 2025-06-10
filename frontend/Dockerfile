FROM node:21.1 as build

WORKDIR /app

COPY package*.json .
RUN npm install
COPY . .
RUN npm t
RUN npm run build


FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html