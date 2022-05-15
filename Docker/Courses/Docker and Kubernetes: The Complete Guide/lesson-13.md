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

4. In Deployment object type (client-deployment.yaml):

   1. **"TEMPLATE"** section: lists the configuration for every single POD that is created by Deployment file

   2. **"replicas"** section: number of PODS

      to see the number of running pods in Deployment object: _kubectl get deployments_ (**DESIRED**)

   3. **"selector"** section: gets a handle on created POD with labels

5. **Why use Services?** Service object type watches for every POD that matches its selector and automatically route traffic to it (even if IP of POD changed)
   
6. ### Update Image version - 

   Change deployment to use multi-client again
   
   Update the multi-client image, push to Docker Hub
   
   #### Get the deployment to recreate our pods with the latest version of multi-client:
   
      https://github.com/kubernetes/kubernetes/issues/33664 - different ways to convince deployment file to update all the pods
   
      **Problem**: _deployment.apps/client-deployment unchanged_
   
   #### Solutions:
   
   * Delete pods to recreate them with the latest version. **Silly solution**
   
   * Tag the image: built images with a real version number and specify version in config file (image: javascriptonit/multi-client:v1). **Adds an extra step in the production deployment process**
   
   * Use an imperative command to update the image version the deployment should use. **Uses an imperative command** (kubectl client-deploy update_version v2)
   
     * kubectl set image deployment/client-deployment client=javascriptonit/multi-client:v2

   Tag the image with a version number, push to Docker Hub:
      
      * docker build -t javascriptonit/multi-client:v2 .
   
   Run a kubectl command forcing the deployment to use the new image version:
   
      * docker push javascriptonit/multi-client:v2

7. 
