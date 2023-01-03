## 03.01.2023 (8ой раздел) - Build Automation & CI/CD with Jenkins

* [Jenkins Install](https://techworld-with-nana.teachable.com/courses/1108792/lectures/28664052)
  * Install Jenkins directly on OS (more effort)
  * Run Jenkins as a Docker container:
    * Create server (Jenkins-server)
    * Create firewall (Jenkins-firewall)
    * SSH Jenkins-server from terminal:
      * install Docker
      * install Jenkins: `docker run -p 8080:8080 -p 50000:50000 -d -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts `