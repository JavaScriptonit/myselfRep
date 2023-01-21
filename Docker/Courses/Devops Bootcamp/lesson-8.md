## 03.01.2023 (8ой раздел) - Build Automation & CI/CD with Jenkins

* [Jenkins Install](https://techworld-with-nana.teachable.com/courses/1108792/lectures/28664052)
  * Install Jenkins directly on OS (more effort)
  * Run Jenkins as a Docker container:
    * Create server (Jenkins-server)
    * Create firewall (Jenkins-firewall)
    * SSH Jenkins-server from terminal:
      * `$ chmod 400 ~/Downloads/jenkins-server-key.pem ` - to get permission
      * `$ ssh -i ~/Downloads/jenkins-server-key.pem ubuntu@ec2-3-95-183-114.compute-1.amazonaws.com` - SSH server
      * `$ sudo apt-get update` - always update on fresh servers
      * `$ sudo apt  install docker.io` - install Docker
      * `$ sudo usermod -aG docker $USER` - [Add your user to the docker group](https://docs.docker.com/engine/install/linux-postinstall/)
      * `$ docker run -p 8080:8080 -p 50000:50000 -d -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts` - install Jenkins


* Jenkins initialize (2 ways to get the password):
* 1st way:
  * `docker ps` - to take docker container ID
  * `docker exec -it c417ef8192c4 bash` - enter to a docker container
  * `cat /var/jenkins_home/secrets/initialAdminPassword` - get password from Docker container using path from Jenkins server Login page
    * `625ba8a9181e4af0a78224585fbb16df` - output
* 2nd way:
  * `docker volume inspect jenkins_home` - to get from the volume on the server
    * `/var/lib/docker/volumes/jenkins_home/_data`
  * `sudo ls /var/lib/docker/volumes/jenkins_home/_data/secrets/initialAdminPassword` - to get password file path
  * `sudo cat /var/lib/docker/volumes/jenkins_home/_data/secrets/initialAdminPassword` - to see the password
    * `625ba8a9181e4af0a78224585fbb16df` - output


* Configure Jenkins:
  * `docker exec -u 0 -it c417ef8192c4 bash` - enter container as a root user
  * `apt update` - update packages
  * `apt install curl` - install curl
  * `curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh` - to get "nodesource" script
    * [how-to-install-node-js-on-ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04)
  * `ls` - check file "nodesource_setup.sh"
  * `bash nodesource_setup.sh` - run script
  * `apt install nodejs` - install nodejs
  * `node -v` - check node version
  * `npm -v` - check npm version


* Create Jenkins Jobs:
* Types of jobs:
  * Freestyle project
    * `my-job` - name
    * `Execute shell` - add build step to allow executing shell commands
      * `npm --version` - add shell commands
  * Pipeline
  * Multi-configuration project
  * Folder
  * GitHub Organization
  * Multibranch Pipeline


* Run Jenkins jobs:
  * Jenkins -> my-job -> Build now -> Build history -> Console output:
    * Shows All steps from the job
    * To add new steps with new packages SHOULD first install plugins and configure them or directly install packages on Jenkins server to use commands in console:
      * Nodejs/npm/nvm/maven
    * **To configure steps - enter "Build" window in the Job**


* Configure Git Repository:
  * **To configure GIT - enter "Source Code Management" window in the Job**
  * Enter Repo URL
  * Enter/Create Credentials
  * Enter Branch Name


After configuring and Running Job Jenkins will:
* Clone Repo
  * `git init`
  * `git fetch`
  * `git config`
  * `git checkout`
  * `git commit` - update Jenkins file
* Use SHELL commands
* To Check FILES on Jenkins Server - SH server, enter container and `$ ls` "jobs" folder
  * Builds/Jobs/Logs


* Run .sh file in Git Repo:
  * Set Branch Name in "Source Code Management"
  * Enter SHELL command in "Build" window:
    * `$ chmod +x freestyle-build.sh` - give execute permission to the file to Jenkins user
    * `$ ./freestyle-build.sh`


* Create Jenkins file:
  * [Example from java-maven-app](https://gitlab.com/JavaScriptonit/java-maven-app)
  * Create different type of Jobs - [Difference](https://techworld-with-nana.teachable.com/courses/1108792/lectures/28665214):
    * Freestyle job (Relying on plugins)
    * Pipeline job
  * `139.59.140.177:8080/env-vars.html` - list of all env variables


* Create script.groovy file:
  * When have a lot of logic in Jenkins file just use groovy functions (Easy to read)
  * `/myselfRep/Docker/Courses/Devops Bootcamp/Jenkins/script.groovy`


* Create multi-branch Pipeline:
  * `my-multi-branch-pipeline` - name of Pipeline, example
  * `multibranch Pipeline` - Pipeline type
  * Nice overview of which branches are built after Running the Pipeline
  * Add "if"/"when expression" to Jenkinsfile to run build/deploy stages only for master branch
    * [Link - Intro to Multibranch Pipeline](https://techworld-with-nana.teachable.com/courses/1108792/lectures/28665217)