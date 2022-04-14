## 03.01.2022 (1ый раздел) - Dive into Docker!

1. **Docker** (easy and fast install and run new software)
2. **Redis** - in-memory data store // https://redis.io/topics/quickstart Redis (от англ. remote dictionary server) — резидентная система управления базами данных класса NoSQL с открытым исходным кодом, работающая со структурами данных типа «ключ — значение». Используется как для баз данных, так и для реализации кэшей, брокеров сообщений.
3. **Terminal** - 

****Installing Redis (4 commands without Docker)****
a) wget http://download.redis.io/redis-stable.tar.gz
b) tar xvzf redis-stable.tar.gz
c) cd redis-stable
d) make
****Or 1 command with Docker:****
a) docker run -it redis

4. **Docker Ecosystem** - Docker is a platform or ecosystem around creating and running software
a) Docker Client
b) Docker Server
c) Docker Machine
d) Docker Images
e) Docker Hub
f) Docker Compose - a tool that get installed with Docker (start up multiple containers at the same time, connecting all of them together)

5. **Container**
Image -> Container -> Container -> Container
A container is an instance of an image. Runs a program
Container is a program with its own isolated set of hardware resources (own space of memory, own space of network, own space of hard drive

6. **Image**
Image is single file containing all the dependencies and all the configuration required to run a program

7. **Docker Client (Docker CLI)**
Tool that we are going to issue commands to

8. **Docker Server (Docker Daemon)**
Tool that is responsible for creating images, running containers, etc (maintaining containers, uploading images)

9. **Installing Docker for MacOS**
https://hub.docker.com/ - javascriptonit - Docker ID, AnnaCherkas - password, shabunovaa@yandex.ru - email

Commands:
docker version - actual version of installed Docker
docker run hello-world - Status: Downloaded newer image for hello-world:latest
_Hello from Docker!
This message shows that your installation appears to be working correctly._

_To generate this message, Docker took the following steps:
1. The Docker client contacted the Docker daemon.
2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
   (amd64)
3. The Docker daemon created a new container from that image which runs the
   executable that produces the output you are currently reading.
4. The Docker daemon streamed that output to the Docker client, which sent it
   to your terminal._

    10. **Kernel** (ЯДРО) - is a running software process that governs (управляет) access between all the programs that are running on your computer and all the physical hardware that is connected to your computer as well
    11. **Namespacing** - Isolating resources per process or group of processes. We can namespace a process to restrict (ограничивать) the area of a hard drive that is available / or the network devices / or the ability to talk to another processes
    12. **Control Groups** (cgroups) - a control group can be used to limit the amount of resources that a particular process can use (to limit the amount of memory that a process can use, the amount of CPU, the amount of hard drive, the amount of network)
    13. **CPU** (ПРОЦЕССОР)
    14. **RAM** (Random-access memory) - is a form of computer memory that can be read and changed in any order, typically used to store working data and machine code
    15. **Relationship between Container and an image**: Container is a running process, along with a subset of physical resources on your computer, allocated to that process
    16. **Namespacing** and Control groups belongs to Linux. If Docker installed on Mac or Windows - you install Linux virtual machine (Linux Kernel)



