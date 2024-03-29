## KUBECTL COMMANDS:

1. `kubectl apply -f <filename>` - change the current configuration of our cluster (CLI/change/specify file/path) === **CREATE/START/UPDATE** (Declarative)

   `kubectl apply -f client-node-port.yaml --validate=false`

2. `kubectl get pods` - print the status of entire group of object types

   `kubectl get service` - list of services

   `kubectl get deployments` - list of deployments with number of pods

   `kubectl get storageclass` - options on PC that kubernetes has for creating PV

   `kubectl get pv` - list of volumes

   `kubectl get pvc` - list of claims

   `kubectl get namespaces` - list of namespaces

3. `minikube ip` === print ip

4. `kubectl delete` pod client-pod - deleting pods/services === **DELETE**

   `kubectl delete service client-node-port`

   `kubectl delete deployment client-deployment`

5. `curl http://192.168.49.2:31515/` - curl: (7) Failed to connect to 192.168.49.2 port 31515: Connection refused

6. `kubectl get svc -n namespace` - No resources found in namespace.

7. `kubectl get svc` - Check external IP === client-node-port NodePort 10.101.125.42 <none> 3050:31515/TCP  19m

8. `minikube service list` - NAMESPACE  | NAME  | TARGET PORT | URL

9. `kubectl -n default get pods -o yaml -l app=urbackup-v11` === apiVersion: v1

10. `kubectl get svc -o yaml client-node-port` === **FULL YAML**

11. `kubectl get pods --output=wide` === NAME READY STATUS RESTARTS AGE IP NODE NOMINATED NODE READINESS GATES

12. `kubectl describe svc` === **OBJECT INFO** (SERVICE/POD)

    `kubectl describe <object type> <object name>` === kubectl describe pod client-pod

    `kubectl describe pods`

    `kubectl describe storageclass` - to see info about option

13. `kubectl get po -A` === NAMESPACE NAME READY STATUS RESTARTS AGE

14. `minikube dashboard` === **DASHBOARD**

15. `kubectl set image deployment/client-deployment client=javascriptonit/multi-client:v2` === Imperative command to update image

16. `minikube start` === to start a cluster

17. `kubectl create secret generic pgpassword --from-literal PGPASSWORD=password123`
    * repeat creating pgpassword after deleting minikube
    * or pods (postgres-deployment/server-deployment) will get errors: CreateContainerConfigError:
    * Error: secret "pgpassword" not found