# Running Travis CLI in a container with Ruby pre-installed:

1. docker run -it -v $(pwd):/app ruby:2.4 sh
2. gem install travis
3. travis login
4. Copy json file into the 'volumed' directory so we can use it in the container
5. travis encrypt-file service-account.json

