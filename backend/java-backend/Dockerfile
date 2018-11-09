# Use the maven docker image as base image

FROM maven:3.5-jdk-8-slim AS build
COPY . /src
WORKDIR /src
RUN mvn package

FROM saturnism/graal:1.0.0-rc2 AS graal
RUN apt-get update && apt-get -y install gcc zlib1g-dev
COPY --from=build /src/target/java-backend-1.0-SNAPSHOT.jar /app/server.jar
WORKDIR /app
RUN native-image \
    --no-server \
    -H:+ReportUnsupportedElementsAtRuntime \
    --static \
    -jar server.jar

FROM scratch
COPY --from=graal /app/server /app
ARG spark_name="docker_default"
ENV SPARK_NAME=$spark_name
EXPOSE 8080
CMD ["/app"]