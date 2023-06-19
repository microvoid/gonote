module.exports = {
  apps: [
    {
      name: "gonote",
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
