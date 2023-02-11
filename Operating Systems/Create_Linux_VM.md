## Create Linux Virtual Machine:

1. Download VirtualBox
   * https://www.virtualbox.org/wiki/Downloads
   * Install (allow in setup)
2. Create Linux VM
   * New
   * Name: linux-ubuntu
   * Type: Linux
   * Version: Ubuntu (64-bit)
   * Memory size: 2048 MB
   * Hard disk file type: VDI
   * Storage: 10 GB
3. Download Ubuntu 22.04.1 LTS
   * https://ubuntu.com/download/desktop
4. Install Linux OS
   * Start: normal start on VM
5. Enable copying
   * Settings => Advanced:
     * Shared Clipboard: Bidirectional
     * Drag'n'Drop: Bidirectional
   * Download VirtualBox 7.0.6 Oracle VM VirtualBox Extension Pack
     * https://www.virtualbox.org/wiki/Downloads
   * Install
   * Open VM
   * Devices (top menu) => Insert Guest Additions CD image... => Run => Auth => Unmount
6. Set Network (Change default is not good for security)
   * Settings => Network
   * Or leave it as default
7. Set Shared folders (Change default is not good for security)
   * Settings => Shared folders