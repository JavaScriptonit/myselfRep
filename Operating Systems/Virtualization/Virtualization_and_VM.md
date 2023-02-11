## Why Virtualization?

* `With Virtualization`
  * Virtual Machine Image (**VMI**)
    * You can have backups of your entire OS (since it's a file, just like a picture/text document)
    * Copy VMI called **Snapshots**
* `Without Virtualization`
  * OS is tightly coupled to the hardware

### Setup a Linux Virtual Machine: 
* [Possible Alternatives and Workarounds for VirtualBox Issues](https://techworld-with-nana.teachable.com/courses/1108792/lectures/32580250)
  * General Workarounds:
    * Workaround 1: Create a Linux Ubuntu instance on cloud, like Digital Ocean or any other cloud provider. You won't have a UI, but you can do almost all the demos there as well, like package manager, bash scripting, linux commands, File system, ssh-ing etc. (How to setup Server on DigitalOcean: https://techworld-with-nana.teachable.com/courses/1108792/lectures/28658401)
    * Workaround 2: Use this online Virtual Machine Platform to use Ubuntu machine 20.04: https://www.onworks.net/component/content/article?id=218777:free-ubuntu-online-version-20 Just click on "start" and it will spin up an Ubuntu VM.
  * Fixes and Workarounds for Windows 
    * Enable Virtualization 
      * Windows 10: https://www.youtube.com/watch?v=LQIyowZMiY8
      * Windows 11: https://www.youtube.com/watch?v=t8f-zw_wcWM
    * VirtualBox is the best VM tool for Windows. But if you don’t have enough resources and can’t allocate enough RAM and CPU, then go with a less resource-intensive option, which is WSL (Windows Subsystem for Linux)
      * WSL: https://www.youtube.com/watch?v=5RTSlby-l9w
  * Workarounds for MacOS M1 or latest MacOS version:
    * On Mac, if you have issues with VirtualBox, I suggest 2 easy alternatives:
      * Use UTM: https://www.youtube.com/watch?v=qiw-n8OUT1U
      * Use Parallels: https://www.youtube.com/watch?v=1WWj6qoWhJw
      * General: https://www.youtube.com/watch?v=uRwnwkdSX-I
  * Workaround for Adding ISO file:
    * Add the ISO file from settings > storage > Optical drive > add image there and go to start
  * Resource, if bidirectional copy/paste between host and VM doesn't work:
    * https://linuxhint.com/enable-copy-paste-virtualbox-host/


