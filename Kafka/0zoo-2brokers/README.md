## Описание docker-compose.yml файла

Этот docker-compose.yml файл описывает контейнер для развёртывания Apache Kafka с помощью образа bitnami/kafka.

## Параметры контейнера

### volumes

Объект volumes определяет именованный том 'broker1', который будет использоваться для хранения данных брокера.

### services

Объект services определяет контейнер 'broker1'.

#### broker1

Контейнер 'broker1' использует образ bitnami/kafka:latest.

##### environment

Этот объект определяет переменные окружения для контейнера.

* KAFKA_ENABLE_KRAFT - Включение режима Kraft
* KAFKA_CFG_PROCESS_ROLES - Перечень ролей брокеров (brokers) и контроллера (controller).
* KAFKA_CFG_CONTROLLER_LISTENER_NAMES - Название контроллера
* KAFKA_CFG_LISTENERS - Настройка протоколов и адресов слушателей
* KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP - Соответствие протоколов для слушателей
* KAFKA_CFG_ADVERTISED_LISTENERS - Сетевой адрес брокера
* KAFKA_CFG_BROKER_ID - Уникальный идентификатор брокера
* KAFKA_CFG_CONTROLLER_QUORUM_VOTERS - Расположение контролёра
* ALLOW_PLAINTEXT_LISTENER - Разрешение протокола PLAINTEXT
* KAFKA_KRAFT_CLUSTER_ID - Уникальный идентификатор кластера Kafka

##### volumes

Этот объект определяет общий том 'broker1', который будет использован для хранения данных брокера внутри контейнера.
