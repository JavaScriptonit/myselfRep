## 13.07.2022 (15ый раздел) - Handling Traffic with Ingress Controllers

1. Load Balancer Services:
   1. Services:
      1. **ClusterIP**:
         1. Exposes a set of pods to other objects in the cluster
      2. **NodePort**:
         1. Exposes a set of pods to the outside world (only good for dev purposes!!!)
      3. **LoadBalancer**:
         1. Legacy way of getting Network traffic into a cluster
      4. **Ingress**:
         1. Exposes a set of services to the outside world
2. Use ingress-nginx:
   1. we are using **ingress-nginx**, a community led project:
      1. github.com/kubernetes/ingress-nginx
   2. we are not using kubernetes-ingress, a project led by the company nginx:
      1. github.com/nginxinc/kubernetes-ingress
3. Setup of ingress-nginx changes depending on your environment:
   1. local
   2. GC
   3. AWS
   4. Azure
4. Node using Nginx Ingress:
   1. **Traffic**:
      1. **Ingress Controller + thing that routes traffic**
         1. **Service**
         2. **Service**
   2. **Ingress config**:
      1. Ingress Controller + thing that routes traffic
         1. Service
         2. Service
5. [Google Cloud Load Balancing](https://cloud.google.com/load-balancing)
   1. [Documentation](https://cloud.google.com/load-balancing#section-5)
      1. Load Balancer Service:
         1. nginx/controller/nginx pod
      2. ClusterIP Service
         1. default-backend pod
   2. [Studying the Kubernetes Ingress system](https://www.joyfulbikeshedding.com/blog/2018-03-26-studying-the-kubernetes-ingress-system.html)