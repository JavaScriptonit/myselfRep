## 31.01.2022 (6ой раздел) - Production-Grade Workflow

### Development Workflow:

1. Hosting service: DigitalOcean or Amazon Web Service(**AWS**) - DigitalOcean is a simple cloud service provider while Amazon Web Service(AWS) is a platform that offers flexible, reliable, scalable, easy-to-use, and cost-effective cloud computing solutions.

2. Development -> Testing -> Deployment and again (-> Development -> Testing -> Deployment -> …)

3. Development:

   1. Creating a **GitHub repository**: two different branches ( feature / master)
   
   Master branch deploy to hosting provider
   
   Master —> **Travis CI** (Travis CI is a hosted continuous integration service) - Tests run
   
   Travis CI —> AWS Hosting
   
   2. Deploy to outside Hosting service

4. node -v = version of Node locally

5. '/Users/andreyshabunov/Devops Projects/frontend' - directory new project

6. npx create-react-app (my-app) - install new project

7. Then open

    http://localhost:3000/

    to see your app.

8. **npm run start** -  starts a development server. For development use only

9. **npm run build** - builds a production version of the application. Creates a new directory «build» with new folders and files

10. **npm run test** - run tests associated with the project


### Docker Volumes (6ой раздел 73 video):

1. Docker feature Volumes = set up a placeholder of sorts inside of our docker container, no longer copying the entire /SRC and /PUBLIC directories

2. Docker Volume put a reference inside container

3. Same as PORT MAPPING we set up a folder inside a container to a folder outside the container

4. docker run -p 3000:3000 **-v /app/node_modules -v $(pwd):/app** <image_id> === putting a bookmark on the node_modules folder and mapping the pwd into the ‘/app’ folder


### Running tests inside Container:

1. docker run -it andreyshabunov:frontend npm run test = Running Test Suits (**App.test.js**) inside the container - WITHOUT REFRESH

2. docker exec -it 1d4ea85142f4 npm run test = open a shell with Running Test Suits which will be refreshed auto depending on (**App.test.js**) - REFRESH WITH A SHELL

3. create in docker-compose.yml additional service **file** (  **tests:** ) with same **build** and **volumes** but new **command**: **["npm", "run", "test"]** so we can see test runs in terminal - WITHOUT A SH


### Building a production version of the application (npm run build):

1. Making a single file and folder out of all JS files

2. **nginx** - Popular Web server. Taking incoming traffic and routing it (responding it) with static files. Example index.html / main.js

3. Paste another FROM in Dockerfile —> **FROM nginx**

    COPY --from=builder /app/build usr/share/nginx/html

4. 1st line —> **FROM node:alpine as builder**

5. Second container starts with installing NGINX and COPYING all files from /usr/frontend/build folder and creating a PRODUCTION server NGINX with NPM installed