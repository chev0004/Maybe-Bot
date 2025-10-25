module.exports = {
  apps: [
    {
      name: "maybe-bot",
      script: "./dist/index.js",
      watch: true,
      ignore_watch: [
        "node_modules",
        ".git",
        "*.log",
        "logs/",
        "bot_data.json",
        "confessions_log.json",
        "drizzle/",
        "src/",
      ],
      watch_options: {
        followSymlinks: false,
      },
    },
  ],
};
