## BaselHack Deployment Workshop

---

## Agenda

- Dependencies
- Now
- Docker
- ElephantSQL
- Appendum: Now 2.0

---

## Dependencies

NVM & Node
```bash
url -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
nvm install node
```

----

#### Now

```bash
npm i -g now
```

----

#### Docker

- https://store.docker.com/editions/community/docker-ce-desktop-mac
- https://store.docker.com/editions/community/docker-ce-desktop-windows

----

### Git Repository

```bash
git clone https://github.com/letsboot/deployaton.git
```

---

## Now

----

### Simple Deployment

- `cd now-simple`
- `now`

----

### Node Deployment - Preparation

- `cd ../backend/node_backend`
- `npm install`
- `node start src/index.js`

----

### Node Deployment - Project Setup

package.json

```json
{
    ...
    "scripts": {
        // optionally "build" or "now-build"
        // "start" or "now-start"
        "start": "node ./src/index.js"
    }
	...
}
```

----

### Node Deployment - Deployment

- `now`
- `now alias https://[url].now.sh [custom-subdomain]`
- https://[custom-subdomain].now.sh

----

### Frontend

-  `cd ../../frontend`
- `npm install`
- `npm run start` 
- `now`

---

## Java - Backend: Docker

- `cd ../backend/java-backend`

----

### Dockerfile - Basics

```dockerfile
FROM [image] [as [step-name]]

# File Utils
WORKDIR [dir]
COPY [src] [dest]
ADD [from] [to]

# Run Commands
RUN [cmd]
CMD [cmd]

# Various
ARG somearg="default_value"
ENV ENV_VAR=$somearg
EXPOSE 8080
```



----

### Dockerfile - Build App

```dockerfile
FROM maven:3.5-jdk-8-slim AS build
COPY . /src
WORKDIR /src
RUN mvn package
```

----

### Dockerfile - Build App Binaries

```dockerfile
FROM saturnism/graal:1.0.0-rc2 AS graal
RUN apt-get update && apt-get -y install gcc zlib1g-dev
COPY --from=build /src/target/java-backend-1.0-SNAPSHOT.jar /app/server.jar
WORKDIR /app
RUN native-image \
    --no-server \
    -H:+ReportUnsupportedElementsAtRuntime \
    --static \
    -jar server.jar
```

----

### Dockerfile - Build Docker Image

```dockerfile
FROM scratch
COPY --from=graal /app/server /app
ARG spark_name="docker_default"
ENV SPARK_NAME=$spark_name
EXPOSE 8080
CMD ["/app"]
```

----

### Docker Build

- `docker build . -t java-backend`

----

### Docker Run

- `docker run -d -p 8080:8080 java-backend `

### Environment Variables & Arguments

- `now -e SPARK_NAME=express` (will be provided in context of running docker as well)

- `docker build --build-arg sample_name=express . -t java-backend`

----

### Misc Docker Commands

- `docker ps`
- `docker kill [name]`