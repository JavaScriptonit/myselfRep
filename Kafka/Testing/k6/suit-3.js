import http from 'k6/http';
import { check } from 'k6';

// 1. Тестирование соединения с брокером:

export default function () {
    let res = http.get('http://broker1:9092/');

    check(res, {
        'is status 200': (r) => r.status === 200,
    });
}


// 2. Тестирование получения сообщений из топика:

export default function () {
    let config = {
        brokers: ['broker1:9092'],
        topic: 'test',
        groupId: 'test-group',
    };

    let consumer = kafka.consumer(config);

    consumer.subscribe(['test']);

    consumer.poll(10000, function (msg) {
        console.log(msg.value);
    });
}


// 3. Тестирование отправки сообщений в топик:

export default function () {
    let config = {
        brokers: ['broker1:9092'],
        topic: 'test',
    };

    let producer = kafka.producer(config);

    producer.send(['test']);

    producer.close();
}


// 4. Тестирование установки соединения с брокером:

export default function () {
    let res = http.get('http://broker1:9092/');

    check(res, {
        'is status 200': (r) => r.status === 200,
    });
}


// 5. Тестирование создания топика:

export default function () {
    let config = {
        brokers: ['broker1:9092'],
    };

    let admin = kafka.admin(config);

    admin.createTopic('test', 1, 1);

    admin.close();
}


// 6. Тестирование удаления топика:

export default function () {
    let config = {
        brokers: ['broker1:9092'],
    };

    let admin = kafka.admin(config);

    admin.deleteTopic('test');

    admin.close();
}


// 7. Тестирование изменения конфигурации брокера:

export default function () {
    let res = http.post(
        'http://broker1:9092/admin/config',
        '{"changes":{"max.connections":"100"}}'
    );

    check(res, {
        'is status 200': (r) => r.status === 200,
    });
}


// 8. Тестирование получения деталей топика:

export default function () {
    let config = {
        brokers: ['broker1:9092'],
    };

    let admin = kafka.admin(config);

    let topicDetails = admin.describeTopics(['test']);

    console.log(topicDetails);

    admin.close();
}


// 9. Тестирование обработки сообщений в топике:

export default function () {
    let config = {
        brokers: ['broker1:9092'],
        topic: 'test',
        groupId: 'test-group',
    };

    let consumer = kafka.consumer(config);

    consumer.subscribe(['test']);

    consumer.processMessages(10000, function (msg) {
        console.log(msg.value);
    });
}


// 10. Тестирование изменения конфигурации топика:

export default function () {
    let config = {
        brokers: ['broker1:9092'],
    };

    let admin = kafka.admin(config);

    admin.alterTopicConfigs('test', { 'segment.ms': '60000' });

    admin.close();
}