## 03.08.2022 (16ый раздел) - Kubernetes Production Deployment

1. [The Deployment Process (PROD):](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11628194#overview)
   1. Create GitHub Repo
   2. [Tie repo to Travis CI](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11628202#overview)
   3. [Create Google Cloud project](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11628204#overview)
      1. Navigate to console.cloud.google.com
         1. List of projects or Start-up screen
      2. Create New project (name/location)
      3. Select New project
   4. [Enable billing for the project](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11628206#overview)
      1. Click Hamburger menu -> Billing
      2. Link a billing account
      3. Set account
   5. [Creating a cluster (Google Cloud project)](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11628212#overview)
      1. Click Hamburger menu -> Kubernetes Engine
      2. ENABLE button
      3. Click the bell icon in the top right part of the menu -> Enable services: container.googleapis.com
      4. Click Hamburger menu -> Kubernetes Engine -> Clusters -> CREATE
      5. Click the CONFIGURE button within the Standard cluster option
      6. Set the Name to multi-cluster
      7. Confirm the Zone location
      8. Click the CREATE button at the bottom of the form
   6. [Add deployment scripts to the repo:](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11628214#overview)
      1. Install Google Cloud SDK CLI
      2. Configure the SDK without Google Cloud auth info
         1. [CREATE SERVICE ACCOUNT:](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/25408376#overview)
            1. Hamburger menu > IAM & Admin > Service Accounts
            2. CREATE SERVICE ACCOUNT > Service account name to travis-deployer (step 1) > CREATE button (step 2)
            3. Select a role filter > scroll > Kubernetes Engine > Kubernetes Engine Admin > CONTINUE
            4. skip Grant users access > DONE
            5. Click the three dots > Manage Keys in the dropdown
            6. ADD KEY > Create new key > CREATE button (JSON)
            7. The JSON key file should now download to your computer (should be encrypted and upload to Travis CI)
      3. Login to Docker CLI
      4. Build the 'test' version of multi-client
         1. Running tests with Travis:
            1. add - echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin in travis.yml file
            2. add username and password in project (Environment variables) [travis project settings](travis-ci.org)
            3. DOCKER_USERNAME - travis login
            4. DOCKER_USERNAME - your password
      5. Run tests
         1. add script command in travis.yml file: 
         2. docker run -e CI=true javascriptonit/react-test npm test
      6. If tests are successful, run a script to deploy newest images
         1. uses deploy.sh file from /multi-k8s folder
      7. Build all our images, tag each one, push each to Docker hub
         1. update deploy.sh file and .travis.yml
      8. Apply all configs in the 'k8s' folder
         1. Create secret file Once for a single Kubernetes cluster in [Cloud Shell](console.cloud.google.com)
         2. $ gcloud config set project id - update property [core/project]
         3. $ gcloud config set compute/zone us-central1-a - update property [compute/zone]
         4. $ gcloud container clusters get credentials multi-cluster - generating entry for multi-cluster
      9. Imperatively set latest images on each deployment
   
   7. Running **Travis** CLI in a container with Ruby pre-installed:
      1. Watch running Travis CLI flow in Docker/Courses/Docker and Kubernetes: The Complete Guide/travisCliContainer.md - [travisCliContainer.md](https://github.com/JavaScriptonit/myselfRep/blob/main/Docker/Courses/Docker%20and%20Kubernetes:%20The%20Complete%20Guide/travisCliContainer.md)
   8. Creating **Secret** in Google Cloud CLI [creating a secret](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11628268#overview):
      1. Command: $ kubectl create secret generic pgpassword --from-literal PGPASSWORD=password123
   9. Installing **HELM** in Google Cloud CLI [HELM setup](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11628276#overview):
      1. ```curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3```
      2. ```chmod 700 get_helm.sh```
      3. ```./get_helm.sh```
   10. Modify the configuration of our cluster by **Tiller**:
       1. [Helm + Tiller](https://helm.sh/docs/intro/quickstart/#helm)
       2. Command we issue -> Helm Client -> Tiller Server
       3. **RBAC** - Role Based Access Control:
          1. Limits who can access and modify objects in our cluster
          2. Enabled on Google Cloud by default
          3. Tiller wants to make changes to our cluster, so it needs to get some permissions set
       4. 2 sets of definitions:
          1. User accounts - identifies a person administering our cluster
             1. ```$ kubectl create serviceaccount --namespace kube-system tiller```
          2. Service accounts - identifies a pod administering a cluster
          3. ClusterRoleBinding - authorizes an account to do a certain set of actions across the entire cluster
             1. ```$ kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller```
          4. RoleBinding - authorizes an account to do a certain set of actions in a single namespace
       5. $ helm init --service-account tiller --upgrade === final step of HELM install
       6. [Ingress-nginx with Helm](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11628280#overview)
          1. $ helm install stable/nginx-ingress --name my-nginx --set rbac.create=true
          2. Google Cloud Platform -> multi-k8s -> Kubernetes Engine -> Workloads -> 
             1. my-nginx-nginx-ingress-controller === IP address for the project (Endpoints)
          3. Google Cloud Platform -> multi-k8s -> Kubernetes Engine -> Workloads -> 
             1. my-nginx-nginx-default-backend === default backend page of the project (404 Page)
       7. [Deployment CHECK](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11628292#overview)
          1. [A Workflow for Changing in Prod](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11628294#overview)
             1. Check out a branch
             2. Make changes
             3. Commit changes
             4. Push to GitHub branch
             5. Create a PR
             6. Wait for tests to show up 'green'
             7. Merge the PR
             8. See changes appear on prod