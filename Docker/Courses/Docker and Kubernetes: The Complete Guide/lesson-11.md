## 06.03.2022 (11ый раздел) - Multi-container deploy to AWS

1. **Elastic Beanstalk** -> Amazon Elastic Container Service (ECS) -> task definition (instructions how to run a single container)

2. **Dockerrun.aws.json** file (container definitions)

3. Elastic Beanstalk **Instance** will use 2 services: (can’t talk to each other by default)

   AWS Elastic Cache (**EC**) - Redis

   AWS Relational Database Service (**RDS**) - Postgres (creates and maintains Postgres instance)

4. **VPC** - Default Virtual Private Cloud = VPC for US-West-1 (one default VPS per region) === EB instance + RDS Postgres + EC Redis

5. **Security Group** (Firewall Rules) allows traffic to connect to all services in VPS and services to talk to each other

   Allow any incoming traffic on Port 80 from any IP

   Allow traffic on Port 3010 from IP 172.0.40.2

6. Create **RDS instance** in AWS in EB instance:

   Create Postgres database with its own:

   **storage (20GB min)**, 

   **DB id**, 

   **Master username** («postgres»), 

   **Master password** («postgrespassword» same in docker-compose.yml in «api»), 

   **database name** («fibvalues»)

7. Create **EC instance** in AWS in EB instance:

   Create Redis (or cluster) Im-memory data structure store used as database, cache and message broker with: 

   **name «multi-docker-redis»**, 

   **node type «cache.t2.micro»** with 0,5GB memory with low performance, 

   **replicas «none»**, 

   Advanced settings: **Subnet group** «create new»,

   subnet group **name** «redis-group»,

   subnet group **VPC ID** «default VPC»

   **subnets** «us-west-1a/us-west-1b»

8. Create **New Security Group** (rds-launch-wizard was auto created when making Postgres instance):

   Name tag: «multi-docker»

   Group name: «multi-docker»

   Description: traffic for services in multi-docker app

   VPC: default VPC

9. Create **RULE** for the Security group:

    Select **Security group**

    Go to **Inbound Rules** Tab

    **Edit** Inbound Rules: **Type** «Custom TCP Rule», **Protocol** «TCP (6)», **Port Range** 5432-6379 or 0 (all ports instead Postgres and Redis ports), **Source**: Just created group «multi-docker»

10. **Modify** instances with adding created security group :

    EC -> Redis -> Modify -> VPC Security group -> pencil -> check box in multi-docker -> save -> modify

    RDS -> instances -> multi-docker-postgres -> scroll down to Details section -> modify -> Network & Security -> Security group -> multi-docker -> continue -> apply immediately -> Modify DB instance

    EB -> MultiDocker.env -> configuration -> instances -> modify -> EC2 Security groups -> multi-docker -> apply -> confirm

   ## AWS Configuration Cheat Sheet [lecture/20695748](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/20695748#overview)

   ### EBS Application Creation (If using Multi-Container Docker Platform)

* Go to AWS Management Console and use Find Services to search for Elastic Beanstalk

* Click “Create Application”

* Set Application Name to 'multi-docker'

* Scroll down to Platform and select Docker

* #### In Platform Branch, select Multi-Container Docker running on 64bit Amazon Linux

* Click Create Application

* You may need to refresh, but eventually, you should see a green checkmark underneath Health.

   ### EBS Application Creation (If using Amazon Linux 2 Platform Platform)

