### NPM vs YARN project update:
1. Check **npm**, **nvm** and **node** versions:
   1. ```$ nvm -v```
   2. ```$ node -v```
   3. ```$ npm -v```
   4. ```$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh```
   5. ```$ . ~/.nvm/nvm.sh```
   6. ```$ nvm install node 16.13.2``` - Proceed and install the Node.js 16.x version that you want
      1. `Downloading and installing node v19.3.0...`
   7. ```$ nvm use 16.13.2``` - change version
   8. ```$ touch ~/.zshrc touch ~/.bash_profile``` or ```$ touch ~/.bash_profile``` or ```$ source ~/.bash_profile``` or ```$ ~/.zshrc``` or ```$ . ~/.zshrc```
   9. ```$ nvm list-remote``` - check the available Node.js versions

2. ### NPM:
   1. ```npm ci```

3. ### [YARN:](https://stackoverflow.com/questions/58482655/what-is-the-closest-to-npm-ci-in-yarn)
   1. ```yarn install --frozen-lockfile```
   2. ```rm -rf node_modules && yarn install --frozen-lockfile``` === closest to "npm ci" command