[Kafka commands](https://medium.com/@TimvanBaarsen/apache-kafka-cli-commands-cheat-sheet-a6f06eac01b#e260)
[Quick Start for Confluent Platform](https://docs.confluent.io/platform/current/platform-quickstart.html#ce-docker-quickstart)
[all-in-one docker-compose file](https://github.com/confluentinc/cp-all-in-one/blob/6.1.1-post/cp-all-in-one/docker-compose.yml)


## [Run Apache Kafka using Docker](https://www.youtube.com/watch?v=8ZTTcAWMIAE)
* Broker terminal:
  * `docker exec -it a11dd510930a bash` - open Broker terminal by container ID
  * `docker exec -it --user root broker bash` - open Broker terminal as a root user 


* Install packages on Broker:
  * `yum install net-tools` - install tool from confluent repository
  * `netstat -na` - check all active sockets and ports
  * `ifconfig` - check container IP