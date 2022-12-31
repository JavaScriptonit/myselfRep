## 20.01.2022 (5ый раздел) - Multiple local containers

1. **Docker Compose** - a tool that get installed with Docker (start up multiple containers at the same time, connecting all of them together)

2. Docker Compose separate Docker CLI that gets installed with Docker

   Used to start multiple Docker containers at the same time

   Automates some of the long-winded arguments to «docker run»

3. **Docker-compose.yml**
   * Here are some containers I want to create:
   
   * redis-server - make it using the ‘redis’ image
   
   * node-app - make it using Dockerfile in the current directory 

   * - map port 8081 to 8081

4. Docker-compose.yml contains different types of containers

5. **docker-compose up** === docker run image (with Docker compose)

6. docker-compose up - **-build** === docker build . + docker run myimage

7. **docker-compose up -d** === docker-compose up with terminal able to print commands

8. **docker-compose down** - shut down all working containers

9. **Restart Policies** in docker-compose.yml:

    * restart: on-failure - only restarts the container if an error code

    * restart: ‘no’ - never attempts to restart container if it’s stops or crashes

    * restart: always - always restarts the container if its stops any reason

    * restart: unless-stopped - always restarts the container if its stops any reason unless developer stop it

    * adds a param to restart the container if it’s stopped or closed


docker-compose.yml :

1. build:

   context: . 

   dockerfile: Dockerfile.dev

2. ports: 

   - "3000:3000"

3. volumes: 

   - /app/node_modules
   
   - .:/app