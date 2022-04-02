# https://www.koyeb.com/tutorials/how-to-dockerize-and-deploy-a-next-js-application-on-koyeb

FROM node:16.14.0-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16.14.0-alpine as final
EXPOSE 3000
WORKDIR /app
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

CMD ["npm", "start"]


# ENV PATH /app/node_modules/.bin:$PATH
#COPY package-lock.json ./
# RUN npm install react-scripts@3.4.1 -g --silent
# COPY . ./
# RUN npm run build
