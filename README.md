[![CircleCI](https://circleci.com/gh/RiseCareerAcademy/Rise/tree/master.svg?style=svg)](https://circleci.com/gh/RiseMentors/Rise/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/RiseCareerAcademy/Rise/badge.svg?branch=master&service=github)](https://coveralls.io/github/RiseCareerAcademy/Rise?branch=master)
# Rise
![logo](http://risecareer.org/images/logo.png)
- [Rise](#rise)
- [How to Install](#how-to-install)
  * [Git (If Not Already Installed)](#git--if-not-already-installed-)
  * [VSCode](#vscode)
  * [Node.js](#nodejs)
  * [Set up Postman and local server](#set-up-postman-and-local-server)
  * [Setup the Rise Repo](#setup-the-rise-repo)
- [Development](#development)
  * [Folder Structure](#folder-structure)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

# Demoing (Projects Ready for Testing)

1. Install Expo app on [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US) or [iOS](https://itunes.apple.com/us/app/expo-client/id982107779?mt=8)

2. Login on the Expo app using the following account:
    ```
    Username: kmui2
    Password: Rise@2018
    ```
2. Scan QR code [here](https://expo.io/@kmui2/Rise) on the camera app for iOS or on the Expo app for Android

3. **Server Debugging:** Open [http://104.248.57.156:8080/#/streams/Rise](http://104.248.57.156:8080/#/streams/Rise).

# Development

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
    ```bash
    git clone https://github.com/RiseMentors/Rise.git
    ```

2. Go to the repo
    ```bash
    cd Rise
    ```

3. Install dependencies
    ```bash
    npm install

     # if there is a cb() never called! error, verify the cache:
     npm cache verify
    ```

4. Start server
    ```bash
    npm run serve
    ```

5. Start app

    ```bash
    # Mac OSX
    npm start 

    #Windows
    npm install -g expo-cli # Only need to install this once.
    expo start 
    ```
6. Install Expo app on [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US) or [iOS](https://itunes.apple.com/us/app/expo-client/id982107779?mt=8)


7. Scan QR code on the camera app for iOS or on the Expo app for Android.

## Set up Postman and local server

In order to fully run Rise on expo, one must also have a local server. Here are instructions to get you started:
https://docs.google.com/document/d/1qTC6WCncEo7d6_XF3DdekR6pyNq37f7atdX5i14J3xI/edit?usp=sharing

This will allow you to find a matching mentor that is pre-populated in the database.

## Folder Structure

```
Rise
├── assets            # fonts and images
├── components        # components
├── config            # database configurations
├── constants         # constants for styling and types
├── navigation        # screen and tabs react-naviagtion
├── public            # for getting SSL certificate by rendering an HTML template
├── routes            # api routes with controllers and models
├── screens           # mobile screens composed of components
|
├── server.js         # handles the middleware and routes to the routes folder
├── App.js            # container for all the screens
└── package.json      # lists all the dependencies and npm scripts

* Do not touch this file!
```
