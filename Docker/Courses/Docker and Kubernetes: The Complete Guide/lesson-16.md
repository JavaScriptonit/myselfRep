## 03.08.2022 (16ый раздел) - Kubernetes Production Deployment

1. [The Deployment Process (PROD):](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11628194#overview)
   1. Create GitHub Repo
   2. [Tie repo to Travis CI](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11628202#overview)
   3. [Create Google Cloud project](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11628204#overview)
      1. Navigate to console.cloud.google.com
         1. List of projects or Start-up screen
      2. Create New project (name/location)
      3. Select New project
   4. [Enable billing for the project](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11628206#overview)
      1. Click Hamburger menu -> Billing
      2. Link a billing account
      3. Set account
   5. [Creating a cluster (Google Cloud project)](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11628212#overview)
      1. Click Hamburger menu -> Kubernetes Engine
      2. ENABLE button
      3. Click the bell icon in the top right part of the menu -> Enable services: container.googleapis.com
      4. Click Hamburger menu -> Kubernetes Engine -> Clusters -> CREATE
      5. Click the CONFIGURE button within the Standard cluster option
      6. Set the Name to multi-cluster
      7. Confirm the Zone location
      8. Click the CREATE button at the bottom of the form
   6. [Add deployment scripts to the repo:](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11628214#overview)
      1. Install Google Cloud SDK CLI
      2. Configure the SDK without Google Cloud auth info
         1. [CREATE SERVICE ACCOUNT:](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/25408376#overview)
            1. Hamburger menu > IAM & Admin > Service Accounts
            2. CREATE SERVICE ACCOUNT > Service account name to travis-deployer (step 1) > CREATE button (step 2)
            3. Select a role filter > scroll > Kubernetes Engine > Kubernetes Engine Admin > CONTINUE
            4. skip Grant users access > DONE
            5. Click the three dots > Manage Keys in the dropdown
            6. ADD KEY > Create new key > CREATE button (JSON)
            7. The JSON key file should now download to your computer (should be encrypted and upload to Travis CI)
      3. Login to Docker CLI
      4. Build the 'test' version of multi-client
         1. Running tests with Travis:
            1. add - echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin in travis.yml file
            2. add username and password in project (Environment variables) [travis project settings](travis-ci.org)
            3. DOCKER_USERNAME - travis login
            4. DOCKER_USERNAME - your password
      5. Run tests
         1. add script command in travis.yml file: 
         2. docker run -e CI=true javascriptonit/react-test npm test
      6. If tests are successful, run a script to deploy newest images
      7. Build all our images, tag each one, push each to Docker hub
      8. Apply all configs in the 'k8s' folder
      9. Imperatively set latest images on each deployment
   
2. Running Travis CLI in a container with Ruby pre-installed:
   1. Watch running Travis CLI flow in Docker/Courses/Docker and Kubernetes: The Complete Guide/travisCliContainer.md - [travisCliContainer.md](https://github.com/JavaScriptonit/myselfRep/blob/main/Docker/Courses/Docker%20and%20Kubernetes:%20The%20Complete%20Guide/travisCliContainer.md)
   2. 
