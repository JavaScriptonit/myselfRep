## 13.01.2022 Docker and Kubernetes (3ий раздел) - Creating Docker Images

1. **Dockerfile** - configuration to define how our container should behave

2. Create a text file (**Dockerfile**) with configuration to pass it into **Docker Client** (Docker-cli). The Docker Client will provide the file to the **Docker Server**. Which is building a usable **IMAGE** out of text file lines then it can be used to start up a new container

3. create **Dockerfile** (without .js / .sh)

4. **FROM** - is used to specify the image that we want to use as a base

5. **RUN** - is used to execute some commands while we are preparing our custom image

6. **CMD** - specifies what should be executed when our image is used to start a new container

7. **COPY ./ ./**  - copy instruction. Tells which files to copy from local file system to our container

8. **WORKDIR /usr/app** - any following command with be executed to this path in the container

9. **alpine** - base Image (has a set of programs inside of it that are very useful for running and installing Redis), node:alpine - base alpine with NPM preinstalled

10. **apk** - Apache Package, package manager

11. **Snapshot** - образ системы (настройки, конфигурация, программы, память и тд)

12. Перечень шагов в Dockerfile - это работа с image из предыдущего шага и создание нового контейнера из него и передача команды из шага в него или изменение в нём файловой системы. Далее мы берём образ системы и сохраняем его для работы с ним в новом шаге в цепи. Image из последнего шага - это и есть финальный Image, который нам нужен.

13. **Order of operations** in Dockerfile: if changed - run through the installation process all over again, if not changed - we use cache versions for building the IMAGE.

14. Time for rebuilding the IMAGE: if order is changed - takes more time for each step changed in the order

15. **Tagging the IMAGE** === Docker ID + Repo/project name + Version, technically just the version on the end is the TAG

16. **«-it»** === -i -t, «-i» means that when we execute a new command inside the container we want to attach our terminal to STDIN channel of the new running process (redis-cli)

17. **«-t»** - gives us nicely formatted code (answer) / works either docker exec -i <CONTAINER ID> redis-cli 

### Example of a Dockerfile:

Use an existing docker image as a base

FROM alpine // FROM - Instruction telling Docker Server what to do // alpine - Argument to the instruction

* Download and install a dependency

RUN apk add --update redis // RUN - Instruction telling Docker Server what to do // apk add --update redis - Argument to the instruction  

* Tell the image what to do when it starts

* as a container

CMD ["redis-server"] // CMD - Instruction telling Docker Server what to do // ["redis-server"] - Argument to the instruction

### When we use "FROM alpine":

#### for the first time:

Step 1/3 : FROM alpine

latest: Pulling from library/alpine

59bf1c3509f3: Pull complete 

Digest: sha256:21a3deaa0d32a8057914f36584b5288d2e5ecc984380bc0118285c70fa8c9300

Status: Downloaded newer image for alpine:latest

---> c059bfaa849c

#### not first time (if don’t need pull from library):

Step 1/3 : FROM alpine

---> c059bfaa849c