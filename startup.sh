#!/bin/bash
echo "--- [CUSTOM STARTUP SCRIPT] ---"

cd /home/container || exit 1

REPO_URL="https://github.com/chev0004/Maybe-Bot.git"
BRANCH="develop"

# --- CLONE OR PULL ---
if [ -d ".git" ]; then
  echo "[CUSTOM STARTUP SCRIPT] Found .git directory. Pulling latest changes..."
  git fetch origin "$BRANCH"
  git reset --hard "origin/$BRANCH"
  echo "[CUSTOM STARTUP SCRIPT] Git pull complete."
else
  echo "[CUSTOM STARTUP SCRIPT] No .git directory found. Cloning repository..."
  # Keep startup.sh and .env safe
  find . -mindepth 1 -maxdepth 1 ! -name "startup.sh" ! -name ".env" -exec rm -rf {} +
  git clone --branch "$BRANCH" --single-branch "$REPO_URL" ./temp
  mv ./temp/.[!.]* . 2>/dev/null
  mv ./temp/* . 2>/dev/null
  rm -rf ./temp
  echo "[CUSTOM STARTUP SCRIPT] Repository cloned."
fi

# --- INSTALL PRODUCTION DEPENDENCIES ---
if [ -f "package.json" ]; then
  echo "[CUSTOM STARTUP SCRIPT] Found package.json. Installing production dependencies..."
  bun install --production
  echo "[CUSTOM STARTUP SCRIPT] Production install complete."
else
  echo "[CUSTOM STARTUP SCRIPT] No package.json found, skipping install."
  exit 1
fi

# --- START BOT ---
# No build step is needed as the dist folder is pulled from Git.
if [ -z "$BOT_JS_FILE" ]; then
  BOT_JS_FILE="dist/index.js"
fi

echo "[CUSTOM STARTUP SCRIPT] Starting bot with PM2: pm2-runtime start /home/container/${BOT_JS_FILE} --name \"maybe-bot\""
exec /home/container/node_modules/.bin/pm2-runtime start "/home/container/${BOT_JS_FILE}" --name "maybe-bot"