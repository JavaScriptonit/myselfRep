## 06.02.2022 (8ой раздел) - Building multi-container Application

### Create React App:

1. npx create-react-app client

2. Inside the newly created client directory, run

   rm -r .git

3. Documentation: 

   * [create-react-app](https://create-react-app.dev/docs/getting-started#npx)

   * [udemy.com/course/docker-and-kubernetes](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/16335298#announcements)
   
4. **complex** Project:

   * [complex Project](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11437270#announcements)
   
      download 3 folders: worker, server, client

5. Create **Dockerfile.dev** in every folder (worker/server/client)

6. Run commands in terminal in every directory: 

   **- docker build -f Dockerfile.dev .**
   
   **- docker run**