## 08.01.2023 (8ой раздел) - Docker in Jenkins

* [Push to the private Docker Registry](https://techworld-with-nana.teachable.com/courses/1108792/lectures/28664051)
  * Install Docker on Jenkins Container (the same way as "npm"):
    * `docker run -p 8080:8080 -p 50000:50000 -d`
      * `-v jenkins_home:/var/jenkins_home`
      * `-v /var/run/docker.sock:/var/run/docker.sock`
      * `-v $(which docker):/usr/bin/docker jenkins/jenkins:lts`
  * Give permission in the Jenkins container to the Jenkins USER as a root user
    * `docker exec -u 0 -it "container_id" bash` - login as a root user
    * `chmod 666` - giver permission (666 - read and write)
  * Add credentials for DockerHub in Jenkins:
    * Jenkins -> Credentials -> System -> Global credentials
  * Manage Build adding login/build/push commands - [DockerHub Repo Link](https://hub.docker.com/repository/docker/javascriptonit/multi-client/general):
    * `docker build -t javascriptonit/multi-client:tagname .`
    * `docker login -u $USERNAME -p $PASSWORD`
    * `docker push javascriptonit/multi-client:tagname`


* Push to the Nexus Registry:
  * Add credentials for Nexus in Jenkins:
    * Jenkins -> Credentials -> System -> Global credentials
  * Manage Build adding login/build/push commands - Nexus Repositories:
      * `docker build -t 167.99.248.163:8083/java-maven-app:1.1 .`
      * `echo $PASSWORD | docker login -u $USERNAME --password-stdin 167.99.248.163:8083`
      * `docker push 167.99.248.163:8083/java-maven-app:1.1`