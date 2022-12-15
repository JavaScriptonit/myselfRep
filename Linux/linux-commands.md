## LINUX COMMANDS:

1. `mkdir redis-image` - create a new working directory

2. `cd redis-image` - change into that directory

3. `pwd` - present working directory (shows the path)

4. `open .` - open folder/directory 

5. `ls` - show all files in folder

   `$ ls`

   client-deployment.yaml	client-node-port.yaml	client-pod.yaml

6. `rm` - deletes a file from the filesystem

7. `rmdir` - is a utility for deleting empty directories

   `$ rm -r directoryname` - If the directory is not empty, the correct way to remove the directory and all its contents recursively is to use

8. `node -p "crypto.randomBytes(16).toString('hex')"` - get a random password using Node from the terminal
   1. d01ce7056fb2eab425161dcfa5bdb502

9. `/Applications/Webstorm.app/Contents/MacOS/webstorm` - Webstorm OPEN from Terminal
   * to see the logs
   * open without icon search

10. `cat` - reads data from the file and outputs it (short for concatenate)
    * `cat app/package.json | jq -r .version` - from .gitlab-ci.yaml

11. `jq` - a command-line tool for parsing JSON
    * `cat app/package.json | jq -r .version` - from .gitlab-ci.yaml
