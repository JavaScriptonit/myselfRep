## 22.02.2022 (10ый раздел) - Production Multi-container Deploy

1. ### Single Container Setup (FLOW):

    1.1. Push code to GitHub

    1.2. Travis automatically pulls repo

    1.3. Travis builds an image, tests code (RUN test command)

    1.4. Travis pushes code to AWS EB

    1.5. EB builds image, deploys it

2. ### Multi Container Setup (FLOW): - Benefit: no longer dependent upon EB

   1.1. Push code to GitHub

   1.2. Travis automatically pulls repo

   1.3. Travis builds a **TEST** image, tests code (RUN test command)

   1.4. Travis builds **PROD** images

   1.5. Travis pushes built **PROD** images to Docker Hub

   1.6. Travis pushes code to AWS EB

   1.7. EB pulls images from Docker Hub, deploys

3. ### Push code to GitHub:

   * [lecture/11437336](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11437336#announcements)

      git init

      git add .

      git commit -m "initial commit"

      —> GitHub —> + new repo —> repo name —> get the remote link and use on the next step

      git remote add origin «remote link from GetHub»

      git remote -v

      git push origin master

4. ### Travis FLOW:

   Specify docker as a dependency

   Build test version of React project

   Run tests

   Build prod versions of all projects

   Push all to Docker hub

   Tell Elastic Beanstalk to update