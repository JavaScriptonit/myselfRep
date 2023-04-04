### 10 тестов для проведения нагрузочного тестирования вашего Kafka broker в docker-compose с использованием JavaScript + фреймворка k6:

1. Тест на максимальную пропускную способность:
   Создать тестовый скрипт для отправки максимального количества сообщений на ваш Kafka broker за определенный период времени (например, 1 минуту). Замерить время ответа (latency) и количество успешно полученных сообщений.
2. Тест на отказоустойчивость:
   Остановить один из Kafka brokers в кластере и запустить тестовый скрипт на отправку сообщений. Замерить время ответа и количество успешно полученных сообщений. Повторить то же самое для каждого Kafka brocker в кластере.
3. Тест на стабильность:
   Запустить тестовый скрипт для отправки сообщений на ваш Kafka broker в течение определенного периода времени (например, 30 минут). Замерить время ответа и количество успешно отправленных сообщений в течение этого периода.
4. Тест на максимальный размер сообщения:
   Создать тестовый скрипт для отправки сообщений максимального размера на ваш Kafka broker. Замерить время ответа и количество успешно отправленных сообщений.
5. Тест на минимальный размер сообщения:
   Создать тестовый скрипт для отправки сообщений минимального размера на ваш Kafka broker. Замерить время ответа и количество успешно отправленных сообщений.
6. Тест на максимальное количество сообщений в минуту:
   Создать тестовый скрипт для отправки максимального количества сообщений на ваш Kafka broker в течение одной минуты. Замерить время ответа и количество успешно отправленных сообщений.
7. Тест на минимальное количество сообщений в минуту:
   Создать тестовый скрипт для отправки минимального количества сообщений на ваш Kafka broker в течение одной минуты. Замерить время ответа и количество успешно отправленных сообщений.
8. Тест на одновременную работу множества клиентов:
   Создать тестовый скрипт для отправки сообщений на ваш Kafka broker одновременно из многих клиентов в течение определенного времени (например, 10 минут). Замерить время ответа и количество успешно полученных сообщений.
9. Тест на максимальный размер буфера:
   Создать тестовый скрипт для отправки сообщений на ваш Kafka broker с максимальным размером буфера. Замерить время ответа и количество успешно полученных сообщений.
10. Тест на минимальный размер буфера:
    Создать тестовый скрипт для отправки сообщений на ваш Kafka broker с минимальным размером буфера. Замерить время ответа и количество успешно полученных сообщений.

Каждый тест можно запустить отдельно, а также комбинировать их для получения общей картины производительности и отказоустойчивости вашего Kafka broker в docker-compose с использованием JavaScript + ф