# Build:
# docker build -t richpanel/blogpost .
#
# Run:
# docker run -it --name blogpost-api -p 3000:8080 -e PORT='8080' -e API_KEY='<api_key>' richpanel/blogpost

FROM node:20.17.0-alpine

RUN apk add --update \
    alpine-sdk \
    libc6-compat

ADD https://github.com/Yelp/dumb-init/releases/download/v1.1.1/dumb-init_1.1.1_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

RUN addgroup -S blogpost \
   && adduser -S -g blogpost blogpost

WORKDIR /blogpost   

RUN chmod -R 775 /blogpost
RUN chown -R blogpost:blogpost /blogpost

USER blogpost

COPY --chown=blogpost:blogpost package.json ./

RUN npm install

COPY --chown=blogpost:blogpost . .

EXPOSE 3000

CMD ["dumb-init", "npm", "run", "start:docker"]
