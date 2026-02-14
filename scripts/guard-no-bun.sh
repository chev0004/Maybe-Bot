#!/bin/sh
set -e

[ -r "/proc/self/comm" ] || exit 0

pid="${PPID}"
while [ -n "$pid" ] && [ "$pid" -gt 0 ]; do
  comm=""
  if [ -r "/proc/$pid/comm" ]; then
    comm=$(cat "/proc/$pid/comm" 2>/dev/null || true)
  fi
  if [ "$comm" = "bun" ]; then
    rm -f bun.lock
    echo ""
    echo "❌ W-what?! Don't you dare use Bun in this repo!"
    echo "   We use npm only. It's not like I care what you use, but..."
    echo "   use \`npm run <script>\` instead. Baka."
    echo ""
    exit 1
  fi
  next=""
  if [ -r "/proc/$pid/status" ]; then
    next=$(grep '^PPid:' "/proc/$pid/status" 2>/dev/null | awk '{print $2}' || true)
  fi
  pid=$next
done
exit 0
