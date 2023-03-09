# https://github.com/conduktor/kafka-stack-docker-compose
#!/bin/bash
set -e

#!/bin/bash
f () {
    errcode=$? # save the exit code as the first thing done in the trap function
    echo "error $errorcode"
    echo "the command executing at the time of the error was"
    echo "$BASH_COMMAND"
    echo "on line ${BASH_LINENO[0]}"
    # do some error handling, cleanup, logging, notification
    # $BASH_COMMAND contains the command that was being executed at the time of the trap
    # ${BASH_LINENO[0]} contains the line number in the script of that command
    # exit the script or return to try again, etc.
    # creating stack...
    docker-compose -f docker-compose.yml down
    exit $errcode  # or use some other value or do return instead
}
trap f ERR

all_great(){
    # for testing
    echo "Verifying Process"
    running=`docker-compose -f docker-compose.yml ps | grep Up | wc -l`
    if [ "$running" != "$2" ]; then
        # for logging
        docker-compose -f docker-compose.yml ps
        # debug
        docker-compose -f docker-compose.yml logs
        exit 1
    fi
}

kafka_tests(){
    echo "Testing Kafka"
    topic="testtopic"
    if grep -q kafka3 docker-compose.yml; then replication_factor="3"; else replication_factor="1"; fi
    for i in 1 2 3 4 5; do echo "trying to create test topic" && kafka-topics --create --topic $topic --replication-factor $replication_factor --partitions 12 --zookeeper $DOCKER_HOST_IP:2181 && break || sleep 5; done
    sleep 5
    for x in {1..100}; do echo $x; done | kafka-console-producer --broker-list $DOCKER_HOST_IP:9092 --topic $topic
    sleep 5
    rows=`kafka-console-consumer --bootstrap-server $DOCKER_HOST_IP:9092 --topic $topic --from-beginning --timeout-ms 10000 | wc -l`
    # rows=`kafkacat -C -b $DOCKER_HOST_IP:9092 -t $topic -o beginning -e | wc -l `
    if [ "$rows" != "100" ]; then
        kafka-console-consumer --bootstrap-server $DOCKER_HOST_IP:9092 --topic test-topic --from-beginning --timeout-ms 10000 | wc -l
        exit 1
    else
        echo "Kafka Test Success"
    fi
}

# creating stack...
docker-compose -f docker-compose.yml up -d
sleep 10
# logging
docker-compose -f docker-compose.yml ps
# tests
all_great docker-compose.yml $2
kafka_tests docker-compose.yml
all_great docker-compose.yml $2
# teardown
docker-compose -f docker-compose.yml down
echo "Success!"