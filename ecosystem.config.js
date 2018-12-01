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
};