* Make sure you have followed the guidance in this * [note](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/28089952#questions)

* Go to AWS Management Console and use Find Services to search for Elastic Beanstalk

* Click “Create Application”

* Set Application Name to 'multi-docker'

* **Scroll down to Platform and select Docker**

* The Platform Branch should be automatically set to Docker Running on **64bit Amazon Linux 2**.

* Click Create Application

* You may need to refresh, but eventually, you should see a green checkmark underneath Health.

   ### RDS Database Creation

* Go to AWS Management Console and use Find Services to search for RDS

* Click Create database button

* Select PostgreSQL

* Change Version to the newest available v12 version (The free tier is currently not available for Postgres v13)

* In Templates, check the Free tier box.

* Scroll down to Settings.

* Set DB Instance identifier to **multi-docker-postgres**

* Set Master Username to **postgres**

* Set Master Password to **postgrespassword** and confirm.

* Scroll down to Connectivity. Make sure VPC is set to Default VPC

* Scroll down to Additional Configuration and click to unhide.

* Set Initial database name to **fibvalues**

* Scroll down and click Create Database button

   ### ElastiCache Redis Creation

* Go to AWS Management Console and use Find Services to search for ElastiCache

* Click Redis in sidebar

* Click the Create button

* **Make sure Cluster Mode Enabled is NOT ticked**

* In Redis Settings form, set Name to multi-docker-redis

* Change Node type to 'cache.t2.micro'

* Change Replicas per Shard to 0

* Scroll down and click Create button

   ### Creating a Custom Security Group

* Go to AWS Management Console and use Find Services to search for VPC

* Find the Security section in the left sidebar and click Security Groups

* Click Create Security Group button

* Set Security group name to multi-docker

* Set Description to multi-docker

* Make sure VPC is set to default VPC

* Scroll down and click the Create Security Group button.

* After the security group has been created, find the Edit inbound rules button.

* Click Add Rule

* Set Port Range to 5432-6379

* Click in the box next to Source and start typing 'sg' into the box. Select the Security Group you just created.

* Click the Save rules button

   ### Applying Security Groups to ElastiCache

* Go to AWS Management Console and use Find Services to search for ElastiCache

* Click Redis in Sidebar

* Check the box next to Redis cluster

* Click Actions and click Modify

* Click the pencil icon to edit the VPC Security group. Tick the box next to the new multi-docker group and click Save

* Click Modify

   ### Applying Security Groups to RDS

* Go to AWS Management Console and use Find Services to search for RDS

* Click Databases in Sidebar and check the box next to your instance

* Click Modify button

* Scroll down to Connectivity and add the new multi-docker security group

* Scroll down and click the Continue button

* Click Modify DB instance button

   ### Applying Security Groups to Elastic Beanstalk

* Go to AWS Management Console and use Find Services to search for Elastic Beanstalk

* Click Environments in the left sidebar.

* Click MultiDocker-env

* Click Configuration

* In the Instances row, click the Edit button.

* Scroll down to EC2 Security Groups and tick box next to multi-docker

* Click Apply and Click Confirm

* After all the instances restart and go from No Data to Severe, you should see a green checkmark under Health.

   ### Add AWS configuration details to .travis.yml file's deploy script

* Set the _region_. The region code can be found by clicking the region in the toolbar next to your username.

    eg: 'us-east-1'

* _app_ should be set to the EBS Application Name

    eg: 'multi-docker'

* _env_ should be set to your EBS Environment name.

    eg: 'MultiDocker-env'

* Set the _bucket_name_. This can be found by searching for the S3 Storage service. Click the link for the elasticbeanstalk bucket that matches your region code and copy the name.

* eg: 'elasticbeanstalk-us-east-1-923445599289'

* Set the _bucket_path_ to 'docker-multi'

* Set _access_key_id_ to $AWS_ACCESS_KEY

* Set _secret_access_key_ to $AWS_SECRET_KEY

   ### Setting Environment Variables

* Go to AWS Management Console and use Find Services to search for Elastic Beanstalk

* Click Environments in the left sidebar.

* Click MultiDocker-env

* Click Configuration

* In the Software row, click the Edit button

* Scroll down to Environment properties

* In another tab Open up ElastiCache, click Redis and check the box next to your cluster. Find the Primary Endpoint and copy that value but omit the :6379

* Set REDIS_HOST key to the primary endpoint listed above, remember to omit :6379

* Set REDIS_PORT to 6379

* Set PGUSER to postgres

* Set PGPASSWORD to postgrespassword

* In another tab, open up the RDS dashboard, click databases in the sidebar, click your instance and scroll to Connectivity and Security. Copy the endpoint.

* Set the PGHOST key to the endpoint value listed above.

* Set PGDATABASE to fibvalues

* Set PGPORT to 5432

* Click Apply button

* After all instances restart and go from No Data, to Severe, you should see a green checkmark under Health.

    ### IAM Keys for Deployment

     You can use the same IAM User's access and secret keys from the single container app we created earlier, or, you can create a new IAM user for this application:

* Search for the "IAM Security, Identity & Compliance Service"

* Click "Create Individual IAM Users" and click "Manage Users"

* Click "Add User"

* Enter any name you’d like in the "User Name" field.

     eg: docker-multi-travis-ci

* Tick the "Programmatic Access" checkbox

* Click "Next:Permissions"

* Click "Attach Existing Policies Directly"

* Search for "beanstalk"

* Tick the box next to "AdministratorAccess-AWSElasticBeanstalk"

* Click "Next:Tags"

* Click "Next:Review"

* Click "Create user"

* Copy and / or download the _Access Key ID_ and _Secret Access Key_ to use in the Travis Variable Setup.
     
     ### AWS Keys in Travis

* Go to your Travis Dashboard and find the project repository for the application we are working on.

* On the repository page, click "More Options" and then "Settings"

* Create an _AWS_ACCESS_KEY_ variable and paste your IAM access key

* Create an _AWS_SECRET_KEY_ variable and paste your IAM secret key

    ### Deploying App

* Make a small change to your src/App.js file in the greeting text.

* In the project root, in your terminal run:

      * git add.
     
      * git commit -m “testing deployment"
     
      * git push origin main

* Go to your Travis Dashboard and check the status of your build.

* The status should eventually return with a green checkmark and show "build passing"

* Go to your AWS Elasticbeanstalk application

* It should say "Elastic Beanstalk is updating your environment"

* It should eventually show a green checkmark under "Health". You will now be able to access your application at the external URL provided under the environment name.