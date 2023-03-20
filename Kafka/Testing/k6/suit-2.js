// Для проверки производительности Kafka broker1 вы можете использовать k6 для создания нагрузочных тестов на чтение и запись сообщений в брокер. Для этого вам нужно будет создать тестовые скрипты на языке JavaScript, которые будут выполнены с использованием k6.

// Вот несколько примеров тестовых скриптов для Kafka broker1:

// 1. Тест чтения сообщений из топика:

import { kafka } from 'k6/x/kafka';

export default function () {
    let consumer = kafka.consumer({
        brokers: ['broker1:9092'],
        groupId: 'test-group',
    });

    consumer.subscribe('test-topic');

    let messages = consumer.poll(1000);

    if (messages.length > 0) {
        console.log(`Received ${messages.length} messages:`, messages);
    } else {
        console.log('No messages received');
    }

    consumer.close();
}


// 2. Тест записи сообщений в топик:

export default function () {
    let producer = kafka.producer({
        brokers: ['broker1:9092'],
    });

    producer.send({
        topic: 'test-topic',
        messages: [{ value: 'test message' }],
    });

    producer.close();
}


// Эти скрипты используют библиотеку k6/x/kafka для взаимодействия с Kafka. Они создают потребителя и отправляют запрос на чтение сообщений в топике "test-topic". После этого они записывают новое сообщение в этот же топик.

// Вы можете запустить эти скрипты с помощью команды:

// k6 run test.js


// где "test.js" - название файла с тестовым скриптом.

// Обратите внимание, что для запуска этих тестов вам дополнительно потребуются установленные библиотеки k6 и k6/x/kafka, а также указание корректных настроек, соответствующих вашей конфигурации брокера Kafka.