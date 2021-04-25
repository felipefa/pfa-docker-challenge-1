# PFA Docker - Challenge 1

Create a program, using your favorite programming language, that makes a simple list with the name of some of the Full Cycle course modules, querying them from a MySQL database. Generate an image of this container and publish it on Docker Hub.

Generate a nginx image that can receive http requests and foward them to the container.

Create a repository on GitHub with the source code for the program and images generated.

Create a README.md file specifying which commands needs to be executed to run the app receiving requests on the port 8080 of the host computer. Remembering NOT to use docker-compose on this challenge.

## How to Run

- First create a network in order to connect the containers:

  ```sh
  docker network create pfa_docker_1
  ```

- Run MySql:

  ```sh
  docker run --rm -dit -v "${PWD}"/mysql/dbdata:/var/lib/mysql \
             -e MYSQL_DATABASE=pfa_docker_1 \
             -e MYSQL_ROOT_PASSWORD=root \
             --name pfa-docker-1-mysql \
             --network pfa_docker_1 \
             mysql:5.7 --innodb-use-native-aio=0
  ```

- Run the node app:

  ```sh
  docker run --rm -dit --name pfa-docker-1-node \
             --network pfa_docker_1 \
             felipefa/pfa-docker-1-node
  ```

- Run nginx:

  ```sh
  docker run --rm -d --name pfa-docker-1-nginx \
             --network pfa_docker_1 \
             -p 8080:80 \
             felipefa/pfa-docker-1-nginx
  ```

## Result

Open http://localhost:8080 on your preferred browser and you should see a list with some of the Full Cycle course module names.

```JSON
[
  {
    "name": "Docker"
  },
  {
    "name": "Kubernetes"
  },
  {
    "name": "RabbitMQ"
  },
  {
    "name": "Apache Kafka"
  }
]
```

<small>
Pro tip: use the <a href="https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh" rel="noopener noreferrer" target="_blank">JSON Viewer</a> web browser extension to see formatted JSON data on the browser.
</small>
