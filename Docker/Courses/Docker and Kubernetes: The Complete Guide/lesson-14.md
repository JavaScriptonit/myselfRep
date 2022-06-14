## 01.06.2022 (14ый раздел) - A multi-container App with Kubernetes

1. **Postgres PVC** - persistent volume claim (PersistentVolumeClaim). A persistentVolumeClaim section in a Pod's volumes block. (PVC) is a request for storage by a user.

     * [Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)

2. Path to production:
   1. Create config files for each service and deployment
   2. Test locally on minikube
   3. Create a GitHub/Travis flow to build images and deploy
   4. Deploy app to a cloud provider

3. **ClusterIP** - provides access to an object (set of PODS) to everything else inside of our cluster.
   1. Not allows traffic to come in from the outside world
   2. Only supposed to be accessed from people already inside of our cluster
   
4. 
