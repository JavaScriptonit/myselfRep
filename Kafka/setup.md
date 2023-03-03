## Термины:
* Broker - Kafka broker / kafka server / kafka node
  * Kafka Cluster - brokers
  * 1 broker - Controller
* Zookeeper - база данных
* Message / Record
  * key
  * value
  * timestamp
  * headers
* Topic и Partition
  * topic (FIFO) - очередь сообщений
  * partition (FIFO) - в 1 топике несколько партиций при high load 
    * (задаётся параметром)
    * (распределяется по брокерам)
    * (конфигурация) - можно балансировать размещение партиций топика
* Producer - высокопроизводительный отправитель сообщений
* Consumer - потребитель сообщений
* Log файлы - хранение данных топика
  * broker file system - пакпки под каждую партицию (Топик A, A-0/A-1/A-2)
  * Сегемент состоит из 3 файлов до 1гб, далее создаётся новый сегмент +3 файла:
    * .log - по позиции читаем сообщение
    * .index - по offset получаем позицию
    * .timeindex - по timestamp получаем offset


# [Set up a Kafka broker](https://developer.confluent.io/quickstart/kafka-docker/#1-set-up-a-kafka-broker)
### [Install a Kafka Connector and Generate Sample Data](https://docs.confluent.io/5.5.4/quickstart/cos-docker-quickstart.html)

* `brew install --cask docker - install docker` - install Docker GUI
* `touch docker-compose.yml` - create yml
* `vim docker-compose.yml ` - insert file:
```
version: '3'
services:
    zookeeper:
        image: confluentinc/cp-zookeeper:7.3.0
        container_name: zookeeper
        environment:
            ZOOKEEPER_CLIENT_PORT: 2181
            ZOOKEEPER_TICK_TIME: 2000

    broker:
        image: confluentinc/cp-kafka:7.3.0
        container_name: broker
        ports:
            - "9092:9092"
        depends_on:
            - zookeeper
        environment:
            KAFKA_BROKER_ID: 1
            KAFKA_ZOOKEEPER_CONNECT: 'zookeeper:2181'
            KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_INTERNAL:PLAINTEXT
            KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092,PLAINTEXT_INTERNAL://broker:29092
            KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
            KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
            KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
```

* `docker-compose up -d` - start the Kafka broker:
  * create **Network aashabunov_default**
  * start **Container zookeeper**
  * start **Container broker**


* `docker-compose exec broker kafka-topics --create --bootstrap-server
localhost:9092 --replication-factor 1 --partitions 1 --topic users` - 
create new topic "users"


* `docker exec --interactive --tty broker kafka-console-producer 
--bootstrap-server broker:9092 --topic users` - 
write messages to the topic


* `docker exec --interactive --tty broker kafka-console-consumer 
--bootstrap-server broker:9092 --topic users --from-beginning` -
read messages from the topic


## Kafka Operations:
* **Удаление данных** - segment timestamp expired -> to delete
  * удаляются целиком сегменты партиций (не отдельные сообщения)


* **Создание реплик партиций**
  * `KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR` - set replication_factor (>1)


* Назначение Leader-реплики - через Kafka controller
  * Чтение и запись только через Leader-реплику
    * produce -> Leader -> consume


### Отправка сообщений:
* `Producer send message`:
  * acks - гарантия доставки:
    * 0 - без подтверждения отправки сообщений
    * 1 - нужно подтверждение от Leader-реплики
    * -1 (all) - нужно подтверждение от Leader-реплики + от всех ISR-реплик
* `fetch metadata` - загрузка метаданных продюсером
  * get cluster state
  * get topic placement
* `serialize message` - указываем у продюсера:
  * `key.serializer`
  * `value.serializer`
* `define patrition` - выбор партиции для отправки сообщения
  * Options:
    * `explicit partition`
    * `round-robin`
    * `key-defined` (key_hash % n)
* `compress message` - сжатие сообщения
  * compression.codec - используется для компрессии
* `accumulate batch` - 
  * batch.size - настройка размера batch (16кб)
  * linger.ms - настройка тайм-аута отправки 


### Получение сообщений:
* `Consumer poll message`:
* `fetch metadata` - загрузка метаданных потребителем
  * get cluster state
  * get topic placement


* Kafka Consumer:
  * Consumer group:
    * Consumer 1 <<group.id>> - poll messages (0)
    * Consumer 2 <<group.id>> - poll messages (1)
    * Consumer 3 <<group.id>> - poll messages (2)
    * Consumer 4 <<group.id>> - poll messages (3)


#### Kafka consumer Offset - (last consumed message by Group)
* Offset topic - информация о переданных сообщениях брокером до Consumer'а
  * в Offset topic данные хранятся в field/value (Partition=A/0/Group=X/Offset=2)
* Если 1 Consumer упал, 2ой Consumer берёт информацию из Offset topic по последнему переданному сообщению
  * После этого запрашивает новые сообщения из партиции topic A
* Offsets можно хранить в собственной БД, а не использовать системный customer topic offsets
* `offsets.retention.minutes` - 7 days
* `__customer_offsets` - offsets deleted from
* `auto.offset.reset` - after group activation
  * `earliest`
  * `latest`
