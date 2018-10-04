[![CircleCI](https://circleci.com/gh/RiseMentors/Rise/tree/master.svg?style=svg)](https://circleci.com/gh/RiseMentors/Rise/tree/master)
# Rise

# How to Install

## Git (If Not Already Installed)
1. https://git-scm.com/
2. Setup username: https://help.github.com/articles/setting-your-username-in-git/ 
3. Setup email: https://help.github.com/articles/setting-your-commit-email-address-in-git/ 

## VSCode
1. Install [VSCode](https://code.visualstudio.com/)
2. Open VSCode
3. Open VSCode's terminal
    - `Cmd`/`Ctrl`+ `Shift` + `P` then type >Terminal
## Node.js
1. Install Node Version Manager (nvm) 

**Mac OSX**
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```
```bash
export NVM_DIR="${XDG_CONFIG_HOME/:-$HOME/.}nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```
**Windows**
Run the .exe file in [nvm-setup.zip](https://github.com/coreybutler/nvm-windows/releases/download/1.1.7/nvm-setup.zip).

2. Install latest Node.js version:
```bash
nvm install 10.11.0 
```

## Setup the Rise Repo
1. Clone the repo
```
git clone https://github.com/RiseMentors/Rise.git
```
2. Go to the repo
```
cd Rise
```
3. Install dependencies
```
npm install
```
4. Start app

**Mac OSX**
```
npm start
```
**Windows**
```
npm install -g expo-cli # Only need to install this once.
expo start
```
5. Download Expo App on Phone
6. Open Expo App
7. Scan the QR code
