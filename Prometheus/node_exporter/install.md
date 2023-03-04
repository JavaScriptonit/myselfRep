## node_exporter install:

[Node-exporter installation - #Prometheus 05](https://www.youtube.com/watch?v=b80tDM16Jjc&t=1s)

[prometheus/node_exporter/releases](https://github.com/prometheus/node_exporter/releases)

[collect-prometheus-metrics](https://grafana.com/blog/2022/05/10/how-to-collect-prometheus-metrics-with-the-opentelemetry-collector-and-grafana/)


1. `ifconfig` - get ip
   * `inet` - inet 127.0.0.1 netmask 0xff000000

2. `brew install node_exporter` - brew install node_exporter
   * `node_exporter_brew_services` and uses the flags in: /usr/local/etc/node_exporter.args
   * `brew services start node_exporter` - **To start node_exporter now and restart at login**
   * [127.0.0.1:9100/metrics](http://127.0.0.1:9100/metrics)

3. `brew install prometheus` - brew install prometheus
   * `prometheus_brew_services` and uses the flags in: /usr/local/etc/prometheus.args
   * `brew services start prometheus` - **To start prometheus now and restart at login**
   * [127.0.0.1:9090/targets](http://127.0.0.1:9090/targets)

4. `ps` - check node_exporter running
5. `vim prometheus.yml` - configure Prometheus instance
   ```
     global:
        scrape_interval: 15s
        
     scrape_configs:
     - job_name: node
      static_configs:
      - targets: ['localhost:9100']
   ```
   from
   ```
     global:
        scrape_interval: 15s
        
     scrape_configs:
     - job_name: "prometheus"
      static_configs:
      - targets: ["localhost:9090"]
   ```
   
6. Explore metrics from a running Node Exporter instance:
   * [127.0.0.1:9090/graph](http://127.0.0.1:9090/graph)
   * `rate(node_cpu_seconds_total{mode="system"}[1m])` - The average amount of CPU time spent in system mode, per second, over the last minute (in seconds)
   * `node_filesystem_avail_bytes` - The filesystem space available to non-root users (in bytes)
   * `rate(node_network_receive_bytes_total[1m])` - The average network traffic received, per second, over the last minute (in bytes)

7. Install Grafana Agent (stores the data)
   * [javascriptonit.grafana.net](https://javascriptonit.grafana.net/a/grafana-easystart-app/hmInstancePromId)
   * `curl -O -L "https://github.com/grafana/agent/releases/latest/download/grafana-agent-darwin-amd64.zip"` - download grafana agent
   * `unzip "grafana-agent-darwin-amd64.zip"`
   * `chmod a+x grafana-agent-darwin-amd64`
   * Install grafana-agent-darwin-amd64
   * `cat << EOF > ./agent-config.yaml` - create agent-config.yaml
   
   ```
   cat << EOF > ./agent-config.yaml
   metrics:
   global:
   scrape_interval: 60s
   configs:
   - name: hosted-prometheus
     scrape_configs:
      - job_name: node
        static_configs:
         - targets: ['localhost:9100', '127.0.0.1:9100']
           remote_write:
      - url: https://prometheus-us-central1.grafana.net/api/prom/push
        basic_auth:
        username: 793996
        password: eyJrIjoiYjQ4MTdiNmY2M2IzZmViYjM1YzgxYjdiMDk2NTFmMDU4Y2MzNWY4OSIsIm4iOiJncmFmYW5hLWFwaS1rZXkiLCJpZCI6ODAzNDEyfQ==EOF
   ```
   
   * `./grafana-agent-darwin-amd64 --config.file=agent-config.yaml` - Run the agent


## Architecture
[prometheus.io/docs/introduction/overview/](https://prometheus.io/docs/introduction/overview/)