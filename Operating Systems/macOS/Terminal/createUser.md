## Create new User:

[Create new User on macOS terminal](https://www.youtube.com/watch?v=l50IQfkbQ8k)

[ow-do-i-create-user-accounts-from-the-terminal-in-mac-os-x](https://apple.stackexchange.com/questions/226073/how-do-i-create-user-accounts-from-the-terminal-in-mac-os-x-10-11)

`sudo dscl . -create /Users/anna`

`sudo dscl . -create /Users/anna UserShell /bin/bash`

`sudo dscl . -create /Users/anna RealName “Anna Shabunova”`

`sudo dscl . -create /Users/anna UniqueID 1001`

`sudo dscl . -create /Users/anna PrimaryGroupID 1000`

`sudo dscl . -create /Users/anna NFSHomeDirectory /Local/Users/ anna`

`sudo dscl . -passwd /Users/anna 123123123Aa`

`sudo dscl . -append /Groups/admin GroupMembership anna`


* `dscl . list /users` - list of users
  * `dscl . list /users | grep anna` - check created user


* `dscl . list /groups` - list of groups
  * `dscl . list /groups | grep GroupMembership`


* `sudo dscl . -delete /users/anna` - **delete** user
  * `sudo dscl . -delete /groups/test` - **delete** group