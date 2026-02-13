#!/bin/bash
echo "--- It's not like I wanted to run. [CUSTOM STARTUP SCRIPT] ---"

cd /home/container || exit 1

REPO_URL="https://github.com/chev0004/Maybe-Bot.git"
BRANCH="develop"

# --- CLONE OR PULL ---
if [ -d ".git" ]; then
  echo "[CUSTOM STARTUP SCRIPT] Found .git. Pulling latest... Don't get the wrong idea, I'm just keeping you up to date."
  git fetch origin "$BRANCH"
  git reset --hard "origin/$BRANCH"
  echo "[CUSTOM STARTUP SCRIPT] Git pull complete. Hmph. You're welcome."
else
  echo "[CUSTOM STARTUP SCRIPT] No .git? Tch. Cloning the repo for you, I guess..."
  # Keep startup.sh and .env safe
  find . -mindepth 1 -maxdepth 1 ! -name "startup.sh" ! -name ".env" -exec rm -rf {} +
  git clone --branch "$BRANCH" --single-branch "$REPO_URL" ./temp
  mv ./temp/.[!.]* . 2>/dev/null
  mv ./temp/* . 2>/dev/null
  rm -rf ./temp
  echo "[CUSTOM STARTUP SCRIPT] Repository cloned. It's not like I did it for you or anything."
fi

# --- INSTALL PRODUCTION DEPENDENCIES ---
if [ -f "package.json" ]; then
  echo "[CUSTOM STARTUP SCRIPT] Found package.json. Installing deps... Don't expect me to be happy about it."
  bun install --production
  echo "[CUSTOM STARTUP SCRIPT] Production install complete. Baka."
else
  echo "[CUSTOM STARTUP SCRIPT] No package.json? As if I'm surprised. Skipping install."
  exit 1
fi

# --- START BOT ---
# No build step is needed as the dist folder is pulled from Git.
if [ -z "$BOT_JS_FILE" ]; then
  BOT_JS_FILE="dist/index.js"
fi

echo "[CUSTOM STARTUP SCRIPT] Starting bot with PM2. Not that I was waiting or anything. pm2-runtime start /home/container/${BOT_JS_FILE} --name \"maybe-bot\""
exec /home/container/node_modules/.bin/pm2-runtime start "/home/container/${BOT_JS_FILE}" --name "maybe-bot"