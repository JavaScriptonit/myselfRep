## 08.01.2022 (2ой раздел) - Manipulating containers

1. Each container process has 3 communication channels: **STDIN**, **STDOUT**, **STDERR**
2. **STDIN** - used to communicate information into the process
3. Command processors: **BASH**, **POWERSHELL**, **ZSH**, **SH**
4. Each container (even with same Name) has its own file system and do not share it with other containers with the same IMAGE name:

andreyshabunov@MBP-Andrej ~ % **docker ps**
CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS      NAMES

5c6cc2325457   busybox   "sh"                     3 minutes ago   Up 3 minutes              ecstatic_merkle

50851243d9c0   busybox   "sh"                     4 minutes ago   Up 4 minutes              confident_panini

andreyshabunov@MBP-Andrej ~ % **docker run -it busybox sh**

/ # **ls**
bin   dev   etc   home  proc  root  sys   tmp   usr   var

andreyshabunov@MBP-Andrej ~ % **docker run -it busybox sh**    
/ # **ls**

bin   dev   etc   home  proc  root  sys   tmp   usr   var

/ # **touch hithere**

/ # **ls**

bin      dev      etc      hithere  home     proc     root     sys      tmp      usr      var