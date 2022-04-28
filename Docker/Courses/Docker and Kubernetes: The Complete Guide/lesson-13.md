## 05.04.2022 (13ый раздел) - Maintaining Sets of Containers with Deployments

1. **For update POD** - kubectl apply -f client-pod.yaml command

   The Pod "client-pod" is invalid: spec: Forbidden: pod updates may not change fields other than 
   
   `spec.containers[*].image`, `spec.initContainers[*].image`, `spec.activeDeadlineSeconds`, `spec.tolerations` (only additions to existing tolerations)
   
   ### Can ONLY update spec.activeDeadlineSeconds, spec.tolerations, spec.initContainers and spec.containers

2. Need to change **KIND** of **OBJECT** to change other fields

3. ### Object types: 

   **PODS** just have pods (NO more Subtypes), good for one-off dev purpose

   **Services** has **ClusterIP**, **NodePort**, **LoadBalancer**, **Ingress** (4 Subtypes)

   **Deployment** runs a set of identical pods (one or more), monitors the state of each pod, good for DEV and PROD

4. 
