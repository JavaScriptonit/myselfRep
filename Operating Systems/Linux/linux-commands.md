## LINUX COMMANDS:
[Basic Linux Commands](https://techworld-with-nana.teachable.com/courses/devops-bootcamp/lectures/32580253)

1. `mkdir redis-image` - create a new working directory

2. `cd redis-image` - change into that directory

3. `pwd` - present working directory (shows the path)

4. `open .` - open folder/directory 

5. `ls` - show all files in folder

   * `ls` - client-deployment.yaml	client-node-port.yaml	client-pod.yaml
   * `ls /usr` - X11		X11R6		bin		lib		libexec		local		sbin		share		standalone
   * `ls -R Downloads/` - show all files and directories with included files
   * `ls -a` - **show HIDDEN files**
   * `ls -l` - **show PERMISSIONS files**
   * `ls -la` - **show HIDDEN PERMISSIONS files**
   * `lscpu` - cpu info
   * `lsmem` - memory info
   * `ls /sbin` - **SUPER USER COMMANDS**

6. `rm` - deletes a file from the filesystem

7. `rmdir` - is a utility for deleting empty directories

   `rm -r directoryname` - If the directory is not empty, the correct way to remove the directory and all its contents recursively is to use

8. `node -p "crypto.randomBytes(16).toString('hex')"` - get a random password using Node from the terminal
   * d01ce7056fb2eab425161dcfa5bdb502

9. `/Applications/Webstorm.app/Contents/MacOS/webstorm` - Webstorm OPEN from Terminal
   * to see the logs
   * open without icon search

10. `cat` - reads data from the file and outputs it (short for concatenate)
    * `cat app/package.json | jq -r .version` - from .gitlab-ci.yaml

11. `jq` - a command-line tool for parsing JSON
    * `cat app/package.json | jq -r .version` - from .gitlab-ci.yaml

12. `touch [filename]` - create a file
    * `touch index.js`

13. `mv` - rename file
    * `mv delete.jpeg delete2.jpeg`

14. `cp` - copy file/directory
    * `cp -r java-app my-project`

15. `history` - commands history of this session
    * `history 20` - previous 20 commands

16. `CTRL + r` - search history

17. `uname -a` - computer information
    * output: Darwin MacBook-Pro-Andrej.local 20.6.0 Darwin Kernel Version 20.6.0: Thu Sep 29 20:15:11 PDT 2022; root:xnu-7195.141.42~1/RELEASE_X86_64 x86_64

18. `adduser admin` - add user
    * `sudo adduser admin` - add not as root user

19. `su - admin` - switch user

20. `addgroup devops` - add a group
    * `sudo addgroup devops` - add not as root user

## Combine multiple command execution:
### Piping "|" :
[Examples and video](https://techworld-with-nana.teachable.com/courses/1108792/lectures/32582297)

1. `| less` - print pages and delete after view
    * `history 20 | less` - print pages and delete after view
    * `cat cicd-kubeconfig.yaml | less` - print pages and delete after view
    * `ls | less` - print pages and delete after view 


2. `| grep` - filter command:
    * `history | grep sudo` - filter by "sudo"
    * `history 20 | grep sudo | less` - filter by "sudo" with less command
    * `ls /usr/bin | grep java` - filter apps by name "java"
    * `cat Documents/java-app/config.yaml | grep ports` - filter file lines by text with "ports"


### Redirecting ">" :
[Examples and video](https://techworld-with-nana.teachable.com/courses/1108792/lectures/32582297)

1. `>` - redirect command with creating file or rewrite existing one:
    * `history 20 | grep sudo > sudo-commands.txt` - create file with sudo-commands


2. `>>` - redirect command with adding new lines to existing file:
   * `history 20 | grep rm >> sudo-rm-commands.txt` - add rm commands to existing file


3. `;` - when using independent commands
   * `clear; sleep 1; echo "Hello world"` - executes 3 commands 1 after another in 1 command line 