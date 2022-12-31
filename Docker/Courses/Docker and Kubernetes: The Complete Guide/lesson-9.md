## 11.02.2022 (9ый раздел) - «Dockerizing» Multiple Services

1. "scripts": {

     "start": "node index.js",

     **"dev": "nodemon"** // - we will get our application auto restart with nodemon tool

2. Compose(file): **postgres/redis/server**

3. Docker-compose.yml:

   volumes ( FOR NO REBUILDING THE CONTAINER if smith changes in code):

   **- /app/node_modules** - leave this folder as it is INSIDE THE CONTAINER
   
   **- ./server:/app** - look at the server directory and COPY everything inside there INTO /app folder of container