## User Types:

[Permissions and Users](https://techworld-with-nana.teachable.com/courses/1108792/lectures/32584849)

1. `Super User` - root user with sudo commands
2. `User` - regular user
   * has own dedicated space - `/home/tom`
3. `Service User` - 
   * each service has its own user
   * mysql user starts mysql application
   * best for security


## Access control files:

* /etc/passwd
  * `cat /etc/passwd` - root:*:0:0:System Administrator:/var/root:/bin/sh
  * `sudo passwd tom` - change pass
* /etc/shadow
* /etc/group
  * `adduser tom` - add user tom
    * `sudo useradd -G devops nicole` - add new user with devops group
  * `sudo groupadd devops` - add a new group
  * `cat /etc/groups` - print list of groups
  * `sudo usermod -g devops tom` - change user's group
  * `sudo delgroup tom` - delete group
  * `sudo usermod -G admin,othergroup,devops tom` - add groups to 1 user
    * `sudo usermod -aG newgroup tom` - add another group + existing groups
    * `sudo gpasswd -d nicole devops` - remove nicole from devops group
  * `groups` - print user groups


* Login from terminal:
   * `su - tom` - login as another user


## Ownership & Permissions:
* `sudo chown anna:admin test.txt` - change user and group ownership of a file
  * `sudo chown anna test.txt` - change user ownership
  * `sudo chgrp devops test.txt` - change group ownership
