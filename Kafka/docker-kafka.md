[Kafka commands](https://medium.com/@TimvanBaarsen/apache-kafka-cli-commands-cheat-sheet-a6f06eac01b#e260)
[Quick Start for Confluent Platform](https://docs.confluent.io/platform/current/platform-quickstart.html#ce-docker-quickstart)
[all-in-one docker-compose file](https://github.com/confluentinc/cp-all-in-one/blob/6.1.1-post/cp-all-in-one/docker-compose.yml)


## [Run Apache Kafka using Docker](https://www.youtube.com/watch?v=8ZTTcAWMIAE)
* Install packages on Broker:
  * `yum install net-tools` - install tool from confluent repository
  * `netstat -na` - check all active sockets and ports
  * `ifconfig` - check container IP


* Open Shell:
  * `docker exec -it a11dd510930a bash` - open Broker shell by container ID
  * `docker exec -it --user root kafka1 bash` - as a root user 
    * `docker exec -it --user root kafka2 bash`
    * `docker exec -it --user root kafka3 bash`
  * `./zookeeper-shell zoo3:2183` - connect to Zookeeper shell


* Docker commands:
  * `docker exec kafka1 kafka-topics --create --bootstrap-server kafka1:19092 --replication-factor 1 --partitions 1 --topic users4` - Created topic users4.
  * `docker exec kafka1 kafka-topics --list --bootstrap-server kafka1:19092` - list of topics
  * `docker exec --interactive --tty kafka1 kafka-console-consumer --bootstrap-server kafka1:19092 --topic users --from-beginning` - connect to a consumer


* Broker shell:
  * `./kafka-topics --list --bootstrap-server kafka1:19092` - list of topcis
  * `./kafka-console-producer --bootstrap-server kafka1:19092 --topic users` - connect to broker producer


* Zookeeper shell:
  * `cd bin` - path for executing commands
  * `ls /brokers/ids` - get IDs of active Brokers
  * `ls /brokers/topics` - list of topics
    * `[my-first-topic]` - Output
  * `get /brokers/topics/my-first-topic` - Show details of a specific topic