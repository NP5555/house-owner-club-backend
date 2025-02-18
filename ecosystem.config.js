module.exports = {
    apps: [
      {
        name: "backend", // Name of the process
        script: "yarn", // Use Yarn to run the script
        args: "start:dev --port=8000", // Arguments passed to Yarn
        interpreter: "bash", // Use bash to run the command
        env: {
          NODE_ENV: "development", // Environment variables
        },
      },
    ],
  };