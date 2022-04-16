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

   ## AWS Configuration Cheat Sheet

11. [lecture/20695748](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/20695748#overview)

   ### EBS Application Creation (If using Multi-Container Docker Platform)

12. Go to AWS Management Console and use Find Services to search for Elastic Beanstalk

13. Click “Create Application”

14. Set Application Name to 'multi-docker'

15. Scroll down to Platform and select Docker

16. #### In Platform Branch, select Multi-Container Docker running on 64bit Amazon Linux

17. Click Create Application

18. You may need to refresh, but eventually, you should see a green checkmark underneath Health.

   ### EBS Application Creation (If using Amazon Linux 2 Platform Platform)

19. Make sure you have followed the guidance in this * [note](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/28089952#questions)

20. Go to AWS Management Console and use Find Services to search for Elastic Beanstalk

21. Click “Create Application”

22. Set Application Name to 'multi-docker'

23. **Scroll down to Platform and select Docker**

24. The Platform Branch should be automatically set to Docker Running on **64bit Amazon Linux 2**.

25. Click Create Application

26. You may need to refresh, but eventually, you should see a green checkmark underneath Health.

   ### RDS Database Creation

27. Go to AWS Management Console and use Find Services to search for RDS

28. Click Create database button

29. Select PostgreSQL

30. Change Version to the newest available v12 version (The free tier is currently not available for Postgres v13)

31. In Templates, check the Free tier box.

32. Scroll down to Settings.

33. Set DB Instance identifier to **multi-docker-postgres**

34. Set Master Username to **postgres**

35. Set Master Password to **postgrespassword** and confirm.

36. Scroll down to Connectivity. Make sure VPC is set to Default VPC

37. Scroll down to Additional Configuration and click to unhide.

38. Set Initial database name to **fibvalues**

39. Scroll down and click Create Database button

   ### ElastiCache Redis Creation

40. Go to AWS Management Console and use Find Services to search for ElastiCache

41. Click Redis in sidebar

42. Click the Create button

43. **Make sure Cluster Mode Enabled is NOT ticked**

44. In Redis Settings form, set Name to multi-docker-redis

45. Change Node type to 'cache.t2.micro'

46. Change Replicas per Shard to 0

47. Scroll down and click Create button

   ### Creating a Custom Security Group

48. Go to AWS Management Console and use Find Services to search for VPC

49. Find the Security section in the left sidebar and click Security Groups

50. Click Create Security Group button

51. Set Security group name to multi-docker

52. Set Description to multi-docker

53. Make sure VPC is set to default VPC

54. Scroll down and click the Create Security Group button.

55. After the security group has been created, find the Edit inbound rules button.

56. Click Add Rule

57. Set Port Range to 5432-6379

58. Click in the box next to Source and start typing 'sg' into the box. Select the Security Group you just created.

59. Click the Save rules button

   ### Applying Security Groups to ElastiCache

60. Go to AWS Management Console and use Find Services to search for ElastiCache

61. Click Redis in Sidebar

62. Check the box next to Redis cluster

63. Click Actions and click Modify

64. Click the pencil icon to edit the VPC Security group. Tick the box next to the new multi-docker group and click Save

65. Click Modify

   ### Applying Security Groups to RDS

66. Go to AWS Management Console and use Find Services to search for RDS

67. Click Databases in Sidebar and check the box next to your instance

68. Click Modify button

69. Scroll down to Connectivity and add the new multi-docker security group

70. Scroll down and click the Continue button

71. Click Modify DB instance button

   ### Applying Security Groups to Elastic Beanstalk

72. Go to AWS Management Console and use Find Services to search for Elastic Beanstalk

73. Click Environments in the left sidebar.

74. Click MultiDocker-env

75. Click Configuration

76. In the Instances row, click the Edit button.

77. Scroll down to EC2 Security Groups and tick box next to multi-docker

78. Click Apply and Click Confirm

79. After all the instances restart and go from No Data to Severe, you should see a green checkmark under Health.

   ### Add AWS configuration details to .travis.yml file's deploy script

80. Set the _region_. The region code can be found by clicking the region in the toolbar next to your username.

    eg: 'us-east-1'

81. _app_ should be set to the EBS Application Name

    eg: 'multi-docker'

82. _env_ should be set to your EBS Environment name.

    eg: 'MultiDocker-env'

83. Set the _bucket_name_. This can be found by searching for the S3 Storage service. Click the link for the elasticbeanstalk bucket that matches your region code and copy the name.

84. eg: 'elasticbeanstalk-us-east-1-923445599289'

85. Set the _bucket_path_ to 'docker-multi'

86. Set _access_key_id_ to $AWS_ACCESS_KEY

87. Set _secret_access_key_ to $AWS_SECRET_KEY

   ### Setting Environment Variables

88. Go to AWS Management Console and use Find Services to search for Elastic Beanstalk

89. Click Environments in the left sidebar.

90. Click MultiDocker-env

91. Click Configuration

92. In the Software row, click the Edit button

93. Scroll down to Environment properties

94. In another tab Open up ElastiCache, click Redis and check the box next to your cluster. Find the Primary Endpoint and copy that value but omit the :6379

95. Set REDIS_HOST key to the primary endpoint listed above, remember to omit :6379

96. Set REDIS_PORT to 6379

97. Set PGUSER to postgres

98. Set PGPASSWORD to postgrespassword

99. In another tab, open up the RDS dashboard, click databases in the sidebar, click your instance and scroll to Connectivity and Security. Copy the endpoint.

100. Set the PGHOST key to the endpoint value listed above.

101. Set PGDATABASE to fibvalues

102. Set PGPORT to 5432

103. Click Apply button

104. After all instances restart and go from No Data, to Severe, you should see a green checkmark under Health.

    ### IAM Keys for Deployment

     You can use the same IAM User's access and secret keys from the single container app we created earlier, or, you can create a new IAM user for this application:

105. Search for the "IAM Security, Identity & Compliance Service"

106. Click "Create Individual IAM Users" and click "Manage Users"

107. Click "Add User"

108. Enter any name you’d like in the "User Name" field.

     eg: docker-multi-travis-ci

109. Tick the "Programmatic Access" checkbox

110. Click "Next:Permissions"

111. Click "Attach Existing Policies Directly"

112. Search for "beanstalk"

113. Tick the box next to "AdministratorAccess-AWSElasticBeanstalk"

114. Click "Next:Tags"

115. Click "Next:Review"

116. Click "Create user"

117. Copy and / or download the _Access Key ID_ and _Secret Access Key_ to use in the Travis Variable Setup.
     
     ### AWS Keys in Travis

118. Go to your Travis Dashboard and find the project repository for the application we are working on.

119. On the repository page, click "More Options" and then "Settings"

120. Create an _AWS_ACCESS_KEY_ variable and paste your IAM access key

121. Create an _AWS_SECRET_KEY_ variable and paste your IAM secret key

    ### Deploying App

122. Make a small change to your src/App.js file in the greeting text.

123. In the project root, in your terminal run:

      * git add.
     
      * git commit -m “testing deployment"
     
      * git push origin main

124. Go to your Travis Dashboard and check the status of your build.

125. The status should eventually return with a green checkmark and show "build passing"

126. Go to your AWS Elasticbeanstalk application

127. It should say "Elastic Beanstalk is updating your environment"

128. It should eventually show a green checkmark under "Health". You will now be able to access your application at the external URL provided under the environment name.