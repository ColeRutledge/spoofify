# Base

FROM node:12-alpine as base

# ENV NODE_ENV=production

# WORKDIR /app

# COPY . .
# COPY package*.json ./

# RUN npm ci && npm cache clean --force

# ENV PATH /app/node_modules/.bin:$PATH


# Development

# FROM base as production

# ENV NODE_ENV=production

# WORKDIR /app

# RUN npm install && npm run build

# CMD ["npm", "start"]


# Build

FROM base as build

# # Need to define the env vars for the React app
# # so that the build process will have access
# # to the values to use for production
# ENV REACT_APP_API_SERVER_BASE_URL=http://localhost:5000


WORKDIR /app

COPY . .

RUN npm run build


# # Production

FROM nginx:stable-alpine as prod

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



# FROM node:12-alpine as base

# ENV NODE_ENV=production

# WORKDIR /app

# COPY package*.json ./

# RUN npm ci && npm cache clean --force

# ENV PATH /app/node_modules/.bin:$PATH


# # Development

# FROM base as dev

# ENV NODE_ENV=development

# COPY . .

# WORKDIR /app

# RUN npm install --only=development

# CMD ["npm", "start"]
