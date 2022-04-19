## Docker commands:

### DOCKER BUILD:

1. docker build . - запустить билд и создать image -> Successfully built e741da0d57bf

2. docker build **-t andreyshabunov/redis-server:latest .** - build new IMAGE without ID and adding the name to repository

3. docker build -f Dockerfile.dev . - (-f) means that we build concrete file

4. docker build -f Dockerfile.dev -t USERNAME:frontend . === with tagging the container

5. docker build **-f Dockerfile.dev -t andreyshabunov:frontend .**

### DOCKER RUN:

1. docker run **-it** redis - запуск image Redis с возможностью вводить команду внутри контейнера

2. docker run **-d** redis - запуск image Redis без возможности ввода команд, с возвратом id контейнера

3. docker run e741da0d57bf - запустить контейнер -> Ready to accept connections

4. docker run andreyshabunov/redis-server - run container out of the IMAGE without ID // may be used without «:latest», so it takes latest version automatically

5. docker run **-p** 8080:8080 andreyshabunov/simpleweb - «-p» any incoming traffic on our local network to port 8080 should be forwarded to port 8080 inside the container (PORT MAPPING)

6. docker run -p 5000:8080 andreyshabunov/simpleweb - incoming requests (http://localhost:5000/) route to port 8080 inside the container. CHANGE in shell and in index.js file

7. docker run hello-world - команда запускает image hello-world с текстом в ответе (prints logs and ALL the output to the terminal)

8. docker run <image name> command! (Default command override) / docker run busybox echo hi there - echo возвращает текст в ответе

9. docker run busybox ls - возвращает структуру папок данного image

10. docker run busybox ping google.com - запускает image с ежесекундным пингом гугла

11. docker run -it busybox **sh - Run new IMAGE with a SHELL.** Use it when you are not running any other process.

12. docker run -it -p 3000:3000 IMAGE_ID (If you are using Create React App v4)

13. docker run -p 3000:3000 **-v /app/node_modules -v $(pwd):/app** <image_id> === putting a bookmark on the node_modules folder and mapping the pwd into the ‘/app’ folder

14. docker run -it -p 3000:3000 -v /app/node_modules -v ~/frontend:/app USERNAME:frontend === not use a PWD variable

15. docker run **-p 3000:3000 -v /app/node_modules -v ~/frontend:/app andreyshabunov:frontend**

16. ### TESTS: 

    1. docker run -it andreyshabunov:frontend npm run test = Running Test Suits (**App.test.js**) inside the container - WITHOUT REFRESH
    
    2. docker exec -it 1d4ea85142f4 npm run test = open a shell with Running Test Suits which will be refreshed auto depending on (**App.test.js**) - REFRESH WITH A SHELL
    
    3. create in docker-compose.yml additional service **file** (  **tests**: ) with same **build** and **volumes** but new **command: ["npm", "run", "test"]** so we can see test runs in terminal - WITHOUT A SH

### DOCKER-COMPOSE:

1. docker-compose - list of docker compose commands (Define and run multi-container applications with Docker.)

2. docker-compose **up** === docker run image (with Docker compose)

3. docker-compose **up - -build** === docker build . + docker run myimage

4. docker-compose **up -d** === docker-compose up with terminal able to print commands

5. docker-compose **down** - shut down all working containers

### OTHER COMMANDS:

1. docker version - команда для уточнения версии докера

2. docker **ps** - list all the different running containers that are currently on your machine  (table with headers)

3. docker-compose ps - list all running containers in the CURRENT directory where is docker-compose.yaml file

4. docker **ps - -all**  - see history of all opened containers on your computer

5. **«Control C»** - close running image

6. **«Control D»** - close running container

7. docker - -help - list of commands

8. docker **kill <CONTAINER ID>** - Kill one or more running containers / docker kill 5754df594426

9. docker **stop <CONTAINER ID>** - shut down the container if it is possible within 10 sec or kill it after 10 sec / docker stop 5b2923561f85

10. docker start <CONTAINER ID> - part of docker run = docker start + docker create. DO NOT prints logs or output to the terminal

11. docker create - part of docker run = docker start + docker create. Output the ID of the container

12. docker **start -a** - prints the output to the terminal

13. docker **system prune** - cache, network, containers and image REMOVE from history + see total reclaimed space

14. docker logs <CONTAINER ID> - to get ALL output from container // docker create busybox hi there, docker start <CONTAINER ID>, docker logs <CONTAINER ID>

15. docker **exec -it** <CONTAINER ID> redis-cli (or another container command) - when «docker exec» we are able to start a second running program inside of our container. After this command we can «set myvalue» and «get myvalue» for example

16. docker exec <CONTAINER ID> redis-cli - without «-it» we don’t have ability to enter text. We just run the command and no input

17. docker exec -it <CONTAINER ID> sh - Open a SHELL in a running IMAGE. linux terminal # («cd /», «ls», «echo hi there», «export b=5», «echo $b»)

18. **code .** - open directory with VS editor

19. **command + Shift + .** (period) - to make the hidden files appear.


### INFO:

1. **«sh»** - a Program inside of container (command processor or a SHELL), allows to type commands in and have them be executed inside of that container