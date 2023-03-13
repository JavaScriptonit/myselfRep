## Types of Network:
* Bridge
  * containers connect to each other within Bridge network
  * can't connect to another Bridge network
* Host
  * containers don't have ip address 
  * connect to another container by port
* None
  * do not connect to a Network
    * `network_mode: none` - in docker-compose file for each server
* Overlay
  * Docker host connects to another Docker hosts
* Macvlan
  * every container has own Mac address
  * outside LAN connects to containers by MAC address of a container



Docker Network commands:
* `docker network ls` - list of Networks
* `docker network inspect 0zoo-2brokers_default` - check network contains
  * `_default` - auto creates with docker-compose command
* `docker network rm 0zoo-2brokers_default` - delete network
* `docker inpect <container id>` - check container ip and network