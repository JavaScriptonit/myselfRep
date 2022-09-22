1. ### [Google Cloud Cleanup](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11684242#overview):
    1. Click the project selector on the top left of the page:
    2. Click the 'gear' icon on the top right
    3. Find your project in the list of projects that is presented, then click the three dots on the far right hand side
    4. Click 'Delete'
    5. Enter your project ID and click 'Shut Down'

2. ### [Local Environment Cleanup](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11684298#overview): 
   1. Deleting Pods, Deployments, Services from the Multi K8's project:
      1. ```kubectl delete -f k8s/```
   2. Stopping Minikube:
      1. ```minikube delete```
   3. Stopping Running Containers:
      1. ```docker ps```
      2. ```docker stop <container_id>```
   4. Clearing the Build Cache:
      1. ```docker system prune```