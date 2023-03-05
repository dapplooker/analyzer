###################
# STAGE 1: builder
###################

#FROM metabase/ci:circleci-java-11-clj-1.10.3.929-07-27-2021-node-browsers as builder
#
#ARG MB_EDITION=oss
#
#WORKDIR /home/circleci
#
#COPY --chown=circleci . .
#RUN INTERACTIVE=false CI=true MB_EDITION=$MB_EDITION bin/build
FROM node:14 as builder

ARG MB_EDITION=oss

WORKDIR /home/node

RUN apt-get update && apt-get upgrade -y && apt-get install openjdk-11-jdk curl git -y \
    && curl -O https://download.clojure.org/install/linux-install-1.11.1.1208.sh \
    && chmod +x linux-install-1.11.1.1208.sh \
    && ./linux-install-1.11.1.1208.sh

COPY . .
RUN INTERACTIVE=false CI=true MB_EDITION=$MB_EDITION bin/build

# ###################
# # STAGE 2: runner
# ###################

## Remember that this runner image needs to be the same as bin/docker/Dockerfile with the exception that this one grabs the
## jar from the previous stage rather than the local build

#FROM --platform=linux/amd64 adoptopenjdk/openjdk11:alpine-jre as runner
FROM --platform=linux/amd64 adoptopenjdk/openjdk11:alpine-jre

ENV FC_LANG en-US LC_CTYPE en_US.UTF-8

# dependencies
RUN apk upgrade
RUN apk add --update-cache --no-cache bash ttf-dejavu fontconfig curl java-cacerts
RUN mkdir -p /app/certs
RUN curl https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem -o /app/certs/rds-combined-ca-bundle.pem
RUN /opt/java/openjdk/bin/keytool -noprompt -import -trustcacerts -alias aws-rds -file /app/certs/rds-combined-ca-bundle.pem -keystore /etc/ssl/certs/java/cacerts -keypass changeit -storepass changeit
RUN curl https://cacerts.digicert.com/DigiCertGlobalRootG2.crt.pem -o /app/certs/DigiCertGlobalRootG2.crt.pem
RUN /opt/java/openjdk/bin/keytool -noprompt -import -trustcacerts -alias azure-cert -file /app/certs/DigiCertGlobalRootG2.crt.pem -keystore /etc/ssl/certs/java/cacerts -keypass changeit -storepass changeit
RUN mkdir -p /plugins && chmod a+rwx /plugins

# add Metabase script and uberjar
COPY --from=builder /home/node/target/uberjar/metabase.jar /app/
COPY bin/docker/run_metabase.sh /app/

# expose our default runtime port
EXPOSE 3000

# run it
ENTRYPOINT ["/app/run_metabase.sh"]
