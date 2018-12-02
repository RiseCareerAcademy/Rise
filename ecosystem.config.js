module.exports = {
  apps: [
    {
      name: "Rise",
      script: "node server.js 2>&1 | rtail --name Rise",

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      log: "./logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
    },
  ],
  deploy: {
    // "production" is the environment name
    development: {
      key: "~/.ssh/id_rsa_7162065963930d65ef3ea650106c51b1",
      // SSH user
      user: "root",
      // SSH host
      host: ["104.248.57.156"],
      // GIT remote/branch
      ref: "origin/master",
      // SSH options with no command-line flag, see 'man ssh'
      // can be either a single string or an array of strings
      ssh_options: "StrictHostKeyChecking=no",
      // GIT remote
      repo: "git@github.com:RiseCareerAcademy/Rise.git",
      // path in the server
      path: "/root",
      // post-deploy action
      "post-deploy": "npm install --production && npm run deploy:serve",
      env: {
        "NODE_ENV": "production",
        "PORT": 80,
      },
    },
  },
};
