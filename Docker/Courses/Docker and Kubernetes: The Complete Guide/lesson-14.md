## 01.06.2022 (14ый раздел) - A multi-container App with Kubernetes

1. **Postgres PVC** - persistent volume claim (PersistentVolumeClaim). A persistentVolumeClaim section in a Pod's volumes block.

     * [Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)

2. Path to production:
   1. Create config files for each service and deployment
   2. Test locally on minikube
   3. Create a GitHub/Travis flow to build images and deploy
   4. Deploy app to a cloud provider

3. **ClusterIP** - provides access to an object (set of PODS) to everything else inside of our cluster.
   1. Not allows traffic to come in from the outside world
   2. Only supposed to be accessed from people already inside of our cluster
   
4. **Volume** - some type of mechanism that allows a container to access a filesystem outside itself
   1. Volume in Kubernetes is a reference to a very particular type of object:
      1. An object that allows a container to store data at the pod level
      * [The need for Volumes with Databases](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11514746#overview)
      * [Kubernetes Volumes](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11514748#overview)

5. **PersistentVolumeClaim** - (PVC) is a request for storage by a user. Is an advertisement

6. **PersistentVolume** - (PV) is a piece of storage in the cluster that has been provisioned by an administrator or dynamically provisioned using [Storage Classes](https://kubernetes.io/docs/concepts/storage/storage-classes/).
   1. PV will not be deleted if POD crashes. PV is created outside of POD. All Data is safe.
   2. Kubernetes Volume is created inside POD but can be used with new Postgres Container cause Volume is created outside Postgres Container.
   3. PVC
   
7. **Access modes**:
   1. ReadWriteOnce - can be used in a single node
   2. ReadOnlyMany - multiple nodes can read from this
   3. ReadWriteMany - can be read and written to by many nodes
   
8. **Provisioner** - [Storage Classes](https://kubernetes.io/docs/concepts/storage/storage-classes/). To see places where to create storage in cloud. List of options, cloud Providers (Google Cloud Persistent Disk, Azure File, Azure Disk, AWS Block Store).

9. **Secret** - new type of object. 
   1. Creating a secret: kubectl create secret **generic** (or **tls** - HTTPS setup) <secret name> --from-literal key=value (PGPASSWORD=password123)
   2. kubectl create secret generic pgpassword --from-literal **PGPASSWORD=password123**
   
10. 