## VIM COMMANDS:
[Working with Vim Editor](https://techworld-with-nana.teachable.com/courses/1108792/lectures/32582296)
[Vim Cheat Sheet](https://vim.rtorr.com/)

* `brew install vim` - Install command
  * `sudo apt install vim` - Install command for Ubuntu

* `vim [filename]` - **open** file or **create** file
  * `vim yarn.lock`
* `i` - Insert mode
  * `esc` - close insert mode
* `:wq` - write (save) and quit
  * `:q!` - quit and throw away unsaved changes
* `dd` - delete line in a command mode
  * `d10` - delete 10 lines in a command mode
* `u` - undo changes in a command mode
* `A` - Jump to end of line and switch to insert mode
* `$` - Jump to end of line and NO switch to insert mode
* `0` - Jump to beginning of line and NO switch to insert mode
* `16G` - GO to line 16
* `/pattern` - search for pattern
  * `n` - jump to next match
  * `N` - search in opposite direction
* `:%s/old/new` - replace old with new in all file