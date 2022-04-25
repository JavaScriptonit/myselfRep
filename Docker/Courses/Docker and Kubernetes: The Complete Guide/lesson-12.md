## 24.03.2022 (12ый раздел) - Kubernetes: Intro

Multi-client **IMAGE** running on our local **Kubernetes Cluster** running as a **container**

1. **Kubernetes** - is a system that runs many different containers over multiple different machines

2. **Why** use **Kubernetes**? If need to run many different containers with different images

3. **Master** in Kubernetes controls what each node does

4. **Nodes** runs one or several different containers on Physical Computer or Virtual Machine

5. **Load balancer** takes outside traffic from network requests

6. **Cluster** is a (Master + Nodes)

7. **EKS** - Amazon Elastic Container Service for Kubernetes

8. **GKE** - Google Cloud Kubernetes Engine

9. **Minikube** - program that sets Kubernetes and creates Kubernetes cluster LOCAL ONLY

10. **Minikube** creates Virtual Machine (Node) to run containers

11. **Kubectl** - program to manage containers in the node (tells machine or node what set of containers to run) LOCAL + PRODUCTION

12. **Minikube** - program to create and run Kubernetes cluster LOCAL ONLY

   ### Local Kubernetes Development

13. Install **Kubectl**

14. Install a VM driver (**virtualbox**)

15. Install **Minikube**

Using **minikube** we would visit: **192.168.99.101:31515**

Instead, when using Docker Desktop's Kubernetes, we would visit: **localhost:31515**

**Minikube** installation and setup https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11482926#overview

After installation and setup CREATE 2 CONFIG FILES: **client.pod.yaml** + **client.pod.port.yaml**

**Config file** used to create objects (types: StatefulSet/ReplicaController/Pod/Service)

Objects has different purposes: running a container/monitoring a container/setting up networking and etc

**Kubectl** is going to run this files

### Object types:

**PODS** just have pods (NO more Subtypes)

**Services** (Object type) has **ClusterIP**, **NodePort**, **LoadBalancer**, **Ingress** (4 Subtypes)

Deployment Types:

**Imperative** Deployments (Do exactly these steps to arrive at this container setup) / **Declarative** Deployments (Our container setup should look like this, make it happen)
