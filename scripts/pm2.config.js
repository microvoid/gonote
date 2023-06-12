module.exports = {
  apps: [
    {
      name: "marktion",
      script: "npm",
      args: "run start",
      autorestart: true,
      env: {
        PORT: 3301,
        NODE_ENV: "production",
      },
    },
  ],
};
