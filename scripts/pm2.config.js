module.exports = {
  apps: [
    {
      name: "marktion",
      script: "npm",
      args: "run start",
      autorestart: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
