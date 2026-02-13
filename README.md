# Maybe-Bot

Custom bot for an in-house language learning Discord server.  
自前の語学系Discord用ボット。

**Server:** [discord.gg/nCSuMW95zk](https://discord.gg/nCSuMW95zk)

## Stack | 技術スタック

| Layer | Tech |
|-------|------|
| Runtime | Bun / Node 18+ |
| Language | TypeScript |
| Discord | discord.js 14 |
| Database | Drizzle ORM, PostgreSQL |
| Minecraft | exaroton API |
| Lint / format | Biome |
| Git hooks | Husky, commitlint (conventional, no scope), lint-staged |
| Build | tsc (incremental) |

## Prerequisites | 必要環境

- **Bun** (recommended) or Node 18+
- **PostgreSQL** (for Drizzle)
- Git

## Setup | セットアップ

1. **Clone and install**
   ```bash
   git clone https://github.com/chev0004/Maybe-Bot.git
   cd Maybe-Bot
   bun install
   ```

2. **Environment**
   ```bash
   cp .env.example .env
   ```
   Set at minimum: `TOKEN`, `CLIENT_ID`, `GUILD_ID`, `DATABASE_URL`. See [Environment variables](#environment-variables).

3. **Database**
   ```bash
   bun run db:migrate
   ```
   Uses `DATABASE_URL`. Applies baseline and migrations.

4. **Build and run**
   ```bash
   bun run build
   bun run start
   ```

## Development | 開発

- **Watch build and run:** `bun run dev` (tsc -w + node --watch)
- **Lint:** `bun run lint` (Biome check --write)
- **Format:** `bun run format` (Biome format --write)
- **Type-check only:** `bun run type-check` (tsc --noEmit)

**Git hooks (Husky):**
- **pre-commit:** lint-staged (Biome on staged `.ts`, `.json`, `.md`)
- **commit-msg:** commitlint (conventional commits, no scope)
- **pre-push:** `bun run lint` then `bun run type-check`

## Scripts | スクリプト

| Script | Command | Description |
|--------|---------|-------------|
| build | `bun run build` | Compile TypeScript to `dist/` |
| start | `bun run start` | Run `node dist/index.js` |
| dev | `bun run dev` | Watch build and run |
| db:migrate | `bun run db:migrate` | Run baseline + Drizzle migrations |
| lint | `bun run lint` | Biome check --write |
| format | `bun run format` | Biome format --write |
| type-check | `bun run type-check` | tsc --noEmit |
| preview:ui | `bun run preview:ui` | Nodemon + tsx for preview server |

## Server / deployment | サーバー・デプロイ

The bot is designed to run in a container and is kept up to date via Git and owner-only Discord commands.

### startup.sh

Runs when the container starts. Expects `cd /home/container` and uses `REPO_URL` / `BRANCH` (default: this repo, `develop`).

1. **Clone or pull:** If `.git` exists, `git fetch` + `git reset --hard origin/develop`. Otherwise removes everything except `startup.sh` and `.env`, then clones the repo.
2. **Install:** `npm install --production` (no devDependencies). The container is expected to provide Node/npm only.
3. **Start:** `pm2-runtime start dist/index.js --name maybe-bot`. No build step: `dist/` is committed to Git so the server runs pre-built JS.

`pm2-runtime` keeps the process running and restarts it on crash or exit. Override entry with env `BOT_JS_FILE` (default `dist/index.js`).

### In-Discord updates

- **`/restart`** (owner-only): Saves restart context, then `process.exit(0)` after 3s. PM2 restarts the process; same code, clean restart.
- **`/update`** (owner-only): Fetches `origin`, pulls `develop` (or `--force` for `git reset --hard`). If `package.json` changed, runs `npm install --production`. Then exits so PM2 restarts with the new code. No `tsc` on the server: updated `dist/` must be committed and pushed before running `/update`.

Typical flow: build locally (`bun run build`), commit `dist/`, push to `develop`. On the server, either let the next container start run `startup.sh` (pull + install + start) or run `/update` to pull and restart the current process.

## Environment variables | 環境変数

See `.env.example`. Required for normal run:

- **Discord:** `OWNER_ID`, `TOKEN`, `CLIENT_ID`, `GUILD_ID`, `TEST_GUILD_ID`
- **Database:** `DATABASE_URL`
- **Roles / channels:** `VERIFIED_ROLE_ID`, `VOICE_CATEGORY_ID`, `WELCOME_CHANNEL_ID`, `VOICE_LOG_CHANNEL_ID`, `CONFESSIONS_CHANNEL_ID`, `BUMP_CHANNEL_ID`, `BUMP_ROLE_ID`
- **Minecraft (exaroton):** `SERVER_ID`, `API_TOKEN`

Optional: learner role IDs (`EN_LEARNER_ROLE_ID`, `JP_LEARNER_ROLE_ID`, `ENJA_LEARNER_ROLE_ID`).

## Project structure | ディレクトリ構成

```
src/
  index.ts              # Entry
  config/                # Env and app config
  constants/             # Colors, strings
  db/                    # Drizzle schema and client
  commands/              # Slash and message commands
  commands/slash/        # Slash by category (adminonly, management, minecraft, owneronly, social, stats, utility)
  commands/message/      # Message commands (e.g. purgeto)
  handlers/              # commandHandler, interactionHandler, listenerHandler
  listeners/             # message (bump, intro, stats), voice (voiceStateUpdate)
  interactions/          # Modals, buttons, select menus
  utils/                 # Helpers, managers, services, builders
  scripts/               # baseline-and-migrate (db)
```

Output: `dist/` (from `tsc`, `rootDir: src`).

## Features (overview) | 機能概要

- **Admin:** purge, purgeto
- **Management:** listunverified
- **Minecraft:** smite, startserver, statusserver, whitelist (exaroton)
- **Owner:** restart, update (git pull + rebuild)
- **Social:** confess, reply (anonymous)
- **Stats:** top (leaderboards)
- **Utility:** uptime, vc (temp voice channels)
- **Listeners:** Disboard/Dissoku bump, introduction validation, message stats, voice state tracking
