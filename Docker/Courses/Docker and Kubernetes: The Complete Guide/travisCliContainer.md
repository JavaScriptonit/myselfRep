# Running Travis CLI in a container with Ruby pre-installed:

1. docker run -it -v $(pwd):/app ruby:2.4 sh
2. "#" gem install travis
3. "#" travis login
   1. Username: GitHub login
   2. Password: GitHub password
   3. Two-factor authentication code: number
4. Copy json file into the 'volumed' directory so we can use it in the container
   1. [Copying service-account.json file into container](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/11628228#overview)
5. "#" travis encrypt-file service-account.json -r JavaScriptonit/multi-k8s
   1. encrypting service-account.json for JavaScriptonit/multi-k8s
   2. storing result as service-account.json.enc
   3. storing secure env variables for decrypting
   4. COPY COMMAND from command-line and add it to build script (**before_install** stage in .travis.yml)
      - openssl aes-256-cbc -K $encrypted_...service-account.json -d
      - [.travis.yml file](https://github.com/JavaScriptonit/multi-k8s/blob/main/k8s/.travis.yml)
   5. DELETE ORIGINAL service-account.json and do not add to GitHub
   6. add service-account.json.enc to GitHub (100% safe to upload to the public rep)
   7. "#" exit
   8. "#" ls - to check files in folder
