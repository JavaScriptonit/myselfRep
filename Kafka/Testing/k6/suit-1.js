import { Rate } from "k6/metrics";
import { check } from "k6";
import { kafka } from "k6/x/kafka";

export let options = {
  vus: 10,
  duration: "5m"
};

const topic = "my-topic";

// 1) Тест на отправку максимального количества сообщений за определенный период времени (например, 100 000 сообщений за 5 минут).

let message = Array(1000).fill("a").join("");

const sentRate = new Rate("sent messages");

export default function() {
  let result = kafka.send({
    topic: topic,
    message: {
      value: message
    }
  });

  sentRate.add(result.sent > 0);
  check(result, {
    "sent successfully": (r) => r.sent > 0
  });
}

// 2) Тест на отправку сообщений разных размеров (от маленьких до очень больших) и проверка времени доставки каждого сообщения.

let messageSizes = [10, 100, 1000, 10000, 100000];

const sendTime = new Trend("message send time");

export default function() {
  for (let size of messageSizes) {
    let message = Array(size).fill("a").join("");
    let start = new Date();
    let result = kafka.send({
      topic: topic,
      message: {
        value: message
      }
    });
    let end = new Date();
    let time = end - start;
    sendTime.add(time);

    check(result, {
      "sent successfully": (r) => r.sent > 0
    });
  }
}

// 3) Тест на отправку сообщений с разными типами ключей и проверка скорости обработки каждого сообщения по ключу.

let keys = ["key1", "key2", "key3"];

const processTime = new Trend("message process time");

export default function() {
  for (let key of keys) {
    let message = Array(1000).fill("a").join("");
    let start = new Date();
    let result = kafka.send({
      topic: topic,
      message: {
        value: message,
        key: key
      }
    });
    let end = new Date();
    let time = end - start;
    processTime.add(time);

    check(result, {
      "sent successfully": (r) => r.sent > 0
    });
  }
}

// 4) Тест на многопоточную отправку сообщений с разных потоков одновременно и проверка скорости обработки каждого сообщения.

export default function() {
  let messages = Array(100).fill(Array(100).fill("a").join(""));
  let results = [];

  for (let i = 0; i < 10; i++) {
    let res = kafka.sendBatch({
      topic: topic,
      messages: messages
    });
    results.push(res);
  }

  for (let res of results) {
    for (let r of res) {
      let start = new Date(r.time);
      let end = new Date(r.response.time);
      let time = end - start;
      processTime.add(time);

      check(r.response, {
        "sent successfully": (r) => r.sent > 0
      });
    }
  }
}