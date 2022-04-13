FROM node:16.13.1-alpine3.14
# ENV NODE_ENV production
# creating user app making it sudoer
RUN addgroup nodeapp && adduser -S -G nodeapp nodeapp
# to pass permission issues with COPY cmd, creating & chown node modules with it's package-lock json
RUN mkdir -p /app/node_modules && chown nodeapp /app/node_modules 
# RUN touch /app/package-lock.json && chown app /app/package-lock.json 
RUN touch /app/yarn-error.log && chown nodeapp /app/yarn-error.log 
RUN touch /app/yarn.lock && chown nodeapp /app/yarn.lock 

USER nodeapp
# create app dir
# RUN chown app /-app
# RUN mkdir -p /usr/src/app
# change context into app directory
WORKDIR /app

# copy files into container under node user
# COPY --chown=app:app . .
COPY /server/package*.json .
RUN chown -R nodeapp /app/node_modules


# install depedencies depending on environment ENV
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development"]; \
        then yarn; \
        else yarn --production=true; \
        fi

# RUN npm ci --only=production
COPY . .

ENV PORT 3000

# setting local host port
EXPOSE $PORT
# CMD yarn start
# initialize app
WORKDIR /app/server
CMD [ "yarn", "start" ]
