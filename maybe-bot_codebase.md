# Codebase for: maybe-bot
# Generated on: 2025-10-23 07:53:29
# Total files: 106
================================================================================

---
### File: `.env.example`
---

```example
# Discord Bot
OWNER_ID=
TOKEN=
CLIENT_ID=
GUILD_ID=
TEST_GUILD_ID=

# Roles
BUMP_ROLE_ID=
VERIFIED_ROLE_ID=

# Channels
VOICE_CATEGORY_ID=
BUMP_CHANNEL_ID=
WELCOME_CHANNEL_ID=
VOICE_LOG_CHANNEL_ID=
CONFESSIONS_CHANNEL_ID=

# Exaroton (Minecraft)
SERVER_ID=
API_TOKEN=

# Database
DATABASE_URL=
```

---
### File: `.gitignore`
---

```
node_modules/
dist/

.env

bot_data.json
confessions_log.json

*.log
logs/

*.txt
```

---
### File: `README.md`
---

```md
# Maybe-Bot

Maybe-Botは、サーバー管理、Minecraftサーバー連携、ソーシャルコマンドなど、さまざまな機能を備えたDiscordボットです。  
Maybe-Bot is a Discord bot with various features such as server management, Minecraft integration, and social commands.

---

## 🧩 主な機能 | Features

- **サーバー管理 | Server Management:** メッセージ削除、未認証メンバーのリスト表示、ロール管理。  
  Purge messages, list unverified members, and manage roles.

- **Minecraft連携 | Minecraft Integration:** サーバーの起動、停止、ステータス監視。  
  Start, stop, and monitor a Minecraft server.

- **ソーシャル | Social:** 匿名での告白や返信などのコミュニケーション機能。  
  Anonymous confessions and replies between users.

---

## ⚙️ コマンド | Commands

### 🔧 管理者 | Admin

#### `/purge`
チャンネルからメッセージを削除。  
Delete messages from a channel.  
**オプション | Options:**
- `amount`: 削除するメッセージ数 (1–100)  
  Number of messages to delete (1–100)
- `user`: このユーザーのメッセージのみ削除  
  Delete only messages from this user
- `link`: このメッセージまで削除  
  Delete messages up to this message  

#### `purgeto`
特定のメッセージまでメッセージを削除。  
Purge messages up to a specific message.  

<img width="836" height="402" alt="image" src="https://github.com/user-attachments/assets/7d0eeae0-abac-4d1b-b4af-063ef2b6c7dd" />

---

### 🧭 管理 | Management

#### `/listunverified`
認証ロールを持たないメンバーをリスト表示。  
List members without the verified role.  
**オプション | Options:**
- `test`: テストモードで偽データを生成  
  Generate fake data in test mode  

<img width="765" height="665" alt="image" src="https://github.com/user-attachments/assets/7f0a324b-5a43-4fe5-a625-c4e4e6379c5b" />

---

### ⛏️ マインクラフト | Minecraft

#### `/smite`
人に神罰を与える。  
Punish someone with the Wrath of God.  
**オプション | Options:**
- `victim`: 神罰を受ける者の名前  
  Name of the victim to smite  

<img width="642" height="252" alt="image" src="https://github.com/user-attachments/assets/3499b073-bd43-4465-94af-6feaa8c5f210" />

#### `/startserver`
マイクラサーバーを起動。  
Start the Minecraft server.

<img width="669" height="260" alt="image" src="https://github.com/user-attachments/assets/7807ea6c-6237-47e7-95e6-d6c0ae089fe2" />

#### `/statusserver`
マイクラサーバーの現在状況を表示。  
Display the current Minecraft server status.

<img width="548" height="356" alt="image" src="https://github.com/user-attachments/assets/aff4a08f-bb82-45db-97df-b28b2010ce82" />

#### `/whitelist`
マイクラサーバーのホワイトリストにユーザーを追加。  
Add a user to the Minecraft server whitelist.  
**オプション | Options:**
- `username`: ホワイトリストに追加するユーザー名  
  Username to add to the whitelist  
- `bedrock`: 統合版ユーザーならtrue  
  Set to true if the user is on Bedrock Edition  

<img width="618" height="308" alt="image" src="https://github.com/user-attachments/assets/22a12fd5-c858-45a4-8957-c15fd27ee594" />

---

### 👑 オーナーのみ | Owner Only

#### `/restart`
BOTを再起動。  
Restart the bot.

#### `/update`
GitHubから最新のコミットを取得し、BOTを再起動。  
Pull the latest changes from GitHub and restart.  
**オプション | Options:**
- `test`: 実際の更新を行わずテストモードで実行  
  Run in test mode without applying updates  
- `force`: ローカルの変更を強制上書き  
  Force overwrite local changes  
- `test_scenario`: テストモードでシナリオ指定  
  Specify a test scenario when running in test mode  

<img width="674" height="934" alt="image" src="https://github.com/user-attachments/assets/57ed4e46-254e-441f-9bde-88ff521a3d26" />

---

### 💬 ソーシャル | Social

#### `/confess`
匿名でメッセージを投稿。  
Post an anonymous confession.  

<img width="759" height="258" alt="image" src="https://github.com/user-attachments/assets/7fe41442-4f32-4658-a2a0-98bab03b8aec" />

#### `/reply`
特定の投稿に匿名で返信。  
Reply anonymously to a specific confession.  
**オプション | Options:**
- `id`: 返信対象の投稿ID  
  ID of the confession to reply to  

<img width="760" height="325" alt="image" src="https://github.com/user-attachments/assets/5fb8b8a4-5b29-48ec-9204-add4f0857312" />

---

### 📊 統計 | Stats

#### `/top`
サーバーランキングを表示。  
Display server leaderboards.  

<img width="850" height="616" alt="image" src="https://github.com/user-attachments/assets/018b1308-c273-4b13-a579-e4e761953eff" />

---

### 🧰 ユーティリティ | Utility

#### `/uptime`
BOTの稼働時間を表示。  
Display the bot's uptime.

<img width="531" height="331" alt="image" src="https://github.com/user-attachments/assets/639b112a-ccf6-458d-ad8e-f08fda04a9e0" />

#### `/vc`
一時的なボイスチャンネルを作成。  
Create a temporary voice channel.  
**オプション | Options:**
- `emoji`: チャンネル名に使用する絵文字  
  Emoji to include in the channel name  
- `jpname`: ボイスチャンネル名（日本語）  
  Voice channel name in Japanese  
- `enname`: ボイスチャンネル名（英語）  
  Voice channel name in English  
- `limit`: ユーザー制限（0で無制限）  
  User limit (0 for unlimited)  

<img width="1258" height="240" alt="image" src="https://github.com/user-attachments/assets/5058795e-45a5-489c-8e74-cd1bb95edd28" />

---

## 🎧 リスナー | Listeners

- **Disboard Bump:** DisboardのBumpを検知して通知。  
  Detects Disboard bumps and sends notifications.  
- **Dissoku Bump:** DissokuのBumpを検知して通知。  
  Detects Dissoku bumps and sends notifications.  
- **Introduction Message:** 自己紹介を自動で確認し、正しければメンバーロールを付与。  
  Automatically validates introductions and assigns the member role if valid.
- **Message Stat Tracker:** メッセージ数とアクティビティを記録。  
  Tracks message counts and activity levels.  
- **Voice State Update:** ボイスチャンネルの入退室やチャンネル移動を記録。  
  Records voice channel joins, leaves, and channel swaps.  

---

## 🧑‍💻 開発 | Development

### セットアップ | Setup

1. リポジトリをクローン  
   Clone the repository  
   `git clone https://github.com/chev0004/maybe-bot.git`
2. 依存関係をインストール  
   Install dependencies  
   `npm install`
3. `.env.example` を `.env` にコピーして環境変数を設定  
   Copy `.env.example` to `.env` and configure environment variables  
4. データベースをマイグレート  
   Migrate the database  
   `npx drizzle-kit migrate`
5. ビルド  
   Build the project  
   `npm run build`
6. 起動  
   Start the bot  
   `npm start`

---

### 環境変数 | Environment Variables
```env
# Discord Bot
OWNER_ID=
TOKEN=
CLIENT_ID=
GUILD_ID=
TEST_GUILD_ID=

# Roles
BUMP_ROLE_ID=
VERIFIED_ROLE_ID=

# Channels
VOICE_CATEGORY_ID=
BUMP_CHANNEL_ID=
WELCOME_CHANNEL_ID=
VOICE_LOG_CHANNEL_ID=
CONFESSIONS_CHANNEL_ID=

# Exaroton (Minecraft)
SERVER_ID=
API_TOKEN=

# Database
DATABASE_URL=
```

---

### スクリプト | Scripts
```bash
# TypeScriptをビルド
npm run build

# BOTを起動
npm run start

# 開発モード (自動ビルド・再起動)
npm run dev

# Biomeでコードをチェック・フォーマット
npm run lint

# Biomeでコードをフォーマット
npm run format
```

---

## 💡 Motivation

Maybe-Bot began as a way to bring new, fun, and useful features to my Discord community. As I started building it, the project also became the perfect opportunity to apply the architectural patterns and modern tooling I used in my professional work.

---

```

---
### File: `package-lock.json`
---

```json
{
  "name": "maybe-bot",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "maybe-bot",
      "version": "1.0.0",
      "license": "ISC",
      "dependencies": {
        "canvas": "^3.2.0",
        "discord.js": "^14.18.0",
        "dotenv": "^16.4.7",
        "drizzle-kit": "^0.31.5",
        "drizzle-orm": "^0.44.5",
        "exaroton": "^1.11.3",
        "nodemon": "^3.1.10",
        "pm2": "^6.0.13",
        "postgres": "^3.4.7",
        "twemoji-parser": "^14.0.0"
      },
      "devDependencies": {
        "@biomejs/biome": "^2.2.4",
        "@commitlint/cli": "^19.8.1",
        "@commitlint/config-conventional": "^19.8.1",
        "@types/exaroton": "^1.11.1",
        "@types/express": "^5.0.3",
        "@types/node": "^24.5.2",
        "@types/twemoji-parser": "^13.1.4",
        "express": "^5.1.0",
        "husky": "^9.1.7",
        "tsx": "^4.20.6",
        "typescript": "^5.9.2"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.27.1.tgz",
      "integrity": "sha512-cjQ7ZlQ0Mv3b47hABuTevyTuYN4i+loJKGeV9flcCgIK37cCXRh+L1bd3iBHlynerhQ7BhCkn2BPbQUL+rGqFg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.27.1",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.27.1.tgz",
      "integrity": "sha512-D2hP9eA+Sqx1kBZgzxZh0y1trbuU+JoDkiEwqhQ36nodYqJwyEIhPSdMNd7lOm/4io72luTPWH20Yda0xOuUow==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@biomejs/biome": {
      "version": "2.2.4",
      "resolved": "https://registry.npmjs.org/@biomejs/biome/-/biome-2.2.4.tgz",
      "integrity": "sha512-TBHU5bUy/Ok6m8c0y3pZiuO/BZoY/OcGxoLlrfQof5s8ISVwbVBdFINPQZyFfKwil8XibYWb7JMwnT8wT4WVPg==",
      "dev": true,
      "license": "MIT OR Apache-2.0",
      "bin": {
        "biome": "bin/biome"
      },
      "engines": {
        "node": ">=14.21.3"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/biome"
      },
      "optionalDependencies": {
        "@biomejs/cli-darwin-arm64": "2.2.4",
        "@biomejs/cli-darwin-x64": "2.2.4",
        "@biomejs/cli-linux-arm64": "2.2.4",
        "@biomejs/cli-linux-arm64-musl": "2.2.4",
        "@biomejs/cli-linux-x64": "2.2.4",
        "@biomejs/cli-linux-x64-musl": "2.2.4",
        "@biomejs/cli-win32-arm64": "2.2.4",
        "@biomejs/cli-win32-x64": "2.2.4"
      }
    },
    "node_modules/@biomejs/cli-darwin-arm64": {
      "version": "2.2.4",
      "resolved": "https://registry.npmjs.org/@biomejs/cli-darwin-arm64/-/cli-darwin-arm64-2.2.4.tgz",
      "integrity": "sha512-RJe2uiyaloN4hne4d2+qVj3d3gFJFbmrr5PYtkkjei1O9c+BjGXgpUPVbi8Pl8syumhzJjFsSIYkcLt2VlVLMA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT OR Apache-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=14.21.3"
      }
    },
    "node_modules/@biomejs/cli-darwin-x64": {
      "version": "2.2.4",
      "resolved": "https://registry.npmjs.org/@biomejs/cli-darwin-x64/-/cli-darwin-x64-2.2.4.tgz",
      "integrity": "sha512-cFsdB4ePanVWfTnPVaUX+yr8qV8ifxjBKMkZwN7gKb20qXPxd/PmwqUH8mY5wnM9+U0QwM76CxFyBRJhC9tQwg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT OR Apache-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=14.21.3"
      }
    },
    "node_modules/@biomejs/cli-linux-arm64": {
      "version": "2.2.4",
      "resolved": "https://registry.npmjs.org/@biomejs/cli-linux-arm64/-/cli-linux-arm64-2.2.4.tgz",
      "integrity": "sha512-M/Iz48p4NAzMXOuH+tsn5BvG/Jb07KOMTdSVwJpicmhN309BeEyRyQX+n1XDF0JVSlu28+hiTQ2L4rZPvu7nMw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT OR Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=14.21.3"
      }
    },
    "node_modules/@biomejs/cli-linux-arm64-musl": {
      "version": "2.2.4",
      "resolved": "https://registry.npmjs.org/@biomejs/cli-linux-arm64-musl/-/cli-linux-arm64-musl-2.2.4.tgz",
      "integrity": "sha512-7TNPkMQEWfjvJDaZRSkDCPT/2r5ESFPKx+TEev+I2BXDGIjfCZk2+b88FOhnJNHtksbOZv8ZWnxrA5gyTYhSsQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT OR Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=14.21.3"
      }
    },
    "node_modules/@biomejs/cli-linux-x64": {
      "version": "2.2.4",
      "resolved": "https://registry.npmjs.org/@biomejs/cli-linux-x64/-/cli-linux-x64-2.2.4.tgz",
      "integrity": "sha512-orr3nnf2Dpb2ssl6aihQtvcKtLySLta4E2UcXdp7+RTa7mfJjBgIsbS0B9GC8gVu0hjOu021aU8b3/I1tn+pVQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT OR Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=14.21.3"
      }
    },
    "node_modules/@biomejs/cli-linux-x64-musl": {
      "version": "2.2.4",
      "resolved": "https://registry.npmjs.org/@biomejs/cli-linux-x64-musl/-/cli-linux-x64-musl-2.2.4.tgz",
      "integrity": "sha512-m41nFDS0ksXK2gwXL6W6yZTYPMH0LughqbsxInSKetoH6morVj43szqKx79Iudkp8WRT5SxSh7qVb8KCUiewGg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT OR Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=14.21.3"
      }
    },
    "node_modules/@biomejs/cli-win32-arm64": {
      "version": "2.2.4",
      "resolved": "https://registry.npmjs.org/@biomejs/cli-win32-arm64/-/cli-win32-arm64-2.2.4.tgz",
      "integrity": "sha512-NXnfTeKHDFUWfxAefa57DiGmu9VyKi0cDqFpdI+1hJWQjGJhJutHPX0b5m+eXvTKOaf+brU+P0JrQAZMb5yYaQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT OR Apache-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=14.21.3"
      }
    },
    "node_modules/@biomejs/cli-win32-x64": {
      "version": "2.2.4",
      "resolved": "https://registry.npmjs.org/@biomejs/cli-win32-x64/-/cli-win32-x64-2.2.4.tgz",
      "integrity": "sha512-3Y4V4zVRarVh/B/eSHczR4LYoSVyv3Dfuvm3cWs5w/HScccS0+Wt/lHOcDTRYeHjQmMYVC3rIRWqyN2EI52+zg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT OR Apache-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=14.21.3"
      }
    },
    "node_modules/@commitlint/cli": {
      "version": "19.8.1",
      "resolved": "https://registry.npmjs.org/@commitlint/cli/-/cli-19.8.1.tgz",
      "integrity": "sha512-LXUdNIkspyxrlV6VDHWBmCZRtkEVRpBKxi2Gtw3J54cGWhLCTouVD/Q6ZSaSvd2YaDObWK8mDjrz3TIKtaQMAA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@commitlint/format": "^19.8.1",
        "@commitlint/lint": "^19.8.1",
        "@commitlint/load": "^19.8.1",
        "@commitlint/read": "^19.8.1",
        "@commitlint/types": "^19.8.1",
        "tinyexec": "^1.0.0",
        "yargs": "^17.0.0"
      },
      "bin": {
        "commitlint": "cli.js"
      },
      "engines": {
        "node": ">=v18"
      }
    },
    "node_modules/@commitlint/config-conventional": {
      "version": "19.8.1",
      "resolved": "https://registry.npmjs.org/@commitlint/config-conventional/-/config-conventional-19.8.1.tgz",
      "integrity": "sha512-/AZHJL6F6B/G959CsMAzrPKKZjeEiAVifRyEwXxcT6qtqbPwGw+iQxmNS+Bu+i09OCtdNRW6pNpBvgPrtMr9EQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@commitlint/types": "^19.8.1",
        "conventional-changelog-conventionalcommits": "^7.0.2"
      },
      "engines": {
        "node": ">=v18"
      }
    },
    "node_modules/@commitlint/config-validator": {
      "version": "19.8.1",
      "resolved": "https://registry.npmjs.org/@commitlint/config-validator/-/config-validator-19.8.1.tgz",
      "integrity": "sha512-0jvJ4u+eqGPBIzzSdqKNX1rvdbSU1lPNYlfQQRIFnBgLy26BtC0cFnr7c/AyuzExMxWsMOte6MkTi9I3SQ3iGQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@commitlint/types": "^19.8.1",
        "ajv": "^8.11.0"
      },
      "engines": {
        "node": ">=v18"
      }
    },
    "node_modules/@commitlint/ensure": {
      "version": "19.8.1",
      "resolved": "https://registry.npmjs.org/@commitlint/ensure/-/ensure-19.8.1.tgz",
      "integrity": "sha512-mXDnlJdvDzSObafjYrOSvZBwkD01cqB4gbnnFuVyNpGUM5ijwU/r/6uqUmBXAAOKRfyEjpkGVZxaDsCVnHAgyw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@commitlint/types": "^19.8.1",
        "lodash.camelcase": "^4.3.0",
        "lodash.kebabcase": "^4.1.1",
        "lodash.snakecase": "^4.1.1",
        "lodash.startcase": "^4.4.0",
        "lodash.upperfirst": "^4.3.1"
      },
      "engines": {
        "node": ">=v18"
      }
    },
    "node_modules/@commitlint/execute-rule": {
      "version": "19.8.1",
      "resolved": "https://registry.npmjs.org/@commitlint/execute-rule/-/execute-rule-19.8.1.tgz",
      "integrity": "sha512-YfJyIqIKWI64Mgvn/sE7FXvVMQER/Cd+s3hZke6cI1xgNT/f6ZAz5heND0QtffH+KbcqAwXDEE1/5niYayYaQA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=v18"
      }
    },
    "node_modules/@commitlint/format": {
      "version": "19.8.1",
      "resolved": "https://registry.npmjs.org/@commitlint/format/-/format-19.8.1.tgz",
      "integrity": "sha512-kSJj34Rp10ItP+Eh9oCItiuN/HwGQMXBnIRk69jdOwEW9llW9FlyqcWYbHPSGofmjsqeoxa38UaEA5tsbm2JWw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@commitlint/types": "^19.8.1",
        "chalk": "^5.3.0"
      },
      "engines": {
        "node": ">=v18"
      }
    },
    "node_modules/@commitlint/format/node_modules/chalk": {
      "version": "5.6.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-5.6.2.tgz",
      "integrity": "sha512-7NzBL0rN6fMUW+f7A6Io4h40qQlG+xGmtMxfbnH/K7TAtt8JQWVQK+6g0UXKMeVJoyV5EkkNsErQ8pVD3bLHbA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^12.17.0 || ^14.13 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/@commitlint/is-ignored": {
      "version": "19.8.1",
      "resolved": "https://registry.npmjs.org/@commitlint/is-ignored/-/is-ignored-19.8.1.tgz",
      "integrity": "sha512-AceOhEhekBUQ5dzrVhDDsbMaY5LqtN8s1mqSnT2Kz1ERvVZkNihrs3Sfk1Je/rxRNbXYFzKZSHaPsEJJDJV8dg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@commitlint/types": "^19.8.1",
        "semver": "^7.6.0"
      },
      "engines": {
        "node": ">=v18"
      }
    },
    "node_modules/@commitlint/lint": {
      "version": "19.8.1",
      "resolved": "https://registry.npmjs.org/@commitlint/lint/-/lint-19.8.1.tgz",
      "integrity": "sha512-52PFbsl+1EvMuokZXLRlOsdcLHf10isTPlWwoY1FQIidTsTvjKXVXYb7AvtpWkDzRO2ZsqIgPK7bI98x8LRUEw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@commitlint/is-ignored": "^19.8.1",
        "@commitlint/parse": "^19.8.1",
        "@commitlint/rules": "^19.8.1",
        "@commitlint/types": "^19.8.1"
      },
      "engines": {
        "node": ">=v18"
      }
    },
    "node_modules/@commitlint/load": {
      "version": "19.8.1",
      "resolved": "https://registry.npmjs.org/@commitlint/load/-/load-19.8.1.tgz",
      "integrity": "sha512-9V99EKG3u7z+FEoe4ikgq7YGRCSukAcvmKQuTtUyiYPnOd9a2/H9Ak1J9nJA1HChRQp9OA/sIKPugGS+FK/k1A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@commitlint/config-validator": "^19.8.1",
        "@commitlint/execute-rule": "^19.8.1",
        "@commitlint/resolve-extends": "^19.8.1",
        "@commitlint/types": "^19.8.1",
        "chalk": "^5.3.0",
        "cosmiconfig": "^9.0.0",
        "cosmiconfig-typescript-loader": "^6.1.0",
        "lodash.isplainobject": "^4.0.6",
        "lodash.merge": "^4.6.2",
        "lodash.uniq": "^4.5.0"
      },
      "engines": {
        "node": ">=v18"
      }
    },
    "node_modules/@commitlint/load/node_modules/chalk": {
      "version": "5.6.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-5.6.2.tgz",
      "integrity": "sha512-7NzBL0rN6fMUW+f7A6Io4h40qQlG+xGmtMxfbnH/K7TAtt8JQWVQK+6g0UXKMeVJoyV5EkkNsErQ8pVD3bLHbA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^12.17.0 || ^14.13 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/@commitlint/message": {
      "version": "19.8.1",
      "resolved": "https://registry.npmjs.org/@commitlint/message/-/message-19.8.1.tgz",
      "integrity": "sha512-+PMLQvjRXiU+Ae0Wc+p99EoGEutzSXFVwQfa3jRNUZLNW5odZAyseb92OSBTKCu+9gGZiJASt76Cj3dLTtcTdg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=v18"
      }
    },
    "node_modules/@commitlint/parse": {
      "version": "19.8.1",
      "resolved": "https://registry.npmjs.org/@commitlint/parse/-/parse-19.8.1.tgz",
      "integrity": "sha512-mmAHYcMBmAgJDKWdkjIGq50X4yB0pSGpxyOODwYmoexxxiUCy5JJT99t1+PEMK7KtsCtzuWYIAXYAiKR+k+/Jw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@commitlint/types": "^19.8.1",
        "conventional-changelog-angular": "^7.0.0",
        "conventional-commits-parser": "^5.0.0"
      },
      "engines": {
        "node": ">=v18"
      }
    },
    "node_modules/@commitlint/read": {
      "version": "19.8.1",
      "resolved": "https://registry.npmjs.org/@commitlint/read/-/read-19.8.1.tgz",
      "integrity": "sha512-03Jbjb1MqluaVXKHKRuGhcKWtSgh3Jizqy2lJCRbRrnWpcM06MYm8th59Xcns8EqBYvo0Xqb+2DoZFlga97uXQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@commitlint/top-level": "^19.8.1",
        "@commitlint/types": "^19.8.1",
        "git-raw-commits": "^4.0.0",
        "minimist": "^1.2.8",
        "tinyexec": "^1.0.0"
      },
      "engines": {
        "node": ">=v18"
      }
    },
    "node_modules/@commitlint/resolve-extends": {
      "version": "19.8.1",
      "resolved": "https://registry.npmjs.org/@commitlint/resolve-extends/-/resolve-extends-19.8.1.tgz",
      "integrity": "sha512-GM0mAhFk49I+T/5UCYns5ayGStkTt4XFFrjjf0L4S26xoMTSkdCf9ZRO8en1kuopC4isDFuEm7ZOm/WRVeElVg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@commitlint/config-validator": "^19.8.1",
        "@commitlint/types": "^19.8.1",
        "global-directory": "^4.0.1",
        "import-meta-resolve": "^4.0.0",
        "lodash.mergewith": "^4.6.2",
        "resolve-from": "^5.0.0"
      },
      "engines": {
        "node": ">=v18"
      }
    },
    "node_modules/@commitlint/rules": {
      "version": "19.8.1",
      "resolved": "https://registry.npmjs.org/@commitlint/rules/-/rules-19.8.1.tgz",
      "integrity": "sha512-Hnlhd9DyvGiGwjfjfToMi1dsnw1EXKGJNLTcsuGORHz6SS9swRgkBsou33MQ2n51/boIDrbsg4tIBbRpEWK2kw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@commitlint/ensure": "^19.8.1",
        "@commitlint/message": "^19.8.1",
        "@commitlint/to-lines": "^19.8.1",
        "@commitlint/types": "^19.8.1"
      },
      "engines": {
        "node": ">=v18"
      }
    },
    "node_modules/@commitlint/to-lines": {
      "version": "19.8.1",
      "resolved": "https://registry.npmjs.org/@commitlint/to-lines/-/to-lines-19.8.1.tgz",
      "integrity": "sha512-98Mm5inzbWTKuZQr2aW4SReY6WUukdWXuZhrqf1QdKPZBCCsXuG87c+iP0bwtD6DBnmVVQjgp4whoHRVixyPBg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=v18"
      }
    },
    "node_modules/@commitlint/top-level": {
      "version": "19.8.1",
      "resolved": "https://registry.npmjs.org/@commitlint/top-level/-/top-level-19.8.1.tgz",
      "integrity": "sha512-Ph8IN1IOHPSDhURCSXBz44+CIu+60duFwRsg6HqaISFHQHbmBtxVw4ZrFNIYUzEP7WwrNPxa2/5qJ//NK1FGcw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "find-up": "^7.0.0"
      },
      "engines": {
        "node": ">=v18"
      }
    },
    "node_modules/@commitlint/types": {
      "version": "19.8.1",
      "resolved": "https://registry.npmjs.org/@commitlint/types/-/types-19.8.1.tgz",
      "integrity": "sha512-/yCrWGCoA1SVKOks25EGadP9Pnj0oAIHGpl2wH2M2Y46dPM2ueb8wyCVOD7O3WCTkaJ0IkKvzhl1JY7+uCT2Dw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/conventional-commits-parser": "^5.0.0",
        "chalk": "^5.3.0"
      },
      "engines": {
        "node": ">=v18"
      }
    },
    "node_modules/@commitlint/types/node_modules/chalk": {
      "version": "5.6.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-5.6.2.tgz",
      "integrity": "sha512-7NzBL0rN6fMUW+f7A6Io4h40qQlG+xGmtMxfbnH/K7TAtt8JQWVQK+6g0UXKMeVJoyV5EkkNsErQ8pVD3bLHbA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^12.17.0 || ^14.13 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/@discordjs/builders": {
      "version": "1.11.3",
      "resolved": "https://registry.npmjs.org/@discordjs/builders/-/builders-1.11.3.tgz",
      "integrity": "sha512-p3kf5eV49CJiRTfhtutUCeivSyQ/l2JlKodW1ZquRwwvlOWmG9+6jFShX6x8rUiYhnP6wKI96rgN/SXMy5e5aw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@discordjs/formatters": "^0.6.1",
        "@discordjs/util": "^1.1.1",
        "@sapphire/shapeshift": "^4.0.0",
        "discord-api-types": "^0.38.16",
        "fast-deep-equal": "^3.1.3",
        "ts-mixer": "^6.0.4",
        "tslib": "^2.6.3"
      },
      "engines": {
        "node": ">=16.11.0"
      },
      "funding": {
        "url": "https://github.com/discordjs/discord.js?sponsor"
      }
    },
    "node_modules/@discordjs/collection": {
      "version": "1.5.3",
      "resolved": "https://registry.npmjs.org/@discordjs/collection/-/collection-1.5.3.tgz",
      "integrity": "sha512-SVb428OMd3WO1paV3rm6tSjM4wC+Kecaa1EUGX7vc6/fddvw/6lg90z4QtCqm21zvVe92vMMDt9+DkIvjXImQQ==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=16.11.0"
      }
    },
    "node_modules/@discordjs/formatters": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/@discordjs/formatters/-/formatters-0.6.1.tgz",
      "integrity": "sha512-5cnX+tASiPCqCWtFcFslxBVUaCetB0thvM/JyavhbXInP1HJIEU+Qv/zMrnuwSsX3yWH2lVXNJZeDK3EiP4HHg==",
      "license": "Apache-2.0",
      "dependencies": {
        "discord-api-types": "^0.38.1"
      },
      "engines": {
        "node": ">=16.11.0"
      },
      "funding": {
        "url": "https://github.com/discordjs/discord.js?sponsor"
      }
    },
    "node_modules/@discordjs/rest": {
      "version": "2.6.0",
      "resolved": "https://registry.npmjs.org/@discordjs/rest/-/rest-2.6.0.tgz",
      "integrity": "sha512-RDYrhmpB7mTvmCKcpj+pc5k7POKszS4E2O9TYc+U+Y4iaCP+r910QdO43qmpOja8LRr1RJ0b3U+CqVsnPqzf4w==",
      "license": "Apache-2.0",
      "dependencies": {
        "@discordjs/collection": "^2.1.1",
        "@discordjs/util": "^1.1.1",
        "@sapphire/async-queue": "^1.5.3",
        "@sapphire/snowflake": "^3.5.3",
        "@vladfrangu/async_event_emitter": "^2.4.6",
        "discord-api-types": "^0.38.16",
        "magic-bytes.js": "^1.10.0",
        "tslib": "^2.6.3",
        "undici": "6.21.3"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/discordjs/discord.js?sponsor"
      }
    },
    "node_modules/@discordjs/rest/node_modules/@discordjs/collection": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/@discordjs/collection/-/collection-2.1.1.tgz",
      "integrity": "sha512-LiSusze9Tc7qF03sLCujF5iZp7K+vRNEDBZ86FT9aQAv3vxMLihUvKvpsCWiQ2DJq1tVckopKm1rxomgNUc9hg==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/discordjs/discord.js?sponsor"
      }
    },
    "node_modules/@discordjs/util": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@discordjs/util/-/util-1.1.1.tgz",
      "integrity": "sha512-eddz6UnOBEB1oITPinyrB2Pttej49M9FZQY8NxgEvc3tq6ZICZ19m70RsmzRdDHk80O9NoYN/25AqJl8vPVf/g==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/discordjs/discord.js?sponsor"
      }
    },
    "node_modules/@discordjs/ws": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/@discordjs/ws/-/ws-1.2.3.tgz",
      "integrity": "sha512-wPlQDxEmlDg5IxhJPuxXr3Vy9AjYq5xCvFWGJyD7w7Np8ZGu+Mc+97LCoEc/+AYCo2IDpKioiH0/c/mj5ZR9Uw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@discordjs/collection": "^2.1.0",
        "@discordjs/rest": "^2.5.1",
        "@discordjs/util": "^1.1.0",
        "@sapphire/async-queue": "^1.5.2",
        "@types/ws": "^8.5.10",
        "@vladfrangu/async_event_emitter": "^2.2.4",
        "discord-api-types": "^0.38.1",
        "tslib": "^2.6.2",
        "ws": "^8.17.0"
      },
      "engines": {
        "node": ">=16.11.0"
      },
      "funding": {
        "url": "https://github.com/discordjs/discord.js?sponsor"
      }
    },
    "node_modules/@discordjs/ws/node_modules/@discordjs/collection": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/@discordjs/collection/-/collection-2.1.1.tgz",
      "integrity": "sha512-LiSusze9Tc7qF03sLCujF5iZp7K+vRNEDBZ86FT9aQAv3vxMLihUvKvpsCWiQ2DJq1tVckopKm1rxomgNUc9hg==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/discordjs/discord.js?sponsor"
      }
    },
    "node_modules/@drizzle-team/brocli": {
      "version": "0.10.2",
      "resolved": "https://registry.npmjs.org/@drizzle-team/brocli/-/brocli-0.10.2.tgz",
      "integrity": "sha512-z33Il7l5dKjUgGULTqBsQBQwckHh5AbIuxhdsIxDDiZAzBOrZO6q9ogcWC65kU382AfynTfgNumVcNIjuIua6w==",
      "license": "Apache-2.0"
    },
    "node_modules/@esbuild-kit/core-utils": {
      "version": "3.3.2",
      "resolved": "https://registry.npmjs.org/@esbuild-kit/core-utils/-/core-utils-3.3.2.tgz",
      "integrity": "sha512-sPRAnw9CdSsRmEtnsl2WXWdyquogVpB3yZ3dgwJfe8zrOzTsV7cJvmwrKVa+0ma5BoiGJ+BoqkMvawbayKUsqQ==",
      "deprecated": "Merged into tsx: https://tsx.is",
      "license": "MIT",
      "dependencies": {
        "esbuild": "~0.18.20",
        "source-map-support": "^0.5.21"
      }
    },
    "node_modules/@esbuild-kit/core-utils/node_modules/@esbuild/android-arm": {
      "version": "0.18.20",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.18.20.tgz",
      "integrity": "sha512-fyi7TDI/ijKKNZTUJAQqiG5T7YjJXgnzkURqmGj13C6dCqckZBLdl4h7bkhHt/t0WP+zO9/zwroDvANaOqO5Sw==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild-kit/core-utils/node_modules/@esbuild/android-arm64": {
      "version": "0.18.20",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.18.20.tgz",
      "integrity": "sha512-Nz4rJcchGDtENV0eMKUNa6L12zz2zBDXuhj/Vjh18zGqB44Bi7MBMSXjgunJgjRhCmKOjnPuZp4Mb6OKqtMHLQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild-kit/core-utils/node_modules/@esbuild/android-x64": {
      "version": "0.18.20",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.18.20.tgz",
      "integrity": "sha512-8GDdlePJA8D6zlZYJV/jnrRAi6rOiNaCC/JclcXpB+KIuvfBN4owLtgzY2bsxnx666XjJx2kDPUmnTtR8qKQUg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild-kit/core-utils/node_modules/@esbuild/darwin-arm64": {
      "version": "0.18.20",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.18.20.tgz",
      "integrity": "sha512-bxRHW5kHU38zS2lPTPOyuyTm+S+eobPUnTNkdJEfAddYgEcll4xkT8DB9d2008DtTbl7uJag2HuE5NZAZgnNEA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild-kit/core-utils/node_modules/@esbuild/darwin-x64": {
      "version": "0.18.20",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.18.20.tgz",
      "integrity": "sha512-pc5gxlMDxzm513qPGbCbDukOdsGtKhfxD1zJKXjCCcU7ju50O7MeAZ8c4krSJcOIJGFR+qx21yMMVYwiQvyTyQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild-kit/core-utils/node_modules/@esbuild/freebsd-arm64": {
      "version": "0.18.20",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.18.20.tgz",
      "integrity": "sha512-yqDQHy4QHevpMAaxhhIwYPMv1NECwOvIpGCZkECn8w2WFHXjEwrBn3CeNIYsibZ/iZEUemj++M26W3cNR5h+Tw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild-kit/core-utils/node_modules/@esbuild/freebsd-x64": {
      "version": "0.18.20",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.18.20.tgz",
      "integrity": "sha512-tgWRPPuQsd3RmBZwarGVHZQvtzfEBOreNuxEMKFcd5DaDn2PbBxfwLcj4+aenoh7ctXcbXmOQIn8HI6mCSw5MQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild-kit/core-utils/node_modules/@esbuild/linux-arm": {
      "version": "0.18.20",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.18.20.tgz",
      "integrity": "sha512-/5bHkMWnq1EgKr1V+Ybz3s1hWXok7mDFUMQ4cG10AfW3wL02PSZi5kFpYKrptDsgb2WAJIvRcDm+qIvXf/apvg==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild-kit/core-utils/node_modules/@esbuild/linux-arm64": {
      "version": "0.18.20",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.18.20.tgz",
      "integrity": "sha512-2YbscF+UL7SQAVIpnWvYwM+3LskyDmPhe31pE7/aoTMFKKzIc9lLbyGUpmmb8a8AixOL61sQ/mFh3jEjHYFvdA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild-kit/core-utils/node_modules/@esbuild/linux-ia32": {
      "version": "0.18.20",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.18.20.tgz",
      "integrity": "sha512-P4etWwq6IsReT0E1KHU40bOnzMHoH73aXp96Fs8TIT6z9Hu8G6+0SHSw9i2isWrD2nbx2qo5yUqACgdfVGx7TA==",
      "cpu": [
        "ia32"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild-kit/core-utils/node_modules/@esbuild/linux-loong64": {
      "version": "0.18.20",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.18.20.tgz",
      "integrity": "sha512-nXW8nqBTrOpDLPgPY9uV+/1DjxoQ7DoB2N8eocyq8I9XuqJ7BiAMDMf9n1xZM9TgW0J8zrquIb/A7s3BJv7rjg==",
      "cpu": [
        "loong64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild-kit/core-utils/node_modules/@esbuild/linux-mips64el": {
      "version": "0.18.20",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.18.20.tgz",
      "integrity": "sha512-d5NeaXZcHp8PzYy5VnXV3VSd2D328Zb+9dEq5HE6bw6+N86JVPExrA6O68OPwobntbNJ0pzCpUFZTo3w0GyetQ==",
      "cpu": [
        "mips64el"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild-kit/core-utils/node_modules/@esbuild/linux-ppc64": {
      "version": "0.18.20",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.18.20.tgz",
      "integrity": "sha512-WHPyeScRNcmANnLQkq6AfyXRFr5D6N2sKgkFo2FqguP44Nw2eyDlbTdZwd9GYk98DZG9QItIiTlFLHJHjxP3FA==",
      "cpu": [
        "ppc64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild-kit/core-utils/node_modules/@esbuild/linux-riscv64": {
      "version": "0.18.20",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.18.20.tgz",
      "integrity": "sha512-WSxo6h5ecI5XH34KC7w5veNnKkju3zBRLEQNY7mv5mtBmrP/MjNBCAlsM2u5hDBlS3NGcTQpoBvRzqBcRtpq1A==",
      "cpu": [
        "riscv64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild-kit/core-utils/node_modules/@esbuild/linux-s390x": {
      "version": "0.18.20",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.18.20.tgz",
      "integrity": "sha512-+8231GMs3mAEth6Ja1iK0a1sQ3ohfcpzpRLH8uuc5/KVDFneH6jtAJLFGafpzpMRO6DzJ6AvXKze9LfFMrIHVQ==",
      "cpu": [
        "s390x"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild-kit/core-utils/node_modules/@esbuild/linux-x64": {
      "version": "0.18.20",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.18.20.tgz",
      "integrity": "sha512-UYqiqemphJcNsFEskc73jQ7B9jgwjWrSayxawS6UVFZGWrAAtkzjxSqnoclCXxWtfwLdzU+vTpcNYhpn43uP1w==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild-kit/core-utils/node_modules/@esbuild/netbsd-x64": {
      "version": "0.18.20",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.18.20.tgz",
      "integrity": "sha512-iO1c++VP6xUBUmltHZoMtCUdPlnPGdBom6IrO4gyKPFFVBKioIImVooR5I83nTew5UOYrk3gIJhbZh8X44y06A==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild-kit/core-utils/node_modules/@esbuild/openbsd-x64": {
      "version": "0.18.20",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.18.20.tgz",
      "integrity": "sha512-e5e4YSsuQfX4cxcygw/UCPIEP6wbIL+se3sxPdCiMbFLBWu0eiZOJ7WoD+ptCLrmjZBK1Wk7I6D/I3NglUGOxg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild-kit/core-utils/node_modules/@esbuild/sunos-x64": {
      "version": "0.18.20",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.18.20.tgz",
      "integrity": "sha512-kDbFRFp0YpTQVVrqUd5FTYmWo45zGaXe0X8E1G/LKFC0v8x0vWrhOWSLITcCn63lmZIxfOMXtCfti/RxN/0wnQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild-kit/core-utils/node_modules/@esbuild/win32-arm64": {
      "version": "0.18.20",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.18.20.tgz",
      "integrity": "sha512-ddYFR6ItYgoaq4v4JmQQaAI5s7npztfV4Ag6NrhiaW0RrnOXqBkgwZLofVTlq1daVTQNhtI5oieTvkRPfZrePg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild-kit/core-utils/node_modules/@esbuild/win32-ia32": {
      "version": "0.18.20",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.18.20.tgz",
      "integrity": "sha512-Wv7QBi3ID/rROT08SABTS7eV4hX26sVduqDOTe1MvGMjNd3EjOz4b7zeexIR62GTIEKrfJXKL9LFxTYgkyeu7g==",
      "cpu": [
        "ia32"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild-kit/core-utils/node_modules/@esbuild/win32-x64": {
      "version": "0.18.20",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.18.20.tgz",
      "integrity": "sha512-kTdfRcSiDfQca/y9QIkng02avJ+NCaQvrMejlsB3RRv5sE9rRoeBPISaZpKxHELzRxZyLvNts1P27W3wV+8geQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild-kit/core-utils/node_modules/esbuild": {
      "version": "0.18.20",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.18.20.tgz",
      "integrity": "sha512-ceqxoedUrcayh7Y7ZX6NdbbDzGROiyVBgC4PriJThBKSVPWnnFHZAkfI1lJT8QFkOwH4qOS2SJkS4wvpGl8BpA==",
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=12"
      },
      "optionalDependencies": {
        "@esbuild/android-arm": "0.18.20",
        "@esbuild/android-arm64": "0.18.20",
        "@esbuild/android-x64": "0.18.20",
        "@esbuild/darwin-arm64": "0.18.20",
        "@esbuild/darwin-x64": "0.18.20",
        "@esbuild/freebsd-arm64": "0.18.20",
        "@esbuild/freebsd-x64": "0.18.20",
        "@esbuild/linux-arm": "0.18.20",
        "@esbuild/linux-arm64": "0.18.20",
        "@esbuild/linux-ia32": "0.18.20",
        "@esbuild/linux-loong64": "0.18.20",
        "@esbuild/linux-mips64el": "0.18.20",
        "@esbuild/linux-ppc64": "0.18.20",
        "@esbuild/linux-riscv64": "0.18.20",
        "@esbuild/linux-s390x": "0.18.20",
        "@esbuild/linux-x64": "0.18.20",
        "@esbuild/netbsd-x64": "0.18.20",
        "@esbuild/openbsd-x64": "0.18.20",
        "@esbuild/sunos-x64": "0.18.20",
        "@esbuild/win32-arm64": "0.18.20",
        "@esbuild/win32-ia32": "0.18.20",
        "@esbuild/win32-x64": "0.18.20"
      }
    },
    "node_modules/@esbuild-kit/esm-loader": {
      "version": "2.6.5",
      "resolved": "https://registry.npmjs.org/@esbuild-kit/esm-loader/-/esm-loader-2.6.5.tgz",
      "integrity": "sha512-FxEMIkJKnodyA1OaCUoEvbYRkoZlLZ4d/eXFu9Fh8CbBBgP5EmZxrfTRyN0qpXZ4vOvqnE5YdRdcrmUUXuU+dA==",
      "deprecated": "Merged into tsx: https://tsx.is",
      "license": "MIT",
      "dependencies": {
        "@esbuild-kit/core-utils": "^3.3.2",
        "get-tsconfig": "^4.7.0"
      }
    },
    "node_modules/@esbuild/aix-ppc64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.25.10.tgz",
      "integrity": "sha512-0NFWnA+7l41irNuaSVlLfgNT12caWJVLzp5eAVhZ0z1qpxbockccEt3s+149rE64VUI3Ml2zt8Nv5JVc4QXTsw==",
      "cpu": [
        "ppc64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "aix"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.25.10.tgz",
      "integrity": "sha512-dQAxF1dW1C3zpeCDc5KqIYuZ1tgAdRXNoZP7vkBIRtKZPYe2xVr/d3SkirklCHudW1B45tGiUlz2pUWDfbDD4w==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.25.10.tgz",
      "integrity": "sha512-LSQa7eDahypv/VO6WKohZGPSJDq5OVOo3UoFR1E4t4Gj1W7zEQMUhI+lo81H+DtB+kP+tDgBp+M4oNCwp6kffg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-x64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.25.10.tgz",
      "integrity": "sha512-MiC9CWdPrfhibcXwr39p9ha1x0lZJ9KaVfvzA0Wxwz9ETX4v5CHfF09bx935nHlhi+MxhA63dKRRQLiVgSUtEg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-arm64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.25.10.tgz",
      "integrity": "sha512-JC74bdXcQEpW9KkV326WpZZjLguSZ3DfS8wrrvPMHgQOIEIG/sPXEN/V8IssoJhbefLRcRqw6RQH2NnpdprtMA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-x64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.25.10.tgz",
      "integrity": "sha512-tguWg1olF6DGqzws97pKZ8G2L7Ig1vjDmGTwcTuYHbuU6TTjJe5FXbgs5C1BBzHbJ2bo1m3WkQDbWO2PvamRcg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-arm64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.25.10.tgz",
      "integrity": "sha512-3ZioSQSg1HT2N05YxeJWYR+Libe3bREVSdWhEEgExWaDtyFbbXWb49QgPvFH8u03vUPX10JhJPcz7s9t9+boWg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-x64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.25.10.tgz",
      "integrity": "sha512-LLgJfHJk014Aa4anGDbh8bmI5Lk+QidDmGzuC2D+vP7mv/GeSN+H39zOf7pN5N8p059FcOfs2bVlrRr4SK9WxA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.25.10.tgz",
      "integrity": "sha512-oR31GtBTFYCqEBALI9r6WxoU/ZofZl962pouZRTEYECvNF/dtXKku8YXcJkhgK/beU+zedXfIzHijSRapJY3vg==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.25.10.tgz",
      "integrity": "sha512-5luJWN6YKBsawd5f9i4+c+geYiVEw20FVW5x0v1kEMWNq8UctFjDiMATBxLvmmHA4bf7F6hTRaJgtghFr9iziQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ia32": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.25.10.tgz",
      "integrity": "sha512-NrSCx2Kim3EnnWgS4Txn0QGt0Xipoumb6z6sUtl5bOEZIVKhzfyp/Lyw4C1DIYvzeW/5mWYPBFJU3a/8Yr75DQ==",
      "cpu": [
        "ia32"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-loong64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.25.10.tgz",
      "integrity": "sha512-xoSphrd4AZda8+rUDDfD9J6FUMjrkTz8itpTITM4/xgerAZZcFW7Dv+sun7333IfKxGG8gAq+3NbfEMJfiY+Eg==",
      "cpu": [
        "loong64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-mips64el": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.25.10.tgz",
      "integrity": "sha512-ab6eiuCwoMmYDyTnyptoKkVS3k8fy/1Uvq7Dj5czXI6DF2GqD2ToInBI0SHOp5/X1BdZ26RKc5+qjQNGRBelRA==",
      "cpu": [
        "mips64el"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ppc64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.25.10.tgz",
      "integrity": "sha512-NLinzzOgZQsGpsTkEbdJTCanwA5/wozN9dSgEl12haXJBzMTpssebuXR42bthOF3z7zXFWH1AmvWunUCkBE4EA==",
      "cpu": [
        "ppc64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-riscv64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.25.10.tgz",
      "integrity": "sha512-FE557XdZDrtX8NMIeA8LBJX3dC2M8VGXwfrQWU7LB5SLOajfJIxmSdyL/gU1m64Zs9CBKvm4UAuBp5aJ8OgnrA==",
      "cpu": [
        "riscv64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-s390x": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.25.10.tgz",
      "integrity": "sha512-3BBSbgzuB9ajLoVZk0mGu+EHlBwkusRmeNYdqmznmMc9zGASFjSsxgkNsqmXugpPk00gJ0JNKh/97nxmjctdew==",
      "cpu": [
        "s390x"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-x64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.25.10.tgz",
      "integrity": "sha512-QSX81KhFoZGwenVyPoberggdW1nrQZSvfVDAIUXr3WqLRZGZqWk/P4T8p2SP+de2Sr5HPcvjhcJzEiulKgnxtA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-arm64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-arm64/-/netbsd-arm64-0.25.10.tgz",
      "integrity": "sha512-AKQM3gfYfSW8XRk8DdMCzaLUFB15dTrZfnX8WXQoOUpUBQ+NaAFCP1kPS/ykbbGYz7rxn0WS48/81l9hFl3u4A==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-x64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.25.10.tgz",
      "integrity": "sha512-7RTytDPGU6fek/hWuN9qQpeGPBZFfB4zZgcz2VK2Z5VpdUxEI8JKYsg3JfO0n/Z1E/6l05n0unDCNc4HnhQGig==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-arm64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-arm64/-/openbsd-arm64-0.25.10.tgz",
      "integrity": "sha512-5Se0VM9Wtq797YFn+dLimf2Zx6McttsH2olUBsDml+lm0GOCRVebRWUvDtkY4BWYv/3NgzS8b/UM3jQNh5hYyw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-x64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.25.10.tgz",
      "integrity": "sha512-XkA4frq1TLj4bEMB+2HnI0+4RnjbuGZfet2gs/LNs5Hc7D89ZQBHQ0gL2ND6Lzu1+QVkjp3x1gIcPKzRNP8bXw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openharmony-arm64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/openharmony-arm64/-/openharmony-arm64-0.25.10.tgz",
      "integrity": "sha512-AVTSBhTX8Y/Fz6OmIVBip9tJzZEUcY8WLh7I59+upa5/GPhh2/aM6bvOMQySspnCCHvFi79kMtdJS1w0DXAeag==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/sunos-x64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.25.10.tgz",
      "integrity": "sha512-fswk3XT0Uf2pGJmOpDB7yknqhVkJQkAQOcW/ccVOtfx05LkbWOaRAtn5SaqXypeKQra1QaEa841PgrSL9ubSPQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-arm64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.25.10.tgz",
      "integrity": "sha512-ah+9b59KDTSfpaCg6VdJoOQvKjI33nTaQr4UluQwW7aEwZQsbMCfTmfEO4VyewOxx4RaDT/xCy9ra2GPWmO7Kw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-ia32": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.25.10.tgz",
      "integrity": "sha512-QHPDbKkrGO8/cz9LKVnJU22HOi4pxZnZhhA2HYHez5Pz4JeffhDjf85E57Oyco163GnzNCVkZK0b/n4Y0UHcSw==",
      "cpu": [
        "ia32"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-x64": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.25.10.tgz",
      "integrity": "sha512-9KpxSVFCu0iK1owoez6aC/s/EdUQLDN3adTxGCqxMVhrPDj6bt5dbrHDXUuq+Bs2vATFBBrQS5vdQ/Ed2P+nbw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@pm2/agent": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/@pm2/agent/-/agent-2.1.1.tgz",
      "integrity": "sha512-0V9ckHWd/HSC8BgAbZSoq8KXUG81X97nSkAxmhKDhmF8vanyaoc1YXwc2KVkbWz82Rg4gjd2n9qiT3i7bdvGrQ==",
      "license": "AGPL-3.0",
      "dependencies": {
        "async": "~3.2.0",
        "chalk": "~3.0.0",
        "dayjs": "~1.8.24",
        "debug": "~4.3.1",
        "eventemitter2": "~5.0.1",
        "fast-json-patch": "^3.1.0",
        "fclone": "~1.0.11",
        "pm2-axon": "~4.0.1",
        "pm2-axon-rpc": "~0.7.0",
        "proxy-agent": "~6.4.0",
        "semver": "~7.5.0",
        "ws": "~7.5.10"
      }
    },
    "node_modules/@pm2/agent/node_modules/dayjs": {
      "version": "1.8.36",
      "resolved": "https://registry.npmjs.org/dayjs/-/dayjs-1.8.36.tgz",
      "integrity": "sha512-3VmRXEtw7RZKAf+4Tv1Ym9AGeo8r8+CjDi26x+7SYQil1UqtqdaokhzoEJohqlzt0m5kacJSDhJQkG/LWhpRBw==",
      "license": "MIT"
    },
    "node_modules/@pm2/agent/node_modules/debug": {
      "version": "4.3.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.3.7.tgz",
      "integrity": "sha512-Er2nc/H7RrMXZBFCEim6TCmMk02Z8vLC2Rbi1KEBggpo0fS6l0S1nnapwmIi3yW/+GOJap1Krg4w0Hg80oCqgQ==",
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/@pm2/agent/node_modules/lru-cache": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-6.0.0.tgz",
      "integrity": "sha512-Jo6dJ04CmSjuznwJSS3pUeWmd/H0ffTlkXXgwZi+eq1UCmqQwCh+eLsYOYCwY991i2Fah4h1BEMCx4qThGbsiA==",
      "license": "ISC",
      "dependencies": {
        "yallist": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/@pm2/agent/node_modules/semver": {
      "version": "7.5.4",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.5.4.tgz",
      "integrity": "sha512-1bCSESV6Pv+i21Hvpxp3Dx+pSD8lIPt8uVjRrxAUt/nbswYc+tK6Y2btiULjd4+fnq15PX+nqQDC7Oft7WkwcA==",
      "license": "ISC",
      "dependencies": {
        "lru-cache": "^6.0.0"
      },
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/@pm2/agent/node_modules/ws": {
      "version": "7.5.10",
      "resolved": "https://registry.npmjs.org/ws/-/ws-7.5.10.tgz",
      "integrity": "sha512-+dbF1tHwZpXcbOJdVOkzLDxZP1ailvSxM6ZweXTegylPny803bFhA+vqBYw4s31NSAk4S2Qz+AKXK9a4wkdjcQ==",
      "license": "MIT",
      "engines": {
        "node": ">=8.3.0"
      },
      "peerDependencies": {
        "bufferutil": "^4.0.1",
        "utf-8-validate": "^5.0.2"
      },
      "peerDependenciesMeta": {
        "bufferutil": {
          "optional": true
        },
        "utf-8-validate": {
          "optional": true
        }
      }
    },
    "node_modules/@pm2/blessed": {
      "version": "0.1.81",
      "resolved": "https://registry.npmjs.org/@pm2/blessed/-/blessed-0.1.81.tgz",
      "integrity": "sha512-ZcNHqQjMuNRcQ7Z1zJbFIQZO/BDKV3KbiTckWdfbUaYhj7uNmUwb+FbdDWSCkvxNr9dBJQwvV17o6QBkAvgO0g==",
      "license": "MIT",
      "bin": {
        "blessed": "bin/tput.js"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/@pm2/io": {
      "version": "6.1.0",
      "resolved": "https://registry.npmjs.org/@pm2/io/-/io-6.1.0.tgz",
      "integrity": "sha512-IxHuYURa3+FQ6BKePlgChZkqABUKFYH6Bwbw7V/pWU1pP6iR1sCI26l7P9ThUEB385ruZn/tZS3CXDUF5IA1NQ==",
      "license": "Apache-2",
      "dependencies": {
        "async": "~2.6.1",
        "debug": "~4.3.1",
        "eventemitter2": "^6.3.1",
        "require-in-the-middle": "^5.0.0",
        "semver": "~7.5.4",
        "shimmer": "^1.2.0",
        "signal-exit": "^3.0.3",
        "tslib": "1.9.3"
      },
      "engines": {
        "node": ">=6.0"
      }
    },
    "node_modules/@pm2/io/node_modules/async": {
      "version": "2.6.4",
      "resolved": "https://registry.npmjs.org/async/-/async-2.6.4.tgz",
      "integrity": "sha512-mzo5dfJYwAn29PeiJ0zvwTo04zj8HDJj0Mn8TD7sno7q12prdbnasKJHhkm2c1LgrhlJ0teaea8860oxi51mGA==",
      "license": "MIT",
      "dependencies": {
        "lodash": "^4.17.14"
      }
    },
    "node_modules/@pm2/io/node_modules/debug": {
      "version": "4.3.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.3.7.tgz",
      "integrity": "sha512-Er2nc/H7RrMXZBFCEim6TCmMk02Z8vLC2Rbi1KEBggpo0fS6l0S1nnapwmIi3yW/+GOJap1Krg4w0Hg80oCqgQ==",
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/@pm2/io/node_modules/eventemitter2": {
      "version": "6.4.9",
      "resolved": "https://registry.npmjs.org/eventemitter2/-/eventemitter2-6.4.9.tgz",
      "integrity": "sha512-JEPTiaOt9f04oa6NOkc4aH+nVp5I3wEjpHbIPqfgCdD5v5bUzy7xQqwcVO2aDQgOWhI28da57HksMrzK9HlRxg==",
      "license": "MIT"
    },
    "node_modules/@pm2/io/node_modules/lru-cache": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-6.0.0.tgz",
      "integrity": "sha512-Jo6dJ04CmSjuznwJSS3pUeWmd/H0ffTlkXXgwZi+eq1UCmqQwCh+eLsYOYCwY991i2Fah4h1BEMCx4qThGbsiA==",
      "license": "ISC",
      "dependencies": {
        "yallist": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/@pm2/io/node_modules/semver": {
      "version": "7.5.4",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.5.4.tgz",
      "integrity": "sha512-1bCSESV6Pv+i21Hvpxp3Dx+pSD8lIPt8uVjRrxAUt/nbswYc+tK6Y2btiULjd4+fnq15PX+nqQDC7Oft7WkwcA==",
      "license": "ISC",
      "dependencies": {
        "lru-cache": "^6.0.0"
      },
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/@pm2/io/node_modules/tslib": {
      "version": "1.9.3",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-1.9.3.tgz",
      "integrity": "sha512-4krF8scpejhaOgqzBEcGM7yDIEfi0/8+8zDRZhNZZ2kjmHJ4hv3zCbQWxoJGz1iw5U0Jl0nma13xzHXcncMavQ==",
      "license": "Apache-2.0"
    },
    "node_modules/@pm2/js-api": {
      "version": "0.8.0",
      "resolved": "https://registry.npmjs.org/@pm2/js-api/-/js-api-0.8.0.tgz",
      "integrity": "sha512-nmWzrA/BQZik3VBz+npRcNIu01kdBhWL0mxKmP1ciF/gTcujPTQqt027N9fc1pK9ERM8RipFhymw7RcmCyOEYA==",
      "license": "Apache-2",
      "dependencies": {
        "async": "^2.6.3",
        "debug": "~4.3.1",
        "eventemitter2": "^6.3.1",
        "extrareqp2": "^1.0.0",
        "ws": "^7.0.0"
      },
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/@pm2/js-api/node_modules/async": {
      "version": "2.6.4",
      "resolved": "https://registry.npmjs.org/async/-/async-2.6.4.tgz",
      "integrity": "sha512-mzo5dfJYwAn29PeiJ0zvwTo04zj8HDJj0Mn8TD7sno7q12prdbnasKJHhkm2c1LgrhlJ0teaea8860oxi51mGA==",
      "license": "MIT",
      "dependencies": {
        "lodash": "^4.17.14"
      }
    },
    "node_modules/@pm2/js-api/node_modules/debug": {
      "version": "4.3.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.3.7.tgz",
      "integrity": "sha512-Er2nc/H7RrMXZBFCEim6TCmMk02Z8vLC2Rbi1KEBggpo0fS6l0S1nnapwmIi3yW/+GOJap1Krg4w0Hg80oCqgQ==",
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/@pm2/js-api/node_modules/eventemitter2": {
      "version": "6.4.9",
      "resolved": "https://registry.npmjs.org/eventemitter2/-/eventemitter2-6.4.9.tgz",
      "integrity": "sha512-JEPTiaOt9f04oa6NOkc4aH+nVp5I3wEjpHbIPqfgCdD5v5bUzy7xQqwcVO2aDQgOWhI28da57HksMrzK9HlRxg==",
      "license": "MIT"
    },
    "node_modules/@pm2/js-api/node_modules/ws": {
      "version": "7.5.10",
      "resolved": "https://registry.npmjs.org/ws/-/ws-7.5.10.tgz",
      "integrity": "sha512-+dbF1tHwZpXcbOJdVOkzLDxZP1ailvSxM6ZweXTegylPny803bFhA+vqBYw4s31NSAk4S2Qz+AKXK9a4wkdjcQ==",
      "license": "MIT",
      "engines": {
        "node": ">=8.3.0"
      },
      "peerDependencies": {
        "bufferutil": "^4.0.1",
        "utf-8-validate": "^5.0.2"
      },
      "peerDependenciesMeta": {
        "bufferutil": {
          "optional": true
        },
        "utf-8-validate": {
          "optional": true
        }
      }
    },
    "node_modules/@pm2/pm2-version-check": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/@pm2/pm2-version-check/-/pm2-version-check-1.0.4.tgz",
      "integrity": "sha512-SXsM27SGH3yTWKc2fKR4SYNxsmnvuBQ9dd6QHtEWmiZ/VqaOYPAIlS8+vMcn27YLtAEBGvNRSh3TPNvtjZgfqA==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.3.1"
      }
    },
    "node_modules/@sapphire/async-queue": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@sapphire/async-queue/-/async-queue-1.5.5.tgz",
      "integrity": "sha512-cvGzxbba6sav2zZkH8GPf2oGk9yYoD5qrNWdu9fRehifgnFZJMV+nuy2nON2roRO4yQQ+v7MK/Pktl/HgfsUXg==",
      "license": "MIT",
      "engines": {
        "node": ">=v14.0.0",
        "npm": ">=7.0.0"
      }
    },
    "node_modules/@sapphire/shapeshift": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/@sapphire/shapeshift/-/shapeshift-4.0.0.tgz",
      "integrity": "sha512-d9dUmWVA7MMiKobL3VpLF8P2aeanRTu6ypG2OIaEv/ZHH/SUQ2iHOVyi5wAPjQ+HmnMuL0whK9ez8I/raWbtIg==",
      "license": "MIT",
      "dependencies": {
        "fast-deep-equal": "^3.1.3",
        "lodash": "^4.17.21"
      },
      "engines": {
        "node": ">=v16"
      }
    },
    "node_modules/@sapphire/snowflake": {
      "version": "3.5.3",
      "resolved": "https://registry.npmjs.org/@sapphire/snowflake/-/snowflake-3.5.3.tgz",
      "integrity": "sha512-jjmJywLAFoWeBi1W7994zZyiNWPIiqRRNAmSERxyg93xRGzNYvGjlZ0gR6x0F4gPRi2+0O6S71kOZYyr3cxaIQ==",
      "license": "MIT",
      "engines": {
        "node": ">=v14.0.0",
        "npm": ">=7.0.0"
      }
    },
    "node_modules/@sindresorhus/is": {
      "version": "4.6.0",
      "resolved": "https://registry.npmjs.org/@sindresorhus/is/-/is-4.6.0.tgz",
      "integrity": "sha512-t09vSN3MdfsyCHoFcTRCH/iUtG7OJ0CsjzB8cjAmKc/va/kIgeDI/TxsigdncE/4be734m0cvIYwNaV4i2XqAw==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sindresorhus/is?sponsor=1"
      }
    },
    "node_modules/@szmarczak/http-timer": {
      "version": "4.0.6",
      "resolved": "https://registry.npmjs.org/@szmarczak/http-timer/-/http-timer-4.0.6.tgz",
      "integrity": "sha512-4BAffykYOgO+5nzBWYwE3W90sBgLJoUPRWWcL8wlyiM8IB8ipJz3UMJ9KXQd1RKQXpKp8Tutn80HZtWsu2u76w==",
      "license": "MIT",
      "dependencies": {
        "defer-to-connect": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/@tootallnate/quickjs-emscripten": {
      "version": "0.23.0",
      "resolved": "https://registry.npmjs.org/@tootallnate/quickjs-emscripten/-/quickjs-emscripten-0.23.0.tgz",
      "integrity": "sha512-C5Mc6rdnsaJDjO3UpGW/CQTHtCKaYlScZTly4JIu97Jxo/odCiH0ITnDXSJPTOrEKk/ycSZ0AOgTmkDtkOsvIA==",
      "license": "MIT"
    },
    "node_modules/@types/body-parser": {
      "version": "1.19.6",
      "resolved": "https://registry.npmjs.org/@types/body-parser/-/body-parser-1.19.6.tgz",
      "integrity": "sha512-HLFeCYgz89uk22N5Qg3dvGvsv46B8GLvKKo1zKG4NybA8U2DiEO3w9lqGg29t/tfLRJpJ6iQxnVw4OnB7MoM9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/connect": "*",
        "@types/node": "*"
      }
    },
    "node_modules/@types/cacheable-request": {
      "version": "6.0.3",
      "resolved": "https://registry.npmjs.org/@types/cacheable-request/-/cacheable-request-6.0.3.tgz",
      "integrity": "sha512-IQ3EbTzGxIigb1I3qPZc1rWJnH0BmSKv5QYTalEwweFvyBDLSAe24zP0le/hyi7ecGfZVlIVAg4BZqb8WBwKqw==",
      "license": "MIT",
      "dependencies": {
        "@types/http-cache-semantics": "*",
        "@types/keyv": "^3.1.4",
        "@types/node": "*",
        "@types/responselike": "^1.0.0"
      }
    },
    "node_modules/@types/connect": {
      "version": "3.4.38",
      "resolved": "https://registry.npmjs.org/@types/connect/-/connect-3.4.38.tgz",
      "integrity": "sha512-K6uROf1LD88uDQqJCktA4yzL1YYAK6NgfsI0v/mTgyPKWsX1CnJ0XPSDhViejru1GcRkLWb8RlzFYJRqGUbaug==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/conventional-commits-parser": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/@types/conventional-commits-parser/-/conventional-commits-parser-5.0.1.tgz",
      "integrity": "sha512-7uz5EHdzz2TqoMfV7ee61Egf5y6NkcO4FB/1iCCQnbeiI1F3xzv3vK5dBCXUCLQgGYS+mUeigK1iKQzvED+QnQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/exaroton": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@types/exaroton/-/exaroton-1.11.1.tgz",
      "integrity": "sha512-jD/dn8CYWmY4jOzCJ0qOXvR2DQJ6WtowLfduXVAzBqXeE/o0pjn7PxMeEn4fcGhPYLjYZyR3kVTAtBv8wAkwiA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*",
        "@types/ws": "*",
        "got": "^11.8.2"
      }
    },
    "node_modules/@types/express": {
      "version": "5.0.3",
      "resolved": "https://registry.npmjs.org/@types/express/-/express-5.0.3.tgz",
      "integrity": "sha512-wGA0NX93b19/dZC1J18tKWVIYWyyF2ZjT9vin/NRu0qzzvfVzWjs04iq2rQ3H65vCTQYlRqs3YHfY7zjdV+9Kw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/body-parser": "*",
        "@types/express-serve-static-core": "^5.0.0",
        "@types/serve-static": "*"
      }
    },
    "node_modules/@types/express-serve-static-core": {
      "version": "5.0.7",
      "resolved": "https://registry.npmjs.org/@types/express-serve-static-core/-/express-serve-static-core-5.0.7.tgz",
      "integrity": "sha512-R+33OsgWw7rOhD1emjU7dzCDHucJrgJXMA5PYCzJxVil0dsyx5iBEPHqpPfiKNJQb7lZ1vxwoLR4Z87bBUpeGQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*",
        "@types/qs": "*",
        "@types/range-parser": "*",
        "@types/send": "*"
      }
    },
    "node_modules/@types/http-cache-semantics": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/@types/http-cache-semantics/-/http-cache-semantics-4.0.4.tgz",
      "integrity": "sha512-1m0bIFVc7eJWyve9S0RnuRgcQqF/Xd5QsUZAZeQFr1Q3/p9JWoQQEqmVy+DPTNpGXwhgIetAoYF8JSc33q29QA==",
      "license": "MIT"
    },
    "node_modules/@types/http-errors": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@types/http-errors/-/http-errors-2.0.5.tgz",
      "integrity": "sha512-r8Tayk8HJnX0FztbZN7oVqGccWgw98T/0neJphO91KkmOzug1KkofZURD4UaD5uH8AqcFLfdPErnBod0u71/qg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/keyv": {
      "version": "3.1.4",
      "resolved": "https://registry.npmjs.org/@types/keyv/-/keyv-3.1.4.tgz",
      "integrity": "sha512-BQ5aZNSCpj7D6K2ksrRCTmKRLEpnPvWDiLPfoGyhZ++8YtiK9d/3DBKPJgry359X/P1PfruyYwvnvwFjuEiEIg==",
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/mime": {
      "version": "1.3.5",
      "resolved": "https://registry.npmjs.org/@types/mime/-/mime-1.3.5.tgz",
      "integrity": "sha512-/pyBZWSLD2n0dcHE3hq8s8ZvcETHtEuF+3E7XVt0Ig2nvsVQXdghHVcEkIWjy9A0wKfTn97a/PSDYohKIlnP/w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/node": {
      "version": "24.5.2",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-24.5.2.tgz",
      "integrity": "sha512-FYxk1I7wPv3K2XBaoyH2cTnocQEu8AOZ60hPbsyukMPLv5/5qr7V1i8PLHdl6Zf87I+xZXFvPCXYjiTFq+YSDQ==",
      "license": "MIT",
      "dependencies": {
        "undici-types": "~7.12.0"
      }
    },
    "node_modules/@types/qs": {
      "version": "6.14.0",
      "resolved": "https://registry.npmjs.org/@types/qs/-/qs-6.14.0.tgz",
      "integrity": "sha512-eOunJqu0K1923aExK6y8p6fsihYEn/BYuQ4g0CxAAgFc4b/ZLN4CrsRZ55srTdqoiLzU2B2evC+apEIxprEzkQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/range-parser": {
      "version": "1.2.7",
      "resolved": "https://registry.npmjs.org/@types/range-parser/-/range-parser-1.2.7.tgz",
      "integrity": "sha512-hKormJbkJqzQGhziax5PItDUTMAM9uE2XXQmM37dyd4hVM+5aVl7oVxMVUiVQn2oCQFN/LKCZdvSM0pFRqbSmQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/responselike": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@types/responselike/-/responselike-1.0.3.tgz",
      "integrity": "sha512-H/+L+UkTV33uf49PH5pCAUBVPNj2nDBXTN+qS1dOwyyg24l3CcicicCA7ca+HMvJBZcFgl5r8e+RR6elsb4Lyw==",
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/send": {
      "version": "0.17.5",
      "resolved": "https://registry.npmjs.org/@types/send/-/send-0.17.5.tgz",
      "integrity": "sha512-z6F2D3cOStZvuk2SaP6YrwkNO65iTZcwA2ZkSABegdkAh/lf+Aa/YQndZVfmEXT5vgAp6zv06VQ3ejSVjAny4w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/mime": "^1",
        "@types/node": "*"
      }
    },
    "node_modules/@types/serve-static": {
      "version": "1.15.8",
      "resolved": "https://registry.npmjs.org/@types/serve-static/-/serve-static-1.15.8.tgz",
      "integrity": "sha512-roei0UY3LhpOJvjbIP6ZZFngyLKl5dskOtDhxY5THRSpO+ZI+nzJ+m5yUMzGrp89YRa7lvknKkMYjqQFGwA7Sg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/http-errors": "*",
        "@types/node": "*",
        "@types/send": "*"
      }
    },
    "node_modules/@types/twemoji-parser": {
      "version": "13.1.4",
      "resolved": "https://registry.npmjs.org/@types/twemoji-parser/-/twemoji-parser-13.1.4.tgz",
      "integrity": "sha512-pDZcn6irxV/CD8C9cAEyZeECKFGZud8R5Zvs9PLO+5361GXu8khZ2peEwidMwq1dqYFSAbSQCUNkWDl87DsX2g==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/ws": {
      "version": "8.18.0",
      "resolved": "https://registry.npmjs.org/@types/ws/-/ws-8.18.0.tgz",
      "integrity": "sha512-8svvI3hMyvN0kKCJMvTJP/x6Y/EoQbepff882wL+Sn5QsXb3etnamgrJq4isrBxSJj5L2AuXcI0+bgkoAXGUJw==",
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@vladfrangu/async_event_emitter": {
      "version": "2.4.6",
      "resolved": "https://registry.npmjs.org/@vladfrangu/async_event_emitter/-/async_event_emitter-2.4.6.tgz",
      "integrity": "sha512-RaI5qZo6D2CVS6sTHFKg1v5Ohq/+Bo2LZ5gzUEwZ/WkHhwtGTCB/sVLw8ijOkAUxasZ+WshN/Rzj4ywsABJ5ZA==",
      "license": "MIT",
      "engines": {
        "node": ">=v14.0.0",
        "npm": ">=7.0.0"
      }
    },
    "node_modules/accepts": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-2.0.0.tgz",
      "integrity": "sha512-5cvg6CtKwfgdmVqY1WIiXKc3Q1bkRqGLi+2W/6ao+6Y7gu/RCwRuAhGEzh5B4KlszSuTLgZYuqFqo5bImjNKng==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "mime-types": "^3.0.0",
        "negotiator": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/agent-base": {
      "version": "7.1.4",
      "resolved": "https://registry.npmjs.org/agent-base/-/agent-base-7.1.4.tgz",
      "integrity": "sha512-MnA+YT8fwfJPgBx3m60MNqakm30XOkyIoH1y6huTQvC0PwZG7ki8NacLBcrPbNoo8vEZy7Jpuk7+jMO+CUovTQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/ajv": {
      "version": "8.17.1",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-8.17.1.tgz",
      "integrity": "sha512-B/gBuNg5SiMTrPkC+A2+cW0RszwxYmn6VYxB/inlBStS5nx6xHIt/ehKRhIMhqusl7a8LjQoZnjCs5vhwxOQ1g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fast-deep-equal": "^3.1.3",
        "fast-uri": "^3.0.1",
        "json-schema-traverse": "^1.0.0",
        "require-from-string": "^2.0.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/epoberezkin"
      }
    },
    "node_modules/amp": {
      "version": "0.3.1",
      "resolved": "https://registry.npmjs.org/amp/-/amp-0.3.1.tgz",
      "integrity": "sha512-OwIuC4yZaRogHKiuU5WlMR5Xk/jAcpPtawWL05Gj8Lvm2F6mwoJt4O/bHI+DHwG79vWd+8OFYM4/BzYqyRd3qw==",
      "license": "MIT"
    },
    "node_modules/amp-message": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/amp-message/-/amp-message-0.1.2.tgz",
      "integrity": "sha512-JqutcFwoU1+jhv7ArgW38bqrE+LQdcRv4NxNw0mp0JHQyB6tXesWRjtYKlDgHRY2o3JE5UTaBGUK8kSWUdxWUg==",
      "license": "MIT",
      "dependencies": {
        "amp": "0.3.1"
      }
    },
    "node_modules/ansi-colors": {
      "version": "4.1.3",
      "resolved": "https://registry.npmjs.org/ansi-colors/-/ansi-colors-4.1.3.tgz",
      "integrity": "sha512-/6w/C21Pm1A7aZitlI5Ni/2J6FFQN8i1Cvz3kHABAAbw93v/NlvKdVOqz7CCWz/3iv/JplRSEEZ83XION15ovw==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "license": "MIT",
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/ansis": {
      "version": "4.0.0-node10",
      "resolved": "https://registry.npmjs.org/ansis/-/ansis-4.0.0-node10.tgz",
      "integrity": "sha512-BRrU0Bo1X9dFGw6KgGz6hWrqQuOlVEDOzkb0QSLZY9sXHqA7pNj7yHPVJRz7y/rj4EOJ3d/D5uxH+ee9leYgsg==",
      "license": "ISC",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/anymatch": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz",
      "integrity": "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==",
      "license": "ISC",
      "dependencies": {
        "normalize-path": "^3.0.0",
        "picomatch": "^2.0.4"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/argparse": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/argparse/-/argparse-2.0.1.tgz",
      "integrity": "sha512-8+9WqebbFzpX9OR+Wa6O29asIogeRMzcGtAINdpMHHyAg10f05aSFVBbcEqGf/PXw1EjAZ+q2/bEBg3DvurK3Q==",
      "license": "Python-2.0"
    },
    "node_modules/array-ify": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/array-ify/-/array-ify-1.0.0.tgz",
      "integrity": "sha512-c5AMf34bKdvPhQ7tBGhqkgKNUzMr4WUs+WDtC2ZUGOUncbxKMTvqxYctiseW3+L4bA8ec+GcZ6/A/FW4m8ukng==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/ast-types": {
      "version": "0.13.4",
      "resolved": "https://registry.npmjs.org/ast-types/-/ast-types-0.13.4.tgz",
      "integrity": "sha512-x1FCFnFifvYDDzTaLII71vG5uvDwgtmDTEVWAxrgeiR8VjMONcCXJx7E+USjDtHlwFmt9MysbqgF9b9Vjr6w+w==",
      "license": "MIT",
      "dependencies": {
        "tslib": "^2.0.1"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/async": {
      "version": "3.2.6",
      "resolved": "https://registry.npmjs.org/async/-/async-3.2.6.tgz",
      "integrity": "sha512-htCUDlxyyCLMgaM3xXg0C0LW2xqfuQ6p05pCEIsXuyQ+a1koYKTuBMzRNwmybfLgvJDMd0r1LTn4+E0Ti6C2AA==",
      "license": "MIT"
    },
    "node_modules/balanced-match": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
      "integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
      "license": "MIT"
    },
    "node_modules/base64-js": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.5.1.tgz",
      "integrity": "sha512-AKpaYlHn8t4SVbOHCy+b5+KKgvR4vrsD8vbvrbiQJps7fKDTkjkDry6ji0rUJjC0kzbNePLwzxq8iypo41qeWA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/basic-ftp": {
      "version": "5.0.5",
      "resolved": "https://registry.npmjs.org/basic-ftp/-/basic-ftp-5.0.5.tgz",
      "integrity": "sha512-4Bcg1P8xhUuqcii/S0Z9wiHIrQVPMermM1any+MX5GeGD7faD3/msQUDGLol9wOcz4/jbg/WJnGqoJF6LiBdtg==",
      "license": "MIT",
      "engines": {
        "node": ">=10.0.0"
      }
    },
    "node_modules/binary-extensions": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.3.0.tgz",
      "integrity": "sha512-Ceh+7ox5qe7LJuLHoY0feh3pHuUDHAcRUeyL2VYghZwfpkNIy/+8Ocg0a3UuSoYzavmylwuLWQOf3hl0jjMMIw==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/bl": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/bl/-/bl-4.1.0.tgz",
      "integrity": "sha512-1W07cM9gS6DcLperZfFSj+bWLtaPGSOHWhPiGzXmvVJbRLdG82sH/Kn8EtW1VqWVA54AKf2h5k5BbnIbwF3h6w==",
      "license": "MIT",
      "dependencies": {
        "buffer": "^5.5.0",
        "inherits": "^2.0.4",
        "readable-stream": "^3.4.0"
      }
    },
    "node_modules/bodec": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/bodec/-/bodec-0.1.0.tgz",
      "integrity": "sha512-Ylo+MAo5BDUq1KA3f3R/MFhh+g8cnHmo8bz3YPGhI1znrMaf77ol1sfvYJzsw3nTE+Y2GryfDxBaR+AqpAkEHQ==",
      "license": "MIT"
    },
    "node_modules/body-parser": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-2.2.0.tgz",
      "integrity": "sha512-02qvAaxv8tp7fBa/mw1ga98OGm+eCbqzJOKoRt70sLmfEEi+jyBYVTDGfCL/k06/4EMk/z01gCe7HoCH/f2LTg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "bytes": "^3.1.2",
        "content-type": "^1.0.5",
        "debug": "^4.4.0",
        "http-errors": "^2.0.0",
        "iconv-lite": "^0.6.3",
        "on-finished": "^2.4.1",
        "qs": "^6.14.0",
        "raw-body": "^3.0.0",
        "type-is": "^2.0.0"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/body-parser/node_modules/iconv-lite": {
      "version": "0.6.3",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.6.3.tgz",
      "integrity": "sha512-4fCk79wshMdzMp2rH06qWrJE4iolqLhCUH+OiuIgU++RB0+94NlDL81atO7GX55uUKueo0txHNtvEyI6D7WdMw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "safer-buffer": ">= 2.1.2 < 3.0.0"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/brace-expansion": {
      "version": "1.1.12",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.12.tgz",
      "integrity": "sha512-9T9UjW3r0UW5c1Q7GTwllptXwhvYmEzFhzMfZ9H7FQWt+uZePjZPjBP/W1ZEyZ1twGWom5/56TF4lPcqjnDHcg==",
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "node_modules/braces": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
      "integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
      "license": "MIT",
      "dependencies": {
        "fill-range": "^7.1.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/buffer": {
      "version": "5.7.1",
      "resolved": "https://registry.npmjs.org/buffer/-/buffer-5.7.1.tgz",
      "integrity": "sha512-EHcyIPBQ4BSGlvjB16k5KgAJ27CIsHY/2JBmCRReo48y9rQ3MaUzWX3KVlBa4U7MyX02HdVj0K7C3WaB3ju7FQ==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "base64-js": "^1.3.1",
        "ieee754": "^1.1.13"
      }
    },
    "node_modules/buffer-from": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/buffer-from/-/buffer-from-1.1.2.tgz",
      "integrity": "sha512-E+XQCRwSbaaiChtv6k6Dwgc+bx+Bs6vuKJHHl5kox/BaKbhiXzqQOwK4cO22yElGp2OCmjwVhT3HmxgyPGnJfQ==",
      "license": "MIT"
    },
    "node_modules/bytes": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/bytes/-/bytes-3.1.2.tgz",
      "integrity": "sha512-/Nf7TyzTx6S3yRJObOAV7956r8cr2+Oj8AC5dt8wSP3BQAoeX58NoHyCU8P8zGkNXStjTSi6fzO6F0pBdcYbEg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/cacheable-lookup": {
      "version": "5.0.4",
      "resolved": "https://registry.npmjs.org/cacheable-lookup/-/cacheable-lookup-5.0.4.tgz",
      "integrity": "sha512-2/kNscPhpcxrOigMZzbiWF7dz8ilhb/nIHU3EyZiXWXpeq/au8qJ8VhdftMkty3n7Gj6HIGalQG8oiBNB3AJgA==",
      "license": "MIT",
      "engines": {
        "node": ">=10.6.0"
      }
    },
    "node_modules/cacheable-request": {
      "version": "7.0.4",
      "resolved": "https://registry.npmjs.org/cacheable-request/-/cacheable-request-7.0.4.tgz",
      "integrity": "sha512-v+p6ongsrp0yTGbJXjgxPow2+DL93DASP4kXCDKb8/bwRtt9OEF3whggkkDkGNzgcWy2XaF4a8nZglC7uElscg==",
      "license": "MIT",
      "dependencies": {
        "clone-response": "^1.0.2",
        "get-stream": "^5.1.0",
        "http-cache-semantics": "^4.0.0",
        "keyv": "^4.0.0",
        "lowercase-keys": "^2.0.0",
        "normalize-url": "^6.0.1",
        "responselike": "^2.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/call-bind-apply-helpers": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.2.tgz",
      "integrity": "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/call-bound": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/call-bound/-/call-bound-1.0.4.tgz",
      "integrity": "sha512-+ys997U96po4Kx/ABpBCqhA9EuxJaQWDQg7295H4hBphv3IZg0boBKuwYpt4YXp6MZ5AmZQnU/tyMTlRpaSejg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "get-intrinsic": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/callsites": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",
      "integrity": "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/canvas": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/canvas/-/canvas-3.2.0.tgz",
      "integrity": "sha512-jk0GxrLtUEmW/TmFsk2WghvgHe8B0pxGilqCL21y8lHkPUGa6FTsnCNtHPOzT8O3y+N+m3espawV80bbBlgfTA==",
      "hasInstallScript": true,
      "license": "MIT",
      "dependencies": {
        "node-addon-api": "^7.0.0",
        "prebuild-install": "^7.1.3"
      },
      "engines": {
        "node": "^18.12.0 || >= 20.9.0"
      }
    },
    "node_modules/chalk": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-3.0.0.tgz",
      "integrity": "sha512-4D3B6Wf41KOYRFdszmDqMCGq5VV/uMAB273JILmO+3jAlh8X4qDtdtgCR3fxtbLEMzSx22QdhnDcJvu2u1fVwg==",
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.1.0",
        "supports-color": "^7.1.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/charm": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/charm/-/charm-0.1.2.tgz",
      "integrity": "sha512-syedaZ9cPe7r3hoQA9twWYKu5AIyCswN5+szkmPBe9ccdLrj4bYaCnLVPTLd2kgVRc7+zoX4tyPgRnFKCj5YjQ==",
      "license": "MIT/X11"
    },
    "node_modules/chokidar": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz",
      "integrity": "sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw==",
      "license": "MIT",
      "dependencies": {
        "anymatch": "~3.1.2",
        "braces": "~3.0.2",
        "glob-parent": "~5.1.2",
        "is-binary-path": "~2.1.0",
        "is-glob": "~4.0.1",
        "normalize-path": "~3.0.0",
        "readdirp": "~3.6.0"
      },
      "engines": {
        "node": ">= 8.10.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/chownr": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/chownr/-/chownr-1.1.4.tgz",
      "integrity": "sha512-jJ0bqzaylmJtVnNgzTeSOs8DPavpbYgEr/b0YL8/2GO3xJEhInFmhKMUnEJQjZumK7KXGFhUy89PrsJWlakBVg==",
      "license": "ISC"
    },
    "node_modules/cli-tableau": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/cli-tableau/-/cli-tableau-2.0.1.tgz",
      "integrity": "sha512-he+WTicka9cl0Fg/y+YyxcN6/bfQ/1O3QmgxRXDhABKqLzvoOSM4fMzp39uMyLBulAFuywD2N7UaoQE7WaADxQ==",
      "dependencies": {
        "chalk": "3.0.0"
      },
      "engines": {
        "node": ">=8.10.0"
      }
    },
    "node_modules/cliui": {
      "version": "8.0.1",
      "resolved": "https://registry.npmjs.org/cliui/-/cliui-8.0.1.tgz",
      "integrity": "sha512-BSeNnyus75C4//NQ9gQt1/csTXyo/8Sb+afLAkzAptFuMsod9HFokGNudZpi/oQV73hnVK+sR+5PVRMd+Dr7YQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "string-width": "^4.2.0",
        "strip-ansi": "^6.0.1",
        "wrap-ansi": "^7.0.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/clone-response": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/clone-response/-/clone-response-1.0.3.tgz",
      "integrity": "sha512-ROoL94jJH2dUVML2Y/5PEDNaSHgeOdSDicUyS7izcF63G6sTc/FTjLub4b8Il9S8S0beOfYt0TaA5qvFK+w0wA==",
      "license": "MIT",
      "dependencies": {
        "mimic-response": "^1.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "license": "MIT",
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
      "license": "MIT"
    },
    "node_modules/commander": {
      "version": "2.15.1",
      "resolved": "https://registry.npmjs.org/commander/-/commander-2.15.1.tgz",
      "integrity": "sha512-VlfT9F3V0v+jr4yxPc5gg9s62/fIVWsd2Bk2iD435um1NlGMYdVCq+MjcXnhYq2icNOizHr1kK+5TI6H0Hy0ag==",
      "license": "MIT"
    },
    "node_modules/compare-func": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/compare-func/-/compare-func-2.0.0.tgz",
      "integrity": "sha512-zHig5N+tPWARooBnb0Zx1MFcdfpyJrfTJ3Y5L+IFvUm8rM74hHz66z0gw0x4tijh5CorKkKUCnW82R2vmpeCRA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array-ify": "^1.0.0",
        "dot-prop": "^5.1.0"
      }
    },
    "node_modules/concat-map": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
      "integrity": "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==",
      "license": "MIT"
    },
    "node_modules/content-disposition": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-1.0.0.tgz",
      "integrity": "sha512-Au9nRL8VNUut/XSzbQA38+M78dzP4D+eqg3gfJHMIHHYa3bg067xj1KxMUWj+VULbiZMowKngFFbKczUrNJ1mg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "safe-buffer": "5.2.1"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/content-type": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/content-type/-/content-type-1.0.5.tgz",
      "integrity": "sha512-nTjqfcBFEipKdXCv4YDQWCfmcLZKm81ldF0pAopTvyrFGVbcR6P/VAAd5G7N+0tTr8QqiU0tFadD6FK4NtJwOA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/conventional-changelog-angular": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/conventional-changelog-angular/-/conventional-changelog-angular-7.0.0.tgz",
      "integrity": "sha512-ROjNchA9LgfNMTTFSIWPzebCwOGFdgkEq45EnvvrmSLvCtAw0HSmrCs7/ty+wAeYUZyNay0YMUNYFTRL72PkBQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "compare-func": "^2.0.0"
      },
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/conventional-changelog-conventionalcommits": {
      "version": "7.0.2",
      "resolved": "https://registry.npmjs.org/conventional-changelog-conventionalcommits/-/conventional-changelog-conventionalcommits-7.0.2.tgz",
      "integrity": "sha512-NKXYmMR/Hr1DevQegFB4MwfM5Vv0m4UIxKZTTYuD98lpTknaZlSRrDOG4X7wIXpGkfsYxZTghUN+Qq+T0YQI7w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "compare-func": "^2.0.0"
      },
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/conventional-commits-parser": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/conventional-commits-parser/-/conventional-commits-parser-5.0.0.tgz",
      "integrity": "sha512-ZPMl0ZJbw74iS9LuX9YIAiW8pfM5p3yh2o/NbXHbkFuZzY5jvdi5jFycEOkmBW5H5I7nA+D6f3UcsCLP2vvSEA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-text-path": "^2.0.0",
        "JSONStream": "^1.3.5",
        "meow": "^12.0.1",
        "split2": "^4.0.0"
      },
      "bin": {
        "conventional-commits-parser": "cli.mjs"
      },
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/cookie": {
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.7.2.tgz",
      "integrity": "sha512-yki5XnKuf750l50uGTllt6kKILY4nQ1eNIQatoXEByZ5dWgnKqbnqmTrBE5B4N7lrMJKQ2ytWMiTO2o0v6Ew/w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/cookie-signature": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.2.2.tgz",
      "integrity": "sha512-D76uU73ulSXrD1UXF4KE2TMxVVwhsnCgfAyTg9k8P6KGZjlXKrOLe4dJQKI3Bxi5wjesZoFXJWElNWBjPZMbhg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.6.0"
      }
    },
    "node_modules/cosmiconfig": {
      "version": "9.0.0",
      "resolved": "https://registry.npmjs.org/cosmiconfig/-/cosmiconfig-9.0.0.tgz",
      "integrity": "sha512-itvL5h8RETACmOTFc4UfIyB2RfEHi71Ax6E/PivVxq9NseKbOWpeyHEOIbmAw1rs8Ak0VursQNww7lf7YtUwzg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "env-paths": "^2.2.1",
        "import-fresh": "^3.3.0",
        "js-yaml": "^4.1.0",
        "parse-json": "^5.2.0"
      },
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/d-fischer"
      },
      "peerDependencies": {
        "typescript": ">=4.9.5"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/cosmiconfig-typescript-loader": {
      "version": "6.1.0",
      "resolved": "https://registry.npmjs.org/cosmiconfig-typescript-loader/-/cosmiconfig-typescript-loader-6.1.0.tgz",
      "integrity": "sha512-tJ1w35ZRUiM5FeTzT7DtYWAFFv37ZLqSRkGi2oeCK1gPhvaWjkAtfXvLmvE1pRfxxp9aQo6ba/Pvg1dKj05D4g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "jiti": "^2.4.1"
      },
      "engines": {
        "node": ">=v18"
      },
      "peerDependencies": {
        "@types/node": "*",
        "cosmiconfig": ">=9",
        "typescript": ">=5"
      }
    },
    "node_modules/croner": {
      "version": "4.1.97",
      "resolved": "https://registry.npmjs.org/croner/-/croner-4.1.97.tgz",
      "integrity": "sha512-/f6gpQuxDaqXu+1kwQYSckUglPaOrHdbIlBAu0YuW8/Cdb45XwXYNUBXg3r/9Mo6n540Kn/smKcZWko5x99KrQ==",
      "license": "MIT"
    },
    "node_modules/culvert": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/culvert/-/culvert-0.1.2.tgz",
      "integrity": "sha512-yi1x3EAWKjQTreYWeSd98431AV+IEE0qoDyOoaHJ7KJ21gv6HtBXHVLX74opVSGqcR8/AbjJBHAHpcOy2bj5Gg==",
      "license": "MIT"
    },
    "node_modules/dargs": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/dargs/-/dargs-8.1.0.tgz",
      "integrity": "sha512-wAV9QHOsNbwnWdNW2FYvE1P56wtgSbM+3SZcdGiWQILwVjACCXDCI3Ai8QlCjMDB8YK5zySiXZYBiwGmNY3lnw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/data-uri-to-buffer": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/data-uri-to-buffer/-/data-uri-to-buffer-6.0.2.tgz",
      "integrity": "sha512-7hvf7/GW8e86rW0ptuwS3OcBGDjIi6SZva7hCyWC0yYry2cOPmLIjXAUHI6DK2HsnwJd9ifmt57i8eV2n4YNpw==",
      "license": "MIT",
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/dayjs": {
      "version": "1.11.15",
      "resolved": "https://registry.npmjs.org/dayjs/-/dayjs-1.11.15.tgz",
      "integrity": "sha512-MC+DfnSWiM9APs7fpiurHGCoeIx0Gdl6QZBy+5lu8MbYKN5FZEXqOgrundfibdfhGZ15o9hzmZ2xJjZnbvgKXQ==",
      "license": "MIT"
    },
    "node_modules/debug": {
      "version": "4.4.1",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.1.tgz",
      "integrity": "sha512-KcKCqiftBJcZr++7ykoDIEwSa3XWowTfNPo92BYxjXiyYEVrUQh2aLyhxBCwww+heortUFxEJYcRzosstTEBYQ==",
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/decompress-response": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/decompress-response/-/decompress-response-6.0.0.tgz",
      "integrity": "sha512-aW35yZM6Bb/4oJlZncMH2LCoZtJXTRxES17vE3hoRiowU2kWHaJKFkSBDnDR+cm9J+9QhXmREyIfv0pji9ejCQ==",
      "license": "MIT",
      "dependencies": {
        "mimic-response": "^3.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/decompress-response/node_modules/mimic-response": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/mimic-response/-/mimic-response-3.1.0.tgz",
      "integrity": "sha512-z0yWI+4FDrrweS8Zmt4Ej5HdJmky15+L2e6Wgn3+iK5fWzb6T3fhNFq2+MeTRb064c6Wr4N/wv0DzQTjNzHNGQ==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/deep-extend": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/deep-extend/-/deep-extend-0.6.0.tgz",
      "integrity": "sha512-LOHxIOaPYdHlJRtCQfDIVZtfw/ufM8+rVj649RIHzcm/vGwQRXFt6OPqIFWsm2XEMrNIEtWR64sY1LEKD2vAOA==",
      "license": "MIT",
      "engines": {
        "node": ">=4.0.0"
      }
    },
    "node_modules/defer-to-connect": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/defer-to-connect/-/defer-to-connect-2.0.1.tgz",
      "integrity": "sha512-4tvttepXG1VaYGrRibk5EwJd1t4udunSOVMdLSAL6mId1ix438oPwPZMALY41FCijukO1L0twNcGsdzS7dHgDg==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/degenerator": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/degenerator/-/degenerator-5.0.1.tgz",
      "integrity": "sha512-TllpMR/t0M5sqCXfj85i4XaAzxmS5tVA16dqvdkMwGmzI+dXLXnw3J+3Vdv7VKw+ThlTMboK6i9rnZ6Nntj5CQ==",
      "license": "MIT",
      "dependencies": {
        "ast-types": "^0.13.4",
        "escodegen": "^2.1.0",
        "esprima": "^4.0.1"
      },
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/depd": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/depd/-/depd-2.0.0.tgz",
      "integrity": "sha512-g7nH6P6dyDioJogAAGprGpCtVImJhpPk/roCzdb3fIh61/s/nPsfR6onyMwkCAR/OlC3yBC0lESvUoQEAssIrw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/detect-libc": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.1.tgz",
      "integrity": "sha512-ecqj/sy1jcK1uWrwpR67UhYrIFQ+5WlGxth34WquCbamhFA6hkkwiu37o6J5xCHdo1oixJRfVRw+ywV+Hq/0Aw==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/discord-api-types": {
      "version": "0.38.26",
      "resolved": "https://registry.npmjs.org/discord-api-types/-/discord-api-types-0.38.26.tgz",
      "integrity": "sha512-xpmPviHjIJ6dFu1eNwNDIGQ3N6qmPUUYFVAx/YZ64h7ZgPkTcKjnciD8bZe8Vbeji7yS5uYljyciunpq0J5NSw==",
      "license": "MIT",
      "workspaces": [
        "scripts/actions/documentation"
      ]
    },
    "node_modules/discord.js": {
      "version": "14.22.1",
      "resolved": "https://registry.npmjs.org/discord.js/-/discord.js-14.22.1.tgz",
      "integrity": "sha512-3k+Kisd/v570Jr68A1kNs7qVhNehDwDJAPe4DZ2Syt+/zobf9zEcuYFvsfIaAOgCa0BiHMfOOKQY4eYINl0z7w==",
      "license": "Apache-2.0",
      "dependencies": {
        "@discordjs/builders": "^1.11.2",
        "@discordjs/collection": "1.5.3",
        "@discordjs/formatters": "^0.6.1",
        "@discordjs/rest": "^2.6.0",
        "@discordjs/util": "^1.1.1",
        "@discordjs/ws": "^1.2.3",
        "@sapphire/snowflake": "3.5.3",
        "discord-api-types": "^0.38.16",
        "fast-deep-equal": "3.1.3",
        "lodash.snakecase": "4.1.1",
        "magic-bytes.js": "^1.10.0",
        "tslib": "^2.6.3",
        "undici": "6.21.3"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/discordjs/discord.js?sponsor"
      }
    },
    "node_modules/dot-prop": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/dot-prop/-/dot-prop-5.3.0.tgz",
      "integrity": "sha512-QM8q3zDe58hqUqjraQOmzZ1LIH9SWQJTlEKCH4kJ2oQvLZk7RbQXvtDM2XEq3fwkV9CCvvH4LA0AV+ogFsBM2Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-obj": "^2.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/dotenv": {
      "version": "16.4.7",
      "resolved": "https://registry.npmjs.org/dotenv/-/dotenv-16.4.7.tgz",
      "integrity": "sha512-47qPchRCykZC03FhkYAhrvwU4xDBFIj1QPqaarj6mdM/hgUzfPHcpkHJOn3mJAufFeeAxAzeGsr5X0M4k6fLZQ==",
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://dotenvx.com"
      }
    },
    "node_modules/drizzle-kit": {
      "version": "0.31.5",
      "resolved": "https://registry.npmjs.org/drizzle-kit/-/drizzle-kit-0.31.5.tgz",
      "integrity": "sha512-+CHgPFzuoTQTt7cOYCV6MOw2w8vqEn/ap1yv4bpZOWL03u7rlVRQhUY0WYT3rHsgVTXwYQDZaSUJSQrMBUKuWg==",
      "license": "MIT",
      "dependencies": {
        "@drizzle-team/brocli": "^0.10.2",
        "@esbuild-kit/esm-loader": "^2.5.5",
        "esbuild": "^0.25.4",
        "esbuild-register": "^3.5.0"
      },
      "bin": {
        "drizzle-kit": "bin.cjs"
      }
    },
    "node_modules/drizzle-orm": {
      "version": "0.44.5",
      "resolved": "https://registry.npmjs.org/drizzle-orm/-/drizzle-orm-0.44.5.tgz",
      "integrity": "sha512-jBe37K7d8ZSKptdKfakQFdeljtu3P2Cbo7tJoJSVZADzIKOBo9IAJPOmMsH2bZl90bZgh8FQlD8BjxXA/zuBkQ==",
      "license": "Apache-2.0",
      "peerDependencies": {
        "@aws-sdk/client-rds-data": ">=3",
        "@cloudflare/workers-types": ">=4",
        "@electric-sql/pglite": ">=0.2.0",
        "@libsql/client": ">=0.10.0",
        "@libsql/client-wasm": ">=0.10.0",
        "@neondatabase/serverless": ">=0.10.0",
        "@op-engineering/op-sqlite": ">=2",
        "@opentelemetry/api": "^1.4.1",
        "@planetscale/database": ">=1.13",
        "@prisma/client": "*",
        "@tidbcloud/serverless": "*",
        "@types/better-sqlite3": "*",
        "@types/pg": "*",
        "@types/sql.js": "*",
        "@upstash/redis": ">=1.34.7",
        "@vercel/postgres": ">=0.8.0",
        "@xata.io/client": "*",
        "better-sqlite3": ">=7",
        "bun-types": "*",
        "expo-sqlite": ">=14.0.0",
        "gel": ">=2",
        "knex": "*",
        "kysely": "*",
        "mysql2": ">=2",
        "pg": ">=8",
        "postgres": ">=3",
        "sql.js": ">=1",
        "sqlite3": ">=5"
      },
      "peerDependenciesMeta": {
        "@aws-sdk/client-rds-data": {
          "optional": true
        },
        "@cloudflare/workers-types": {
          "optional": true
        },
        "@electric-sql/pglite": {
          "optional": true
        },
        "@libsql/client": {
          "optional": true
        },
        "@libsql/client-wasm": {
          "optional": true
        },
        "@neondatabase/serverless": {
          "optional": true
        },
        "@op-engineering/op-sqlite": {
          "optional": true
        },
        "@opentelemetry/api": {
          "optional": true
        },
        "@planetscale/database": {
          "optional": true
        },
        "@prisma/client": {
          "optional": true
        },
        "@tidbcloud/serverless": {
          "optional": true
        },
        "@types/better-sqlite3": {
          "optional": true
        },
        "@types/pg": {
          "optional": true
        },
        "@types/sql.js": {
          "optional": true
        },
        "@upstash/redis": {
          "optional": true
        },
        "@vercel/postgres": {
          "optional": true
        },
        "@xata.io/client": {
          "optional": true
        },
        "better-sqlite3": {
          "optional": true
        },
        "bun-types": {
          "optional": true
        },
        "expo-sqlite": {
          "optional": true
        },
        "gel": {
          "optional": true
        },
        "knex": {
          "optional": true
        },
        "kysely": {
          "optional": true
        },
        "mysql2": {
          "optional": true
        },
        "pg": {
          "optional": true
        },
        "postgres": {
          "optional": true
        },
        "prisma": {
          "optional": true
        },
        "sql.js": {
          "optional": true
        },
        "sqlite3": {
          "optional": true
        }
      }
    },
    "node_modules/dunder-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/dunder-proto/-/dunder-proto-1.0.1.tgz",
      "integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.1",
        "es-errors": "^1.3.0",
        "gopd": "^1.2.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/ee-first": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz",
      "integrity": "sha512-WMwm9LhRUo+WUaRN+vRuETqG89IgZphVSNkdFgeb6sS/E4OrDIN7t48CAewSHXc6C8lefD8KKfr5vY61brQlow==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/encodeurl": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-2.0.0.tgz",
      "integrity": "sha512-Q0n9HRi4m6JuGIV1eFlmvJB7ZEVxu93IrMyiMsGC0lrMJMWzRgx6WGquyfQgZVb31vhGgXnfmPNNXmxnOkRBrg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/end-of-stream": {
      "version": "1.4.4",
      "resolved": "https://registry.npmjs.org/end-of-stream/-/end-of-stream-1.4.4.tgz",
      "integrity": "sha512-+uw1inIHVPQoaVuHzRyXd21icM+cnt4CzD5rW+NC1wjOUSTOs+Te7FOv7AhN7vS9x/oIyhLP5PR1H+phQAHu5Q==",
      "license": "MIT",
      "dependencies": {
        "once": "^1.4.0"
      }
    },
    "node_modules/enquirer": {
      "version": "2.3.6",
      "resolved": "https://registry.npmjs.org/enquirer/-/enquirer-2.3.6.tgz",
      "integrity": "sha512-yjNnPr315/FjS4zIsUxYguYUPP2e1NK4d7E7ZOLiyYCcbFBiTMyID+2wvm2w6+pZ/odMA7cRkjhsPbltwBOrLg==",
      "license": "MIT",
      "dependencies": {
        "ansi-colors": "^4.1.1"
      },
      "engines": {
        "node": ">=8.6"
      }
    },
    "node_modules/env-paths": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/env-paths/-/env-paths-2.2.1.tgz",
      "integrity": "sha512-+h1lkLKhZMTYjog1VEpJNG7NZJWcuc2DDk/qsqSTRRCOXiLjeQ1d1/udrUGhqMxUgAlwKNZ0cf2uqan5GLuS2A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/error-ex": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/error-ex/-/error-ex-1.3.4.tgz",
      "integrity": "sha512-sqQamAnR14VgCr1A618A3sGrygcpK+HEbenA/HiEAkkUwcZIIB/tgWqHFxWgOyDh4nB4JCRimh79dR5Ywc9MDQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-arrayish": "^0.2.1"
      }
    },
    "node_modules/es-define-property": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/es-define-property/-/es-define-property-1.0.1.tgz",
      "integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-object-atoms": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.1.1.tgz",
      "integrity": "sha512-FGgH2h8zKNim9ljj7dankFPcICIK9Cp5bm+c2gQSYePhpaG5+esrLODihIorn+Pe6FGJzWhXQotPv73jTaldXA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/esbuild": {
      "version": "0.25.10",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.25.10.tgz",
      "integrity": "sha512-9RiGKvCwaqxO2owP61uQ4BgNborAQskMR6QusfWzQqv7AZOg5oGehdY2pRJMTKuwxd1IDBP4rSbI5lHzU7SMsQ==",
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=18"
      },
      "optionalDependencies": {
        "@esbuild/aix-ppc64": "0.25.10",
        "@esbuild/android-arm": "0.25.10",
        "@esbuild/android-arm64": "0.25.10",
        "@esbuild/android-x64": "0.25.10",
        "@esbuild/darwin-arm64": "0.25.10",
        "@esbuild/darwin-x64": "0.25.10",
        "@esbuild/freebsd-arm64": "0.25.10",
        "@esbuild/freebsd-x64": "0.25.10",
        "@esbuild/linux-arm": "0.25.10",
        "@esbuild/linux-arm64": "0.25.10",
        "@esbuild/linux-ia32": "0.25.10",
        "@esbuild/linux-loong64": "0.25.10",
        "@esbuild/linux-mips64el": "0.25.10",
        "@esbuild/linux-ppc64": "0.25.10",
        "@esbuild/linux-riscv64": "0.25.10",
        "@esbuild/linux-s390x": "0.25.10",
        "@esbuild/linux-x64": "0.25.10",
        "@esbuild/netbsd-arm64": "0.25.10",
        "@esbuild/netbsd-x64": "0.25.10",
        "@esbuild/openbsd-arm64": "0.25.10",
        "@esbuild/openbsd-x64": "0.25.10",
        "@esbuild/openharmony-arm64": "0.25.10",
        "@esbuild/sunos-x64": "0.25.10",
        "@esbuild/win32-arm64": "0.25.10",
        "@esbuild/win32-ia32": "0.25.10",
        "@esbuild/win32-x64": "0.25.10"
      }
    },
    "node_modules/esbuild-register": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/esbuild-register/-/esbuild-register-3.6.0.tgz",
      "integrity": "sha512-H2/S7Pm8a9CL1uhp9OvjwrBh5Pvx0H8qVOxNu8Wed9Y7qv56MPtq+GGM8RJpq6glYJn9Wspr8uw7l55uyinNeg==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.3.4"
      },
      "peerDependencies": {
        "esbuild": ">=0.12 <1"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/escape-html": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
      "integrity": "sha512-NiSupZ4OeuGwr68lGIeym/ksIZMJodUGOSCZ/FSnTxcrekbvqrgdUxlJOMpijaKZVjAJrWrGs/6Jy8OMuyj9ow==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/escape-string-regexp": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz",
      "integrity": "sha512-TtpcNJ3XAzx3Gq8sWRzJaVajRs0uVxA2YAkdb1jm2YkPz4G6egUFAyA3n5vtEIZefPk5Wa4UXbKuS5fKkJWdgA==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/escodegen": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/escodegen/-/escodegen-2.1.0.tgz",
      "integrity": "sha512-2NlIDTwUWJN0mRPQOdtQBzbUHvdGY2P1VXSyU83Q3xKxM7WHX2Ql8dKq782Q9TgQUNOLEzEYu9bzLNj1q88I5w==",
      "license": "BSD-2-Clause",
      "dependencies": {
        "esprima": "^4.0.1",
        "estraverse": "^5.2.0",
        "esutils": "^2.0.2"
      },
      "bin": {
        "escodegen": "bin/escodegen.js",
        "esgenerate": "bin/esgenerate.js"
      },
      "engines": {
        "node": ">=6.0"
      },
      "optionalDependencies": {
        "source-map": "~0.6.1"
      }
    },
    "node_modules/esprima": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/esprima/-/esprima-4.0.1.tgz",
      "integrity": "sha512-eGuFFw7Upda+g4p+QHvnW0RyTX/SVeJBDM/gCtMARO0cLuT2HcEKnTPvhjV6aGeqrCB/sbNop0Kszm0jsaWU4A==",
      "license": "BSD-2-Clause",
      "bin": {
        "esparse": "bin/esparse.js",
        "esvalidate": "bin/esvalidate.js"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/estraverse": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-5.3.0.tgz",
      "integrity": "sha512-MMdARuVEQziNTeJD8DgMqmhwR11BRQ/cBP+pLtYdSTnf3MIO8fFeiINEbX36ZdNlfU/7A9f3gUw49B3oQsvwBA==",
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/esutils": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.3.tgz",
      "integrity": "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g==",
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/etag": {
      "version": "1.8.1",
      "resolved": "https://registry.npmjs.org/etag/-/etag-1.8.1.tgz",
      "integrity": "sha512-aIL5Fx7mawVa300al2BnEE4iNvo1qETxLrPI/o05L7z6go7fCw1J6EQmbK4FmJ2AS7kgVF/KEZWufBfdClMcPg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/eventemitter2": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/eventemitter2/-/eventemitter2-5.0.1.tgz",
      "integrity": "sha512-5EM1GHXycJBS6mauYAbVKT1cVs7POKWb2NXD4Vyt8dDqeZa7LaDK1/sjtL+Zb0lzTpSNil4596Dyu97hz37QLg==",
      "license": "MIT"
    },
    "node_modules/exaroton": {
      "version": "1.11.3",
      "resolved": "https://registry.npmjs.org/exaroton/-/exaroton-1.11.3.tgz",
      "integrity": "sha512-rjfpqyXtkipdvAyQS4wJ5Xy3Q+pJ+iXrlyeXv2N0d3nxT+zcqqld1w0MEHi2cnrhcDaYtPRTnzqmwmB/zuqp3g==",
      "license": "MIT",
      "dependencies": {
        "got": "^11.8.2",
        "ws": "^7.4.5"
      },
      "engines": {
        "node": ">=12.0.0"
      }
    },
    "node_modules/exaroton/node_modules/ws": {
      "version": "7.5.10",
      "resolved": "https://registry.npmjs.org/ws/-/ws-7.5.10.tgz",
      "integrity": "sha512-+dbF1tHwZpXcbOJdVOkzLDxZP1ailvSxM6ZweXTegylPny803bFhA+vqBYw4s31NSAk4S2Qz+AKXK9a4wkdjcQ==",
      "license": "MIT",
      "engines": {
        "node": ">=8.3.0"
      },
      "peerDependencies": {
        "bufferutil": "^4.0.1",
        "utf-8-validate": "^5.0.2"
      },
      "peerDependenciesMeta": {
        "bufferutil": {
          "optional": true
        },
        "utf-8-validate": {
          "optional": true
        }
      }
    },
    "node_modules/expand-template": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/expand-template/-/expand-template-2.0.3.tgz",
      "integrity": "sha512-XYfuKMvj4O35f/pOXLObndIRvyQ+/+6AhODh+OKWj9S9498pHHn/IMszH+gt0fBCRWMNfk1ZSp5x3AifmnI2vg==",
      "license": "(MIT OR WTFPL)",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/express": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/express/-/express-5.1.0.tgz",
      "integrity": "sha512-DT9ck5YIRU+8GYzzU5kT3eHGA5iL+1Zd0EutOmTE9Dtk+Tvuzd23VBU+ec7HPNSTxXYO55gPV/hq4pSBJDjFpA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "accepts": "^2.0.0",
        "body-parser": "^2.2.0",
        "content-disposition": "^1.0.0",
        "content-type": "^1.0.5",
        "cookie": "^0.7.1",
        "cookie-signature": "^1.2.1",
        "debug": "^4.4.0",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "etag": "^1.8.1",
        "finalhandler": "^2.1.0",
        "fresh": "^2.0.0",
        "http-errors": "^2.0.0",
        "merge-descriptors": "^2.0.0",
        "mime-types": "^3.0.0",
        "on-finished": "^2.4.1",
        "once": "^1.4.0",
        "parseurl": "^1.3.3",
        "proxy-addr": "^2.0.7",
        "qs": "^6.14.0",
        "range-parser": "^1.2.1",
        "router": "^2.2.0",
        "send": "^1.1.0",
        "serve-static": "^2.2.0",
        "statuses": "^2.0.1",
        "type-is": "^2.0.1",
        "vary": "^1.1.2"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/extrareqp2": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/extrareqp2/-/extrareqp2-1.0.0.tgz",
      "integrity": "sha512-Gum0g1QYb6wpPJCVypWP3bbIuaibcFiJcpuPM10YSXp/tzqi84x9PJageob+eN4xVRIOto4wjSGNLyMD54D2xA==",
      "license": "MIT",
      "dependencies": {
        "follow-redirects": "^1.14.0"
      }
    },
    "node_modules/fast-deep-equal": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
      "integrity": "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q==",
      "license": "MIT"
    },
    "node_modules/fast-json-patch": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/fast-json-patch/-/fast-json-patch-3.1.1.tgz",
      "integrity": "sha512-vf6IHUX2SBcA+5/+4883dsIjpBTqmfBjmYiWK1savxQmFk4JfBMLa7ynTYOs1Rolp/T1betJxHiGD3g1Mn8lUQ==",
      "license": "MIT"
    },
    "node_modules/fast-uri": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/fast-uri/-/fast-uri-3.1.0.tgz",
      "integrity": "sha512-iPeeDKJSWf4IEOasVVrknXpaBV0IApz/gp7S2bb7Z4Lljbl2MGJRqInZiUrQwV16cpzw/D3S5j5Julj/gT52AA==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/fastify"
        },
        {
          "type": "opencollective",
          "url": "https://opencollective.com/fastify"
        }
      ],
      "license": "BSD-3-Clause"
    },
    "node_modules/fclone": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/fclone/-/fclone-1.0.11.tgz",
      "integrity": "sha512-GDqVQezKzRABdeqflsgMr7ktzgF9CyS+p2oe0jJqUY6izSSbhPIQJDpoU4PtGcD7VPM9xh/dVrTu6z1nwgmEGw==",
      "license": "MIT"
    },
    "node_modules/fill-range": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
      "integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
      "license": "MIT",
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/finalhandler": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-2.1.0.tgz",
      "integrity": "sha512-/t88Ty3d5JWQbWYgaOGCCYfXRwV1+be02WqYYlL6h0lEiUAMPM8o8qKGO01YIkOHzka2up08wvgYD0mDiI+q3Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.0",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "on-finished": "^2.4.1",
        "parseurl": "^1.3.3",
        "statuses": "^2.0.1"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/find-up": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/find-up/-/find-up-7.0.0.tgz",
      "integrity": "sha512-YyZM99iHrqLKjmt4LJDj58KI+fYyufRLBSYcqycxf//KpBk9FoewoGX0450m9nB44qrZnovzC2oeP5hUibxc/g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "locate-path": "^7.2.0",
        "path-exists": "^5.0.0",
        "unicorn-magic": "^0.1.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/follow-redirects": {
      "version": "1.15.9",
      "resolved": "https://registry.npmjs.org/follow-redirects/-/follow-redirects-1.15.9.tgz",
      "integrity": "sha512-gew4GsXizNgdoRyqmyfMHyAmXsZDk6mHkSxZFCzW9gwlbtOW44CDtYavM+y+72qD/Vq2l550kMF52DT8fOLJqQ==",
      "funding": [
        {
          "type": "individual",
          "url": "https://github.com/sponsors/RubenVerborgh"
        }
      ],
      "license": "MIT",
      "engines": {
        "node": ">=4.0"
      },
      "peerDependenciesMeta": {
        "debug": {
          "optional": true
        }
      }
    },
    "node_modules/forwarded": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/forwarded/-/forwarded-0.2.0.tgz",
      "integrity": "sha512-buRG0fpBtRHSTCOASe6hD258tEubFoRLb4ZNA6NxMVHNw2gOcwHo9wyablzMzOA5z9xA9L1KNjk/Nt6MT9aYow==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/fresh": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/fresh/-/fresh-2.0.0.tgz",
      "integrity": "sha512-Rx/WycZ60HOaqLKAi6cHRKKI7zxWbJ31MhntmtwMoaTeF7XFH9hhBp8vITaMidfljRQ6eYWCKkaTK+ykVJHP2A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/fs-constants": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/fs-constants/-/fs-constants-1.0.0.tgz",
      "integrity": "sha512-y6OAwoSIf7FyjMIv94u+b5rdheZEjzR63GTyZJm5qh4Bi+2YgwLCcI/fPFZkL5PSixOt6ZNKm+w+Hfp/Bciwow==",
      "license": "MIT"
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-caller-file": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
      "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": "6.* || 8.* || >= 10.*"
      }
    },
    "node_modules/get-intrinsic": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
      "integrity": "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "function-bind": "^1.1.2",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-proto/-/get-proto-1.0.1.tgz",
      "integrity": "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/get-stream": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/get-stream/-/get-stream-5.2.0.tgz",
      "integrity": "sha512-nBF+F1rAZVCu/p7rjzgA+Yb4lfYXrpl7a6VmJrU8wF9I1CKvP/QwPNZHnOlwbTkY6dvtFIzFMSyQXbLoTQPRpA==",
      "license": "MIT",
      "dependencies": {
        "pump": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/get-tsconfig": {
      "version": "4.10.1",
      "resolved": "https://registry.npmjs.org/get-tsconfig/-/get-tsconfig-4.10.1.tgz",
      "integrity": "sha512-auHyJ4AgMz7vgS8Hp3N6HXSmlMdUyhSUrfBF16w153rxtLIEOE+HGqaBppczZvnHLqQJfiHotCYpNhl0lUROFQ==",
      "license": "MIT",
      "dependencies": {
        "resolve-pkg-maps": "^1.0.0"
      },
      "funding": {
        "url": "https://github.com/privatenumber/get-tsconfig?sponsor=1"
      }
    },
    "node_modules/get-uri": {
      "version": "6.0.5",
      "resolved": "https://registry.npmjs.org/get-uri/-/get-uri-6.0.5.tgz",
      "integrity": "sha512-b1O07XYq8eRuVzBNgJLstU6FYc1tS6wnMtF1I1D9lE8LxZSOGZ7LhxN54yPP6mGw5f2CkXY2BQUL9Fx41qvcIg==",
      "license": "MIT",
      "dependencies": {
        "basic-ftp": "^5.0.2",
        "data-uri-to-buffer": "^6.0.2",
        "debug": "^4.3.4"
      },
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/git-node-fs": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/git-node-fs/-/git-node-fs-1.0.0.tgz",
      "integrity": "sha512-bLQypt14llVXBg0S0u8q8HmU7g9p3ysH+NvVlae5vILuUvs759665HvmR5+wb04KjHyjFcDRxdYb4kyNnluMUQ==",
      "license": "MIT"
    },
    "node_modules/git-raw-commits": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/git-raw-commits/-/git-raw-commits-4.0.0.tgz",
      "integrity": "sha512-ICsMM1Wk8xSGMowkOmPrzo2Fgmfo4bMHLNX6ytHjajRJUqvHOw/TFapQ+QG75c3X/tTDDhOSRPGC52dDbNM8FQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "dargs": "^8.0.0",
        "meow": "^12.0.1",
        "split2": "^4.0.0"
      },
      "bin": {
        "git-raw-commits": "cli.mjs"
      },
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/git-sha1": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/git-sha1/-/git-sha1-0.1.2.tgz",
      "integrity": "sha512-2e/nZezdVlyCopOCYHeW0onkbZg7xP1Ad6pndPy1rCygeRykefUS6r7oA5cJRGEFvseiaz5a/qUHFVX1dd6Isg==",
      "license": "MIT"
    },
    "node_modules/github-from-package": {
      "version": "0.0.0",
      "resolved": "https://registry.npmjs.org/github-from-package/-/github-from-package-0.0.0.tgz",
      "integrity": "sha512-SyHy3T1v2NUXn29OsWdxmK6RwHD+vkj3v8en8AOBZ1wBQ/hCAQ5bAQTD02kW4W9tUp/3Qh6J8r9EvntiyCmOOw==",
      "license": "MIT"
    },
    "node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/global-directory": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/global-directory/-/global-directory-4.0.1.tgz",
      "integrity": "sha512-wHTUcDUoZ1H5/0iVqEudYW4/kAlN5cZ3j/bXn0Dpbizl9iaUVeWSHqiOjsgk6OW2bkLclbBjzewBz6weQ1zA2Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ini": "4.1.1"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/global-directory/node_modules/ini": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/ini/-/ini-4.1.1.tgz",
      "integrity": "sha512-QQnnxNyfvmHFIsj7gkPcYymR8Jdw/o7mp5ZFihxn6h8Ci6fh3Dx4E1gPjpQEpIuPo9XVNY/ZUwh4BPMjGyL01g==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": "^14.17.0 || ^16.13.0 || >=18.0.0"
      }
    },
    "node_modules/gopd": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/gopd/-/gopd-1.2.0.tgz",
      "integrity": "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/got": {
      "version": "11.8.6",
      "resolved": "https://registry.npmjs.org/got/-/got-11.8.6.tgz",
      "integrity": "sha512-6tfZ91bOr7bOXnK7PRDCGBLa1H4U080YHNaAQ2KsMGlLEzRbk44nsZF2E1IeRc3vtJHPVbKCYgdFbaGO2ljd8g==",
      "license": "MIT",
      "dependencies": {
        "@sindresorhus/is": "^4.0.0",
        "@szmarczak/http-timer": "^4.0.5",
        "@types/cacheable-request": "^6.0.1",
        "@types/responselike": "^1.0.0",
        "cacheable-lookup": "^5.0.3",
        "cacheable-request": "^7.0.2",
        "decompress-response": "^6.0.0",
        "http2-wrapper": "^1.0.0-beta.5.2",
        "lowercase-keys": "^2.0.0",
        "p-cancelable": "^2.0.0",
        "responselike": "^2.0.0"
      },
      "engines": {
        "node": ">=10.19.0"
      },
      "funding": {
        "url": "https://github.com/sindresorhus/got?sponsor=1"
      }
    },
    "node_modules/has-flag": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
      "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/has-symbols": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.1.0.tgz",
      "integrity": "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.2.tgz",
      "integrity": "sha512-0hJU9SCPvmMzIBdZFqNPXWa6dqh7WdH0cII9y+CyS8rG3nL48Bclra9HmKhVVUHyPWNH5Y7xDwAB7bfgSjkUMQ==",
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/http-cache-semantics": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/http-cache-semantics/-/http-cache-semantics-4.1.1.tgz",
      "integrity": "sha512-er295DKPVsV82j5kw1Gjt+ADA/XYHsajl82cGNQG2eyoPkvgUhX+nDIyelzhIWbbsXP39EHcI6l5tYs2FYqYXQ==",
      "license": "BSD-2-Clause"
    },
    "node_modules/http-errors": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/http-errors/-/http-errors-2.0.0.tgz",
      "integrity": "sha512-FtwrG/euBzaEjYeRqOgly7G0qviiXoJWnvEH2Z1plBdXgbyjv34pHTSb9zoeHMyDy33+DWy5Wt9Wo+TURtOYSQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "depd": "2.0.0",
        "inherits": "2.0.4",
        "setprototypeof": "1.2.0",
        "statuses": "2.0.1",
        "toidentifier": "1.0.1"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/http-errors/node_modules/statuses": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/statuses/-/statuses-2.0.1.tgz",
      "integrity": "sha512-RwNA9Z/7PrK06rYLIzFMlaF+l73iwpzsqRIFgbMLbTcLD6cOao82TaWefPXQvB2fOC4AjuYSEndS7N/mTCbkdQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/http-proxy-agent": {
      "version": "7.0.2",
      "resolved": "https://registry.npmjs.org/http-proxy-agent/-/http-proxy-agent-7.0.2.tgz",
      "integrity": "sha512-T1gkAiYYDWYx3V5Bmyu7HcfcvL7mUrTWiM6yOfa3PIphViJ/gFPbvidQ+veqSOHci/PxBcDabeUNCzpOODJZig==",
      "license": "MIT",
      "dependencies": {
        "agent-base": "^7.1.0",
        "debug": "^4.3.4"
      },
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/http2-wrapper": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/http2-wrapper/-/http2-wrapper-1.0.3.tgz",
      "integrity": "sha512-V+23sDMr12Wnz7iTcDeJr3O6AIxlnvT/bmaAAAP/Xda35C90p9599p0F1eHR/N1KILWSoWVAiOMFjBBXaXSMxg==",
      "license": "MIT",
      "dependencies": {
        "quick-lru": "^5.1.1",
        "resolve-alpn": "^1.0.0"
      },
      "engines": {
        "node": ">=10.19.0"
      }
    },
    "node_modules/https-proxy-agent": {
      "version": "7.0.6",
      "resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-7.0.6.tgz",
      "integrity": "sha512-vK9P5/iUfdl95AI+JVyUuIcVtd4ofvtrOr3HNtM2yxC9bnMbEdp3x01OhQNnjb8IJYi38VlTE3mBXwcfvywuSw==",
      "license": "MIT",
      "dependencies": {
        "agent-base": "^7.1.2",
        "debug": "4"
      },
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/husky": {
      "version": "9.1.7",
      "resolved": "https://registry.npmjs.org/husky/-/husky-9.1.7.tgz",
      "integrity": "sha512-5gs5ytaNjBrh5Ow3zrvdUUY+0VxIuWVL4i9irt6friV+BqdCfmV11CQTWMiBYWHbXhco+J1kHfTOUkePhCDvMA==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "husky": "bin.js"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/typicode"
      }
    },
    "node_modules/iconv-lite": {
      "version": "0.4.24",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.4.24.tgz",
      "integrity": "sha512-v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA==",
      "license": "MIT",
      "dependencies": {
        "safer-buffer": ">= 2.1.2 < 3"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/ieee754": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/ieee754/-/ieee754-1.2.1.tgz",
      "integrity": "sha512-dcyqhDvX1C46lXZcVqCpK+FtMRQVdIMN6/Df5js2zouUsqG7I6sFxitIC+7KYK29KdXOLHdu9zL4sFnoVQnqaA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "BSD-3-Clause"
    },
    "node_modules/ignore-by-default": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/ignore-by-default/-/ignore-by-default-1.0.1.tgz",
      "integrity": "sha512-Ius2VYcGNk7T90CppJqcIkS5ooHUZyIQK+ClZfMfMNFEF9VSE73Fq+906u/CWu92x4gzZMWOwfFYckPObzdEbA==",
      "license": "ISC"
    },
    "node_modules/import-fresh": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-3.3.1.tgz",
      "integrity": "sha512-TR3KfrTZTYLPB6jUjfx6MF9WcWrHL9su5TObK4ZkYgBdWKPOFoSoQIdEuTuR82pmtxH2spWG9h6etwfr1pLBqQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "parent-module": "^1.0.0",
        "resolve-from": "^4.0.0"
      },
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/import-fresh/node_modules/resolve-from": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-4.0.0.tgz",
      "integrity": "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/import-meta-resolve": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/import-meta-resolve/-/import-meta-resolve-4.2.0.tgz",
      "integrity": "sha512-Iqv2fzaTQN28s/FwZAoFq0ZSs/7hMAHJVX+w8PZl3cY19Pxk6jFFalxQoIfW2826i/fDLXv8IiEZRIT0lDuWcg==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/inherits": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
      "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==",
      "license": "ISC"
    },
    "node_modules/ini": {
      "version": "1.3.8",
      "resolved": "https://registry.npmjs.org/ini/-/ini-1.3.8.tgz",
      "integrity": "sha512-JV/yugV2uzW5iMRSiZAyDtQd+nxtUnjeLt0acNdw98kKLrvuRVyB80tsREOE7yvGVgalhZ6RNXCmEHkUKBKxew==",
      "license": "ISC"
    },
    "node_modules/ip-address": {
      "version": "10.0.1",
      "resolved": "https://registry.npmjs.org/ip-address/-/ip-address-10.0.1.tgz",
      "integrity": "sha512-NWv9YLW4PoW2B7xtzaS3NCot75m6nK7Icdv0o3lfMceJVRfSoQwqD4wEH5rLwoKJwUiZ/rfpiVBhnaF0FK4HoA==",
      "license": "MIT",
      "engines": {
        "node": ">= 12"
      }
    },
    "node_modules/ipaddr.js": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-1.9.1.tgz",
      "integrity": "sha512-0KI/607xoxSToH7GjN1FfSbLoU0+btTicjsQSWQlh/hZykN8KpmMf7uYwPW3R+akZ6R/w18ZlXSHBYXiYUPO3g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/is-arrayish": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/is-arrayish/-/is-arrayish-0.2.1.tgz",
      "integrity": "sha512-zz06S8t0ozoDXMG+ube26zeCTNXcKIPJZJi8hBrF4idCLms4CG9QtK7qBl1boi5ODzFpjswb5JPmHCbMpjaYzg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/is-binary-path": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
      "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
      "license": "MIT",
      "dependencies": {
        "binary-extensions": "^2.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-core-module": {
      "version": "2.16.1",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.16.1.tgz",
      "integrity": "sha512-UfoeMA6fIJ8wTYFEUjelnaGI67v6+N7qXJEvQuIGa99l4xsCruSYOVSQ0uPANn4dAzm8lkYPaKLrrijLq7x23w==",
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-fullwidth-code-point": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
      "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
      "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
      "license": "MIT",
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/is-obj": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/is-obj/-/is-obj-2.0.0.tgz",
      "integrity": "sha512-drqDG3cbczxxEJRoOXcOjtdp1J/lyp1mNn0xaznRs8+muBhgQcrnbspox5X5fOw0HnMnbfDzvnEMEtqDEJEo8w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-promise": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/is-promise/-/is-promise-4.0.0.tgz",
      "integrity": "sha512-hvpoI6korhJMnej285dSg6nu1+e6uxs7zG3BYAm5byqDsgJNWwxzM6z6iZiAgQR4TJ30JmBTOwqZUw3WlyH3AQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/is-text-path": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/is-text-path/-/is-text-path-2.0.0.tgz",
      "integrity": "sha512-+oDTluR6WEjdXEJMnC2z6A4FRwFoYuvShVVEGsS7ewc0UTi2QtAKMDJuL4BDEVt+5T7MjFo12RP8ghOM75oKJw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "text-extensions": "^2.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/jiti": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-2.5.1.tgz",
      "integrity": "sha512-twQoecYPiVA5K/h6SxtORw/Bs3ar+mLUtoPSc7iMXzQzK8d7eJ/R09wmTwAjiamETn1cXYPGfNnu7DMoHgu12w==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jiti": "lib/jiti-cli.mjs"
      }
    },
    "node_modules/js-git": {
      "version": "0.7.8",
      "resolved": "https://registry.npmjs.org/js-git/-/js-git-0.7.8.tgz",
      "integrity": "sha512-+E5ZH/HeRnoc/LW0AmAyhU+mNcWBzAKE+30+IDMLSLbbK+Tdt02AdkOKq9u15rlJsDEGFqtgckc8ZM59LhhiUA==",
      "license": "MIT",
      "dependencies": {
        "bodec": "^0.1.0",
        "culvert": "^0.1.2",
        "git-sha1": "^0.1.2",
        "pako": "^0.2.5"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/js-yaml": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-4.1.0.tgz",
      "integrity": "sha512-wpxZs9NoxZaJESJGIZTyDEaYpl0FKSA+FB9aJiyemKhMwkxQg63h4T1KJgUGHpTqPDNRcmmYLugrRjJlBtWvRA==",
      "license": "MIT",
      "dependencies": {
        "argparse": "^2.0.1"
      },
      "bin": {
        "js-yaml": "bin/js-yaml.js"
      }
    },
    "node_modules/json-buffer": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/json-buffer/-/json-buffer-3.0.1.tgz",
      "integrity": "sha512-4bV5BfR2mqfQTJm+V5tPPdf+ZpuhiIvTuAB5g8kcrXOZpTT/QwwVRWBywX1ozr6lEuPdbHxwaJlm9G6mI2sfSQ==",
      "license": "MIT"
    },
    "node_modules/json-parse-even-better-errors": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/json-parse-even-better-errors/-/json-parse-even-better-errors-2.3.1.tgz",
      "integrity": "sha512-xyFwyhro/JEof6Ghe2iz2NcXoj2sloNsWr/XsERDK/oiPCfaNhl5ONfp+jQdAZRQQ0IJWNzH9zIZF7li91kh2w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-schema-traverse": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-1.0.0.tgz",
      "integrity": "sha512-NM8/P9n3XjXhIZn1lLhkFaACTOURQXjWhV4BA/RnOv8xvgqtqpAX9IO4mRQxSx1Rlo4tqzeqb0sOlruaOy3dug==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-stringify-safe": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/json-stringify-safe/-/json-stringify-safe-5.0.1.tgz",
      "integrity": "sha512-ZClg6AaYvamvYEE82d3Iyd3vSSIjQ+odgjaTzRuO3s7toCdFKczob2i0zCh7JE8kWn17yvAWhUVxvqGwUalsRA==",
      "license": "ISC",
      "optional": true
    },
    "node_modules/jsonparse": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/jsonparse/-/jsonparse-1.3.1.tgz",
      "integrity": "sha512-POQXvpdL69+CluYsillJ7SUhKvytYjW9vG/GKpnf+xP8UWgYEM/RaMzHHofbALDiKbbP1W8UEYmgGl39WkPZsg==",
      "dev": true,
      "engines": [
        "node >= 0.2.0"
      ],
      "license": "MIT"
    },
    "node_modules/JSONStream": {
      "version": "1.3.5",
      "resolved": "https://registry.npmjs.org/JSONStream/-/JSONStream-1.3.5.tgz",
      "integrity": "sha512-E+iruNOY8VV9s4JEbe1aNEm6MiszPRr/UfcHMz0TQh1BXSxHK+ASV1R6W4HpjBhSeS+54PIsAMCBmwD06LLsqQ==",
      "dev": true,
      "license": "(MIT OR Apache-2.0)",
      "dependencies": {
        "jsonparse": "^1.2.0",
        "through": ">=2.2.7 <3"
      },
      "bin": {
        "JSONStream": "bin.js"
      },
      "engines": {
        "node": "*"
      }
    },
    "node_modules/keyv": {
      "version": "4.5.4",
      "resolved": "https://registry.npmjs.org/keyv/-/keyv-4.5.4.tgz",
      "integrity": "sha512-oxVHkHR/EJf2CNXnWxRLW6mg7JyCCUcG0DtEGmL2ctUo1PNTin1PUil+r/+4r5MpVgC/fn1kjsx7mjSujKqIpw==",
      "license": "MIT",
      "dependencies": {
        "json-buffer": "3.0.1"
      }
    },
    "node_modules/lines-and-columns": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
      "integrity": "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/locate-path": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-7.2.0.tgz",
      "integrity": "sha512-gvVijfZvn7R+2qyPX8mAuKcFGDf6Nc61GdvGafQsHL0sBIxfKzA+usWn4GFC/bk+QdwPUD4kWFJLhElipq+0VA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-locate": "^6.0.0"
      },
      "engines": {
        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/lodash": {
      "version": "4.17.21",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
      "integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg==",
      "license": "MIT"
    },
    "node_modules/lodash.camelcase": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/lodash.camelcase/-/lodash.camelcase-4.3.0.tgz",
      "integrity": "sha512-TwuEnCnxbc3rAvhf/LbG7tJUDzhqXyFnv3dtzLOPgCG/hODL7WFnsbwktkD7yUV0RrreP/l1PALq/YSg6VvjlA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/lodash.isplainobject": {
      "version": "4.0.6",
      "resolved": "https://registry.npmjs.org/lodash.isplainobject/-/lodash.isplainobject-4.0.6.tgz",
      "integrity": "sha512-oSXzaWypCMHkPC3NvBEaPHf0KsA5mvPrOPgQWDsbg8n7orZ290M0BmC/jgRZ4vcJ6DTAhjrsSYgdsW/F+MFOBA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/lodash.kebabcase": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/lodash.kebabcase/-/lodash.kebabcase-4.1.1.tgz",
      "integrity": "sha512-N8XRTIMMqqDgSy4VLKPnJ/+hpGZN+PHQiJnSenYqPaVV/NCqEogTnAdZLQiGKhxX+JCs8waWq2t1XHWKOmlY8g==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/lodash.merge": {
      "version": "4.6.2",
      "resolved": "https://registry.npmjs.org/lodash.merge/-/lodash.merge-4.6.2.tgz",
      "integrity": "sha512-0KpjqXRVvrYyCsX1swR/XTK0va6VQkQM6MNo7PqW77ByjAhoARA8EfrP1N4+KlKj8YS0ZUCtRT/YUuhyYDujIQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/lodash.mergewith": {
      "version": "4.6.2",
      "resolved": "https://registry.npmjs.org/lodash.mergewith/-/lodash.mergewith-4.6.2.tgz",
      "integrity": "sha512-GK3g5RPZWTRSeLSpgP8Xhra+pnjBC56q9FZYe1d5RN3TJ35dbkGy3YqBSMbyCrlbi+CM9Z3Jk5yTL7RCsqboyQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/lodash.snakecase": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/lodash.snakecase/-/lodash.snakecase-4.1.1.tgz",
      "integrity": "sha512-QZ1d4xoBHYUeuouhEq3lk3Uq7ldgyFXGBhg04+oRLnIz8o9T65Eh+8YdroUwn846zchkA9yDsDl5CVVaV2nqYw==",
      "license": "MIT"
    },
    "node_modules/lodash.startcase": {
      "version": "4.4.0",
      "resolved": "https://registry.npmjs.org/lodash.startcase/-/lodash.startcase-4.4.0.tgz",
      "integrity": "sha512-+WKqsK294HMSc2jEbNgpHpd0JfIBhp7rEV4aqXWqFr6AlXov+SlcgB1Fv01y2kGe3Gc8nMW7VA0SrGuSkRfIEg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/lodash.uniq": {
      "version": "4.5.0",
      "resolved": "https://registry.npmjs.org/lodash.uniq/-/lodash.uniq-4.5.0.tgz",
      "integrity": "sha512-xfBaXQd9ryd9dlSDvnvI0lvxfLJlYAZzXomUYzLKtUeOQvOP5piqAWuGtrhWeqaXK9hhoM/iyJc5AV+XfsX3HQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/lodash.upperfirst": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/lodash.upperfirst/-/lodash.upperfirst-4.3.1.tgz",
      "integrity": "sha512-sReKOYJIJf74dhJONhU4e0/shzi1trVbSWDOhKYE5XV2O+H7Sb2Dihwuc7xWxVl+DgFPyTqIN3zMfT9cq5iWDg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/lowercase-keys": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/lowercase-keys/-/lowercase-keys-2.0.0.tgz",
      "integrity": "sha512-tqNXrS78oMOE73NMxK4EMLQsQowWf8jKooH9g7xPavRT706R6bkQJ6DY2Te7QukaZsulxa30wQ7bk0pm4XiHmA==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/lru-cache": {
      "version": "7.18.3",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-7.18.3.tgz",
      "integrity": "sha512-jumlc0BIUrS3qJGgIkWZsyfAM7NCWiBcCDhnd+3NNM5KbBmLTgHVfWBcg6W+rLUsIpzpERPsvwUP7CckAQSOoA==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/magic-bytes.js": {
      "version": "1.12.1",
      "resolved": "https://registry.npmjs.org/magic-bytes.js/-/magic-bytes.js-1.12.1.tgz",
      "integrity": "sha512-ThQLOhN86ZkJ7qemtVRGYM+gRgR8GEXNli9H/PMvpnZsE44Xfh3wx9kGJaldg314v85m+bFW6WBMaVHJc/c3zA==",
      "license": "MIT"
    },
    "node_modules/math-intrinsics": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
      "integrity": "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/media-typer": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-1.1.0.tgz",
      "integrity": "sha512-aisnrDP4GNe06UcKFnV5bfMNPBUw4jsLGaWwWfnH3v02GnBuXX2MCVn5RbrWo0j3pczUilYblq7fQ7Nw2t5XKw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/meow": {
      "version": "12.1.1",
      "resolved": "https://registry.npmjs.org/meow/-/meow-12.1.1.tgz",
      "integrity": "sha512-BhXM0Au22RwUneMPwSCnyhTOizdWoIEPU9sp0Aqa1PnDMR5Wv2FGXYDjuzJEIX+Eo2Rb8xuYe5jrnm5QowQFkw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=16.10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/merge-descriptors": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-2.0.0.tgz",
      "integrity": "sha512-Snk314V5ayFLhp3fkUREub6WtjBfPdCPY1Ln8/8munuLuiYhsABgBVWsozAG+MWMbVEvcdcpbi9R7ww22l9Q3g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/mime-db": {
      "version": "1.54.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.54.0.tgz",
      "integrity": "sha512-aU5EJuIN2WDemCcAp2vFBfp/m4EAhWJnUNSSw0ixs7/kXbd6Pg64EmwJkNdFhB8aWt1sH2CTXrLxo/iAGV3oPQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mime-types": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-3.0.1.tgz",
      "integrity": "sha512-xRc4oEhT6eaBpU1XF7AjpOFD+xQmXNB5OVKwp4tqCuBpHLS/ZbBDrc07mYTDqVMg6PfxUjjNp85O6Cd2Z/5HWA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "mime-db": "^1.54.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mimic-response": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/mimic-response/-/mimic-response-1.0.1.tgz",
      "integrity": "sha512-j5EctnkH7amfV/q5Hgmoal1g2QHFJRraOtmx0JpIqkxhBhI/lJSl1nMpQ45hVarwNETOoWEimndZ4QK0RHxuxQ==",
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/minimatch": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.1.2.tgz",
      "integrity": "sha512-J7p63hRiAjw1NDEww1W7i37+ByIrOWO5XQQAzZ3VOcL0PNybwpfmV/N05zFAzwQ9USyEcX6t3UO+K5aqBQOIHw==",
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^1.1.7"
      },
      "engines": {
        "node": "*"
      }
    },
    "node_modules/minimist": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.8.tgz",
      "integrity": "sha512-2yyAR8qBkN3YuheJanUpWC5U3bb5osDywNB8RzDVlDwDHbocAJveqqj1u8+SVD7jkWT4yvsHCpWqqWqAxb0zCA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/mkdirp": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/mkdirp/-/mkdirp-1.0.4.tgz",
      "integrity": "sha512-vVqVZQyf3WLx2Shd0qJ9xuvqgAyKPLAiqITEtqW0oIUjzo3PePDd6fW9iFz30ef7Ysp/oiWqbhszeGWW2T6Gzw==",
      "license": "MIT",
      "bin": {
        "mkdirp": "bin/cmd.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/mkdirp-classic": {
      "version": "0.5.3",
      "resolved": "https://registry.npmjs.org/mkdirp-classic/-/mkdirp-classic-0.5.3.tgz",
      "integrity": "sha512-gKLcREMhtuZRwRAfqP3RFW+TK4JqApVBtOIftVgjuABpAtpxhPGaDcfvbhNvD0B8iD1oUr/txX35NjcaY6Ns/A==",
      "license": "MIT"
    },
    "node_modules/module-details-from-path": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/module-details-from-path/-/module-details-from-path-1.0.4.tgz",
      "integrity": "sha512-EGWKgxALGMgzvxYF1UyGTy0HXX/2vHLkw6+NvDKW2jypWbHpjQuj4UMcqQWXHERJhVGKikolT06G3bcKe4fi7w==",
      "license": "MIT"
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "license": "MIT"
    },
    "node_modules/mute-stream": {
      "version": "0.0.8",
      "resolved": "https://registry.npmjs.org/mute-stream/-/mute-stream-0.0.8.tgz",
      "integrity": "sha512-nnbWWOkoWyUsTjKrhgD0dcz22mdkSnpYqbEjIm2nhwhuxlSkpywJmBo8h0ZqJdkp73mb90SssHkN4rsRaBAfAA==",
      "license": "ISC"
    },
    "node_modules/napi-build-utils": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/napi-build-utils/-/napi-build-utils-2.0.0.tgz",
      "integrity": "sha512-GEbrYkbfF7MoNaoh2iGG84Mnf/WZfB0GdGEsM8wz7Expx/LlWf5U8t9nvJKXSp3qr5IsEbK04cBGhol/KwOsWA==",
      "license": "MIT"
    },
    "node_modules/needle": {
      "version": "2.4.0",
      "resolved": "https://registry.npmjs.org/needle/-/needle-2.4.0.tgz",
      "integrity": "sha512-4Hnwzr3mi5L97hMYeNl8wRW/Onhy4nUKR/lVemJ8gJedxxUyBLm9kkrDColJvoSfwi0jCNhD+xCdOtiGDQiRZg==",
      "license": "MIT",
      "dependencies": {
        "debug": "^3.2.6",
        "iconv-lite": "^0.4.4",
        "sax": "^1.2.4"
      },
      "bin": {
        "needle": "bin/needle"
      },
      "engines": {
        "node": ">= 4.4.x"
      }
    },
    "node_modules/needle/node_modules/debug": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.7.tgz",
      "integrity": "sha512-CFjzYYAi4ThfiQvizrFQevTTXHtnCqWfe7x1AhgEscTz6ZbLbfoLRLPugTQyBth6f8ZERVUSyWHFD/7Wu4t1XQ==",
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.1"
      }
    },
    "node_modules/negotiator": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-1.0.0.tgz",
      "integrity": "sha512-8Ofs/AUQh8MaEcrlq5xOX0CQ9ypTF5dl78mjlMNfOK08fzpgTHQRQPBxcPlEtIw0yRpws+Zo/3r+5WRby7u3Gg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/netmask": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/netmask/-/netmask-2.0.2.tgz",
      "integrity": "sha512-dBpDMdxv9Irdq66304OLfEmQ9tbNRFnFTuZiLo+bD+r332bBmMJ8GBLXklIXXgxd3+v9+KUnZaUR5PJMa75Gsg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4.0"
      }
    },
    "node_modules/node-abi": {
      "version": "3.77.0",
      "resolved": "https://registry.npmjs.org/node-abi/-/node-abi-3.77.0.tgz",
      "integrity": "sha512-DSmt0OEcLoK4i3NuscSbGjOf3bqiDEutejqENSplMSFA/gmB8mkED9G4pKWnPl7MDU4rSHebKPHeitpDfyH0cQ==",
      "license": "MIT",
      "dependencies": {
        "semver": "^7.3.5"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/node-addon-api": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/node-addon-api/-/node-addon-api-7.1.1.tgz",
      "integrity": "sha512-5m3bsyrjFWE1xf7nz7YXdN4udnVtXK6/Yfgn5qnahL6bCkf2yKt4k3nuTKAtT4r3IG8JNR2ncsIMdZuAzJjHQQ==",
      "license": "MIT"
    },
    "node_modules/nodemon": {
      "version": "3.1.10",
      "resolved": "https://registry.npmjs.org/nodemon/-/nodemon-3.1.10.tgz",
      "integrity": "sha512-WDjw3pJ0/0jMFmyNDp3gvY2YizjLmmOUQo6DEBY+JgdvW/yQ9mEeSw6H5ythl5Ny2ytb7f9C2nIbjSxMNzbJXw==",
      "license": "MIT",
      "dependencies": {
        "chokidar": "^3.5.2",
        "debug": "^4",
        "ignore-by-default": "^1.0.1",
        "minimatch": "^3.1.2",
        "pstree.remy": "^1.1.8",
        "semver": "^7.5.3",
        "simple-update-notifier": "^2.0.0",
        "supports-color": "^5.5.0",
        "touch": "^3.1.0",
        "undefsafe": "^2.0.5"
      },
      "bin": {
        "nodemon": "bin/nodemon.js"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/nodemon"
      }
    },
    "node_modules/nodemon/node_modules/has-flag": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-3.0.0.tgz",
      "integrity": "sha512-sKJf1+ceQBr4SMkvQnBDNDtf4TXpVhVGateu0t918bl30FnbE2m4vNLX+VWe/dpjlb+HugGYzW7uQXH98HPEYw==",
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/nodemon/node_modules/supports-color": {
      "version": "5.5.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
      "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
      "license": "MIT",
      "dependencies": {
        "has-flag": "^3.0.0"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/normalize-path": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
      "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/normalize-url": {
      "version": "6.1.0",
      "resolved": "https://registry.npmjs.org/normalize-url/-/normalize-url-6.1.0.tgz",
      "integrity": "sha512-DlL+XwOy3NxAQ8xuC0okPgK46iuVNAK01YN7RueYBqqFeGsBjV9XmCAzAdgt+667bCl5kPh9EqKKDwnaPG1I7A==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/object-inspect": {
      "version": "1.13.4",
      "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.13.4.tgz",
      "integrity": "sha512-W67iLl4J2EXEGTbfeHCffrjDfitvLANg0UlX3wFUUSTx92KXRFegMHUVgSqE+wvhAbi4WqjGg9czysTV2Epbew==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/on-finished": {
      "version": "2.4.1",
      "resolved": "https://registry.npmjs.org/on-finished/-/on-finished-2.4.1.tgz",
      "integrity": "sha512-oVlzkg3ENAhCk2zdv7IJwd/QUD4z2RxRwpkcGY8psCVcCYZNq4wYnVWALHM+brtuJjePWiYF/ClmuDr8Ch5+kg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ee-first": "1.1.1"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/once": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
      "integrity": "sha512-lNaJgI+2Q5URQBkccEKHTQOPaXdUxnZZElQTZY0MFUAuaEqe1E+Nyvgdz/aIyNi6Z9MzO5dv1H8n58/GELp3+w==",
      "license": "ISC",
      "dependencies": {
        "wrappy": "1"
      }
    },
    "node_modules/p-cancelable": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/p-cancelable/-/p-cancelable-2.1.1.tgz",
      "integrity": "sha512-BZOr3nRQHOntUjTrH8+Lh54smKHoHyur8We1V8DSMVrl5A2malOOwuJRnKRDjSnkoeBh4at6BwEnb5I7Jl31wg==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/p-limit": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-4.0.0.tgz",
      "integrity": "sha512-5b0R4txpzjPWVw/cXXUResoD4hb6U/x9BH08L7nw+GN1sezDzPdxeRvpc9c433fZhBan/wusjbCsqwqm4EIBIQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "yocto-queue": "^1.0.0"
      },
      "engines": {
        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-locate": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-6.0.0.tgz",
      "integrity": "sha512-wPrq66Llhl7/4AGC6I+cqxT07LhXvWL08LNXz1fENOw0Ap4sRZZ/gZpTTJ5jpurzzzfS2W/Ge9BY3LgLjCShcw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-limit": "^4.0.0"
      },
      "engines": {
        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/pac-proxy-agent": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/pac-proxy-agent/-/pac-proxy-agent-7.2.0.tgz",
      "integrity": "sha512-TEB8ESquiLMc0lV8vcd5Ql/JAKAoyzHFXaStwjkzpOpC5Yv+pIzLfHvjTSdf3vpa2bMiUQrg9i6276yn8666aA==",
      "license": "MIT",
      "dependencies": {
        "@tootallnate/quickjs-emscripten": "^0.23.0",
        "agent-base": "^7.1.2",
        "debug": "^4.3.4",
        "get-uri": "^6.0.1",
        "http-proxy-agent": "^7.0.0",
        "https-proxy-agent": "^7.0.6",
        "pac-resolver": "^7.0.1",
        "socks-proxy-agent": "^8.0.5"
      },
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/pac-resolver": {
      "version": "7.0.1",
      "resolved": "https://registry.npmjs.org/pac-resolver/-/pac-resolver-7.0.1.tgz",
      "integrity": "sha512-5NPgf87AT2STgwa2ntRMr45jTKrYBGkVU36yT0ig/n/GMAa3oPqhZfIQ2kMEimReg0+t9kZViDVZ83qfVUlckg==",
      "license": "MIT",
      "dependencies": {
        "degenerator": "^5.0.0",
        "netmask": "^2.0.2"
      },
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/pako": {
      "version": "0.2.9",
      "resolved": "https://registry.npmjs.org/pako/-/pako-0.2.9.tgz",
      "integrity": "sha512-NUcwaKxUxWrZLpDG+z/xZaCgQITkA/Dv4V/T6bw7VON6l1Xz/VnrBqrYjZQ12TamKHzITTfOEIYUj48y2KXImA==",
      "license": "MIT"
    },
    "node_modules/parent-module": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/parent-module/-/parent-module-1.0.1.tgz",
      "integrity": "sha512-GQ2EWRpQV8/o+Aw8YqtfZZPfNRWZYkbidE9k5rpl/hC3vtHHBfGm2Ifi6qWV+coDGkrUKZAxE3Lot5kcsRlh+g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "callsites": "^3.0.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/parse-json": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/parse-json/-/parse-json-5.2.0.tgz",
      "integrity": "sha512-ayCKvm/phCGxOkYRSCM82iDwct8/EonSEgCSxWxD7ve6jHggsFl4fZVQBPRNgQoKiuV/odhFrGzQXZwbifC8Rg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.0.0",
        "error-ex": "^1.3.1",
        "json-parse-even-better-errors": "^2.3.0",
        "lines-and-columns": "^1.1.6"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/parseurl": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/parseurl/-/parseurl-1.3.3.tgz",
      "integrity": "sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/path-exists": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-5.0.0.tgz",
      "integrity": "sha512-RjhtfwJOxzcFmNOi6ltcbcu4Iu+FL3zEj83dk4kAS+fVpTxXLO1b38RvJgT/0QwvV/L3aY9TAnyv0EOqW4GoMQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
      }
    },
    "node_modules/path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
      "license": "MIT"
    },
    "node_modules/path-to-regexp": {
      "version": "8.3.0",
      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-8.3.0.tgz",
      "integrity": "sha512-7jdwVIRtsP8MYpdXSwOS0YdD0Du+qOoF/AEPIt88PcCFrZCzx41oxku1jD88hZBwbNUIEfpqvuhjFaMAqMTWnA==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.1.tgz",
      "integrity": "sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA==",
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/pidusage": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/pidusage/-/pidusage-3.0.2.tgz",
      "integrity": "sha512-g0VU+y08pKw5M8EZ2rIGiEBaB8wrQMjYGFfW2QVIfyT8V+fq8YFLkvlz4bz5ljvFDJYNFCWT3PWqcRr2FKO81w==",
      "license": "MIT",
      "dependencies": {
        "safe-buffer": "^5.2.1"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/pm2": {
      "version": "6.0.13",
      "resolved": "https://registry.npmjs.org/pm2/-/pm2-6.0.13.tgz",
      "integrity": "sha512-1hS/adMgKoDpX4S1ichJW8SiGpex+oBSZK31dP1FSYOOGtaeuemXzhXPOCefmddgIY4K6v7uu+7xNPnmEnK3ag==",
      "license": "AGPL-3.0",
      "dependencies": {
        "@pm2/agent": "~2.1.1",
        "@pm2/blessed": "0.1.81",
        "@pm2/io": "~6.1.0",
        "@pm2/js-api": "~0.8.0",
        "@pm2/pm2-version-check": "latest",
        "ansis": "4.0.0-node10",
        "async": "3.2.6",
        "chokidar": "3.6.0",
        "cli-tableau": "2.0.1",
        "commander": "2.15.1",
        "croner": "4.1.97",
        "dayjs": "1.11.15",
        "debug": "4.4.3",
        "enquirer": "2.3.6",
        "eventemitter2": "5.0.1",
        "fclone": "1.0.11",
        "js-yaml": "4.1.0",
        "mkdirp": "1.0.4",
        "needle": "2.4.0",
        "pidusage": "3.0.2",
        "pm2-axon": "~4.0.1",
        "pm2-axon-rpc": "~0.7.1",
        "pm2-deploy": "~1.0.2",
        "pm2-multimeter": "^0.1.2",
        "promptly": "2.2.0",
        "semver": "7.7.2",
        "source-map-support": "0.5.21",
        "sprintf-js": "1.1.2",
        "vizion": "~2.2.1"
      },
      "bin": {
        "pm2": "bin/pm2",
        "pm2-dev": "bin/pm2-dev",
        "pm2-docker": "bin/pm2-docker",
        "pm2-runtime": "bin/pm2-runtime"
      },
      "engines": {
        "node": ">=16.0.0"
      },
      "optionalDependencies": {
        "pm2-sysmonit": "^1.2.8"
      }
    },
    "node_modules/pm2-axon": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/pm2-axon/-/pm2-axon-4.0.1.tgz",
      "integrity": "sha512-kES/PeSLS8orT8dR5jMlNl+Yu4Ty3nbvZRmaAtROuVm9nYYGiaoXqqKQqQYzWQzMYWUKHMQTvBlirjE5GIIxqg==",
      "license": "MIT",
      "dependencies": {
        "amp": "~0.3.1",
        "amp-message": "~0.1.1",
        "debug": "^4.3.1",
        "escape-string-regexp": "^4.0.0"
      },
      "engines": {
        "node": ">=5"
      }
    },
    "node_modules/pm2-axon-rpc": {
      "version": "0.7.1",
      "resolved": "https://registry.npmjs.org/pm2-axon-rpc/-/pm2-axon-rpc-0.7.1.tgz",
      "integrity": "sha512-FbLvW60w+vEyvMjP/xom2UPhUN/2bVpdtLfKJeYM3gwzYhoTEEChCOICfFzxkxuoEleOlnpjie+n1nue91bDQw==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.3.1"
      },
      "engines": {
        "node": ">=5"
      }
    },
    "node_modules/pm2-deploy": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/pm2-deploy/-/pm2-deploy-1.0.2.tgz",
      "integrity": "sha512-YJx6RXKrVrWaphEYf++EdOOx9EH18vM8RSZN/P1Y+NokTKqYAca/ejXwVLyiEpNju4HPZEk3Y2uZouwMqUlcgg==",
      "license": "MIT",
      "dependencies": {
        "run-series": "^1.1.8",
        "tv4": "^1.3.0"
      },
      "engines": {
        "node": ">=4.0.0"
      }
    },
    "node_modules/pm2-multimeter": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/pm2-multimeter/-/pm2-multimeter-0.1.2.tgz",
      "integrity": "sha512-S+wT6XfyKfd7SJIBqRgOctGxaBzUOmVQzTAS+cg04TsEUObJVreha7lvCfX8zzGVr871XwCSnHUU7DQQ5xEsfA==",
      "license": "MIT/X11",
      "dependencies": {
        "charm": "~0.1.1"
      }
    },
    "node_modules/pm2-sysmonit": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/pm2-sysmonit/-/pm2-sysmonit-1.2.8.tgz",
      "integrity": "sha512-ACOhlONEXdCTVwKieBIQLSi2tQZ8eKinhcr9JpZSUAL8Qy0ajIgRtsLxG/lwPOW3JEKqPyw/UaHmTWhUzpP4kA==",
      "license": "Apache",
      "optional": true,
      "dependencies": {
        "async": "^3.2.0",
        "debug": "^4.3.1",
        "pidusage": "^2.0.21",
        "systeminformation": "^5.7",
        "tx2": "~1.0.4"
      }
    },
    "node_modules/pm2-sysmonit/node_modules/pidusage": {
      "version": "2.0.21",
      "resolved": "https://registry.npmjs.org/pidusage/-/pidusage-2.0.21.tgz",
      "integrity": "sha512-cv3xAQos+pugVX+BfXpHsbyz/dLzX+lr44zNMsYiGxUw+kV5sgQCIcLd1z+0vq+KyC7dJ+/ts2PsfgWfSC3WXA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "safe-buffer": "^5.2.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/pm2/node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/postgres": {
      "version": "3.4.7",
      "resolved": "https://registry.npmjs.org/postgres/-/postgres-3.4.7.tgz",
      "integrity": "sha512-Jtc2612XINuBjIl/QTWsV5UvE8UHuNblcO3vVADSrKsrc6RqGX6lOW1cEo3CM2v0XG4Nat8nI+YM7/f26VxXLw==",
      "license": "Unlicense",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "type": "individual",
        "url": "https://github.com/sponsors/porsager"
      }
    },
    "node_modules/prebuild-install": {
      "version": "7.1.3",
      "resolved": "https://registry.npmjs.org/prebuild-install/-/prebuild-install-7.1.3.tgz",
      "integrity": "sha512-8Mf2cbV7x1cXPUILADGI3wuhfqWvtiLA1iclTDbFRZkgRQS0NqsPZphna9V+HyTEadheuPmjaJMsbzKQFOzLug==",
      "license": "MIT",
      "dependencies": {
        "detect-libc": "^2.0.0",
        "expand-template": "^2.0.3",
        "github-from-package": "0.0.0",
        "minimist": "^1.2.3",
        "mkdirp-classic": "^0.5.3",
        "napi-build-utils": "^2.0.0",
        "node-abi": "^3.3.0",
        "pump": "^3.0.0",
        "rc": "^1.2.7",
        "simple-get": "^4.0.0",
        "tar-fs": "^2.0.0",
        "tunnel-agent": "^0.6.0"
      },
      "bin": {
        "prebuild-install": "bin.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/promptly": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/promptly/-/promptly-2.2.0.tgz",
      "integrity": "sha512-aC9j+BZsRSSzEsXBNBwDnAxujdx19HycZoKgRgzWnS8eOHg1asuf9heuLprfbe739zY3IdUQx+Egv6Jn135WHA==",
      "license": "MIT",
      "dependencies": {
        "read": "^1.0.4"
      }
    },
    "node_modules/proxy-addr": {
      "version": "2.0.7",
      "resolved": "https://registry.npmjs.org/proxy-addr/-/proxy-addr-2.0.7.tgz",
      "integrity": "sha512-llQsMLSUDUPT44jdrU/O37qlnifitDP+ZwrmmZcoSKyLKvtZxpyV0n2/bD/N4tBAAZ/gJEdZU7KMraoK1+XYAg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "forwarded": "0.2.0",
        "ipaddr.js": "1.9.1"
      },
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/proxy-agent": {
      "version": "6.4.0",
      "resolved": "https://registry.npmjs.org/proxy-agent/-/proxy-agent-6.4.0.tgz",
      "integrity": "sha512-u0piLU+nCOHMgGjRbimiXmA9kM/L9EHh3zL81xCdp7m+Y2pHIsnmbdDoEDoAz5geaonNR6q6+yOPQs6n4T6sBQ==",
      "license": "MIT",
      "dependencies": {
        "agent-base": "^7.0.2",
        "debug": "^4.3.4",
        "http-proxy-agent": "^7.0.1",
        "https-proxy-agent": "^7.0.3",
        "lru-cache": "^7.14.1",
        "pac-proxy-agent": "^7.0.1",
        "proxy-from-env": "^1.1.0",
        "socks-proxy-agent": "^8.0.2"
      },
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/proxy-from-env": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/proxy-from-env/-/proxy-from-env-1.1.0.tgz",
      "integrity": "sha512-D+zkORCbA9f1tdWRK0RaCR3GPv50cMxcrz4X8k5LTSUD1Dkw47mKJEZQNunItRTkWwgtaUSo1RVFRIG9ZXiFYg==",
      "license": "MIT"
    },
    "node_modules/pstree.remy": {
      "version": "1.1.8",
      "resolved": "https://registry.npmjs.org/pstree.remy/-/pstree.remy-1.1.8.tgz",
      "integrity": "sha512-77DZwxQmxKnu3aR542U+X8FypNzbfJ+C5XQDk3uWjWxn6151aIMGthWYRXTqT1E5oJvg+ljaa2OJi+VfvCOQ8w==",
      "license": "MIT"
    },
    "node_modules/pump": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/pump/-/pump-3.0.2.tgz",
      "integrity": "sha512-tUPXtzlGM8FE3P0ZL6DVs/3P58k9nk8/jZeQCurTJylQA8qFYzHFfhBJkuqyE0FifOsQ0uKWekiZ5g8wtr28cw==",
      "license": "MIT",
      "dependencies": {
        "end-of-stream": "^1.1.0",
        "once": "^1.3.1"
      }
    },
    "node_modules/qs": {
      "version": "6.14.0",
      "resolved": "https://registry.npmjs.org/qs/-/qs-6.14.0.tgz",
      "integrity": "sha512-YWWTjgABSKcvs/nWBi9PycY/JiPJqOD4JA6o9Sej2AtvSGarXxKC3OQSk4pAarbdQlKAh5D4FCQkJNkW+GAn3w==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "side-channel": "^1.1.0"
      },
      "engines": {
        "node": ">=0.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/quick-lru": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/quick-lru/-/quick-lru-5.1.1.tgz",
      "integrity": "sha512-WuyALRjWPDGtt/wzJiadO5AXY+8hZ80hVpe6MyivgraREW751X3SbhRvG3eLKOYN+8VEvqLcf3wdnt44Z4S4SA==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/range-parser": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/range-parser/-/range-parser-1.2.1.tgz",
      "integrity": "sha512-Hrgsx+orqoygnmhFbKaHE6c296J+HTAQXoxEF6gNupROmmGJRoyzfG3ccAveqCBrwr/2yxQ5BVd/GTl5agOwSg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/raw-body": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-3.0.1.tgz",
      "integrity": "sha512-9G8cA+tuMS75+6G/TzW8OtLzmBDMo8p1JRxN5AZ+LAp8uxGA8V8GZm4GQ4/N5QNQEnLmg6SS7wyuSmbKepiKqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "bytes": "3.1.2",
        "http-errors": "2.0.0",
        "iconv-lite": "0.7.0",
        "unpipe": "1.0.0"
      },
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/raw-body/node_modules/iconv-lite": {
      "version": "0.7.0",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.7.0.tgz",
      "integrity": "sha512-cf6L2Ds3h57VVmkZe+Pn+5APsT7FpqJtEhhieDCvrE2MK5Qk9MyffgQyuxQTm6BChfeZNtcOLHp9IcWRVcIcBQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "safer-buffer": ">= 2.1.2 < 3.0.0"
      },
      "engines": {
        "node": ">=0.10.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/rc": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/rc/-/rc-1.2.8.tgz",
      "integrity": "sha512-y3bGgqKj3QBdxLbLkomlohkvsA8gdAiUQlSBJnBhfn+BPxg4bc62d8TcBW15wavDfgexCgccckhcZvywyQYPOw==",
      "license": "(BSD-2-Clause OR MIT OR Apache-2.0)",
      "dependencies": {
        "deep-extend": "^0.6.0",
        "ini": "~1.3.0",
        "minimist": "^1.2.0",
        "strip-json-comments": "~2.0.1"
      },
      "bin": {
        "rc": "cli.js"
      }
    },
    "node_modules/read": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/read/-/read-1.0.7.tgz",
      "integrity": "sha512-rSOKNYUmaxy0om1BNjMN4ezNT6VKK+2xF4GBhc81mkH7L60i6dp8qPYrkndNLT3QPphoII3maL9PVC9XmhHwVQ==",
      "license": "ISC",
      "dependencies": {
        "mute-stream": "~0.0.4"
      },
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/readable-stream": {
      "version": "3.6.2",
      "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.6.2.tgz",
      "integrity": "sha512-9u/sniCrY3D5WdsERHzHE4G2YCXqoG5FTHUiCC4SIbr6XcLZBY05ya9EKjYek9O5xOAwjGq+1JdGBAS7Q9ScoA==",
      "license": "MIT",
      "dependencies": {
        "inherits": "^2.0.3",
        "string_decoder": "^1.1.1",
        "util-deprecate": "^1.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/readdirp": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
      "integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
      "license": "MIT",
      "dependencies": {
        "picomatch": "^2.2.1"
      },
      "engines": {
        "node": ">=8.10.0"
      }
    },
    "node_modules/require-directory": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
      "integrity": "sha512-fGxEI7+wsG9xrvdjsrlmL22OMTTiHRwAMroiEeMgq8gzoLC/PQr7RsRDSTLUg/bZAZtF+TVIkHc6/4RIKrui+Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/require-from-string": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/require-from-string/-/require-from-string-2.0.2.tgz",
      "integrity": "sha512-Xf0nWe6RseziFMu+Ap9biiUbmplq6S9/p+7w7YXP/JBHhrUDDUhwa+vANyubuqfZWTveU//DYVGsDG7RKL/vEw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/require-in-the-middle": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/require-in-the-middle/-/require-in-the-middle-5.2.0.tgz",
      "integrity": "sha512-efCx3b+0Z69/LGJmm9Yvi4cqEdxnoGnxYxGxBghkkTTFeXRtTCmmhO0AnAfHz59k957uTSuy8WaHqOs8wbYUWg==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.1.1",
        "module-details-from-path": "^1.0.3",
        "resolve": "^1.22.1"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/resolve": {
      "version": "1.22.10",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.10.tgz",
      "integrity": "sha512-NPRy+/ncIMeDlTAsuqwKIiferiawhefFJtkNSW0qZJEqMEb+qBt/77B/jGeeek+F0uOeN05CDa6HXbbIgtVX4w==",
      "license": "MIT",
      "dependencies": {
        "is-core-module": "^2.16.0",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/resolve-alpn": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/resolve-alpn/-/resolve-alpn-1.2.1.tgz",
      "integrity": "sha512-0a1F4l73/ZFZOakJnQ3FvkJ2+gSTQWz/r2KE5OdDY0TxPm5h4GkqkWWfM47T7HsbnOtcJVEF4epCVy6u7Q3K+g==",
      "license": "MIT"
    },
    "node_modules/resolve-from": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-5.0.0.tgz",
      "integrity": "sha512-qYg9KP24dD5qka9J47d0aVky0N+b4fTU89LN9iDnjB5waksiC49rvMB0PrUJQGoTmH50XPiqOvAjDfaijGxYZw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/resolve-pkg-maps": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/resolve-pkg-maps/-/resolve-pkg-maps-1.0.0.tgz",
      "integrity": "sha512-seS2Tj26TBVOC2NIc2rOe2y2ZO7efxITtLZcGSOnHHNOQ7CkiUBfw0Iw2ck6xkIhPwLhKNLS8BO+hEpngQlqzw==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/privatenumber/resolve-pkg-maps?sponsor=1"
      }
    },
    "node_modules/responselike": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/responselike/-/responselike-2.0.1.tgz",
      "integrity": "sha512-4gl03wn3hj1HP3yzgdI7d3lCkF95F21Pz4BPGvKHinyQzALR5CapwC8yIi0Rh58DEMQ/SguC03wFj2k0M/mHhw==",
      "license": "MIT",
      "dependencies": {
        "lowercase-keys": "^2.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/router": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/router/-/router-2.2.0.tgz",
      "integrity": "sha512-nLTrUKm2UyiL7rlhapu/Zl45FwNgkZGaCpZbIHajDYgwlJCOzLSk+cIPAnsEqV955GjILJnKbdQC1nVPz+gAYQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.0",
        "depd": "^2.0.0",
        "is-promise": "^4.0.0",
        "parseurl": "^1.3.3",
        "path-to-regexp": "^8.0.0"
      },
      "engines": {
        "node": ">= 18"
      }
    },
    "node_modules/run-series": {
      "version": "1.1.9",
      "resolved": "https://registry.npmjs.org/run-series/-/run-series-1.1.9.tgz",
      "integrity": "sha512-Arc4hUN896vjkqCYrUXquBFtRZdv1PfLbTYP71efP6butxyQ0kWpiNJyAgsxscmQg1cqvHY32/UCBzXedTpU2g==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/safe-buffer": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
      "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/safer-buffer": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
      "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==",
      "license": "MIT"
    },
    "node_modules/sax": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/sax/-/sax-1.4.1.tgz",
      "integrity": "sha512-+aWOz7yVScEGoKNd4PA10LZ8sk0A/z5+nXQG5giUO5rprX9jgYsTdov9qCchZiPIZezbZH+jRut8nPodFAX4Jg==",
      "license": "ISC"
    },
    "node_modules/semver": {
      "version": "7.7.2",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.7.2.tgz",
      "integrity": "sha512-RF0Fw+rO5AMf9MAyaRXI4AV0Ulj5lMHqVxxdSgiVbixSCXoEmmX/jk0CuJw4+3SqroYO9VoUh+HcuJivvtJemA==",
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/send": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/send/-/send-1.2.0.tgz",
      "integrity": "sha512-uaW0WwXKpL9blXE2o0bRhoL2EGXIrZxQ2ZQ4mgcfoBxdFmQold+qWsD2jLrfZ0trjKL6vOw0j//eAwcALFjKSw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "debug": "^4.3.5",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "etag": "^1.8.1",
        "fresh": "^2.0.0",
        "http-errors": "^2.0.0",
        "mime-types": "^3.0.1",
        "ms": "^2.1.3",
        "on-finished": "^2.4.1",
        "range-parser": "^1.2.1",
        "statuses": "^2.0.1"
      },
      "engines": {
        "node": ">= 18"
      }
    },
    "node_modules/serve-static": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-2.2.0.tgz",
      "integrity": "sha512-61g9pCh0Vnh7IutZjtLGGpTA355+OPn2TyDv/6ivP2h/AdAVX9azsoxmg2/M6nZeQZNYBEwIcsne1mJd9oQItQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "parseurl": "^1.3.3",
        "send": "^1.2.0"
      },
      "engines": {
        "node": ">= 18"
      }
    },
    "node_modules/setprototypeof": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.2.0.tgz",
      "integrity": "sha512-E5LDX7Wrp85Kil5bhZv46j8jOeboKq5JMmYM3gVGdGH8xFpPWXUMsNrlODCrkoxMEeNi/XZIwuRvY4XNwYMJpw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/shimmer": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/shimmer/-/shimmer-1.2.1.tgz",
      "integrity": "sha512-sQTKC1Re/rM6XyFM6fIAGHRPVGvyXfgzIDvzoq608vM+jeyVD0Tu1E6Np0Kc2zAIFWIj963V2800iF/9LPieQw==",
      "license": "BSD-2-Clause"
    },
    "node_modules/side-channel": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/side-channel/-/side-channel-1.1.0.tgz",
      "integrity": "sha512-ZX99e6tRweoUXqR+VBrslhda51Nh5MTQwou5tnUDgbtyM0dBgmhEDtWGP/xbKn6hqfPRHujUNwz5fy/wbbhnpw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.3",
        "side-channel-list": "^1.0.0",
        "side-channel-map": "^1.0.1",
        "side-channel-weakmap": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-list": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/side-channel-list/-/side-channel-list-1.0.0.tgz",
      "integrity": "sha512-FCLHtRD/gnpCiCHEiJLOwdmFP+wzCmDEkc9y7NsYxeF4u7Btsn1ZuwgwJGxImImHicJArLP4R0yX4c2KCrMrTA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-map": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-map/-/side-channel-map-1.0.1.tgz",
      "integrity": "sha512-VCjCNfgMsby3tTdo02nbjtM/ewra6jPHmpThenkTYh8pG9ucZ/1P8So4u4FGBek/BjpOVsDCMoLA/iuBKIFXRA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-weakmap": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/side-channel-weakmap/-/side-channel-weakmap-1.0.2.tgz",
      "integrity": "sha512-WPS/HvHQTYnHisLo9McqBHOJk2FkHO/tlpvldyrnem4aeQp4hai3gythswg6p01oSoTl58rcpiFAjF2br2Ak2A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3",
        "side-channel-map": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/signal-exit": {
      "version": "3.0.7",
      "resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-3.0.7.tgz",
      "integrity": "sha512-wnD2ZE+l+SPC/uoS0vXeE9L1+0wuaMqKlfz9AMUo38JsyLSBWSFcHR1Rri62LZc12vLr1gb3jl7iwQhgwpAbGQ==",
      "license": "ISC"
    },
    "node_modules/simple-concat": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/simple-concat/-/simple-concat-1.0.1.tgz",
      "integrity": "sha512-cSFtAPtRhljv69IK0hTVZQ+OfE9nePi/rtJmw5UjHeVyVroEqJXP1sFztKUy1qU+xvz3u/sfYJLa947b7nAN2Q==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/simple-get": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/simple-get/-/simple-get-4.0.1.tgz",
      "integrity": "sha512-brv7p5WgH0jmQJr1ZDDfKDOSeWWg+OVypG99A/5vYGPqJ6pxiaHLy8nxtFjBA7oMa01ebA9gfh1uMCFqOuXxvA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "decompress-response": "^6.0.0",
        "once": "^1.3.1",
        "simple-concat": "^1.0.0"
      }
    },
    "node_modules/simple-update-notifier": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/simple-update-notifier/-/simple-update-notifier-2.0.0.tgz",
      "integrity": "sha512-a2B9Y0KlNXl9u/vsW6sTIu9vGEpfKu2wRV6l1H3XEas/0gUIzGzBoP/IouTcUQbm9JWZLH3COxyn03TYlFax6w==",
      "license": "MIT",
      "dependencies": {
        "semver": "^7.5.3"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/smart-buffer": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/smart-buffer/-/smart-buffer-4.2.0.tgz",
      "integrity": "sha512-94hK0Hh8rPqQl2xXc3HsaBoOXKV20MToPkcXvwbISWLEs+64sBq5kFgn2kJDHb1Pry9yrP0dxrCI9RRci7RXKg==",
      "license": "MIT",
      "engines": {
        "node": ">= 6.0.0",
        "npm": ">= 3.0.0"
      }
    },
    "node_modules/socks": {
      "version": "2.8.7",
      "resolved": "https://registry.npmjs.org/socks/-/socks-2.8.7.tgz",
      "integrity": "sha512-HLpt+uLy/pxB+bum/9DzAgiKS8CX1EvbWxI4zlmgGCExImLdiad2iCwXT5Z4c9c3Eq8rP2318mPW2c+QbtjK8A==",
      "license": "MIT",
      "dependencies": {
        "ip-address": "^10.0.1",
        "smart-buffer": "^4.2.0"
      },
      "engines": {
        "node": ">= 10.0.0",
        "npm": ">= 3.0.0"
      }
    },
    "node_modules/socks-proxy-agent": {
      "version": "8.0.5",
      "resolved": "https://registry.npmjs.org/socks-proxy-agent/-/socks-proxy-agent-8.0.5.tgz",
      "integrity": "sha512-HehCEsotFqbPW9sJ8WVYB6UbmIMv7kUUORIF2Nncq4VQvBfNBLibW9YZR5dlYCSUhwcD628pRllm7n+E+YTzJw==",
      "license": "MIT",
      "dependencies": {
        "agent-base": "^7.1.2",
        "debug": "^4.3.4",
        "socks": "^2.8.3"
      },
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/source-map": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
      "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/source-map-support": {
      "version": "0.5.21",
      "resolved": "https://registry.npmjs.org/source-map-support/-/source-map-support-0.5.21.tgz",
      "integrity": "sha512-uBHU3L3czsIyYXKX88fdrGovxdSCoTGDRZ6SYXtSRxLZUzHg5P/66Ht6uoUlHu9EZod+inXhKo3qQgwXUT/y1w==",
      "license": "MIT",
      "dependencies": {
        "buffer-from": "^1.0.0",
        "source-map": "^0.6.0"
      }
    },
    "node_modules/split2": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/split2/-/split2-4.2.0.tgz",
      "integrity": "sha512-UcjcJOWknrNkF6PLX83qcHM6KHgVKNkV62Y8a5uYDVv9ydGQVwAHMKqHdJje1VTWpljG0WYpCDhrCdAOYH4TWg==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": ">= 10.x"
      }
    },
    "node_modules/sprintf-js": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/sprintf-js/-/sprintf-js-1.1.2.tgz",
      "integrity": "sha512-VE0SOVEHCk7Qc8ulkWw3ntAzXuqf7S2lvwQaDLRnUeIEaKNQJzV6BwmLKhOqT61aGhfUMrXeaBk+oDGCzvhcug==",
      "license": "BSD-3-Clause"
    },
    "node_modules/statuses": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/statuses/-/statuses-2.0.2.tgz",
      "integrity": "sha512-DvEy55V3DB7uknRo+4iOGT5fP1slR8wQohVdknigZPMpMstaKJQWhwiYBACJE3Ul2pTnATihhBYnRhZQHGBiRw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/string_decoder": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.3.0.tgz",
      "integrity": "sha512-hkRX8U1WjJFd8LsDJ2yQ/wWWxaopEsABU1XfkM8A+j0+85JAGppt16cr1Whg6KIbb4okU6Mql6BOj+uup/wKeA==",
      "license": "MIT",
      "dependencies": {
        "safe-buffer": "~5.2.0"
      }
    },
    "node_modules/string-width": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-json-comments": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-2.0.1.tgz",
      "integrity": "sha512-4gB8na07fecVVkOI6Rs4e7T6NOTki5EmL7TUduTs6bu3EdnSycntVJ4re8kgZA+wx9IueI2Y11bfbgwtzuE0KQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/supports-color": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
      "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
      "license": "MIT",
      "dependencies": {
        "has-flag": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/systeminformation": {
      "version": "5.27.1",
      "resolved": "https://registry.npmjs.org/systeminformation/-/systeminformation-5.27.1.tgz",
      "integrity": "sha512-FgkVpT6GgATtNvADgtEzDxI/SVaBisfnQ4fmgQZhCJ4335noTgt9q6O81ioHwzs9HgnJaaFSdHSEMIkneZ55iA==",
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin",
        "linux",
        "win32",
        "freebsd",
        "openbsd",
        "netbsd",
        "sunos",
        "android"
      ],
      "bin": {
        "systeminformation": "lib/cli.js"
      },
      "engines": {
        "node": ">=8.0.0"
      },
      "funding": {
        "type": "Buy me a coffee",
        "url": "https://www.buymeacoffee.com/systeminfo"
      }
    },
    "node_modules/tar-fs": {
      "version": "2.1.4",
      "resolved": "https://registry.npmjs.org/tar-fs/-/tar-fs-2.1.4.tgz",
      "integrity": "sha512-mDAjwmZdh7LTT6pNleZ05Yt65HC3E+NiQzl672vQG38jIrehtJk/J3mNwIg+vShQPcLF/LV7CMnDW6vjj6sfYQ==",
      "license": "MIT",
      "dependencies": {
        "chownr": "^1.1.1",
        "mkdirp-classic": "^0.5.2",
        "pump": "^3.0.0",
        "tar-stream": "^2.1.4"
      }
    },
    "node_modules/tar-stream": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/tar-stream/-/tar-stream-2.2.0.tgz",
      "integrity": "sha512-ujeqbceABgwMZxEJnk2HDY2DlnUZ+9oEcb1KzTVfYHio0UE6dG71n60d8D2I4qNvleWrrXpmjpt7vZeF1LnMZQ==",
      "license": "MIT",
      "dependencies": {
        "bl": "^4.0.3",
        "end-of-stream": "^1.4.1",
        "fs-constants": "^1.0.0",
        "inherits": "^2.0.3",
        "readable-stream": "^3.1.1"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/text-extensions": {
      "version": "2.4.0",
      "resolved": "https://registry.npmjs.org/text-extensions/-/text-extensions-2.4.0.tgz",
      "integrity": "sha512-te/NtwBwfiNRLf9Ijqx3T0nlqZiQ2XrrtBvu+cLL8ZRrGkO0NHTug8MYFKyoSrv/sHTaSKfilUkizV6XhxMJ3g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/through": {
      "version": "2.3.8",
      "resolved": "https://registry.npmjs.org/through/-/through-2.3.8.tgz",
      "integrity": "sha512-w89qg7PI8wAdvX60bMDP+bFoD5Dvhm9oLheFp5O4a2QF0cSBGsBX4qZmadPMvVqlLJBBci+WqGGOAPvcDeNSVg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/tinyexec": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/tinyexec/-/tinyexec-1.0.1.tgz",
      "integrity": "sha512-5uC6DDlmeqiOwCPmK9jMSdOuZTh8bU39Ys6yidB+UTt5hfZUPGAypSgFRiEp+jbi9qH40BLDvy85jIU88wKSqw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
      "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
      "license": "MIT",
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/toidentifier": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/toidentifier/-/toidentifier-1.0.1.tgz",
      "integrity": "sha512-o5sSPKEkg/DIQNmH43V0/uerLrpzVedkUh8tGNvaeXpfpuwjKenlSox/2O/BTlZUtEe+JG7s5YhEz608PlAHRA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.6"
      }
    },
    "node_modules/touch": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/touch/-/touch-3.1.1.tgz",
      "integrity": "sha512-r0eojU4bI8MnHr8c5bNo7lJDdI2qXlWWJk6a9EAFG7vbhTjElYhBVS3/miuE0uOuoLdb8Mc/rVfsmm6eo5o9GA==",
      "license": "ISC",
      "bin": {
        "nodetouch": "bin/nodetouch.js"
      }
    },
    "node_modules/ts-mixer": {
      "version": "6.0.4",
      "resolved": "https://registry.npmjs.org/ts-mixer/-/ts-mixer-6.0.4.tgz",
      "integrity": "sha512-ufKpbmrugz5Aou4wcr5Wc1UUFWOLhq+Fm6qa6P0w0K5Qw2yhaUoiWszhCVuNQyNwrlGiscHOmqYoAox1PtvgjA==",
      "license": "MIT"
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD"
    },
    "node_modules/tsx": {
      "version": "4.20.6",
      "resolved": "https://registry.npmjs.org/tsx/-/tsx-4.20.6.tgz",
      "integrity": "sha512-ytQKuwgmrrkDTFP4LjR0ToE2nqgy886GpvRSpU0JAnrdBYppuY5rLkRUYPU1yCryb24SsKBTL/hlDQAEFVwtZg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "esbuild": "~0.25.0",
        "get-tsconfig": "^4.7.5"
      },
      "bin": {
        "tsx": "dist/cli.mjs"
      },
      "engines": {
        "node": ">=18.0.0"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      }
    },
    "node_modules/tunnel-agent": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/tunnel-agent/-/tunnel-agent-0.6.0.tgz",
      "integrity": "sha512-McnNiV1l8RYeY8tBgEpuodCC1mLUdbSN+CYBL7kJsJNInOP8UjDDEwdk6Mw60vdLLrr5NHKZhMAOSrR2NZuQ+w==",
      "license": "Apache-2.0",
      "dependencies": {
        "safe-buffer": "^5.0.1"
      },
      "engines": {
        "node": "*"
      }
    },
    "node_modules/tv4": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/tv4/-/tv4-1.3.0.tgz",
      "integrity": "sha512-afizzfpJgvPr+eDkREK4MxJ/+r8nEEHcmitwgnPUqpaP+FpwQyadnxNoSACbgc/b1LsZYtODGoPiFxQrgJgjvw==",
      "license": [
        {
          "type": "Public Domain",
          "url": "http://geraintluff.github.io/tv4/LICENSE.txt"
        },
        {
          "type": "MIT",
          "url": "http://jsonary.com/LICENSE.txt"
        }
      ],
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/twemoji-parser": {
      "version": "14.0.0",
      "resolved": "https://registry.npmjs.org/twemoji-parser/-/twemoji-parser-14.0.0.tgz",
      "integrity": "sha512-9DUOTGLOWs0pFWnh1p6NF+C3CkQ96PWmEFwhOVmT3WbecRC+68AIqpsnJXygfkFcp4aXbOp8Dwbhh/HQgvoRxA==",
      "license": "MIT"
    },
    "node_modules/tx2": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/tx2/-/tx2-1.0.5.tgz",
      "integrity": "sha512-sJ24w0y03Md/bxzK4FU8J8JveYYUbSs2FViLJ2D/8bytSiyPRbuE3DyL/9UKYXTZlV3yXq0L8GLlhobTnekCVg==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "json-stringify-safe": "^5.0.1"
      }
    },
    "node_modules/type-is": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/type-is/-/type-is-2.0.1.tgz",
      "integrity": "sha512-OZs6gsjF4vMp32qrCbiVSkrFmXtG/AZhY3t0iAMrMBiAZyV9oALtXO8hsrHbMXF9x6L3grlFuwW2oAz7cav+Gw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "content-type": "^1.0.5",
        "media-typer": "^1.1.0",
        "mime-types": "^3.0.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/typescript": {
      "version": "5.9.2",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.9.2.tgz",
      "integrity": "sha512-CWBzXQrc/qOkhidw1OzBTQuYRbfyxDXJMVJ1XNwUHGROVmuaeiEm3OslpZ1RV96d7SKKjZKrSJu3+t/xlw3R9A==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/undefsafe": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/undefsafe/-/undefsafe-2.0.5.tgz",
      "integrity": "sha512-WxONCrssBM8TSPRqN5EmsjVrsv4A8X12J4ArBiiayv3DyyG3ZlIg6yysuuSYdZsVz3TKcTg2fd//Ujd4CHV1iA==",
      "license": "MIT"
    },
    "node_modules/undici": {
      "version": "6.21.3",
      "resolved": "https://registry.npmjs.org/undici/-/undici-6.21.3.tgz",
      "integrity": "sha512-gBLkYIlEnSp8pFbT64yFgGE6UIB9tAkhukC23PmMDCe5Nd+cRqKxSjw5y54MK2AZMgZfJWMaNE4nYUHgi1XEOw==",
      "license": "MIT",
      "engines": {
        "node": ">=18.17"
      }
    },
    "node_modules/undici-types": {
      "version": "7.12.0",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-7.12.0.tgz",
      "integrity": "sha512-goOacqME2GYyOZZfb5Lgtu+1IDmAlAEu5xnD3+xTzS10hT0vzpf0SPjkXwAw9Jm+4n/mQGDP3LO8CPbYROeBfQ==",
      "license": "MIT"
    },
    "node_modules/unicorn-magic": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/unicorn-magic/-/unicorn-magic-0.1.0.tgz",
      "integrity": "sha512-lRfVq8fE8gz6QMBuDM6a+LO3IAzTi05H6gCVaUpir2E1Rwpo4ZUog45KpNXKC/Mn3Yb9UDuHumeFTo9iV/D9FQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/unpipe": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unpipe/-/unpipe-1.0.0.tgz",
      "integrity": "sha512-pjy2bYhSsufwWlKwPc+l3cN7+wuJlK6uz0YdJEOlQDbl6jo/YlPi4mb8agUkVC8BF7V8NuzeyPNqRksA3hztKQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==",
      "license": "MIT"
    },
    "node_modules/vary": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/vary/-/vary-1.1.2.tgz",
      "integrity": "sha512-BNGbWLfd0eUPabhkXUVm0j8uuvREyTh5ovRa/dyow/BqAbZJyC+5fU+IzQOzmAKzYqYRAISoRhdQr3eIZ/PXqg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/vizion": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/vizion/-/vizion-2.2.1.tgz",
      "integrity": "sha512-sfAcO2yeSU0CSPFI/DmZp3FsFE9T+8913nv1xWBOyzODv13fwkn6Vl7HqxGpkr9F608M+8SuFId3s+BlZqfXww==",
      "license": "Apache-2.0",
      "dependencies": {
        "async": "^2.6.3",
        "git-node-fs": "^1.0.0",
        "ini": "^1.3.5",
        "js-git": "^0.7.8"
      },
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/vizion/node_modules/async": {
      "version": "2.6.4",
      "resolved": "https://registry.npmjs.org/async/-/async-2.6.4.tgz",
      "integrity": "sha512-mzo5dfJYwAn29PeiJ0zvwTo04zj8HDJj0Mn8TD7sno7q12prdbnasKJHhkm2c1LgrhlJ0teaea8860oxi51mGA==",
      "license": "MIT",
      "dependencies": {
        "lodash": "^4.17.14"
      }
    },
    "node_modules/wrap-ansi": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
      "integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.0.0",
        "string-width": "^4.1.0",
        "strip-ansi": "^6.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/wrappy": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
      "integrity": "sha512-l4Sp/DRseor9wL6EvV2+TuQn63dMkPjZ/sp9XkghTEbV9KlPS1xUsZ3u7/IQO4wxtcFB4bgpQPRcR3QCvezPcQ==",
      "license": "ISC"
    },
    "node_modules/ws": {
      "version": "8.18.3",
      "resolved": "https://registry.npmjs.org/ws/-/ws-8.18.3.tgz",
      "integrity": "sha512-PEIGCY5tSlUt50cqyMXfCzX+oOPqN0vuGqWzbcJ2xvnkzkq46oOpz7dQaTDBdfICb4N14+GARUDw2XV2N4tvzg==",
      "license": "MIT",
      "engines": {
        "node": ">=10.0.0"
      },
      "peerDependencies": {
        "bufferutil": "^4.0.1",
        "utf-8-validate": ">=5.0.2"
      },
      "peerDependenciesMeta": {
        "bufferutil": {
          "optional": true
        },
        "utf-8-validate": {
          "optional": true
        }
      }
    },
    "node_modules/y18n": {
      "version": "5.0.8",
      "resolved": "https://registry.npmjs.org/y18n/-/y18n-5.0.8.tgz",
      "integrity": "sha512-0pfFzegeDWJHJIAmTLRP2DwHjdF5s7jo9tuztdQxAhINCdvS+3nGINqPd00AphqJR/0LhANUS6/+7SCb98YOfA==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/yallist": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
      "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A==",
      "license": "ISC"
    },
    "node_modules/yargs": {
      "version": "17.7.2",
      "resolved": "https://registry.npmjs.org/yargs/-/yargs-17.7.2.tgz",
      "integrity": "sha512-7dSzzRQ++CKnNI/krKnYRV7JKKPUXMEh61soaHKg9mrWEhzFWhFnxPxGl+69cD1Ou63C13NUPCnmIcrvqCuM6w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "cliui": "^8.0.1",
        "escalade": "^3.1.1",
        "get-caller-file": "^2.0.5",
        "require-directory": "^2.1.1",
        "string-width": "^4.2.3",
        "y18n": "^5.0.5",
        "yargs-parser": "^21.1.1"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/yargs-parser": {
      "version": "21.1.1",
      "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-21.1.1.tgz",
      "integrity": "sha512-tVpsJW7DdjecAiFpbIB1e3qxIQsE6NoPc5/eTdrbbIC4h0LVsWhnoa3g+m2HclBIujHzsxZ4VJVA+GUuc2/LBw==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/yocto-queue": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-1.2.1.tgz",
      "integrity": "sha512-AyeEbWOu/TAXdxlV9wmGcR0+yh2j3vYPGOECcIj2S7MkrLyC7ne+oye2BKTItt0ii2PHk4cDy+95+LshzbXnGg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.20"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    }
  }
}

```

---
### File: `biome.json`
---

```json
{
  "$schema": "https://biomejs.dev/schemas/2.2.4/schema.json",
  "assist": {
    "actions": {
      "source": {
        "organizeImports": "on"
      }
    }
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "style": {
        "useNodejsImportProtocol": "off"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineEnding": "crlf"
  }
}

```

---
### File: `commitlint.config.js`
---

```js
export default {
  extends: ["@commitlint/config-conventional"],
};

```

---
### File: `drizzle.config.ts`
---

```ts
import { defineConfig } from "drizzle-kit";
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in the environment variables");
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});

```

---
### File: `package.json`
---

```json
{
  "name": "maybe-bot",
  "version": "1.0.0",
  "type": "module",
  "description": "May be a bot to start perhaps a Minecaft server",
  "main": "index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "preview:ui": "nodemon --watch src --ext ts --exec \"tsx src/preview.ts\"",
    "dev": "tsc -w & node --watch dist/index.js",
    "prepare": "husky",
    "lint": "npx biome check --write --no-errors-on-unmatched .",
    "format": "npx @biomejs/biome format --write ."
  },
  "author": "chev",
  "license": "ISC",
  "dependencies": {
    "canvas": "^3.2.0",
    "discord.js": "^14.18.0",
    "dotenv": "^16.4.7",
    "drizzle-kit": "^0.31.5",
    "drizzle-orm": "^0.44.5",
    "exaroton": "^1.11.3",
    "nodemon": "^3.1.10",
    "pm2": "^6.0.13",
    "@types/twemoji-parser": "^13.1.4",
    "@types/exaroton": "^1.11.1",
    "postgres": "^3.4.7",
    "twemoji-parser": "^14.0.0"
  },
  "devDependencies": {
    "@biomejs/biome": "^2.2.4",
    "@commitlint/cli": "^19.8.1",
    "@commitlint/config-conventional": "^19.8.1",
    "@types/express": "^5.0.3",
    "express": "^5.1.0",
    "@types/node": "^24.5.2",
    "husky": "^9.1.7",
    "tsx": "^4.20.6",
    "typescript": "^5.9.2"
  }
}

```

---
### File: `tsconfig.json`
---

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,

    "strict": true,
    "skipLibCheck": true,

    "resolveJsonModule": true
  },
  "include": ["src/**/*", "src/index.ts"],
  "exclude": ["node_modules", "src/preview.ts"]
}

```

---
### File: `.husky/commit-msg`
---

```
npx --no -- commitlint --edit $1

```

---
### File: `.husky/pre-push`
---

```
npm run lint

```

---
### File: `drizzle/0000_common_doctor_spectrum.sql`
---

```sql
CREATE TABLE "channel_stats" (
	"channel_id" text PRIMARY KEY NOT NULL,
	"messages" integer DEFAULT 0,
	"vc_hours" real DEFAULT 0,
	"stream_hours" real DEFAULT 0,
	"last_updated" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "channels" (
	"id" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "top_channels" (
	"category" text NOT NULL,
	"rank" integer NOT NULL,
	"channel_id" text,
	"value" real NOT NULL,
	CONSTRAINT "top_channels_category_rank_pk" PRIMARY KEY("category","rank")
);
--> statement-breakpoint
CREATE TABLE "top_users" (
	"category" text NOT NULL,
	"rank" integer NOT NULL,
	"user_id" text,
	"value" real NOT NULL,
	CONSTRAINT "top_users_category_rank_pk" PRIMARY KEY("category","rank")
);
--> statement-breakpoint
CREATE TABLE "user_stats" (
	"user_id" text PRIMARY KEY NOT NULL,
	"bumps" integer DEFAULT 0,
	"messages" integer DEFAULT 0,
	"vc_hours" real DEFAULT 0,
	"stream_hours" real DEFAULT 0,
	"last_updated" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_vc_channel_hours" (
	"user_id" text,
	"channel_id" text,
	"hours" real DEFAULT 0,
	CONSTRAINT "user_vc_channel_hours_user_id_channel_id_pk" PRIMARY KEY("user_id","channel_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text
);
--> statement-breakpoint
ALTER TABLE "channel_stats" ADD CONSTRAINT "channel_stats_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "public"."channels"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "top_channels" ADD CONSTRAINT "top_channels_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "public"."channels"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "top_users" ADD CONSTRAINT "top_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_stats" ADD CONSTRAINT "user_stats_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_vc_channel_hours" ADD CONSTRAINT "user_vc_channel_hours_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_vc_channel_hours" ADD CONSTRAINT "user_vc_channel_hours_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "public"."channels"("id") ON DELETE no action ON UPDATE no action;
```

---
### File: `drizzle/0001_parallel_namorita.sql`
---

```sql
CREATE TABLE "daily_channel_stats" (
	"channel_id" text NOT NULL,
	"date" date NOT NULL,
	"messages" integer DEFAULT 0 NOT NULL,
	"vc_hours" real DEFAULT 0 NOT NULL,
	CONSTRAINT "daily_channel_stats_channel_id_date_pk" PRIMARY KEY("channel_id","date")
);
--> statement-breakpoint
CREATE TABLE "daily_user_stats" (
	"user_id" text NOT NULL,
	"date" date NOT NULL,
	"messages" integer DEFAULT 0 NOT NULL,
	"vc_hours" real DEFAULT 0 NOT NULL,
	"stream_hours" real DEFAULT 0 NOT NULL,
	"bumps" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "daily_user_stats_user_id_date_pk" PRIMARY KEY("user_id","date")
);
--> statement-breakpoint
ALTER TABLE "channel_stats" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "top_channels" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "top_users" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "user_stats" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "user_vc_channel_hours" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "channel_stats" CASCADE;--> statement-breakpoint
DROP TABLE "top_channels" CASCADE;--> statement-breakpoint
DROP TABLE "top_users" CASCADE;--> statement-breakpoint
DROP TABLE "user_stats" CASCADE;--> statement-breakpoint
DROP TABLE "user_vc_channel_hours" CASCADE;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "username" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "channels" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "daily_channel_stats" ADD CONSTRAINT "daily_channel_stats_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "public"."channels"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "daily_user_stats" ADD CONSTRAINT "daily_user_stats_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
```

---
### File: `drizzle/0002_confused_talos.sql`
---

```sql
CREATE TYPE "public"."channel_type" AS ENUM('text', 'voice');--> statement-breakpoint
ALTER TABLE "channels" ADD COLUMN "type" "channel_type" NOT NULL;
```

---
### File: `drizzle/0003_nebulous_carnage.sql`
---

```sql
CREATE TABLE "active_vc_sessions" (
	"user_id" text PRIMARY KEY NOT NULL,
	"channel_id" text NOT NULL,
	"join_time" timestamp with time zone NOT NULL,
	"is_streaming" boolean DEFAULT false NOT NULL,
	"stream_start_time" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "active_vc_sessions" ADD CONSTRAINT "active_vc_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "active_vc_sessions" ADD CONSTRAINT "active_vc_sessions_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "public"."channels"("id") ON DELETE no action ON UPDATE no action;
```

---
### File: `drizzle/0004_low_tyrannus.sql`
---

```sql
CREATE TABLE "confessions" (
	"id" integer PRIMARY KEY NOT NULL,
	"message_id" text NOT NULL
);

```

---
### File: `src/preview.ts`
---

```ts
import express from "express";
import {
  getMockActivityData,
  type MessageActivityData,
  type VoiceActivityData,
} from "./commands/slash/stats/activity/activity.mock.js";
import {
  generateMessageActivityImage,
  generateVoiceActivityImage,
} from "./utils/services/activityImageGenerator.js";
import {
  dummyChannelMessages,
  dummyChannelVC,
  dummyOverviewData,
  dummyUserBumps,
  dummyUserMessages,
  dummyUserStreamHours,
  dummyUserVC,
} from "./utils/services/dummyData.js";
import {
  generateLeaderboardImage,
  generateOverviewImage,
} from "./utils/services/imageGenerator.js";

const app = express();
const PORT = 3000;

const serverName = "Maybe Server";
const serverIconUrl = "src/assets/images/Maybe-Icon.png";
const timeframe = "過去7日間";

const htmlShell = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maybe-Bot UI Preview</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #2B2D31;
            color: #FFFFFF;
            text-align: center;
            margin: 0;
            padding: 2rem;
        }
        h1 {
            color: #FFFFFF;
        }
        .button-group {
            margin: 1.5rem 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
        }
        button {
            background-color: #383A40;
            color: #B8B9BF;
            border: 1px solid #4A4D54;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.2s, color 0.2s;
        }
        button:hover {
            background-color: #4A4D54;
        }
        button.active {
            background-color: #5865F2;
            color: #FFFFFF;
            border-color: #5865F2;
        }
        #image-frame {
            margin-top: 1rem;
            border: 2px solid #383A40;
            border-radius: 8px;
            max-width: 100%;
            height: auto;
        }
    </style>
</head>
<body>
    <h1>Maybe-Bot UI Preview</h1>
    <div class="button-group">
        <button id="btn-overview" class="active">Overview</button>
        <button id="btn-msg-users">Top Message Users</button>
        <button id="btn-vc-users">Top Voice Users</button>
        <button id="btn-stream-users">Top Streamers</button>
        <button id="btn-bump-users">Top Bumpers</button>
        <button id="btn-msg-channels">Top Message Channels</button>
        <button id="btn-vc-channels">Top Voice Channels</button>
    </div>

    <h2>Activity Stats</h2>
    <div class="button-group">
        <button id="btn-activity-message">Message Activity</button>
        <button id="btn-activity-voice">Voice Activity</button>
    </div>
    
    <img id="image-frame" src="/overview" alt="UI Preview">

    <script>
        const frame = document.getElementById('image-frame');
        const buttons = document.querySelectorAll('.button-group button');

        const routes = {
            'btn-overview': '/overview',
            'btn-msg-users': '/leaderboard/msg-users',
            'btn-vc-users': '/leaderboard/vc-users',
            'btn-stream-users': '/leaderboard/stream-users',
            'btn-bump-users': '/leaderboard/bump-users',
            'btn-msg-channels': '/leaderboard/msg-channels',
            'btn-vc-channels': '/leaderboard/vc-channels',
            // --- New Routes ---
            'btn-activity-message': '/activity/message',
            'btn-activity-voice': '/activity/voice'
        };

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const route = routes[button.id];
                if (route) {
                    frame.src = route;
                }
                buttons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    </script>
</body>
</html>
`;

app.get("/", (_req, res) => {
  res.send(htmlShell);
});

app.get("/overview", async (_req: express.Request, res: express.Response) => {
  console.log("Generating /overview image...");
  try {
    const imageBuffer = await generateOverviewImage(
      dummyOverviewData,
      serverIconUrl,
      serverName,
      timeframe,
    );
    res.setHeader("Content-Type", "image/png");
    res.send(imageBuffer);
  } catch (error) {
    console.error("Error generating overview image:", error);
    res.status(500).send("Error generating image");
  }
});

app.get(
  "/leaderboard/msg-users",
  async (_req: express.Request, res: express.Response) => {
    console.log("Generating /leaderboard/msg-users image...");
    try {
      const imageBuffer = await generateLeaderboardImage(
        "メッセージ・Top Messages",
        "src/assets/icons/chat.png",
        dummyUserMessages,
        serverIconUrl,
        serverName,
        timeframe,
      );
      res.setHeader("Content-Type", "image/png");
      res.send(imageBuffer);
    } catch (error) {
      console.error("Error generating message users leaderboard:", error);
      res.status(500).send("Error generating image");
    }
  },
);

app.get(
  "/leaderboard/vc-users",
  async (_req: express.Request, res: express.Response) => {
    console.log("Generating /leaderboard/vc-users image...");
    try {
      const imageBuffer = await generateLeaderboardImage(
        "ボイス時間・Top VC Hours",
        "src/assets/icons/mic.png",
        dummyUserVC,
        serverIconUrl,
        serverName,
        timeframe,
      );
      res.setHeader("Content-Type", "image/png");
      res.send(imageBuffer);
    } catch (error) {
      console.error("Error generating voice users leaderboard:", error);
      res.status(500).send("Error generating image");
    }
  },
);

app.get(
  "/leaderboard/stream-users",
  async (_req: express.Request, res: express.Response) => {
    console.log("Generating /leaderboard/stream-users image...");
    try {
      const imageBuffer = await generateLeaderboardImage(
        "配信時間・Top Stream Hours",
        "src/assets/icons/stream.png",
        dummyUserStreamHours,
        serverIconUrl,
        serverName,
        timeframe,
      );
      res.setHeader("Content-Type", "image/png");
      res.send(imageBuffer);
    } catch (error) {
      console.error("Error generating stream users leaderboard:", error);
      res.status(500).send("Error generating image");
    }
  },
);

app.get(
  "/leaderboard/bump-users",
  async (_req: express.Request, res: express.Response) => {
    console.log("Generating /leaderboard/bump-users image...");
    try {
      const imageBuffer = await generateLeaderboardImage(
        "バンプ数・Top Bumpers",
        "src/assets/icons/bump.png",
        dummyUserBumps,
        serverIconUrl,
        serverName,
        timeframe,
      );
      res.setHeader("Content-Type", "image/png");
      res.send(imageBuffer);
    } catch (error) {
      console.error("Error generating bump users leaderboard:", error);
      res.status(500).send("Error generating image");
    }
  },
);

app.get(
  "/leaderboard/msg-channels",
  async (_req: express.Request, res: express.Response) => {
    console.log("Generating /leaderboard/msg-channels image...");
    try {
      const imageBuffer = await generateLeaderboardImage(
        "送信メッセージ・Top Message Channels",
        "src/assets/icons/chat.png",
        dummyChannelMessages,
        serverIconUrl,
        serverName,
        timeframe,
      );
      res.setHeader("Content-Type", "image/png");
      res.send(imageBuffer);
    } catch (error) {
      console.error("Error generating message channels leaderboard:", error);
      res.status(500).send("Error generating image");
    }
  },
);

app.get(
  "/leaderboard/vc-channels",
  async (_req: express.Request, res: express.Response) => {
    console.log("Generating /leaderboard/vc-channels image...");
    try {
      const imageBuffer = await generateLeaderboardImage(
        "ボイス時間・Top Voice Channels",
        "src/assets/icons/mic.png",
        dummyChannelVC,
        serverIconUrl,
        serverName,
        timeframe,
      );
      res.setHeader("Content-Type", "image/png");
      res.send(imageBuffer);
    } catch (error) {
      console.error("Error generating voice channels leaderboard:", error);
      res.status(500).send("Error generating image");
    }
  },
);

app.get(
  "/activity/message",
  async (_req: express.Request, res: express.Response) => {
    console.log("Generating /activity/message image...");
    try {
      const mockData = getMockActivityData("message", "7");
      const imageBuffer = await generateMessageActivityImage(
        mockData as MessageActivityData,
        serverIconUrl,
        serverName,
        timeframe,
      );
      res.setHeader("Content-Type", "image/png");
      res.send(imageBuffer);
    } catch (error) {
      console.error("Error generating message activity image:", error);
      res.status(500).send("Error generating image");
    }
  },
);

app.get(
  "/activity/voice",
  async (_req: express.Request, res: express.Response) => {
    console.log("Generating /activity/voice image...");
    try {
      const mockData = getMockActivityData("voice", "7");
      const imageBuffer = await generateVoiceActivityImage(
        mockData as VoiceActivityData,
        serverIconUrl,
        serverName,
        timeframe,
      );
      res.setHeader("Content-Type", "image/png");
      res.send(imageBuffer);
    } catch (error) {
      console.error("Error generating voice activity image:", error);
      res.status(500).send("Error generating image");
    }
  },
);

app.listen(PORT, () => {
  console.log(`🎨 UI Preview Server is running!`);
  console.log(`- Open this link in your browser: http://localhost:${PORT}/`);
});

```

---
### File: `src/index.ts`
---

```ts
import "dotenv/config";

import {
  ChannelType,
  Client,
  EmbedBuilder,
  GatewayIntentBits,
  type Interaction,
} from "discord.js";
import { eq, isNull } from "drizzle-orm";
import { Client as ExarotonClient } from "exaroton";
import { config } from "./config/env.js";
import { Colors } from "./constants/Colors.js";
import { db } from "./db/index.js";
import { activeVcSessions, voiceSessions } from "./db/schema.js";
import CommandHandler from "./handlers/commandHandler.js";
import InteractionHandler from "./handlers/interactionHandler.js";
import ListenerHandler from "./handlers/listenerHandler.js";
import {
  clearRestartInfo,
  getRestartInfo,
} from "./utils/managers/dataManager.js";
import { loadAndProcessReminders } from "./utils/managers/reminderManager.js";
import { populateInitialStats } from "./utils/services/statsPopulationService.js";

const DISCORD_TOKEN: string = config.tokens.discord;
const EXAROTON_API_TOKEN: string = config.tokens.exaroton;
const SERVER_ID: string = config.ids.server;

const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
});
const exarotonClient = new ExarotonClient(EXAROTON_API_TOKEN);

interface SharedOptions {
  exarotonClient: ExarotonClient;
  SERVER_ID: string;
  DISCORD_TOKEN: string;
}

const sharedOptions: SharedOptions = {
  exarotonClient,
  SERVER_ID,
  DISCORD_TOKEN,
};

const commandHandler = new CommandHandler(discordClient, sharedOptions);
const listenerHandler = new ListenerHandler(discordClient, sharedOptions);
const interactionHandler = new InteractionHandler(discordClient, sharedOptions);

(async () => {
  await commandHandler.loadCommands();
  await commandHandler.registerCommands();
  await listenerHandler.loadListeners();
  await interactionHandler.loadInteractions();
})();

discordClient.once("clientReady", async (client: Client<true>) => {
  console.log(`Logged in as ${client.user.tag}! Bot is ready.`);
  await loadAndProcessReminders(client);

  try {
    const guild = await client.guilds.fetch(config.ids.guild);
    if (guild) {
      await populateInitialStats(guild);
    } else {
      console.error(
        "[Startup] Could not find the specified guild to populate stats.",
      );
    }
  } catch (error) {
    console.error("[Startup] Failed to populate initial stats:", error);
  }

  try {
    console.log(
      "[VC Recovery] Closing orphaned voice sessions from previous run...",
    );
    const now = new Date();
    const openSessions = await db.query.voiceSessions.findMany({
      where: isNull(voiceSessions.endTime),
    });

    if (openSessions.length > 0) {
      for (const session of openSessions) {
        const durationSeconds = Math.floor(
          (now.getTime() - session.startTime.getTime()) / 1000,
        );
        await db
          .update(voiceSessions)
          .set({
            endTime: now,
            durationSeconds,
            totalUniqueParticipants: null,
          })
          .where(eq(voiceSessions.id, session.id));
      }
      console.log(
        `[VC Recovery] Closed ${openSessions.length} orphaned sessions.`,
      );
    } else {
      console.log("[VC Recovery] No orphaned sessions found.");
    }

    console.log("[VC Recovery] Reconciling active voice sessions...");
    await db.delete(activeVcSessions);

    const guild = await client.guilds.fetch(config.ids.guild);
    const voiceStates = guild.voiceStates.cache;

    if (voiceStates.size > 0) {
      const activeSessions: (typeof activeVcSessions.$inferInsert)[] = [];
      for (const vs of voiceStates.values()) {
        if (vs.channelId) {
          activeSessions.push({
            userId: vs.id,
            channelId: vs.channelId,
            joinTime: now,
            isStreaming: vs.streaming ?? false,
            streamStartTime: vs.streaming ? now : null,
          });
        }
      }

      if (activeSessions.length > 0) {
        await db.insert(activeVcSessions).values(activeSessions);
        console.log(
          `[VC Recovery] Re-established ${activeSessions.length} active voice sessions.`,
        );
      } else {
        console.log("[VC Recovery] No active voice sessions found on startup.");
      }
    } else {
      console.log("[VC Recovery] No active voice sessions found on startup.");
    }
  } catch (error) {
    console.error("[VC Recovery] Failed to reconcile voice sessions:", error);
  }

  const restartInfo = getRestartInfo();

  if (restartInfo?.triggeringUserId && restartInfo.channelId) {
    const channel = await client.channels
      .fetch(restartInfo.channelId)
      .catch((err) => {
        console.error(
          `Failed to fetch channel ${restartInfo.channelId} for restart notification:`,
          err,
        );
        return null;
      });

    if (channel?.type === ChannelType.GuildText) {
      try {
        const restartEmbed = new EmbedBuilder()
          .setColor(Colors.green)
          .setTitle("BOTオンライン")
          .setDescription("BOTが通常に更新されて再起動されました。")
          .setTimestamp()
          .setFooter({ text: "よかったね" });

        await channel.send({
          content: `<@${restartInfo.triggeringUserId}>`,
          embeds: [restartEmbed],
        });
        console.log(
          `Sent restart notification embed to channel ${restartInfo.channelId} for user ${restartInfo.triggeringUserId}`,
        );
      } catch (sendError) {
        console.error(
          `Failed to send restart notification embed to channel ${restartInfo.channelId}:`,
          sendError,
        );
      }
    } else {
      console.warn(
        `Could not find channel ${restartInfo.channelId} or it's not a text channel to send restart notification.`,
      );
    }

    await clearRestartInfo();
    console.log(`Cleared restart info.`);
  }
});

discordClient.on("interactionCreate", async (interaction: Interaction) => {
  if (interaction.isCommand() || interaction.isContextMenuCommand()) {
    commandHandler.handleInteraction(interaction);
  } else if (interaction.isMessageComponent() || interaction.isModalSubmit()) {
    interactionHandler.handleInteraction(interaction);
  }
});

discordClient.login(DISCORD_TOKEN);

```

---
### File: `src/config/env.ts`
---

```ts
import { validateEnvVars } from "../utils/validators/envValidator.js";

const requiredEnvVars = [
  "TOKEN",
  "API_TOKEN",
  "SERVER_ID",
  "CLIENT_ID",
  "GUILD_ID",
  "OWNER_ID",
  "BUMP_CHANNEL_ID",
  "BUMP_ROLE_ID",
  "CONFESSIONS_CHANNEL_ID",
  "VOICE_LOG_CHANNEL_ID",
  "VOICE_CATEGORY_ID",
  "WELCOME_CHANNEL_ID",
  "VERIFIED_ROLE_ID",
  "DATABASE_URL",
];

validateEnvVars(requiredEnvVars);

export const config = {
  tokens: {
    discord: process.env.TOKEN as string,
    exaroton: process.env.API_TOKEN as string,
  },
  ids: {
    server: process.env.SERVER_ID as string,
    client: process.env.CLIENT_ID as string,
    guild: process.env.GUILD_ID as string,
    testGuild: process.env.TEST_GUILD_ID as string,
    owner: process.env.OWNER_ID as string,
  },
  channels: {
    bump: process.env.BUMP_CHANNEL_ID as string,
    confessions: process.env.CONFESSIONS_CHANNEL_ID as string,
    voiceLog: process.env.VOICE_LOG_CHANNEL_ID as string,
    voiceCategory: process.env.VOICE_CATEGORY_ID as string,
    welcome: process.env.WELCOME_CHANNEL_ID as string,
  },
  roles: {
    bump: process.env.BUMP_ROLE_ID as string,
    verified: process.env.VERIFIED_ROLE_ID as string,
  },
  urls: {
    database: process.env.DATABASE_URL as string,
  },
} as const;

```

---
### File: `src/constants/Colors.ts`
---

```ts
import type { HexColorString } from "discord.js";

export const Colors: Record<string, HexColorString> = {
  purple: "#5865F2",
  green: "#57F287",
  yellow: "#FEE75C",
  red: "#ED4245",
  fuchsia: "#FFB6E5",
  aqua: "#A3FFF3",
  orange: "#FFD4A3",
  blue: "#A3D8FF",
  pink: "#FFC1D9",
  teal: "#A3FFE2",
  lime: "#D8FFB3",
  sky: "#C2F0FF",
  peach: "#FFD1B3",
  lilac: "#E0B3FF",
  sand: "#FFF0C2",
  rose: "#FFCCD5",
  mint: "#C3FFD8",
  periwinkle: "#C5C9FF",
  cream: "#FFF9E3",
  lavender: "#E6CCFF",
};

```

---
### File: `src/constants/Strings.ts`
---

```ts
export const Strings = {
  Errors: {
    Generic: "エラーが発生しました。\nAn error occurred.",
    Unknown: "不明なエラーが発生しました。\nAn unknown error occurred.",
    FetchMessages:
      "メッセージの取得中にエラーが発生しました。\nAn error occurred while fetching messages.",
    DeleteMessages:
      "メッセージの削除中にエラーが発生しました。\nAn error occurred while deleting messages.",
    FetchServerInfo:
      "サーバー情報の取得に失敗しました。\nFailed to fetch server info.",
    ConfigNotSet: (variable: string) =>
      `\`${variable}\` が設定されていません。\nThe \`${variable}\` environment variable is not set.`,
  },

  Permissions: {
    UserMissing:
      "このコマンドを使用する権限がありません。\nYou are not authorized to use this command.",
    BotMissing: (jp: string, en: string) =>
      `ボットに「${jp}」権限がありません。\nI don't have the '${en}' permission to perform this action.`,
    BotViewChannel:
      "BOTにチャンネルの閲覧権限がないため、操作を実行できません。\nThe bot does not have permission to view channels, thus cannot perform this action.",
  },

  Replies: {
    GuildOnly:
      "このコマンドはサーバーのテキストチャンネルでのみ使用できます。\nThis command can only be used in a server text channel.",
    ApprovalTimeout:
      "タイムアウトまたは承認不足のため、操作をキャンセルしました。\nOperation canceled due to timeout or insufficient approvals.",
    ConfirmationTimeout:
      "15秒以内に確認が取れなかったため、キャンセルしました。\nConfirmation not received within 15 seconds, canceling.",
  },
};

```

---
### File: `src/db/index.ts`
---

```ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "dotenv/config";
import { config } from "../config/env.js";
import * as schema from "./schema.js";

const client = postgres(config.urls.database);

export const db = drizzle(client, { schema });

```

---
### File: `src/db/schema.ts`
---

```ts
import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  real,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull(),
});

export const channelTypeEnum = pgEnum("channel_type", ["text", "voice"]);

export const channels = pgTable("channels", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: channelTypeEnum("type").notNull(),
});

export const dailyUserStats = pgTable(
  "daily_user_stats",
  {
    userId: text("user_id")
      .references(() => users.id)
      .notNull(),
    date: date("date").notNull(),
    messages: integer("messages").default(0).notNull(),
    vcHours: real("vc_hours").default(0).notNull(),
    streamHours: real("stream_hours").default(0).notNull(),
    bumps: integer("bumps").default(0).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.date] }),
  }),
);

export const dailyChannelStats = pgTable(
  "daily_channel_stats",
  {
    channelId: text("channel_id")
      .references(() => channels.id)
      .notNull(),
    date: date("date").notNull(),
    messages: integer("messages").default(0).notNull(),
    vcHours: real("vc_hours").default(0).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.channelId, table.date] }),
  }),
);

export const activeVcSessions = pgTable("active_vc_sessions", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id),
  channelId: text("channel_id")
    .notNull()
    .references(() => channels.id),
  joinTime: timestamp("join_time", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  isStreaming: boolean("is_streaming").default(false).notNull(),
  streamStartTime: timestamp("stream_start_time", {
    mode: "date",
    withTimezone: true,
  }),
});

export const confessions = pgTable("confessions", {
  id: integer("id").primaryKey(),
  messageId: text("message_id").notNull(),
});

export const hourlyActivity = pgTable(
  "hourly_activity",
  {
    date: date("date", { mode: "string" }).notNull(),
    hour: integer("hour").notNull(),
    messages: integer("messages").default(0).notNull(),
    vcHours: real("vc_hours").default(0).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.date, table.hour] }),
  }),
);

export const hourlyUserActivity = pgTable(
  "hourly_user_activity",
  {
    date: date("date", { mode: "string" }).notNull(),
    hour: integer("hour").notNull(),
    userId: text("user_id")
      .references(() => users.id)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.date, table.hour, table.userId] }),
  }),
);

export const voiceSessions = pgTable("voice_sessions", {
  id: serial("id").primaryKey(),
  channelId: text("channel_id")
    .references(() => channels.id)
    .notNull(),
  startTime: timestamp("start_time", { withTimezone: true }).notNull(),
  endTime: timestamp("end_time", { withTimezone: true }),
  durationSeconds: integer("duration_seconds"),
  totalUniqueParticipants: integer("total_unique_participants"),
});

export const voiceSessionParticipants = pgTable(
  "voice_session_participants",
  {
    sessionId: integer("session_id")
      .references(() => voiceSessions.id)
      .notNull(),
    userId: text("user_id")
      .references(() => users.id)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.sessionId, table.userId] }),
  }),
);

```

---
### File: `src/handlers/commandHandler.ts`
---

```ts
import {
  type Client,
  Collection,
  type CommandInteraction,
  type ContextMenuCommandBuilder,
  type ContextMenuCommandInteraction,
  MessageFlags,
  type PermissionResolvable,
  PermissionsBitField,
  REST,
  type RESTPostAPIApplicationCommandsJSONBody,
  Routes,
  type SlashCommandBuilder,
} from "discord.js";
import type { Client as ExarotonClient } from "exaroton";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "../config/env.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface Command {
  data:
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    | ContextMenuCommandBuilder;
  execute: (
    interaction: CommandInteraction | ContextMenuCommandInteraction,
    client: Client,
    options: HandlerOptions,
  ) => Promise<void>;
  ownerOnly?: boolean;
  adminOnly?: boolean;
  guildOnly?: boolean;
  allowedChannels?: string[];
  requiredPermissions?: PermissionResolvable[];
}

export interface HandlerOptions {
  exarotonClient: ExarotonClient;
  SERVER_ID: string;
  DISCORD_TOKEN: string;
}

const getFiles = (dir: string): string[] => {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let commandFiles: string[] = [];
  for (const file of files) {
    if (file.isDirectory()) {
      commandFiles = [...commandFiles, ...getFiles(path.join(dir, file.name))];
    } else if (file.name === "index.js" || file.name === "index.ts") {
      commandFiles.push(path.join(dir, file.name));
    }
  }
  return commandFiles;
};

export default class CommandHandler {
  public client: Client;
  public commands: Collection<string, Command>;
  public commandsArray: RESTPostAPIApplicationCommandsJSONBody[];
  public options: HandlerOptions;

  constructor(client: Client, options: HandlerOptions) {
    this.client = client;
    this.commands = new Collection();
    this.commandsArray = [];
    this.options = options;
  }

  async loadCommands() {
    try {
      const commandsPath = path.join(__dirname, "..", "commands");
      const commandTypes = fs.readdirSync(commandsPath);

      for (const type of commandTypes) {
        const typePath = path.join(commandsPath, type);
        if (fs.statSync(typePath).isDirectory()) {
          const commandFiles = getFiles(typePath);

          for (const file of commandFiles) {
            try {
              const commandModule = await import(`file://${file}`);
              if (!commandModule.default?.data) {
                console.warn(
                  `[WARNING] File ${file} seems to be an index file but lacks a proper default export with a 'data' property. Skipping.`,
                );
                continue;
              }
              const command: Command = commandModule.default;

              this.commands.set(command.data.name, command);
              this.commandsArray.push(command.data.toJSON());
              const commandType = type.charAt(0).toUpperCase() + type.slice(1);
              console.log(
                `Loaded [${commandType}] command: ${command.data.name}`,
              );
            } catch (importError) {
              console.error(
                `Error importing command file ${file}:`,
                importError,
              );
            }
          }
        }
      }
    } catch (error) {
      console.error("Error loading commands:", error);
    }
  }

  async registerCommands() {
    try {
      const { CLIENT_ID, GUILD_ID, TOKEN } = process.env;

      if (!CLIENT_ID || !GUILD_ID || !TOKEN) {
        console.error(
          "Missing CLIENT_ID, GUILD_ID, or TOKEN for command registration.",
        );
        return;
      }

      console.log("Refreshing application (/) commands.");
      const rest = new REST({ version: "10" }).setToken(TOKEN);
      console.log("Attempting to register the following commands JSON:");
      console.log(
        JSON.stringify(
          this.commandsArray,
          (_key, value) =>
            typeof value === "bigint" ? value.toString() : value,
          2,
        ),
      );

      await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
        body: this.commandsArray,
      });

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error("!!! FAILED to register commands:", error);
      if (error && typeof error === "object" && "rawError" in error) {
        console.error(
          "Discord API Raw Error:",
          JSON.stringify((error as { rawError: unknown }).rawError, null, 2),
        );
      }
    }
  }

  handleInteraction(
    interaction: CommandInteraction | ContextMenuCommandInteraction,
  ) {
    const command = this.commands.get(interaction.commandName);
    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`,
      );
      return;
    }

    try {
      if (command.ownerOnly && interaction.user.id !== config.ids.owner) {
        interaction.reply({
          content:
            "このコマンドを使用する権限がありません。\nYou are not authorized to use this command.",
          flags: MessageFlags.Ephemeral,
        });
        return;
      }

      if (
        command.adminOnly &&
        interaction.inGuild() &&
        !(
          interaction.member?.permissions instanceof PermissionsBitField &&
          interaction.member.permissions.has(
            PermissionsBitField.Flags.Administrator,
          )
        )
      ) {
        interaction.reply({
          content:
            "このコマンドは管理者のみが使用できます。\nOnly administrators can use this command.",
          flags: MessageFlags.Ephemeral,
        });
        return;
      }

      if (
        command.allowedChannels?.length &&
        interaction.inGuild() &&
        interaction.channelId
      ) {
        const requiredChannelIds = command.allowedChannels
          .map((key) => config.channels[key as keyof typeof config.channels])
          .filter(Boolean);
        if (!requiredChannelIds.includes(interaction.channelId)) {
          const allowedChannelsMentions = requiredChannelIds
            .map((id) => `<#${id}>`)
            .join("、");
          interaction.reply({
            content: `このコマンドはこのチャンネルでは使用できません。${allowedChannelsMentions} で使用してください。`,
            flags: MessageFlags.Ephemeral,
          });
          return;
        }
      }
      if (
        command.requiredPermissions?.length &&
        interaction.inGuild() &&
        interaction.member?.permissions instanceof PermissionsBitField
      ) {
        const missingPerms = interaction.member.permissions.missing(
          command.requiredPermissions,
        );
        if (missingPerms.length > 0) {
          interaction.reply({
            content: `このコマンドを使用するには、次の権限が必要です: ${missingPerms.join(", ")}\nYou are missing the following permissions to use this command: ${missingPerms.join(", ")}`,
            flags: MessageFlags.Ephemeral,
          });
          return;
        }
      }

      command.execute(interaction, this.client, this.options);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}:`, error);
      if (interaction.replied || interaction.deferred) {
        interaction.followUp({
          content: "There was an error while executing this command!",
          flags: MessageFlags.Ephemeral,
        });
      } else {
        interaction.reply({
          content: "There was an error while executing this command!",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  }
}

```

---
### File: `src/handlers/interactionHandler.ts`
---

```ts
import {
  type Client,
  Collection,
  type Interaction,
  type MessageComponentInteraction,
  MessageFlags,
  type ModalSubmitInteraction,
} from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import type { HandlerOptions } from "./commandHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface InteractionModule {
  customId: string;
  execute: (
    interaction: MessageComponentInteraction | ModalSubmitInteraction,
    client: Client,
    options: HandlerOptions,
  ) => Promise<void>;
}

const getFiles = (dir: string): string[] => {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let commandFiles: string[] = [];
  for (const file of files) {
    if (file.isDirectory()) {
      commandFiles = [...commandFiles, ...getFiles(path.join(dir, file.name))];
    } else if (file.name.endsWith(".js") || file.name.endsWith(".ts")) {
      commandFiles.push(path.join(dir, file.name));
    }
  }
  return commandFiles;
};

export default class InteractionHandler {
  public client: Client;
  public interactions: Collection<string, InteractionModule>;
  public options: HandlerOptions;

  constructor(client: Client, options: HandlerOptions) {
    this.client = client;
    this.interactions = new Collection();
    this.options = options;
  }

  public async loadInteractions(): Promise<void> {
    const interactionsPath = path.join(__dirname, "..", "interactions");

    if (
      !fs.existsSync(interactionsPath) ||
      !fs.lstatSync(interactionsPath).isDirectory()
    ) {
      console.warn(
        `[InteractionHandler] Directory not found: ${interactionsPath}. No interactions will be loaded.`,
      );
      return;
    }

    const interactionFiles = getFiles(interactionsPath);

    for (const file of interactionFiles) {
      try {
        const interactionModule = await import(`file://${file}`);
        const interaction: InteractionModule = interactionModule.default;

        if (interaction?.customId) {
          this.interactions.set(interaction.customId, interaction);
          console.log(`Loaded interaction: ${interaction.customId}`);
        } else {
          console.warn(
            `[InteractionHandler] Skipping file (no default export or customId): ${file}`,
          );
        }
      } catch (error) {
        console.error(
          `[InteractionHandler] Failed to load interaction file ${file}:`,
          error,
        );
      }
    }
  }

  public async handleInteraction(interaction: Interaction): Promise<void> {
    if (!interaction.isMessageComponent() && !interaction.isModalSubmit()) {
      return;
    }

    const handler = this.interactions.find((_, key) =>
      interaction.customId.startsWith(key),
    );

    if (!handler) {
      return;
    }

    try {
      await handler.execute(interaction, this.client, this.options);
    } catch (error) {
      console.error(
        `Error executing interaction for ${interaction.customId}:`,
        error,
      );
      if (interaction.deferred || interaction.replied) {
        await interaction.followUp({
          content:
            "このインタラクションの実行中にエラーが発生しました。\nThere was an error while executing this interaction!",
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content:
            "このインタラクションの実行中にエラーが発生しました。\nThere was an error while executing this interaction!",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  }
}

```

---
### File: `src/handlers/listenerHandler.ts`
---

```ts
import { type Client, type ClientEvents, Collection } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { HandlerOptions } from "./commandHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ListenerModule<K extends keyof ClientEvents> {
  name: string;
  event: K;
  execute: (...args: [...ClientEvents[K], Client, HandlerOptions]) => void;
}

const getFiles = (dir: string): string[] => {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let listenerFiles: string[] = [];
  for (const file of files) {
    if (file.isDirectory()) {
      listenerFiles = [
        ...listenerFiles,
        ...getFiles(path.join(dir, file.name)),
      ];
    } else if (file.name.endsWith(".js") || file.name.endsWith(".ts")) {
      listenerFiles.push(path.join(dir, file.name));
    }
  }
  return listenerFiles;
};

export default class ListenerHandler {
  public client: Client;
  public listeners: Collection<string, ListenerModule<keyof ClientEvents>>;
  public options: HandlerOptions;

  constructor(client: Client, options: HandlerOptions) {
    this.client = client;
    this.listeners = new Collection();
    this.options = options;
  }

  public async loadListeners(): Promise<void> {
    try {
      const listenersPath = path.join(__dirname, "..", "listeners");
      const listenerCategories = fs.readdirSync(listenersPath);

      for (const category of listenerCategories) {
        const categoryPath = path.join(listenersPath, category);
        if (fs.statSync(categoryPath).isDirectory()) {
          const listenerFiles = getFiles(categoryPath);

          for (const file of listenerFiles) {
            const listenerModule = await import(`file://${file}`);
            const listener = listenerModule.default as ListenerModule<
              keyof ClientEvents
            >;

            if (listener.name && listener.execute && listener.event) {
              this.listeners.set(listener.name, listener);

              this.client.on(listener.event, (...args) => {
                listener.execute(...args, this.client, this.options);
              });

              const listenerCategory =
                category.charAt(0).toUpperCase() + category.slice(1);
              console.log(
                `Loaded [${listenerCategory}] listener: ${listener.name} for event ${listener.event}`,
              );
            } else {
              console.log(
                `[WARNING] Listener at ${file} is missing required properties.`,
              );
            }
          }
        }
      }
    } catch (error) {
      console.error("Error loading listeners:", error);
    }
  }
}

```

---
### File: `src/utils/builders/commandBuilder.ts`
---

```ts
import {
  type CacheType,
  type ChatInputCommandInteraction,
  type Client,
  type GuildBasedChannel,
  MessageFlags,
  PermissionsBitField,
  SlashCommandBuilder,
} from "discord.js";
import { config } from "../../config/env.js";
import type { HandlerOptions } from "../../handlers/commandHandler.js";

export type GuildCommandInteraction = ChatInputCommandInteraction<"cached"> & {
  guild: NonNullable<ChatInputCommandInteraction["guild"]>;
  channel: GuildBasedChannel;
};

export interface CommandDefinition<
  I extends ChatInputCommandInteraction = ChatInputCommandInteraction,
> {
  data: SlashCommandBuilder;
  ownerOnly: boolean;
  execute: (
    interaction: I,
    client: Client<boolean>,
    options: HandlerOptions,
  ) => Promise<void>;
}

type ChannelKey = keyof typeof config.channels;

type CreateCommandType = {
  // Overload: guildOnly = true (default)
  (
    name: string,
    description: string,
    execute: (
      interaction: GuildCommandInteraction,
      client: Client<boolean>,
      options: HandlerOptions,
    ) => Promise<void>,
    options?: {
      ownerOnly?: boolean;
      adminOnly?: boolean;
      guildOnly?: true;
      allowedChannels?: ChannelKey[];
      setup?: (builder: SlashCommandBuilder) => SlashCommandBuilder;
    },
  ): CommandDefinition<GuildCommandInteraction>;

  // Overload: guildOnly = false
  (
    name: string,
    description: string,
    execute: (
      interaction: ChatInputCommandInteraction<CacheType>,
      client: Client<boolean>,
      options: HandlerOptions,
    ) => Promise<void>,
    options: {
      ownerOnly?: boolean;
      adminOnly?: boolean;
      guildOnly: false;
      setup?: (builder: SlashCommandBuilder) => SlashCommandBuilder;
      allowedChannels?: ChannelKey[];
    },
  ): CommandDefinition<ChatInputCommandInteraction<CacheType>>;
};

/**
 * A custom command builder that simplifies creating chat input commands.
 * @param {string} name The name of the command.
 * @param {string} description The description of the command.
 * @param {Function} execute The function to execute when the command is run.
 * @param {Object} options Additional options for the command.
 * @param {boolean} [options.ownerOnly=false] Whether the command should only be usable by the owner.
 * @param {boolean} [options.adminOnly=false] Whether the command should only be usable by server administrators.
 * @param {boolean} [options.guildOnly=true] Whether the command should only be usable within a guild. Defaults to true.
 * @param {string[]} [options.allowedChannels=[]] An array of channel IDs where the command can be used.
 * @param {function(SlashCommandBuilder): SlashCommandBuilder} [options.setup] An optional function to configure the SlashCommandBuilder.
 * @returns {Object} A command object compatible with the bot's command handler.
 */
export const createCommand: CreateCommandType = <
  I extends ChatInputCommandInteraction = ChatInputCommandInteraction,
>(
  name: string,
  description: string,
  execute: (
    interaction: I,
    client: Client<boolean>,
    options: HandlerOptions,
  ) => Promise<void>,
  {
    ownerOnly = false,
    adminOnly = false,
    guildOnly = true,
    setup = (builder: SlashCommandBuilder) => builder,
    allowedChannels = [] as ChannelKey[],
  }: {
    ownerOnly?: boolean;
    adminOnly?: boolean;
    guildOnly?: boolean;
    setup?: (builder: SlashCommandBuilder) => SlashCommandBuilder;
    allowedChannels?: ChannelKey[];
  } = {},
): CommandDefinition<I> => {
  const builder = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description);

  if (adminOnly || ownerOnly) {
    builder.setDefaultMemberPermissions(0);
  }

  const data = setup(builder);

  return {
    data,
    ownerOnly,
    async execute(
      interaction: ChatInputCommandInteraction<CacheType>,
      client: Client<boolean>,
      options: HandlerOptions,
    ) {
      if (
        guildOnly &&
        (!interaction.guild ||
          !interaction.channel ||
          interaction.channel.isDMBased())
      ) {
        await interaction.reply({
          content:
            "このコマンドはサーバー内でのみ使用できます。\nThis command can only be used in a server.",
          flags: MessageFlags.Ephemeral,
        });
        return;
      }

      if (ownerOnly && interaction.user.id !== config.ids.owner) {
        await interaction.reply({
          content:
            "このコマンドを使用する権限がありません。\nYou are not authorized to use this command.",
          flags: MessageFlags.Ephemeral,
        });
        return;
      }

      if (
        adminOnly &&
        !(
          interaction.member &&
          typeof interaction.member.permissions !== "string" &&
          interaction.member.permissions.has(
            PermissionsBitField.Flags.Administrator,
          )
        )
      ) {
        await interaction.reply({
          content:
            "このコマンドは管理者のみが使用できます。\nOnly administrators can use this command.",
          flags: MessageFlags.Ephemeral,
        });
        return;
      }

      if (allowedChannels.length > 0) {
        const requiredChannelIds = allowedChannels.map(
          (key) => config.channels[key],
        );
        if (!requiredChannelIds.includes(interaction.channelId)) {
          const allowedChannelsMentions = requiredChannelIds
            .map((id) => `<#${id}>`)
            .join("、");
          await interaction.reply({
            content: `このコマンドはこのチャンネルでは使用できません。${allowedChannelsMentions} で使用してください。`,
            flags: MessageFlags.Ephemeral,
          });
          return;
        }
      }

      await execute(interaction as I, client, options);
    },
  };
};

```

---
### File: `src/utils/builders/listenerBuilder.ts`
---

```ts
import type { ClientEvents, Message } from "discord.js";
import { config } from "../../config/env.js";

interface ListenerOptions {
  channels?: ChannelKey[];
  ignoreChannels?: string[];
  ignoreBots?: boolean;
  ignoreSelf?: boolean;
  users?: string[];
  ignoreUsers?: string[];
  roles?: string[];
  ignoreRoles?: string[];
}

type ChannelKey = keyof typeof config.channels;

/**
 * A custom listener builder with advanced filtering options.
 * @param {string} name The descriptive name for the listener.
 * @param {string} event The name of the Discord event to listen for.
 * @param {Function} execute The function to execute when the event is triggered.
 * @param {Object} [options={}] Filtering options for the listener.
 * @param {boolean} [options.ignoreBots=true] Whether to ignore other bot users.
 * @param {boolean} [options.ignoreSelf=true] Whether to ignore the bot's own events.
 * @param {string[]} [options.channels] An array of channel IDs where the listener should be active.
 * @param {string[]} [options.ignoreChannels] An array of channel IDs where the listener should be ignored.
 * @param {string[]} [options.users] An array of user IDs where the listener should be active.
 * @param {string[]} [options.ignoreUsers] An array of user IDs where the listener should be ignored.
 * @param {string[]} [options.roles] An array of role IDs where the listener should be active.
 * @param {string[]} [options.ignoreRoles] An array of role IDs where the listener should be ignored.
 * @returns {Object} A listener object compatible with the bot's listener handler.
 */
export const createListener = <K extends keyof ClientEvents>(
  name: string,
  event: K,
  execute: (...args: ClientEvents[K]) => Promise<void> | void,
  options: ListenerOptions = {},
): object => {
  const {
    ignoreBots = true,
    ignoreSelf = true,
    channels: channelKeys,
    ignoreChannels,
    users,
    ignoreUsers,
    roles,
    ignoreRoles,
  } = options;

  const filterFunction = (...args: ClientEvents[K]): boolean => {
    const context = event === "messageUpdate" ? args[1] : args[0];
    if (!context) {
      return false;
    }

    if (
      typeof context === "object" &&
      context !== null &&
      "author" in context &&
      "channelId" in context
    ) {
      const message = context as Message;

      if (message.author?.bot) {
        const isSelf = message.author.id === message.client.user.id;
        if (isSelf && ignoreSelf) {
          return false;
        }
        if (!isSelf && ignoreBots) {
          return false;
        }
      }

      if (
        ignoreChannels?.length &&
        ignoreChannels.includes(message.channelId)
      ) {
        return false;
      }

      if (channelKeys?.length) {
        const requiredChannelIds = channelKeys.map(
          (key) => config.channels[key],
        );
        if (!requiredChannelIds.includes(message.channelId)) {
          return false;
        }
      }

      if (ignoreUsers?.length && ignoreUsers.includes(message.author?.id)) {
        return false;
      }

      if (users?.length && !users.includes(message.author?.id)) {
        return false;
      }

      if (message.member?.roles) {
        if (
          ignoreRoles?.length &&
          ignoreRoles.some((roleId) => message.member?.roles.cache.has(roleId))
        ) {
          return false;
        }
        if (
          roles?.length &&
          !roles.some((roleId) => message.member?.roles.cache.has(roleId))
        ) {
          return false;
        }
      }
    } else {
      return true;
    }

    return true;
  };

  return {
    name,
    event,
    execute: async (...args: ClientEvents[K]) => {
      if (filterFunction(...args)) {
        await execute(...args);
      }
    },
  };
};

```

---
### File: `src/utils/builders/menuCommandBuilder.ts`
---

```ts
import {
  type Client,
  ContextMenuCommandBuilder,
  type ContextMenuCommandInteraction,
  type ContextMenuCommandType,
  InteractionContextType,
  MessageFlags,
  type PermissionResolvable,
  PermissionsBitField,
} from "discord.js";
import { config } from "../../config/env.js";
import type { HandlerOptions } from "../../handlers/commandHandler.js";

/**
 * A custom context menu command builder with advanced permission handling.
 * @param {string} name The name of the command.
 * @param {ContextMenuCommandType} type The type of the context menu command (Message or User).
 * @param {Function} execute The function to execute when the command is triggered.
 * @param {Object} [options={}] Filtering options for the command.
 * @param {boolean} [options.ownerOnly=false] Whether to restrict the command to the bot owner.
 * @param {boolean} [options.adminOnly=false] Whether to restrict the command to server administrators.
 * @param {boolean} [options.guildOnly=true] Whether the command can only be used in a guild.
 * @param {PermissionResolvable[]} [options.requiredPermissions=[]] Specific permissions a user must have to run the command.
 * @returns {Object} A command object compatible with your command handler.
 */
export const createMenuCommand = (
  name: string,
  type: ContextMenuCommandType,
  execute: (
    interaction: ContextMenuCommandInteraction,
    client: Client<boolean>,
    options: HandlerOptions,
  ) => Promise<void>,
  {
    ownerOnly = false,
    adminOnly = false,
    guildOnly = true,
    requiredPermissions = [],
  }: {
    ownerOnly?: boolean;
    adminOnly?: boolean;
    guildOnly?: boolean;
    requiredPermissions?: PermissionResolvable[];
  } = {},
) => {
  const builder = new ContextMenuCommandBuilder()
    .setName(name)
    .setType(type)
    .setContexts(
      guildOnly
        ? [InteractionContextType.Guild]
        : [
            InteractionContextType.Guild,
            InteractionContextType.BotDM,
            InteractionContextType.PrivateChannel,
          ],
    );

  if (adminOnly || ownerOnly || requiredPermissions.length > 0) {
    let perms = 0n;
    if (adminOnly) {
      perms = PermissionsBitField.Flags.Administrator;
    }
    if (requiredPermissions.length > 0) {
      perms = new PermissionsBitField(requiredPermissions).bitfield;
    }
    builder.setDefaultMemberPermissions(adminOnly ? 0 : perms);
  }

  return {
    data: builder,
    async execute(
      interaction: ContextMenuCommandInteraction,
      client: Client<boolean>,
      options: HandlerOptions,
    ) {
      if (guildOnly && !interaction.inGuild()) {
        return interaction.reply({
          content:
            "このコマンドはサーバー内でのみ使用できます。\nThis command can only be used in a server.",
          flags: MessageFlags.Ephemeral,
        });
      }

      if (ownerOnly && interaction.user.id !== config.ids.owner) {
        return interaction.reply({
          content:
            "あなたはこのコマンドを使用する権限がありません。\nYou are not authorized to use this command.",
          flags: MessageFlags.Ephemeral,
        });
      }

      if (interaction.inGuild()) {
        if (
          adminOnly &&
          typeof interaction.member.permissions !== "string" &&
          !interaction.member.permissions.has(
            PermissionsBitField.Flags.Administrator,
          )
        ) {
          return interaction.reply({
            content:
              "管理者のみがこのコマンドを使用できます。\nOnly administrators can use this command.",
            flags: MessageFlags.Ephemeral,
          });
        }
        if (requiredPermissions.length > 0) {
          const permsObj =
            typeof interaction.member.permissions === "string"
              ? new PermissionsBitField(BigInt(interaction.member.permissions))
              : interaction.member.permissions;
          const missingPerms = permsObj.missing(requiredPermissions);
          if (missingPerms.length > 0) {
            return interaction.reply({
              content: `このコマンドを使用するには、次の権限が必要です: ${missingPerms.join(", ")}\nYou are missing the following permissions to use this command: ${missingPerms.join(", ")}`,
              flags: MessageFlags.Ephemeral,
            });
          }
        }
      }

      await execute(interaction, client, options);
    },
  };
};

```

---
### File: `src/utils/helpers/ansiColorHelper.ts`
---

```ts
/**
 * A map of color names to their ANSI escape codes.
 * The format is: `\u001b[<STYLE>;<COLOR>m`
 * Style Codes: 1=bold, 2=dim
 * Color Codes: 30-37
 */
const ansiColors = {
  // Dim/Faint Colors
  dimRed: "2;31m",
  dimGreen: "2;32m",
  dimYellow: "2;33m",
  dimBlue: "2;34m",
  dimMagenta: "2;35m",
  dimCyan: "2;36m",
  dimWhite: "2;37m",
  // Bold Colors
  boldRed: "1;31m",
  boldGreen: "1;32m",
  boldYellow: "1;33m",
  boldBlue: "1;34m",
  boldMagenta: "1;35m",
  boldCyan: "1;36m",
  boldWhite: "1;37m",
};

/**
 * Wraps a string in ANSI color codes for use in Discord embeds.
 * @param color The desired color from the ansiColors map.
 * @param text The text to colorize.
 * @returns The colorized text string.
 */
export const setColor = (
  color: keyof typeof ansiColors,
  text: string,
): string => {
  const colorCode = ansiColors[color];
  if (!colorCode) {
    return text;
  }
  return `\u001b[${colorCode}${text}\u001b[0m`;
};

```

---
### File: `src/utils/helpers/approvalHelper.ts`
---

```ts
import type {
  CommandInteraction,
  Message,
  MessageReaction,
  User,
} from "discord.js";
import { Strings } from "../../constants/Strings.js";

export const handleApprovalProcess = async (
  interaction: CommandInteraction,
  requiredApprovals: number,
  actionMessage: string,
  actionMessageEN: string,
  successCallback: (pollMessage: Message) => Promise<void>,
  failureMessage: string,
): Promise<void> => {
  await interaction.deferReply();
  try {
    const pollMessage = await interaction.editReply(
      `${actionMessage}には${requiredApprovals}つの承認が必要です。\n✅を押して承認してください。\nWe need ${requiredApprovals} ${
        requiredApprovals === 1 ? "approval" : "approvals"
      } to ${actionMessageEN}.\nReact with ✅ to approve.`,
    );

    await pollMessage.react("✅");

    const filter = (reaction: MessageReaction, user: User) => {
      return reaction.emoji.name === "✅" && !user.bot;
    };

    const uniqueApprovals = new Set<string>();

    const collector = pollMessage.createReactionCollector({
      filter,
      time: 60_000,
    });
    collector.on("collect", (_, user) => {
      uniqueApprovals.add(user.id);
      if (uniqueApprovals.size >= requiredApprovals) {
        collector.stop("enough_approvals");
      }
    });
    collector.on("end", async (_, reason) => {
      if (reason === "enough_approvals") {
        try {
          await successCallback(pollMessage);
        } catch (error) {
          console.error(error);
          await pollMessage.reply(failureMessage);
        }
      } else {
        await pollMessage.reply(Strings.Replies.ApprovalTimeout);
      }
    });
  } catch (error) {
    console.error(error);
    await interaction.editReply(Strings.Errors.Generic);
  }
};

```

---
### File: `src/utils/helpers/bumpHelper.ts`
---

```ts
import type { Client, Embed, Message, PartialMessage } from "discord.js";
import { sql } from "drizzle-orm";
import { config } from "../../config/env.js";
import { db } from "../../db/index.js";
import { dailyUserStats, users } from "../../db/schema.js";
import { scheduleReminder } from "../managers/reminderManager.js";

/**
 * Checks if a given text exists anywhere in an embed's fields.
 * @param {Embed} embed The embed object to check.
 * @param {string} text The text to search for.
 * @returns {boolean}
 */
const isTextInEmbed = (embed: Embed, text: string): boolean => {
  if (!embed) return false;
  const searchText = text.toLowerCase();
  if (embed.title?.toLowerCase().includes(searchText)) return true;
  if (embed.description?.toLowerCase().includes(searchText)) return true;
  if (embed.footer?.text?.toLowerCase().includes(searchText)) return true;
  if (embed.fields) {
    for (const field of embed.fields) {
      if (field.name?.toLowerCase().includes(searchText)) return true;
      if (field.value?.toLowerCase().includes(searchText)) return true;
    }
  }

  return false;
};

/**
 * Logs a bump event for a specific user to the database.
 * @param {string} userId The ID of the user who bumped the server.
 * @param {string} username The username of the user.
 * @returns {Promise<void>}
 */
const logBump = async (userId: string, username: string): Promise<void> => {
  const today = new Date().toISOString().slice(0, 10);
  try {
    await db
      .insert(users)
      .values({ id: userId, username })
      .onConflictDoUpdate({ target: users.id, set: { username } });

    await db
      .insert(dailyUserStats)
      .values({ userId, date: today, bumps: 1 })
      .onConflictDoUpdate({
        target: [dailyUserStats.userId, dailyUserStats.date],
        set: {
          bumps: sql`${dailyUserStats.bumps} + 1`,
        },
      });
  } catch (error) {
    console.error(`Error logging bump for user ${userId}:`, error);
  }
};

/**
 * Handles the logic for processing a bump message, including logging and setting reminders.
 * @param {Message | PartialMessage} message The message object from the event.
 * @param {Client} client The Discord client instance.
 * @param {string} bumpSource The name of the bump source (e.g., "Disboard").
 * @param {string} bumpIdentifierText The text to identify the bump embed.
 */
export const handleBump = async (
  message: Message | PartialMessage,
  client: Client,
  bumpSource: string,
  bumpIdentifierText: string,
): Promise<void> => {
  if (message.guild?.id === config.ids.testGuild) {
    return;
  }

  if (!message.embeds || message.embeds.length === 0) return;
  const embed = message.embeds[0];

  if (!isTextInEmbed(embed, bumpIdentifierText)) return;

  const interactionUser = message.interaction?.user;
  if (!interactionUser) {
    console.warn(`Could not identify bumper for a ${bumpSource} bump.`);
    return;
  }

  console.log(`${bumpSource} bump detected by ${interactionUser.username}!`);

  await logBump(interactionUser.id, interactionUser.username);

  const interval = 2 * 60 * 60 * 1000;
  const triggerAt = Date.now() + interval;
  const reminderDetails = {
    channelId: config.channels.bump,
    roleId: config.roles.bump,
    triggerAt: triggerAt,
    source: bumpSource,
  };
  await scheduleReminder(reminderDetails, client);
};

```

---
### File: `src/utils/helpers/confessionHelper.ts`
---

```ts
import type { HexColorString } from "discord.js";
import { Colors } from "../../constants/Colors.js";

// Mix of random adjectives
export const ADJECTIVES: string[] = [
  "Viscous",
  "Whiskery",
  "Wiggly",
  "Charming",
  "Mucky",
  "Mucous",
  "Mushy",
  "Oozing",
  "Playful",
  "Drooly",
  "Farty",
  "Festering",
  "Fluffy",
  "Fuzzy",
  "Grimy",
  "Icky",
  "Infested",
  "Delicate",
  "Gentle",
  "Moist",
  "Moldy",
  "Morbid",
  "Glistening",
  "Happy",
  "Chubby",
  "Chirpy",
  "Cooing",
  "Cuddly",
  "Adorable",
  "Sticky",
  "Suppurating",
  "Sweet",
  "Velvety",
  "Soft",
  "Creepy",
  "Crusty",
  "Decaying",
  "Drippy",
  "Blushing",
  "Gelatinous",
  "Giggly",
  "Gooey",
  "Greasy",
  "Darling",
  "Bloated",
  "Blubbery",
  "Bouncy",
  "Bubbly",
  "Sussy",
  "Plump",
  "Pulpy",
  "Pungent",
  "Purring",
  "Disgusting",
  "Putrid",
  "Rancid",
  "Reeking",
  "Seeping",
  "Precious",
  "Septic",
  "Shiny",
  "Sloppy",
  "Sludgy",
  "Slimy",
  "Smelly",
  "Snotty",
  "Soggy",
  "Sparkly",
  "Squishy",
  "Rosy",
  "Silky",
  "Kawaii",
  "Sugoi",
  "Cursed",
  "Rotten",
  "Dank",
  "Toothsome",
  "Bizarre",
  "Squelchy",
  "Stinky",
  "Glittery",
  "Frightful",
  "Tender",
  "Oozy",
  "Melty",
  "Yummy",
  "Rotting",
  "Lovely",
  "Shaggy",
  "Shy",
  "Derpy",
  "Squirmy",
  "Cheeky",
  "Spiky",
  "Nasty",
  "Sparkling",
  "Radiant",
  "Squashy",
  "Baka",
  "Wrinkly",
  "Yabai",
  "Gloppy",
  "Twinkly",
  "Puffy",
  "Cuddlesome",
  "Danky",
  "Cozy",
  "Peaceful",
  "Sunny",
  "Glowing",
  "Warm",
  "Lively",
  "Graceful",
  "Dreamy",
  "Cheerful",
  "Softy",
  "Cute",
  "Kind",
  "Lucky",
  "Magical",
  "Bright",
  "Friendly",
  "Calm",
  "Sweetheart",
  "Joyful",
  "Pretty",
  "DokiDoki",
  "Genki",
  "Sugary",
  "Smiling",
  "Peachy",
];
// Mix of random nouns
export const NOUNS: string[] = [
  "Botfly",
  "Mud",
  "Bunny",
  "Caterpillar",
  "Lollipop",
  "Chick",
  "Chinchilla",
  "Cockroach",
  "Cupcake",
  "Bubble",
  "Fawn",
  "Fluffball",
  "Fungus",
  "Gloop",
  "Goop",
  "Cookie",
  "Abscess",
  "Axolotl",
  "Bile",
  "Blob",
  "Booger",
  "Cheese",
  "Pustule",
  "Rat",
  "Roach",
  "Scab",
  "Scum",
  "Slime",
  "Sloth",
  "Grime",
  "Gristle",
  "Gunk",
  "Hamster",
  "Jellybean",
  "Daisy",
  "Kitten",
  "Leech",
  "Lump",
  "Maggot",
  "Marshmallow",
  "Mochi",
  "Cyst",
  "Drool",
  "Dumpling",
  "Dustbunny",
  "Earwax",
  "Mucus",
  "Poop",
  "Porridge",
  "Pudding",
  "Puff",
  "Puppy",
  "Pus",
  "Panda",
  "Tadpole",
  "Toad",
  "Troll",
  "Ulcer",
  "Vomit",
  "Worm",
  "Penguin",
  "Sludge",
  "Slug",
  "Snail",
  "Snotball",
  "Spore",
  "Squid",
  "Petal",
  "Mudpie",
  "Nugget",
  "Phlegm",
  "Pickle",
  "Pigeon",
  "Koala",
  "Star",
  "Octopus",
  "Cabbage",
  "Dango",
  "Sushi",
  "Onigiri",
  "Ramen",
  "Neko",
  "Tanuki",
  "Kappa",
  "Daruma",
  "Pocky",
  "Blobfish",
  "Wart",
  "Toenail",
  "Pimple",
  "Spittle",
  "Miso",
  "Sashimi",
  "Froggie",
  "Boba",
  "Donut",
  "Squashbug",
  "Tempura",
  "Scablet",
  "Shuriken",
  "Samurai",
  "Gecko",
  "Nostrill",
  "Sakura",
  "Takoyaki",
  "Slurp",
  "Tofu",
  "Nyan",
  "Oni",
  "Sweat",
  "Mikan",
  "Sludgeworm",
  "Gyoza",
  "Kitty",
  "Cheeseball",
  "Flea",
  "Ragdoll",
  "Shrimp",
  "Caterpie",
  "Dustmite",
  "Soybean",
  "Strawberry",
  "Peach",
  "Banana",
  "Apple",
  "Cherry",
  "Melon",
  "Matcha",
  "Latte",
  "Choco",
  "Candy",
  "Donburi",
  "Bento",
  "Noodle",
  "TakoyakiBall",
  "Karaage",
  "Taiyaki",
  "Snowflake",
  "Cloud",
  "Rain",
  "Leaf",
  "Sunflower",
  "Moon",
  "Bell",
  "Cat",
  "Doggo",
  "Lion",
  "Sora",
  "Hana",
  "Momo",
  "Ringo",
  "Ichigo",
  "Yume",
];

// Get a random name by mixing random adjectives and nouns
export const generateAnonymousId = (): string => {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  return `${adj} ${noun}`;
};

// Get random colour
export const getRandomColor = (): HexColorString => {
  const colorKeys = Object.keys(Colors);
  const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
  return Colors[randomKey];
};

```

---
### File: `src/utils/helpers/gitUpdateHelper.ts`
---

```ts
import { setColor } from "./ansiColorHelper.js";

const summaryLineRegex = /(\d+ files? changed.*)/;
const fileChangeRegex = /(.+?)\s+\|\s+\d+\s*[+-]*/;
const renameDetectionRegex = /(.+)\{(.+) => (.+)\}(.*)/;
const mergeCommitRegex =
  /^Merge (pull request|PR) #(\d+) from (\S+)|Merge branch '(\S+)'/;

interface GitUpdateOutput {
  changes: string;
  files: string;
  repo: string;
}

/**
 * Parses the raw output from git commands to create formatted, colorized text for an embed.
 * @param commitLog - The raw output from `git log`.
 * @param gitStdout - The raw standard output from `git pull` or `git reset`.
 * @param gitStderr - The raw standard error from `git pull` or `git fetch`.
 * @returns An object with formatted strings.
 */
export const parseGitUpdateOutput = (
  commitLog: string,
  gitStdout: string,
  gitStderr: string,
): GitUpdateOutput => {
  const changes = commitLog
    .split("\n")
    .map((line) => {
      if (!line.trim()) return "";
      const parts = line.split(" - ");
      const hash = parts[0];
      const message = parts.slice(1).join(" - ");

      const mergeMatch = message.match(mergeCommitRegex);
      if (mergeMatch) {
        let shortMessage: string;
        if (mergeMatch[2] && mergeMatch[3]) {
          shortMessage = `Merged PR #${mergeMatch[2]} from ${mergeMatch[3]}`;
        } else if (mergeMatch[4]) {
          shortMessage = `Merged branch '${mergeMatch[4]}'`;
        } else {
          shortMessage =
            message.length > 50 ? `${message.slice(0, 47)}...` : message;
        }
        return `${setColor("dimYellow", hash)} - ${setColor("dimCyan", shortMessage)}`;
      }

      return `${setColor("dimYellow", hash)} - ${message}`;
    })
    .filter((line) => line)
    .join("\n");
  let repoUrl = "https://github.com/chev0004/Maybe-Bot";
  let branchName = "develop";

  const fromMatch = gitStderr.match(/From (.+)/);
  if (fromMatch) repoUrl = fromMatch[1];
  const branchMatch = gitStderr.match(/(?:\* branch|\s+)(\S+)\s+->/);
  if (branchMatch) branchName = branchMatch[1];

  const repo = `From: ${repoUrl}\nBranch: ${setColor("dimBlue", branchName)}`;
  const outputLines = gitStdout.split("\n");
  const formattedFileLines: string[] = [];

  for (const line of outputLines) {
    const fileChangeMatch = line.match(fileChangeRegex);
    if (fileChangeMatch) {
      const filePath = fileChangeMatch[1].trim();
      const renameMatch = filePath.match(renameDetectionRegex);
      if (renameMatch) {
        const [, pre, oldPart, newPart, post] = renameMatch;
        const fromPath = `${pre}${oldPart}${post}`.trim();
        const toPath = `${pre}${newPart}${post}`.trim();
        formattedFileLines.push(
          `${setColor("dimYellow", "rn:")} ${fromPath}`,
          `${setColor("dimYellow", "to:")} ${toPath}`,
        );
      } else {
        formattedFileLines.push(filePath);
      }
    }
  }

  const summaryMatch = gitStdout.match(summaryLineRegex);
  if (summaryMatch) {
    const summaryLine = summaryMatch[1];
    const insertionsMatch = summaryLine.match(/(\d+) insertions?\(\+\)/);
    const deletionsMatch = summaryLine.match(/(\d+) deletions?\(-\)/);
    const insertions = insertionsMatch ? insertionsMatch[1] : "0";
    const deletions = deletionsMatch ? deletionsMatch[1] : "0";

    const summaryText = summaryLine.split(",")[0];
    const coloredSummary = `${summaryText}, ${setColor(
      "dimCyan",
      `+${insertions}`,
    )}, ${setColor("dimRed", `-${deletions}`)}`;

    formattedFileLines.push(coloredSummary);
  }

  let files = "No file changes detected.";
  if (formattedFileLines.length > 0) {
    files = formattedFileLines.join("\n");
  }

  const finalChanges =
    changes.trim() ||
    setColor("dimRed", "No new commits found or error parsing log.");
  return { changes: finalChanges, files, repo };
};

```

---
### File: `src/utils/helpers/listUnverifiedHelper.ts`
---

```ts
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  type GuildMember,
  type InteractionReplyOptions,
  StringSelectMenuBuilder,
} from "discord.js";
import { Colors } from "../../constants/Colors.js";

export const PAGE_SIZE = 10;

type SortCriteria = "username" | "joinedAt" | "createdAt";
type SortOrder = "asc" | "desc";

export type UnverifiedMember =
  | GuildMember
  | {
      id: string;
      joinedTimestamp: number;
      user: {
        id: string;
        username: string;
        createdTimestamp: number;
      };
    };

export const generatePage = (
  memberArray: UnverifiedMember[],
  sortCriteria: SortCriteria,
  sortOrder: SortOrder,
  currentPage: number,
  isTestMode = false,
): InteractionReplyOptions => {
  const totalPages = Math.ceil(memberArray.length / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const currentItems = memberArray.slice(start, end);
  const listContent =
    currentItems
      .map(
        (member) =>
          `**${member.user.username}** (${member.id}) - <@${member.id}>`,
      )
      .join("\n") || "このページにメンバーはいません。";

  const title = `未認証メンバー (${memberArray.length}人)${
    isTestMode ? " [TEST MODE]" : ""
  }`;
  const sortLabel = sortOrder === "asc" ? "昇順 ▲" : "降順 ▼";
  const criteriaLabel =
    {
      username: "名前",
      joinedAt: "参加日",
      createdAt: "作成日",
    }[sortCriteria] || "名前";

  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(
      `認証ロールを持っていないメンバーの一覧です。\nリストは**${criteriaLabel}**で**${sortLabel}**に並べ替えられています。\nList of members without the verified role, sorted by **${criteriaLabel}** in **${sortOrder}** order.`,
    )
    .setColor(Colors.yellow)
    .addFields({ name: "メンバーリスト", value: listContent })
    .setFooter({ text: `ページ ${currentPage + 1} / ${totalPages}` });
  const testModeFlag = isTestMode ? "1" : "0";

  const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(
        `listunverified_prev_${currentPage}_${sortCriteria}_${sortOrder}_${testModeFlag}`,
      )
      .setLabel("◀")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(currentPage === 0),
    new ButtonBuilder()
      .setCustomId(
        `listunverified_sort_${currentPage}_${sortCriteria}_${sortOrder}_${testModeFlag}`,
      )
      .setLabel(sortOrder === "asc" ? "昇順 ▲" : "降順 ▼")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId(
        `listunverified_next_${currentPage}_${sortCriteria}_${sortOrder}_${testModeFlag}`,
      )
      .setLabel("▶")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(currentPage >= totalPages - 1),
  );
  const selectMenuRow =
    new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId(
          `listunverified_select_${currentPage}_${sortOrder}_${testModeFlag}`,
        )
        .setPlaceholder("並べ替えの基準を選択")
        .addOptions(
          {
            label: "名前 (Username)",
            value: "username",
            default: sortCriteria === "username",
          },
          {
            label: "参加日 (Join Date)",
            value: "joinedAt",
            default: sortCriteria === "joinedAt",
          },
          {
            label: "作成日 (Account Date)",
            value: "createdAt",
            default: sortCriteria === "createdAt",
          },
        ),
    );
  return { embeds: [embed], components: [selectMenuRow, buttonRow] };
};

```

---
### File: `src/utils/helpers/topHelper.ts`
---

```ts
/// File: src/utils/helpers/topHelper.ts
import {
  ActionRowBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonStyle,
  type Client,
  type Guild,
  type InteractionReplyOptions,
  StringSelectMenuBuilder,
} from "discord.js";
import { and, desc, eq, sql } from "drizzle-orm";
import { getMockTopData } from "../../commands/slash/stats/top/top.mock.js";
import { config } from "../../config/env.js";
import { db } from "../../db/index.js";
import {
  channels,
  dailyChannelStats,
  dailyUserStats,
  users,
} from "../../db/schema.js";
import {
  generateLeaderboardImage,
  generateOverviewImage,
  type LeaderboardItem,
  type OverviewData,
} from "../services/imageGenerator.js";

export type TopCategory =
  | "overview"
  | "msg_users"
  | "vc_users"
  | "stream_users"
  | "bump_users"
  | "msg_channels"
  | "vc_channels";
export type TopTimeframe = "1" | "7" | "30" | "all";
export const timeframeLabels: Record<TopTimeframe, string> = {
  "1": "過去24時間",
  "7": "過去7日間",
  "30": "過去30日間",
  all: "全期間",
};
const categoryOptions = [
  { label: "Overview", value: "overview" },
  { label: "Top Message Users", value: "msg_users" },
  { label: "Top Voice Users", value: "vc_users" },
  { label: "Top Bumpers", value: "bump_users" },
  { label: "Top Streamers", value: "stream_users" },
  { label: "Top Message Channels", value: "msg_channels" },
  { label: "Top Voice Channels", value: "vc_channels" },
];
const getDateCondition = (timeframe: TopTimeframe) => {
  if (timeframe === "all") return undefined;
  const days = parseInt(timeframe, 10);
  if (Number.isNaN(days)) {
    console.error(
      `[getDateCondition] Invalid timeframe value received: "${timeframe}". Defaulting to 7 days to prevent crash.`,
    );
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return sql`"date" >= ${date.toISOString().slice(0, 10)}`;
  }

  const date = new Date();
  date.setDate(date.getDate() - days);
  return sql`"date" >= ${date.toISOString().slice(0, 10)}`;
};

const getTopData = async (
  category: "messages" | "vcHours" | "streamHours" | "bumps",
  type: "users" | "channels",
  timeframe: TopTimeframe,
  limit: number,
): Promise<(LeaderboardItem & { id?: string })[]> => {
  const dateCondition = getDateCondition(timeframe);
  if (type === "users") {
    const statsSubquery = db
      .select({
        userId: dailyUserStats.userId,
        totalValue: sql<number>`sum(${dailyUserStats[category]})`
          .mapWith(Number)
          .as("totalValue"),
      })
      .from(dailyUserStats)
      .where(dateCondition)
      .groupBy(dailyUserStats.userId)
      .as("statsSubquery");
    const results = await db
      .select({
        id: users.id,
        name: users.username,
        totalValue:
          sql<number>`coalesce(${statsSubquery.totalValue}, 0)`.mapWith(Number),
      })
      .from(users)
      .leftJoin(statsSubquery, eq(users.id, statsSubquery.userId))
      .orderBy(desc(sql`coalesce(${statsSubquery.totalValue}, 0)`))
      .limit(limit);
    return results.map((r) => ({
      id: r.id,
      name: r.name || "Unknown",
      value: r.totalValue,
    }));
  } else {
    // Correctly handle channel types for category
    if (category !== "messages" && category !== "vcHours") return [];
    const statsSubquery = db
      .select({
        channelId: dailyChannelStats.channelId,
        // Ensure category is correctly indexed here
        totalValue: sql<number>`sum(${dailyChannelStats[category]})`
          .mapWith(Number)
          .as("totalValue"),
      })
      .from(dailyChannelStats)
      .where(dateCondition)
      .groupBy(dailyChannelStats.channelId)
      .as("statsSubquery");

    const conditions = [];
    if (category === "vcHours") {
      conditions.push(eq(channels.type, "voice"));
    } else if (category === "messages") {
      conditions.push(eq(channels.type, "text"));
    }

    const results = await db
      .select({
        name: channels.name,
        type: channels.type,
        totalValue:
          sql<number>`coalesce(${statsSubquery.totalValue}, 0)`.mapWith(Number),
      })
      .from(channels)
      .leftJoin(statsSubquery, eq(channels.id, statsSubquery.channelId))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(sql`coalesce(${statsSubquery.totalValue}, 0)`))
      .limit(limit);

    return results.map((r) => ({
      name: r.name || "Unknown",
      value: r.totalValue,
      type: r.type,
    }));
  }
};

export const generateComponentsForTop = ({
  category,
  timeframe,
  showTimeframeButtons,
  isTestMode = false,
}: {
  category: TopCategory;
  timeframe: TopTimeframe;
  showTimeframeButtons: boolean;
  isTestMode?: boolean;
}) => {
  const showTimeframeFlag = showTimeframeButtons ? "1" : "0";
  const testModeFlag = isTestMode ? "1" : "0";
  const currentCategoryLabel =
    categoryOptions.find((opt) => opt.value === category)?.label ||
    "Select a category...";
  const dropdown = new StringSelectMenuBuilder()
    .setCustomId(
      `top-category-${timeframe}-${showTimeframeFlag}-${testModeFlag}`,
    )
    .setPlaceholder(currentCategoryLabel)
    .addOptions(
      categoryOptions.map((opt) => ({
        ...opt,
        default: opt.value === category,
      })),
    );
  const components: ActionRowBuilder<
    StringSelectMenuBuilder | ButtonBuilder
  >[] = [
    new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(dropdown),
  ];
  if (showTimeframeButtons) {
    const timeButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(
          `top-timeframe-back-${category}-${timeframe}-${testModeFlag}`,
        )
        .setEmoji({ id: "1423520590261780541" }) // Ensure this ID is correct
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId(`top-select-${category}-1-${testModeFlag}`)
        .setLabel("1日")
        .setStyle(
          timeframe === "1" ? ButtonStyle.Primary : ButtonStyle.Secondary,
        ),
      new ButtonBuilder()
        .setCustomId(`top-select-${category}-7-${testModeFlag}`)
        .setLabel("7日")
        .setStyle(
          timeframe === "7" ? ButtonStyle.Primary : ButtonStyle.Secondary,
        ),
      new ButtonBuilder()
        .setCustomId(`top-select-${category}-30-${testModeFlag}`)
        .setLabel("30日")
        .setStyle(
          timeframe === "30" ? ButtonStyle.Primary : ButtonStyle.Secondary,
        ),
      new ButtonBuilder()
        .setCustomId(`top-select-${category}-all-${testModeFlag}`)
        .setLabel("全期間")
        .setStyle(
          timeframe === "all" ? ButtonStyle.Primary : ButtonStyle.Secondary,
        ),
    );
    components.push(timeButtons);
  } else {
    const actionButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(
          `top-timeframe-show-${category}-${timeframe}-${testModeFlag}`,
        )
        .setEmoji({ id: "1423521666159611914" }) // Ensure this ID is correct
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId(`top-refresh-${category}-${timeframe}-${testModeFlag}`)
        .setEmoji({ id: "1423520588638453850" }) // Ensure this ID is correct
        .setStyle(ButtonStyle.Secondary),
    );
    components.push(actionButtons);
  }
  return components;
};

export const generateInitialTopReply = async (guild: Guild, client: Client) => {
  return generateTopReply({
    guild,
    client,
    category: "overview",
    timeframe: "7",
    showTimeframeButtons: false,
    isTestMode: false,
  });
};

export const generateMockTopReply = async ({
  guild,
  category,
  timeframe,
  showTimeframeButtons,
}: {
  guild: Guild;
  category: TopCategory;
  timeframe: TopTimeframe;
  showTimeframeButtons: boolean;
}): Promise<InteractionReplyOptions> => {
  const serverIconUrl = guild.iconURL({ extension: "png", size: 128 });
  const timeframeLabel = timeframeLabels[timeframe];
  let imageBuffer: Buffer;

  const data = getMockTopData(category, timeframe);
  if (category === "overview") {
    // Explicitly cast to OverviewData
    imageBuffer = await generateOverviewImage(
      data as OverviewData,
      serverIconUrl,
      guild.name,
      timeframeLabel,
    );
  } else {
    let title: string, iconPath: string;
    if (category === "msg_users") {
      title = "メッセージ・Top Messages";
      iconPath = "src/assets/icons/chat.png";
    } else if (category === "vc_users") {
      title = "ボイス時間・Top VC Hours";
      iconPath = "src/assets/icons/mic.png";
    } else if (category === "stream_users") {
      title = "配信時間・Top Stream Hours";
      iconPath = "src/assets/icons/stream.png";
    } else if (category === "bump_users") {
      title = "バンプ数・Top Bumpers";
      iconPath = "src/assets/icons/bump.png";
    } else if (category === "msg_channels") {
      title = "送信メッセージ・Top Message Channels";
      iconPath = "src/assets/icons/chat.png";
    } else {
      // vc_channels
      title = "ボイス時間・Top Voice Channels";
      iconPath = "src/assets/icons/mic.png";
    }

    imageBuffer = await generateLeaderboardImage(
      title,
      iconPath,
      data as LeaderboardItem[],
      serverIconUrl,
      guild.name,
      timeframeLabel,
    );
  }

  const attachment = new AttachmentBuilder(imageBuffer, {
    name: "leaderboard.png",
  });
  const components = generateComponentsForTop({
    category,
    timeframe,
    showTimeframeButtons,
    isTestMode: true,
  });
  return { files: [attachment], components };
};

export const generateTopReply = async ({
  guild,
  client,
  category,
  timeframe,
  showTimeframeButtons,
  isTestMode,
}: {
  guild: Guild;
  client: Client;
  category: TopCategory;
  timeframe: TopTimeframe;
  showTimeframeButtons: boolean;
  isTestMode: boolean;
}): Promise<InteractionReplyOptions> => {
  if (isTestMode) {
    return generateMockTopReply({
      guild,
      category,
      timeframe,
      showTimeframeButtons,
    });
  }

  const serverIconUrl = guild.iconURL({ extension: "png", size: 128 });
  const timeframeLabel = timeframeLabels[timeframe];
  let imageBuffer: Buffer;
  const mainGuild = await client.guilds.fetch(config.ids.guild);
  const formatDataWithNicknames = async (
    data: (LeaderboardItem & { id?: string })[],
  ) => {
    if (!data.length || !data[0]?.id) return data;
    const formattedData = await Promise.all(
      data.map(async (item) => {
        if (!item.id) return item;
        const member = await mainGuild.members.fetch(item.id).catch(() => null);
        if (!member) {
          // Keep original name if member not found
          return { ...item, name: item.name || `User (${item.id})` };
        }

        const serverNickname = member.nickname;
        const username = member.user.username;
        const displayName = member.displayName;

        let finalName: string;

        // Logic prioritizing nickname, then display name, ensuring username is included if different
        if (serverNickname) {
          if (
            serverNickname.toLowerCase() !== username.toLowerCase() &&
            serverNickname.toLowerCase() !== displayName.toLowerCase()
          ) {
            finalName = `${serverNickname} (${username})`;
          } else {
            finalName = serverNickname;
          }
        } else if (displayName.toLowerCase() !== username.toLowerCase()) {
          finalName = `${displayName} (${username})`;
        } else {
          finalName = username; // Use username if display name is the same
        }

        return { ...item, name: finalName };
      }),
    );
    return formattedData;
  };

  if (category === "overview") {
    // Prepare data structure matching OverviewData
    const overviewData: OverviewData = {
      messages: {
        users: await formatDataWithNicknames(
          await getTopData("messages", "users", timeframe, 3),
        ),
      },
      bumps: {
        users: await formatDataWithNicknames(
          await getTopData("bumps", "users", timeframe, 3),
        ),
      },
      voice: {
        users: await formatDataWithNicknames(
          await getTopData("vcHours", "users", timeframe, 3),
        ),
      },
      stream: {
        users: await formatDataWithNicknames(
          await getTopData("streamHours", "users", timeframe, 3),
        ),
      },
    };
    imageBuffer = await generateOverviewImage(
      overviewData, // Pass the correctly typed object
      serverIconUrl,
      guild.name,
      timeframeLabel,
    );
  } else {
    let title: string,
      dbCategory: "messages" | "vcHours" | "streamHours" | "bumps",
      type: "users" | "channels",
      iconPath: string;
    if (category === "msg_users") {
      title = "メッセージ・Top Messages";
      dbCategory = "messages";
      type = "users";
      iconPath = "src/assets/icons/chat.png";
    } else if (category === "vc_users") {
      title = "ボイス時間・Top VC Hours";
      dbCategory = "vcHours";
      type = "users";
      iconPath = "src/assets/icons/mic.png";
    } else if (category === "stream_users") {
      title = "配信時間・Top Stream Hours";
      dbCategory = "streamHours";
      type = "users";
      iconPath = "src/assets/icons/stream.png";
    } else if (category === "bump_users") {
      title = "バンプ数・Top Bumpers";
      dbCategory = "bumps";
      type = "users";
      iconPath = "src/assets/icons/bump.png";
    } else if (category === "msg_channels") {
      title = "送信メッセージ・Top Message Channels";
      dbCategory = "messages";
      type = "channels";
      iconPath = "src/assets/icons/chat.png";
    } else {
      // vc_channels
      title = "ボイス時間・Top Voice Channels";
      dbCategory = "vcHours";
      type = "channels";
      iconPath = "src/assets/icons/mic.png";
    }
    const rawData = await getTopData(dbCategory, type, timeframe, 10);
    const data =
      type === "users" ? await formatDataWithNicknames(rawData) : rawData;
    imageBuffer = await generateLeaderboardImage(
      title,
      iconPath,
      data,
      serverIconUrl,
      guild.name,
      timeframeLabel,
    );
  }

  const attachment = new AttachmentBuilder(imageBuffer, {
    name: "leaderboard.png",
  });
  const components = generateComponentsForTop({
    category,
    timeframe,
    showTimeframeButtons,
    isTestMode,
  });
  return { files: [attachment], components };
};

```

---
### File: `src/utils/helpers/activityHelper.ts`
---

```ts
import {
  ActionRowBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonStyle,
  type Guild,
  type InteractionReplyOptions,
  StringSelectMenuBuilder,
} from "discord.js";
import {
  and,
  count,
  countDistinct,
  gte,
  isNotNull,
  sql,
  sum,
} from "drizzle-orm";
import {
  getMockActivityData,
  type MessageActivityData,
  type VoiceActivityData,
} from "../../commands/slash/stats/activity/activity.mock.js";
import { db } from "../../db/index.js";
import {
  hourlyActivity,
  hourlyUserActivity,
  voiceSessions,
} from "../../db/schema.js";
import {
  generateMessageActivityImage,
  generateVoiceActivityImage,
} from "../services/activityImageGenerator.js";
import { type TopTimeframe, timeframeLabels } from "./topHelper.js";

export type ActivityCategory = "message" | "voice";

const categoryOptions = [
  { label: "Message Activity", value: "message" },
  { label: "Voice Activity", value: "voice" },
];

const fetchActivityData = async (
  category: ActivityCategory,
  timeframe: TopTimeframe,
): Promise<MessageActivityData | VoiceActivityData> => {
  const days = timeframe === "all" ? 9999 : parseInt(timeframe, 10);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  const startDateString = startDate.toISOString().slice(0, 10);
  const dateCondition =
    timeframe === "all" ? undefined : gte(hourlyActivity.date, startDateString);

  const hourlyResults = await db
    .select({
      hour: hourlyActivity.hour,
      total:
        category === "message"
          ? sql<number>`sum(${hourlyActivity.messages})`.mapWith(Number)
          : sql<number>`sum(${hourlyActivity.vcHours})`.mapWith(Number),
    })
    .from(hourlyActivity)
    .where(dateCondition)
    .groupBy(hourlyActivity.hour);

  const jstHourlyData = Array(24).fill(0);
  for (const result of hourlyResults) {
    const utcHour = result.hour;
    const jstHour = (utcHour + 9) % 24;
    jstHourlyData[jstHour] = result.total;
  }

  let averageParticipants = 0;

  if (category === "voice") {
    const avgResult = await db
      .select({
        average:
          sql<number>`avg(${voiceSessions.totalUniqueParticipants})`.mapWith(
            Number,
          ),
      })
      .from(voiceSessions)
      .where(
        and(
          timeframe === "all"
            ? undefined
            : gte(voiceSessions.startTime, startDate),
          isNotNull(voiceSessions.endTime),
          isNotNull(voiceSessions.totalUniqueParticipants),
        ),
      );

    averageParticipants = avgResult[0]?.average ?? 0;
  } else {
    const participantHoursResult = await db
      .select({
        count: count(hourlyUserActivity.userId),
      })
      .from(hourlyUserActivity)
      .where(
        timeframe === "all"
          ? undefined
          : gte(hourlyUserActivity.date, startDateString),
      );
    const totalParticipantHours = participantHoursResult[0]?.count ?? 0;

    const activeHoursResult = await db
      .select({
        count: countDistinct(
          sql`(${hourlyUserActivity.date}, ${hourlyUserActivity.hour})`,
        ),
      })
      .from(hourlyUserActivity)
      .where(
        timeframe === "all"
          ? undefined
          : gte(hourlyUserActivity.date, startDateString),
      );
    const totalActiveHours = activeHoursResult[0]?.count ?? 0;

    averageParticipants =
      totalActiveHours > 0 ? totalParticipantHours / totalActiveHours : 0;
  }

  const totalSumResult = await db
    .select({
      total:
        category === "message"
          ? sum(hourlyActivity.messages)
          : sum(hourlyActivity.vcHours),
    })
    .from(hourlyActivity)
    .where(dateCondition);

  const totalValue = Number(totalSumResult[0]?.total ?? 0);
  const peakIndex = jstHourlyData.indexOf(Math.max(...jstHourlyData, 0));

  if (category === "message") {
    return {
      hourlyActivity: jstHourlyData,
      totalMessages: totalValue,
      averageParticipants,
      mostActiveHour: peakIndex,
    };
  }
  return {
    hourlyActivity: jstHourlyData,
    totalDurationHours: totalValue,
    averageParticipants,
    peakHour: peakIndex,
  };
};

export const generateComponentsForActivity = ({
  category,
  timeframe,
  showTimeframeButtons,
  isTestMode = false,
}: {
  category: ActivityCategory;
  timeframe: TopTimeframe;
  showTimeframeButtons: boolean;
  isTestMode?: boolean;
}) => {
  const showTimeframeFlag = showTimeframeButtons ? "1" : "0";
  const testModeFlag = isTestMode ? "1" : "0";
  const currentCategoryLabel =
    categoryOptions.find((opt) => opt.value === category)?.label ||
    "Select an activity type";

  const dropdown = new StringSelectMenuBuilder()
    .setCustomId(
      `activity-category-${timeframe}-${showTimeframeFlag}-${testModeFlag}`,
    )
    .setPlaceholder(currentCategoryLabel)
    .addOptions(
      categoryOptions.map((opt) => ({
        ...opt,
        default: opt.value === category,
      })),
    );

  const components: ActionRowBuilder<
    StringSelectMenuBuilder | ButtonBuilder
  >[] = [
    new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(dropdown),
  ];

  if (showTimeframeButtons) {
    const timeButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(
          `activity-timeframe-back-${category}-${timeframe}-${testModeFlag}`,
        )
        .setEmoji({ id: "1423520590261780541" })
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId(`activity-select-${category}-1-${testModeFlag}`)
        .setLabel("1日")
        .setStyle(
          timeframe === "1" ? ButtonStyle.Primary : ButtonStyle.Secondary,
        ),
      new ButtonBuilder()
        .setCustomId(`activity-select-${category}-7-${testModeFlag}`)
        .setLabel("7日")
        .setStyle(
          timeframe === "7" ? ButtonStyle.Primary : ButtonStyle.Secondary,
        ),
      new ButtonBuilder()
        .setCustomId(`activity-select-${category}-30-${testModeFlag}`)
        .setLabel("30日")
        .setStyle(
          timeframe === "30" ? ButtonStyle.Primary : ButtonStyle.Secondary,
        ),
      new ButtonBuilder()
        .setCustomId(`activity-select-${category}-all-${testModeFlag}`)
        .setLabel("全期間")
        .setStyle(
          timeframe === "all" ? ButtonStyle.Primary : ButtonStyle.Secondary,
        ),
    );
    components.push(timeButtons);
  } else {
    const actionButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(
          `activity-timeframe-show-${category}-${timeframe}-${testModeFlag}`,
        )
        .setEmoji({ id: "1423521666159611914" })
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId(
          `activity-refresh-${category}-${timeframe}-${testModeFlag}`,
        )
        .setEmoji({ id: "1423520588638453850" })
        .setStyle(ButtonStyle.Secondary),
    );
    components.push(actionButtons);
  }
  return components;
};

export const generateActivityReply = async ({
  guild,
  category,
  timeframe,
  showTimeframeButtons,
  isTestMode,
}: {
  guild: Guild;
  category: ActivityCategory;
  timeframe: TopTimeframe;
  showTimeframeButtons: boolean;
  isTestMode: boolean;
}): Promise<InteractionReplyOptions> => {
  const serverIconUrl = guild.iconURL({ extension: "png", size: 128 });
  const timeframeLabel = timeframeLabels[timeframe];
  let imageBuffer: Buffer;

  const data = isTestMode
    ? getMockActivityData(category, timeframe)
    : await fetchActivityData(category, timeframe);

  if (category === "message") {
    imageBuffer = await generateMessageActivityImage(
      data as MessageActivityData,
      serverIconUrl,
      guild.name,
      timeframeLabel,
    );
  } else {
    imageBuffer = await generateVoiceActivityImage(
      data as VoiceActivityData,
      serverIconUrl,
      guild.name,
      timeframeLabel,
    );
  }

  const attachment = new AttachmentBuilder(imageBuffer, {
    name: "activity-stats.png",
  });
  const components = generateComponentsForActivity({
    category,
    timeframe,
    showTimeframeButtons,
    isTestMode,
  });

  return { files: [attachment], components };
};

```

---
### File: `src/utils/managers/confessionManager.ts`
---

```ts
import { eq, sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import { confessions } from "../../db/schema.js";

/**
 * Gets the next available ID for a new confession by finding the max ID in the table.
 * @returns {Promise<number>} The next confession ID.
 */
export const getNextConfessionId = async (): Promise<number> => {
  const result = await db
    .select({ maxId: sql<number>`max(${confessions.id})` })
    .from(confessions);

  const maxId = result[0]?.maxId ?? 0;
  return maxId + 1;
};

/**
 * Retrieves the message ID for a given confession ID from the database.
 * @param {number} confessionId The confession's sequential ID.
 * @returns {Promise<string | undefined>} The Discord message ID, or undefined if not found.
 */
export const getConfessionMessageId = async (
  confessionId: number,
): Promise<string | undefined> => {
  const result = await db
    .select({ messageId: confessions.messageId })
    .from(confessions)
    .where(eq(confessions.id, confessionId));

  return result[0]?.messageId;
};

/**
 * Logs a new confession by inserting its ID and Discord message ID into the database.
 * @param {number} confessionId The confession's sequential ID.
 * @param {string} messageId The Discord message ID.
 */
export const logConfession = async (
  confessionId: number,
  messageId: string,
): Promise<void> => {
  try {
    await db.insert(confessions).values({ id: confessionId, messageId });
  } catch (error) {
    console.error("Error logging confession to database:", error);
  }
};

```

---
### File: `src/utils/managers/dataManager.ts`
---

```ts
import fs from "fs/promises";
import path from "path";

export interface Reminder {
  id: string;
  channelId: string;
  roleId: string;
  triggerAt: number;
  source: string;
}

export interface RestartInfo {
  triggeringUserId: string;
  channelId: string;
  timestamp: number;
}

interface StickyMessage {
  botStickyMessageId: string | null;
}

interface BotData {
  reminders: Reminder[];
  stickyMessage: StickyMessage;
  restartInfo: RestartInfo | null;
}

const BOT_DATA_FILE = path.join(process.cwd(), "bot_data.json");

const defaultData: BotData = {
  reminders: [],
  stickyMessage: {
    botStickyMessageId: null,
  },
  restartInfo: null,
};

let memoryStore: BotData | null = null;

const loadData = async (): Promise<void> => {
  try {
    await fs.access(BOT_DATA_FILE);
    const data = await fs.readFile(BOT_DATA_FILE, "utf8");
    const parsedData = JSON.parse(data) as Partial<BotData>;
    memoryStore = { ...defaultData, ...parsedData };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.log(
        "[DataManager] bot_data.json not found. Creating with default data.",
      );
      memoryStore = { ...defaultData };
      await saveData();
    } else {
      console.error("[DataManager] Error loading data file:", error);
      memoryStore = { ...defaultData };
    }
  }
};

const saveData = async (): Promise<void> => {
  if (memoryStore === null) {
    console.error("[DataManager] Attempted to save before data was loaded.");
    return;
  }
  try {
    const tempFile = `${BOT_DATA_FILE}.${Date.now()}.tmp`;
    await fs.writeFile(tempFile, JSON.stringify(memoryStore, null, 2));
    await fs.rename(tempFile, BOT_DATA_FILE);
  } catch (error) {
    console.error("[DataManager] Error saving data:", error);
  }
};

(async () => {
  await loadData();
  console.log("[DataManager] Persistent data loaded into memory.");
})();

const ensureStoreLoaded = async (): Promise<BotData> => {
  if (!memoryStore) {
    await loadData();
  }
  if (!memoryStore) {
    throw new Error("DataManager failed to initialize memoryStore.");
  }
  return memoryStore;
};

export const getReminders = (): Reminder[] => {
  return memoryStore?.reminders ?? [];
};

export const addReminder = async (reminder: Reminder): Promise<void> => {
  const store = await ensureStoreLoaded();
  store.reminders.push(reminder);
  await saveData();
};

export const removeReminderById = async (reminderId: string): Promise<void> => {
  const store = await ensureStoreLoaded();
  const initialLength = store.reminders.length;
  store.reminders = store.reminders.filter((r) => r.id !== reminderId);
  if (store.reminders.length < initialLength) {
    await saveData();
  }
};

export const getStickyMessageId = (): string | null => {
  return memoryStore?.stickyMessage?.botStickyMessageId ?? null;
};

export const setStickyMessageId = async (id: string | null): Promise<void> => {
  const store = await ensureStoreLoaded();
  store.stickyMessage.botStickyMessageId = id;
  await saveData();
};

export const getRestartInfo = (): RestartInfo | null => {
  return memoryStore?.restartInfo ?? null;
};

export const setRestartInfo = async (info: RestartInfo): Promise<void> => {
  const store = await ensureStoreLoaded();
  store.restartInfo = info;
  await saveData();
};

export const clearRestartInfo = async (): Promise<void> => {
  const store = await ensureStoreLoaded();
  store.restartInfo = null;
  await saveData();
};

```

---
### File: `src/utils/managers/reminderManager.ts`
---

```ts
import { type Client, EmbedBuilder, type TextChannel } from "discord.js";
import { Colors } from "../../constants/Colors.js";
import {
  addReminder,
  getReminders,
  type Reminder,
  removeReminderById,
} from "./dataManager.js";

const activeTimers = new Map<string, NodeJS.Timeout>();

/**
 * The core function that executes when a timer is up.
 * @param reminder The reminder object.
 * @param client The Discord client instance.
 */
const executeReminder = async (
  reminder: Reminder,
  client: Client,
): Promise<void> => {
  try {
    const channel = await client.channels
      .fetch(reminder.channelId)
      .catch(() => null);

    if (!channel || !channel.isTextBased()) {
      console.warn(
        `Could not find channel ${reminder.channelId} for reminder, or it's not a text channel.`,
      );
      await removeReminderById(reminder.id);
      return;
    }

    const bumpSource = reminder.source;
    const title = `${bumpSource}のバンプタイムです！`;

    const embedMsg = new EmbedBuilder()
      .setColor(Colors.blue)
      .setTitle(title)
      .setDescription(
        `2時間経ちました。もう一度 **${bumpSource}** の \`\`/bump\`\` が出来るようになりました！`,
      )
      .setTimestamp();

    await (channel as TextChannel).send({
      content: `<@&${reminder.roleId}>`,
      embeds: [embedMsg],
    });

    console.log(
      `Sent ${bumpSource} reminder to channel ${reminder.channelId}.`,
    );
  } catch (error) {
    console.error("Failed to execute reminder:", error);
  } finally {
    await removeReminderById(reminder.id);
    if (activeTimers.has(reminder.id)) {
      activeTimers.delete(reminder.id);
    }
  }
};

/**
 * Creates an in-memory setTimeout for a given reminder.
 * @param reminder The reminder object.
 * @param client The Discord client instance.
 */
const createTimeout = (reminder: Reminder, client: Client): void => {
  if (activeTimers.has(reminder.id)) {
    clearTimeout(activeTimers.get(reminder.id));
  }

  const now = Date.now();
  const delay = reminder.triggerAt - now;

  if (delay <= 0) {
    console.log(`Executing overdue reminder ${reminder.id} immediately.`);
    void executeReminder(reminder, client);
  } else {
    const timeoutId = setTimeout(() => {
      void executeReminder(reminder, client);
    }, delay);
    activeTimers.set(reminder.id, timeoutId);
  }
};

/**
 * Schedules a new reminder, replacing any existing reminder for the same source.
 * @param reminderDetails Details for the new reminder.
 * @param client The Discord client instance.
 */
export const scheduleReminder = async (
  reminderDetails: Omit<Reminder, "id">,
  client: Client,
): Promise<void> => {
  const reminders = getReminders();
  const existingReminder = reminders.find(
    (r) => r.source === reminderDetails.source,
  );

  if (existingReminder) {
    console.log(
      `[ReminderManager] Replacing existing reminder for ${reminderDetails.source}.`,
    );
    if (activeTimers.has(existingReminder.id)) {
      clearTimeout(activeTimers.get(existingReminder.id));
      activeTimers.delete(existingReminder.id);
    }
    await removeReminderById(existingReminder.id);
  }

  const newReminder: Reminder = {
    id: Date.now().toString(),
    ...reminderDetails,
  };

  await addReminder(newReminder);
  createTimeout(newReminder, client);
  console.log(
    `Scheduled new reminder ${newReminder.id} for ${new Date(
      newReminder.triggerAt,
    ).toLocaleTimeString()}`,
  );
};

/**
 * Loads all reminders from the data store on bot startup and schedules them.
 * @param client The Discord client instance.
 */
export const loadAndProcessReminders = async (
  client: Client,
): Promise<void> => {
  console.log("Loading and processing pending reminders...");
  const reminders = getReminders();
  if (reminders.length === 0) {
    console.log("No pending reminders found.");
    return;
  }

  for (const reminder of reminders) {
    console.log(`Found pending reminder: ${reminder.id}`);
    createTimeout(reminder, client);
  }
};

```

---
### File: `src/utils/services/dummyData.ts`
---

```ts
import type { LeaderboardItem } from "./imageGenerator.js";

export const dummyUserMessages: LeaderboardItem[] = [
  { name: "UserOne", value: 1234 },
  { name: "AnotherUser", value: 987 },
  { name: "TestSubject", value: 543 },
  { name: "TheQuickBrownFox", value: 321 },
  { name: "Player_5", value: 101 },
  { name: "GamerGal", value: 76 },
  { name: "Coder123", value: 54 },
  { name: "MusicFan", value: 32 },
  { name: "MovieBuff", value: 21 },
  { name: "RandomUser", value: 10 },
];
export const dummyChannelMessages: LeaderboardItem[] = [
  { name: "general", value: 5678, type: "text" },
  { name: "memes-😂", value: 4321, type: "text" },
  { name: "off-topic", value: 2109, type: "text" },
  { name: "announcements", value: 1500, type: "text" },
  { name: "bot-commands", value: 800, type: "text" },
  { name: "random-chat", value: 450, type: "text" },
  { name: "gaming", value: 300, type: "text" },
  { name: "music", value: 200, type: "text" },
  { name: "support", value: 100, type: "text" },
  { name: "introductions", value: 50, type: "text" },
];
export const dummyUserVC: LeaderboardItem[] = [
  { name: "VocalCordMaster", value: 88.5 },
  { name: "ChattyCathy", value: 72.3 },
  { name: "SilentWatcher", value: 45.1 },
  { name: "GamerGuy", value: 30.0 },
  { name: "MusicLover", value: 15.8 },
  { name: "StudyBuddy", value: 10.5 },
  { name: "AFKUser", value: 5.0 },
  { name: "LateNighter", value: 3.2 },
  { name: "EarlyBird", value: 2.1 },
  { name: "RandomUser", value: 1.0 },
];
export const dummyChannelVC: LeaderboardItem[] = [
  { name: "Chill Zone 🎵", value: 250.7, type: "voice" },
  { name: "Gaming Lobby", value: 180.2, type: "voice" },
  { name: "Study Group", value: 95.5, type: "voice" },
  { name: "AFK Room", value: 40.0, type: "voice" },
  { name: "Music Room", value: 25.3, type: "voice" },
  { name: "General VC", value: 15.0, type: "voice" },
  { name: "Late Night Chat", value: 10.1, type: "voice" },
  { name: "Early Birds", value: 5.5, type: "voice" },
  { name: "Random Talks", value: 3.3, type: "voice" },
  { name: "Quiet Room", value: 1.2, type: "voice" },
];

export const dummyUserBumps: LeaderboardItem[] = [
  { name: "ServerBooster", value: 55 },
  { name: "BumpKing", value: 48 },
  { name: "ActiveBumper", value: 31 },
  { name: "JustHelping", value: 22 },
  { name: "AnotherUser", value: 15 },
  { name: "UserOne", value: 12 },
  { name: "TestSubject", value: 9 },
  { name: "GamerGal", value: 5 },
  { name: "Coder123", value: 3 },
  { name: "RandomUser", value: 1 },
];

export const dummyUserStreamHours: LeaderboardItem[] = [
  { name: "StreamerSupreme", value: 40.2 },
  { name: "GamerGuy", value: 35.5 },
  { name: "VarietyCaster", value: 22.1 },
  { name: "ArtStreamer", value: 18.9 },
  { name: "JustChatting", value: 12.0 },
  { name: "VocalCordMaster", value: 8.5 },
  { name: "SilentWatcher", value: 4.1 },
  { name: "MusicLover", value: 2.2 },
  { name: "StudyBuddy", value: 1.5 },
  { name: "RandomUser", value: 0.5 },
];

export const dummyOverviewData = {
  messages: {
    users: dummyUserMessages.slice(0, 3),
  },
  bumps: {
    users: dummyUserBumps.slice(0, 3),
  },
  voice: {
    users: dummyUserVC.slice(0, 3),
  },
  stream: {
    users: dummyUserStreamHours.slice(0, 3),
  },
};

```

---
### File: `src/utils/services/imageGenerator.ts`
---

```ts
import {
  type CanvasRenderingContext2D,
  createCanvas,
  loadImage,
  registerFont,
} from "canvas";
import path from "path";
import { parse } from "twemoji-parser";
import { Colors } from "../../constants/Colors.js";

export interface LeaderboardItem {
  name: string;
  value: number;
  type?: "text" | "voice";
}

export interface OverviewData {
  messages: { users: LeaderboardItem[] };
  bumps: { users: LeaderboardItem[] };
  voice: { users: LeaderboardItem[] };
  stream: { users: LeaderboardItem[] };
}

/**
 * Draws a rounded rectangle on the canvas.
 * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
 * @param {number} x The x-coordinate of the rectangle's top-left corner.
 * @param {number} y The y-coordinate of the rectangle's top-left corner.
 * @param {number} width The width of the rectangle.
 * @param {number} height The height of the rectangle.
 * @param {number} radius The corner radius of the rectangle.
 */
const roundRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.arcTo(x + width, y, x + width, y + radius, radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
  ctx.lineTo(x + radius, y + height);
  ctx.arcTo(x, y + height, x, y + height - radius, radius);
  ctx.lineTo(x, y + radius);
  ctx.arcTo(x, y, x + radius, y, radius);
  ctx.closePath();
};
const drawMixedText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
) => {
  const japaneseRegex =
    /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
  let currentX = x;
  let currentSegment = "";
  let isLastCharJapanese = japaneseRegex.test(text[0] ?? "");
  ctx.textBaseline = "middle";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const isCurrentCharJapanese = japaneseRegex.test(char);

    if (isCurrentCharJapanese !== isLastCharJapanese) {
      const yOffset = isLastCharJapanese ? 0 : 0;
      ctx.font = `${fontSize}px 'Noto Sans JP', 'Sans'`;
      ctx.fillText(currentSegment, currentX, y + yOffset);
      currentX += ctx.measureText(currentSegment).width;

      currentSegment = char;
      isLastCharJapanese = isCurrentCharJapanese;
    } else {
      currentSegment += char;
    }
  }

  if (currentSegment) {
    const yOffset = isLastCharJapanese ? 0 : 2;
    ctx.font = `${fontSize}px 'Noto Sans JP', 'Sans'`;
    ctx.fillText(currentSegment, currentX, y + yOffset);
  }

  ctx.textBaseline = "alphabetic";
};

/**
 * Draws text with Twemoji support, replacing emojis with images.
 * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
 * @param {string} text The text to draw, which may include emojis.
 * @param {number} x The x-coordinate to start drawing the text.
 * @param {number} y The y-coordinate to draw the text.
 * @param {number} maxWidth The maximum width for the text. Text exceeding this width will be truncated.
 */
const drawTextWithTwemoji = async (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
) => {
  const emojiSize = 20;
  const fontSize = 16;
  const entities = parse(text, { assetType: "png" });
  let lastIndex = 0;
  let currentX = x;
  if (entities.length === 0) {
    ctx.fillText(text, x, y, maxWidth);
    return;
  }

  for (const entity of entities) {
    if (currentX >= x + maxWidth) break;
    const textBefore = text.substring(lastIndex, entity.indices[0]);
    if (textBefore) {
      const remainingWidth = maxWidth - (currentX - x);
      ctx.fillText(textBefore, currentX, y, remainingWidth);
      currentX += ctx.measureText(textBefore).width;
    }

    if (currentX < x + maxWidth) {
      try {
        const newUrl = entity.url.replace(
          "https://twemoji.maxcdn.com/v/latest/",
          "https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/",
        );
        const emojiImage = await loadImage(newUrl);
        const emojiY = y - fontSize + (fontSize - emojiSize) / 2 + 2;
        ctx.drawImage(emojiImage, currentX, emojiY, emojiSize, emojiSize);
        currentX += emojiSize + 2;
      } catch (e) {
        console.error(`Failed to load emoji image: ${entity.url}`, e);
        const fallback = "■";
        ctx.fillText(fallback, currentX, y);
        currentX += ctx.measureText(fallback).width;
      }
    }

    lastIndex = entity.indices[1];
  }

  if (lastIndex < text.length && currentX < x + maxWidth) {
    const textAfter = text.substring(lastIndex);
    const remainingWidth = maxWidth - (currentX - x);
    ctx.fillText(textAfter, currentX, y, remainingWidth);
  }
};

/**
 * Draws the leaderboard list on the canvas.
 * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
 * @param {LeaderboardItem[]} data The leaderboard data to display.
 * @param {object} options Configuration options for drawing the list.
 * @param {number} options.startX The starting x-coordinate for the list.
 * @param {number} options.startY The starting y-coordinate for the list.
 * @param {number} [options.col2X] Optional x-coordinate for a second column (for two-column layouts).
 */
const drawLeaderboardList = async (
  ctx: CanvasRenderingContext2D,
  data: LeaderboardItem[],
  options: { startX: number; startY: number; col2X?: number },
) => {
  const { startX, startY, col2X } = options;
  const itemHeight = 50;
  const itemGap = 8;
  const itemWidth = 380;
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const value =
      item.value % 1 === 0 ? item.value.toString() : item.value.toFixed(2);
    const x = col2X && i >= data.length / 2 ? col2X : startX;
    const y =
      startY + (i % (data.length / (col2X ? 2 : 1))) * (itemHeight + itemGap);
    ctx.fillStyle = "#2B2D31"; // Background for each item
    roundRect(ctx, x, y, itemWidth, itemHeight, 8);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"; // Border for each item
    ctx.lineWidth = 1;
    roundRect(ctx, x, y, itemWidth, itemHeight, 8);
    ctx.stroke();

    const rankX = x + 24;
    const rankY = y + 18;
    const rankRadius = 14;
    const textY = y + 26;

    ctx.fillStyle = "#1d1e20ff"; // Circle rank number background
    ctx.beginPath();
    ctx.arc(rankX, rankY, rankRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF"; // Rank number color

    ctx.font = "bold 14px 'Noto Sans JP', 'Sans'";
    ctx.textAlign = "center";
    ctx.fillText((i + 1).toString(), rankX, y + 23);

    const nameTextGap = 16;
    const nameStartX = rankX + rankRadius + nameTextGap;

    ctx.textAlign = "left";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "18px 'Noto Sans JP', 'Sans'";
    const displayName = item.type === "text" ? `#${item.name}` : item.name;
    await drawTextWithTwemoji(
      ctx,
      displayName,
      nameStartX,
      textY,
      itemWidth - 140,
    );
    ctx.fillStyle = "#A0A8B4";
    ctx.font = "bold 18px 'Noto Sans JP', 'Sans'";
    ctx.textAlign = "right";
    ctx.fillText(value, x + itemWidth - 15, textY + 2);

    const barHeight = 4;
    const barY = y + itemHeight - barHeight - 6;
    const barStartX = x + 10;
    const barMaxWidth = itemWidth - 20;

    ctx.fillStyle = "#40444B";
    roundRect(ctx, barStartX, barY, barMaxWidth, barHeight, 2);
    ctx.fill();
    const barWidth =
      totalValue > 0 ? (item.value / totalValue) * barMaxWidth : 0;
    if (barWidth > 0) {
      const barGradient = ctx.createLinearGradient(
        barStartX,
        0,
        barStartX + barWidth,
        0,
      );
      barGradient.addColorStop(0, Colors.blue);
      barGradient.addColorStop(1, Colors.sky);
      ctx.fillStyle = barGradient;
      roundRect(ctx, barStartX, barY, barWidth, barHeight, 2);
      ctx.fill();
    }
  }
};

/**
 * Draws the header and footer on the canvas.
 * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
 * @param {number} width The width of the canvas.
 * @param {number} height The height of the canvas.
 * @param {string | null} serverIconUrl The URL of the server icon (can be null).
 * @param {string} serverName The name of the server.
 * @param {string} subtitle The subtitle to display (e.g., "サーバーランキング" or "アクティビティ").
 * @param {string} timeframe The timeframe for the leaderboard.
 */
export const drawHeaderAndFooter = async (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  serverIconUrl: string | null,
  serverName: string,
  subtitle: string,
  timeframe: string,
) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#313338");
  gradient.addColorStop(1, "#313338");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#2B2D31";
  ctx.fillRect(0, 0, width, 95);
  const headerX = 35;
  const headerY = 20;

  const roundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
  };
  if (serverIconUrl) {
    try {
      const avatar = await loadImage(serverIconUrl);
      ctx.save();
      ctx.beginPath();
      const iconX = headerX;
      const iconY = headerY;
      const iconSize = 60;
      const cornerRadius = 12;

      roundRect(ctx, iconX, iconY, iconSize, iconSize, cornerRadius);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(avatar, iconX, iconY, iconSize, iconSize);
      ctx.restore();
    } catch (e) {
      console.error("Failed to load server icon:", e);
    }
  }

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 26px 'Noto Sans JP', 'Sans'";
  ctx.textAlign = "left";
  ctx.fillText(serverName, headerX + 75, headerY + 30);

  ctx.fillStyle = "#A0A8B4";
  ctx.font = "18px 'Noto Sans JP', 'Sans'";
  ctx.fillText(subtitle, headerX + 77, headerY + 55);

  // --- FOOTER TEXT --- //
  ctx.fillStyle = "#ffffffff";
  ctx.font = "14px 'Noto Sans JP', 'Sans";
  ctx.textAlign = "left";
  drawMixedText(ctx, timeframe, 35, height - 20, 14);
};

/**
 * Generates a leaderboard image.
 * @param {string} title The title of the leaderboard.
 * @param {string | null} iconPath The local path to the icon for the title.
 * @param {LeaderboardItem[]} data The leaderboard data to display.
 * @param {string | null} serverIconUrl The URL of the server icon (can be null).
 * @param {string} serverName The name of the server.
 * @param {string} timeframe The timeframe for the leaderboard.
 */
export const generateLeaderboardImage = async (
  title: string,
  iconPath: string | null,
  data: LeaderboardItem[],
  serverIconUrl: string | null,
  serverName: string,
  timeframe: string,
): Promise<Buffer> => {
  const fontPath = path.resolve(
    process.cwd(),
    "src/assets/fonts/NotoSansJP-Regular.ttf",
  );
  registerFont(fontPath, { family: "Noto Sans JP" });

  const itemHeight = 50; // Height of each item
  const itemGap = 8; // Space between items
  const headerHeight = 110;
  const footerHeight = 40;
  const titleTopMargin = 28; // Adjusted for vertical centering
  const listTopMargin = 24; // Space above list

  const rows = data.length > 0 ? Math.ceil(data.length / 2) : 0;
  const listHeight = rows > 0 ? rows * itemHeight + (rows - 1) * itemGap : 0;
  const calculatedHeight =
    headerHeight + titleTopMargin + listTopMargin + listHeight + footerHeight;

  const width = 850;
  const height = Math.max(450, calculatedHeight);
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  await drawHeaderAndFooter(
    ctx,
    width,
    height,
    serverIconUrl,
    serverName,
    "サーバーランキング",
    timeframe,
  );

  const titleY = headerHeight + titleTopMargin;
  const iconSize = 24;
  let currentX = 35;

  if (iconPath) {
    try {
      const icon = await loadImage(path.resolve(process.cwd(), iconPath));
      ctx.drawImage(
        icon,
        currentX,
        titleY - iconSize / 2 - 2,
        iconSize,
        iconSize,
      );
      currentX += iconSize + 6;
    } catch (e) {
      console.error("Failed to load leaderboard icon:", e);
    }
  }

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 22px 'Noto Sans JP', 'Sans'";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(title, currentX, titleY - 2);
  ctx.textBaseline = "alphabetic";

  await drawLeaderboardList(ctx, data, {
    startX: 30,
    startY: titleY + listTopMargin,
    col2X: 440,
  });
  return canvas.toBuffer("image/png");
};

/**
 * Generates an overview image with multiple leaderboard sections.
 * @param {OverviewData} data The overview data containing multiple leaderboard sections.
 * @param {string | null} serverIconUrl The URL of the server icon (can be null).
 * @param {string} serverName The name of the server.
 * @param {string} timeframe The timeframe for the overview.
 */
export const generateOverviewImage = async (
  data: OverviewData,
  serverIconUrl: string | null,
  serverName: string,
  timeframe: string,
): Promise<Buffer> => {
  const fontPath = path.resolve(
    process.cwd(),
    "src/assets/fonts/NotoSansJP-Regular.ttf",
  );
  registerFont(fontPath, { family: "Noto Sans JP" });

  const itemHeight = 50;
  const itemGap = 8;
  const sectionGap = 24;
  const listTopMargin = 24;
  const titleHeight = 22;
  const titleMargin = 28;
  const headerHeight = 110;
  const footerHeight = 2;
  const messageRows = Math.max(
    data.messages.users.length,
    data.bumps.users.length,
  );
  const voiceRows = Math.max(data.voice.users.length, data.stream.users.length);
  const messagesHeight =
    messageRows > 0
      ? messageRows * itemHeight + (messageRows - 1) * itemGap
      : 0;
  const voiceHeight =
    voiceRows > 0 ? voiceRows * itemHeight + (voiceRows - 1) * itemGap : 0;

  let calculatedHeight = headerHeight;
  if (messagesHeight > 0) {
    calculatedHeight +=
      titleMargin + titleHeight + listTopMargin + messagesHeight;
    if (voiceHeight > 0) {
      calculatedHeight += sectionGap;
    }
  }
  if (voiceHeight > 0) {
    calculatedHeight += titleMargin + titleHeight + listTopMargin + voiceHeight;
  }
  calculatedHeight += footerHeight;

  const width = 850;
  const height = Math.max(480, calculatedHeight);
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  await drawHeaderAndFooter(
    ctx,
    width,
    height,
    serverIconUrl,
    serverName,
    "サーバーランキング",
    timeframe,
  );
  let currentY = headerHeight + titleMargin;

  const iconSize = 24;
  const iconPadding = 10;
  const iconBasePath = "src/assets/icons";

  const drawSectionTitle = async (
    title: string,
    iconName: string,
    x: number,
    y: number,
  ) => {
    let currentX = x;
    try {
      const icon = await loadImage(
        path.resolve(process.cwd(), `${iconBasePath}/${iconName}.png`),
      );
      ctx.drawImage(icon, currentX, y - iconSize / 2 - 2, iconSize, iconSize);
      currentX += iconSize + iconPadding;
    } catch (e) {
      console.error(`Failed to load icon ${iconName}:`, e);
    }
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 22px 'Noto Sans JP', 'Sans'";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(title, currentX - 4, y - 2);
    ctx.textBaseline = "alphabetic";
  };

  if (messagesHeight > 0) {
    await drawSectionTitle("メッセージ・Top Messages", "chat", 35, currentY);
    await drawSectionTitle("バンプ数・Top Bumpers", "bump", 445, currentY);

    await drawLeaderboardList(ctx, data.messages.users, {
      startX: 30,
      startY: currentY + listTopMargin,
    });
    await drawLeaderboardList(ctx, data.bumps.users, {
      startX: 440,
      startY: currentY + listTopMargin,
    });
    currentY += titleHeight + listTopMargin + messagesHeight + sectionGap;
  }

  if (voiceHeight > 0) {
    await drawSectionTitle("ボイス時間・Top VC Hours", "mic", 35, currentY);
    await drawSectionTitle(
      "配信時間・Top Stream Hours",
      "stream",
      445,
      currentY,
    );

    await drawLeaderboardList(ctx, data.voice.users, {
      startX: 30,
      startY: currentY + listTopMargin,
    });
    await drawLeaderboardList(ctx, data.stream.users, {
      startX: 440,
      startY: currentY + listTopMargin,
    });
  }

  return canvas.toBuffer("image/png");
};

```

---
### File: `src/utils/services/statsPopulationService.ts`
---

```ts
import { ChannelType, type Guild } from "discord.js";
import { sql } from "drizzle-orm";
import { config } from "../../config/env.js";
import { db } from "../../db/index.js";
import {
  channels,
  dailyChannelStats,
  dailyUserStats,
  users,
} from "../../db/schema.js";

export const populateInitialStats = async (guild: Guild): Promise<void> => {
  if (guild.id === config.ids.testGuild) {
    return;
  }

  console.log(
    "[Stats Population] Starting population of users and channels...",
  );

  try {
    const allMembers = await guild.members.fetch();
    const allChannels = await guild.channels.fetch();

    const memberData = allMembers
      .filter((member) => !member.user.bot)
      .map((member) => ({
        id: member.id,
        username: member.user.username,
      }));

    const textChannelTypes = [
      ChannelType.GuildText,
      ChannelType.GuildAnnouncement,
    ];
    const voiceChannelTypes = [
      ChannelType.GuildVoice,
      ChannelType.GuildStageVoice,
    ];

    const channelData: { id: string; name: string; type: "text" | "voice" }[] =
      allChannels
        .filter(
          (channel) =>
            channel &&
            (textChannelTypes.includes(channel.type) ||
              voiceChannelTypes.includes(channel.type)),
        )
        .filter((channel) => channel !== null)
        .map((channel) => ({
          id: channel.id,
          name: channel.name,
          type: textChannelTypes.includes(channel.type) ? "text" : "voice",
        }));

    const today = new Date().toISOString().slice(0, 10);

    if (memberData.length > 0) {
      await db
        .insert(users)
        .values(memberData)
        .onConflictDoUpdate({
          target: users.id,
          set: { username: sql`excluded.username` },
        });

      await db
        .insert(dailyUserStats)
        .values(memberData.map((m) => ({ userId: m.id, date: today })))
        .onConflictDoNothing();
    }

    if (channelData.length > 0) {
      await db
        .insert(channels)
        .values(channelData)
        .onConflictDoUpdate({
          target: channels.id,
          set: {
            name: sql`excluded.name`,
            type: sql`excluded.type`,
          },
        });

      await db
        .insert(dailyChannelStats)
        .values(channelData.map((c) => ({ channelId: c.id, date: today })))
        .onConflictDoNothing();
    }

    console.log(
      `[Stats Population] Finished. Processed ${memberData.length} members and ${channelData.length} channels.`,
    );
  } catch (error) {
    console.error(
      "[Stats Population] An error occurred during stats population:",
      error,
    );
  }
};

```

---
### File: `src/utils/services/activityImageGenerator.ts`
---

```ts
import path from "node:path";
import {
  type CanvasRenderingContext2D,
  createCanvas,
  registerFont,
} from "canvas";
import type {
  MessageActivityData,
  VoiceActivityData,
} from "../../commands/slash/stats/activity/activity.mock.js";
import { Colors } from "../../constants/Colors.js";
import { drawHeaderAndFooter } from "./imageGenerator.js";

const fontsPath = path.resolve(process.cwd(), "src", "assets", "fonts");

registerFont(path.join(fontsPath, "NotoSans-Regular.ttf"), {
  family: "NotoSans",
});
registerFont(path.join(fontsPath, "NotoSans-Bold.ttf"), {
  family: "NotoSans",
  weight: "bold",
});
registerFont(path.join(fontsPath, "NotoSansJP-Regular.ttf"), {
  family: "NotoSansJP",
});

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 650;
const PADDING = 40;
const CHART_START_X = PADDING + 50;
const HEADER_HEIGHT = 95;
const CHART_START_Y = HEADER_HEIGHT + PADDING;
const CHART_END_X = CANVAS_WIDTH - PADDING;
const CHART_END_Y = CANVAS_HEIGHT - PADDING - 160;
const CHART_WIDTH = CHART_END_X - CHART_START_X;
const CHART_HEIGHT = CHART_END_Y - CHART_START_Y;

// Helper to draw rounded rectangles (for bars and legend box)
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
}

/**
 * Draws the base of the activity chart including axes, guidelines, and header/footer.
 * @param {CanvasRenderingContext2D} ctx The canvas context.
 * @param {number[]} hourlyData The data for max value calculation.
 * @param {string} serverName The server name for the header.
 * @param {string | null} serverIconUrl The server icon URL for the header.
 * @param {string} timeframeLabel The label for the timeframe (e.g., "過去7日間").
 */
const drawChartBase = async (
  ctx: CanvasRenderingContext2D,
  hourlyData: number[],
  serverName: string,
  serverIconUrl: string | null,
  timeframeLabel: string,
) => {
  await drawHeaderAndFooter(
    ctx,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    serverIconUrl,
    serverName,
    "サーバーアクティビティ",
    timeframeLabel,
  );

  // --- Draw Chart Area ---
  ctx.strokeStyle = "#40444B"; // Gray line
  ctx.lineWidth = 1;

  // --- Draw Y-axis (Value) ---
  const maxValue = Math.max(...hourlyData, 1); // Avoid division by zero if data is all 0
  const yAxisTicks = 5;
  ctx.font = "14px 'Noto Sans JP', 'Sans'";
  ctx.fillStyle = "#949BA4";
  ctx.textAlign = "right";

  for (let i = 0; i <= yAxisTicks; i++) {
    const value = (maxValue / yAxisTicks) * i;
    const y = CHART_END_Y - (CHART_HEIGHT / yAxisTicks) * i;

    // Y-axis label
    ctx.fillText(Math.round(value).toLocaleString(), CHART_START_X - 10, y + 4);

    // Guideline
    if (i > 0) {
      ctx.beginPath();
      ctx.moveTo(CHART_START_X, y);
      ctx.lineTo(CHART_END_X, y);
      ctx.stroke();
    }
  }

  // --- Draw X-axis (Time) ---
  const barWidth = CHART_WIDTH / 24;
  ctx.textAlign = "center";
  ctx.fillStyle = "#949BA4";
  ctx.font = "12px 'NotoSans', 'Sans'";
  const xAxisLabelY = CHART_END_Y + 15;
  for (let i = 0; i < 24; i++) {
    const x = CHART_START_X + barWidth * i + barWidth / 2;
    const label = i.toString().padStart(2, "0");

    ctx.fillText(label, x, xAxisLabelY);
  }
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 14px 'Noto Sans JP', 'Sans'";
  ctx.fillText("Timezone: JST", CANVAS_WIDTH / 2, xAxisLabelY + 24);
};

function drawBars(ctx: CanvasRenderingContext2D, hourlyData: number[]) {
  const maxValue = Math.max(...hourlyData, 1);
  const barWidth = CHART_WIDTH / 24;
  const barMargin = 2; // Space between bars

  for (let i = 0; i < 24; i++) {
    const value = hourlyData[i] || 0;

    // If the value is 0, don't draw anything for this bar.
    if (value === 0) {
      continue;
    }

    const barHeight = (value / maxValue) * CHART_HEIGHT;
    const x = CHART_START_X + i * barWidth;
    const y = CHART_END_Y - barHeight;

    ctx.fillStyle = Colors.blue;
    drawRoundedRect(
      ctx,
      x + barMargin,
      y,
      barWidth - barMargin * 2,
      barHeight,
      3,
    );
  }
}

/**
 * Draws the legend/stats box at the bottom of the canvas.
 * @param {CanvasRenderingContext2D} ctx The canvas context.
 * @param {{ label: string; value: string }[]} stats The stats to display.
 */
function drawLegendBox(
  ctx: CanvasRenderingContext2D,
  stats: { label: string; value: string }[],
) {
  const numBoxes = stats.length;
  if (numBoxes === 0) return;

  const totalChartWidth = CANVAS_WIDTH - PADDING * 2;
  const boxGap = 20;
  const totalGapWidth = boxGap * (numBoxes - 1);
  const boxWidth = (totalChartWidth - totalGapWidth) / numBoxes;
  const boxHeight = 70;
  const verticalOffset = 60;
  const boxY = CHART_END_Y + verticalOffset;

  let orderedStats = stats;
  if (numBoxes === 3 && stats[0].label.includes("Peak Hour")) {
    orderedStats = [stats[2], stats[0], stats[1]];
  }

  orderedStats.forEach((stat, index) => {
    const boxX = PADDING + index * (boxWidth + boxGap);

    // 1. Draw the individual background box
    ctx.fillStyle = "#2B2D31"; // Darker background
    drawRoundedRect(ctx, boxX, boxY, boxWidth, boxHeight, 8);

    // 2. Draw Value (White, Bold)
    ctx.fillStyle = Colors.blue;
    ctx.font = "bold 24px 'Noto Sans JP', 'Sans'";
    ctx.textAlign = "center";
    const valueX = boxX + boxWidth / 2;
    const valueY = boxY + 33;
    ctx.fillText(stat.value, valueX, valueY);

    ctx.fillStyle = "#949BA4";
    ctx.font = "14px 'Noto Sans JP', 'Sans'";
    ctx.fillText(stat.label, valueX, valueY + 22);
  });
}

/**
 * Generates an image buffer for Voice Activity stats
 */
export const generateVoiceActivityImage = async (
  data: VoiceActivityData,
  serverIconUrl: string | null,
  serverName: string,
  timeframeLabel: string,
): Promise<Buffer> => {
  const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  const ctx = canvas.getContext("2d");

  await drawChartBase(
    ctx,
    data.hourlyActivity,
    serverName,
    serverIconUrl,
    timeframeLabel,
  );
  drawBars(ctx, data.hourlyActivity);

  const stats = [
    {
      label: "ピーク時間 / Peak Hour",
      value: `${data.peakHour.toString().padStart(2, "0")}:00`,
    },
    {
      label: "合計VC時間 / Total VC Hours",
      value: `${data.totalDurationHours.toFixed(1)}時間`,
    },
    {
      label: "平均参加者 / Avg. Participants",
      value: `${data.averageParticipants.toFixed(0)}人`,
    },
  ];
  drawLegendBox(ctx, stats);

  return canvas.toBuffer("image/png");
};

/**
 * Generates an image buffer for Message Activity stats
 */
export const generateMessageActivityImage = async (
  data: MessageActivityData,
  serverIconUrl: string | null,
  serverName: string,
  timeframeLabel: string,
): Promise<Buffer> => {
  const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  const ctx = canvas.getContext("2d");

  await drawChartBase(
    ctx,
    data.hourlyActivity,
    serverName,
    serverIconUrl,
    timeframeLabel,
  );

  drawBars(ctx, data.hourlyActivity);

  const stats = [
    {
      label: "ピーク時間 / Peak Hour",
      value: `${data.mostActiveHour.toString().padStart(2, "0")}:00`,
    },
    {
      label: "平均参加者 / Avg. Participants",
      value: `${data.averageParticipants.toFixed(0)}人`,
    },
    {
      label: "合計メッセージ / Total Messages",
      value: data.totalMessages.toLocaleString(),
    },
  ];
  drawLegendBox(ctx, stats);

  return canvas.toBuffer("image/png");
};

```

---
### File: `src/utils/validators/envValidator.ts`
---

```ts
/**
 * Checks if all required environment variables are set.
 * If any are missing, it logs a fatal error and exits the process.
 * @param requiredEnvVars An array of required environment variable names.
 */
export const validateEnvVars = (requiredEnvVars: string[]): void => {
  const missingVars = requiredEnvVars.filter((v) => !process.env[v]);

  if (missingVars.length > 0) {
    console.error("FATAL: Missing required environment variables:");
    missingVars.forEach((v) => {
      console.error(`- ${v}`);
    });
    console.error(
      "Please check your .env file and ensure all required variables are set.",
    );
    process.exit(1);
  } else {
    console.log("Environment variables validated successfully.");
  }
};

```

---
### File: `src/listeners/voice/voiceStateUpdate/index.ts`
---

```ts
import {
  EmbedBuilder,
  type GuildTextBasedChannel,
  type VoiceState,
} from "discord.js";
import { and, eq, isNull, sql } from "drizzle-orm";
import { config } from "../../../config/env.js";
import { Colors } from "../../../constants/Colors.js";
import { db } from "../../../db/index.js";
import {
  activeVcSessions,
  channels,
  dailyChannelStats,
  dailyUserStats,
  hourlyActivity,
  users,
  voiceSessionParticipants,
  voiceSessions,
} from "../../../db/schema.js";
import { createListener } from "../../../utils/builders/listenerBuilder.js";

const activeChannelSessions = new Map<
  string,
  { sessionId: number; participants: Set<string> }
>();

/**
 * Formats milliseconds into a human-readable string (e.g., "1時間3分5秒").
 * @param {number} milliseconds The duration in milliseconds.
 * @returns {string} A formatted duration string.
 */
const formatDuration = (milliseconds: number): string => {
  if (milliseconds < 0) milliseconds = 0;
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  if (hours > 0) return `${hours}時間${minutes % 60}分${seconds % 60}秒`;
  if (minutes > 0) return `${minutes}分${seconds % 60}秒`;
  return `${seconds}秒`;
};

/**
 * Logs the duration of a voice channel session to the database.
 * @param {string} userId The ID of the user whose session is being logged.
 * @param {string} username The username of the user.
 * @param {string} channelId The ID of the voice channel.
 * @param {string} channelName The name of the voice channel.
 * @param {"text" | "voice"} channelType The type of the channel.
 * @param {Date} startTime The start time of the session.
 * @param {Date} endTime The end time of the session.
 * @returns {Promise<void>}
 */
const logVcSession = async (
  userId: string,
  username: string,
  channelId: string,
  channelName: string,
  channelType: "text" | "voice",
  startTime: Date,
  endTime: Date,
): Promise<void> => {
  const durationMs = endTime.getTime() - startTime.getTime();
  if (durationMs <= 0) return;

  const durationHours = durationMs / (1000 * 60 * 60);
  const today = new Date().toISOString().slice(0, 10);

  try {
    await db
      .insert(users)
      .values({ id: userId, username })
      .onConflictDoUpdate({ target: users.id, set: { username } });

    await db
      .insert(channels)
      .values({ id: channelId, name: channelName, type: channelType })
      .onConflictDoUpdate({
        target: channels.id,
        set: { name: channelName, type: channelType },
      });

    await db
      .insert(dailyUserStats)
      .values({ userId, date: today, vcHours: durationHours })
      .onConflictDoUpdate({
        target: [dailyUserStats.userId, dailyUserStats.date],
        set: { vcHours: sql`${dailyUserStats.vcHours} + ${durationHours}` },
      });

    await db
      .insert(dailyChannelStats)
      .values({ channelId, date: today, vcHours: durationHours })
      .onConflictDoUpdate({
        target: [dailyChannelStats.channelId, dailyChannelStats.date],
        set: { vcHours: sql`${dailyChannelStats.vcHours} + ${durationHours}` },
      });

    let currentHourStart = new Date(startTime);
    currentHourStart.setUTCMinutes(0, 0, 0);

    while (currentHourStart < endTime) {
      const nextHourStart = new Date(currentHourStart);
      nextHourStart.setUTCHours(nextHourStart.getUTCHours() + 1);

      const effectiveEnd = endTime < nextHourStart ? endTime : nextHourStart;
      const effectiveStart =
        startTime > currentHourStart ? startTime : currentHourStart;

      const durationInHourMs =
        effectiveEnd.getTime() - effectiveStart.getTime();

      if (durationInHourMs > 0) {
        const durationInHour = durationInHourMs / (1000 * 60 * 60);
        const date = currentHourStart.toISOString().slice(0, 10);
        const hour = currentHourStart.getUTCHours();

        await db
          .insert(hourlyActivity)
          .values({ date, hour, vcHours: durationInHour })
          .onConflictDoUpdate({
            target: [hourlyActivity.date, hourlyActivity.hour],
            set: {
              vcHours: sql`${hourlyActivity.vcHours} + ${durationInHour}`,
            },
          });
      }
      currentHourStart = nextHourStart;
    }
  } catch (error) {
    console.error("Error logging VC session:", error);
  }
};

/**
 * Silently logs the duration of a streaming session to the database.
 * @param {string} userId The ID of the user whose session is being logged.
 * @param {string} username The username of the user.
 * @param {number} durationMs The duration of the session in milliseconds.
 * @returns {Promise<void>}
 */
const logStreamSession = async (
  userId: string,
  username: string,
  durationMs: number,
): Promise<void> => {
  if (durationMs <= 0) return;
  const durationHours = durationMs / (1000 * 60 * 60);
  const today = new Date().toISOString().slice(0, 10);

  try {
    await db
      .insert(users)
      .values({ id: userId, username })
      .onConflictDoUpdate({ target: users.id, set: { username } });

    await db
      .insert(dailyUserStats)
      .values({ userId, date: today, streamHours: durationHours })
      .onConflictDoUpdate({
        target: [dailyUserStats.userId, dailyUserStats.date],
        set: {
          streamHours: sql`${dailyUserStats.streamHours} + ${durationHours}`,
        },
      });
  } catch (error) {
    console.error("Error logging stream session:", error);
  }
};

export default createListener(
  "voiceStateUpdate",
  "voiceStateUpdate",
  async (oldState: VoiceState, newState: VoiceState) => {
    if (newState.guild.id === config.ids.testGuild) {
      return;
    }
    const member = newState.member || oldState.member;
    if (!member || member.user.bot) return;
    const userId = member.id;

    try {
      // --- User Joins or Moves INTO a channel ---
      if (newState.channelId && newState.channelId !== oldState.channelId) {
        if (newState.channel && newState.channel.members.size === 1) {
          const newSession = await db
            .insert(voiceSessions)
            .values({
              channelId: newState.channelId,
              startTime: new Date(),
            })
            .returning({ id: voiceSessions.id });
          if (newSession.length > 0) {
            const sessionId = newSession[0].id;
            activeChannelSessions.set(newState.channelId, {
              sessionId,
              participants: new Set(newState.channel.members.map((m) => m.id)),
            });
          }
        } else if (newState.channel) {
          const sessionInfo = activeChannelSessions.get(newState.channelId);
          if (sessionInfo) {
            sessionInfo.participants.add(userId);
          } else {
            const openSession = await db.query.voiceSessions.findFirst({
              where: and(
                eq(voiceSessions.channelId, newState.channelId),
                isNull(voiceSessions.endTime),
              ),
            });
            if (openSession) {
              const currentParticipants = newState.channel.members.map(
                (m) => m.id,
              );
              activeChannelSessions.set(newState.channelId, {
                sessionId: openSession.id,
                participants: new Set(currentParticipants),
              });
            } else {
              const fallbackSession = await db
                .insert(voiceSessions)
                .values({
                  channelId: newState.channelId,
                  startTime: new Date(),
                })
                .returning({ id: voiceSessions.id });
              if (fallbackSession.length > 0) {
                activeChannelSessions.set(newState.channelId, {
                  sessionId: fallbackSession[0].id,
                  participants: new Set(
                    newState.channel.members.map((m) => m.id),
                  ),
                });
              }
            }
          }
        }
      }

      // --- User Leaves or Moves FROM a channel ---
      if (oldState.channelId && oldState.channelId !== newState.channelId) {
        if (oldState.channel && oldState.channel.members.size === 0) {
          const sessionInfo = activeChannelSessions.get(oldState.channelId);
          if (sessionInfo) {
            const endTime = new Date();
            const sessionRecord = await db.query.voiceSessions.findFirst({
              where: eq(voiceSessions.id, sessionInfo.sessionId),
            });
            if (sessionRecord) {
              const durationSeconds = Math.floor(
                (endTime.getTime() - sessionRecord.startTime.getTime()) / 1000,
              );
              const uniqueParticipants = Array.from(sessionInfo.participants);
              await db
                .update(voiceSessions)
                .set({
                  endTime,
                  durationSeconds,
                  totalUniqueParticipants: uniqueParticipants.length,
                })
                .where(eq(voiceSessions.id, sessionInfo.sessionId));
              if (uniqueParticipants.length > 0) {
                await db
                  .insert(voiceSessionParticipants)
                  .values(
                    uniqueParticipants.map((uid) => ({
                      sessionId: sessionInfo.sessionId,
                      userId: uid,
                    })),
                  )
                  .onConflictDoNothing();
              }
            }
            activeChannelSessions.delete(oldState.channelId);
          }
        }
      }
    } catch (e) {
      console.error("Error in new voice session tracking logic:", e);
    }

    const logChannelId = process.env.VOICE_LOG_CHANNEL_ID;
    if (!logChannelId) return;

    const username = member.user.username;
    const now = new Date();

    const fetched = await newState.client.channels
      .fetch(logChannelId)
      .catch(() => null);
    if (!fetched || !fetched.isTextBased()) return;
    const logChannel = fetched as GuildTextBasedChannel;

    const embed = new EmbedBuilder()
      .setAuthor({
        name: member.user.tag,
        iconURL: member.user.displayAvatarURL({ size: 128 }),
      })
      .setFooter({ text: `ID: ${userId}` })
      .setTimestamp();

    if (!oldState.channelId && newState.channelId) {
      await db
        .insert(activeVcSessions)
        .values({
          userId,
          channelId: newState.channelId,
          joinTime: now,
        })
        .onConflictDoNothing();
      embed
        .setTitle("ボイスチャンネル参加")
        .setDescription(
          `${member} が <#${newState.channelId}> に参加しました。`,
        )
        .setColor(Colors.green);
      await logChannel.send({ embeds: [embed] });
    } else if (oldState.channelId && !newState.channelId) {
      embed
        .setTitle("ボイスチャンネル退出")
        .setDescription(
          `${member} が <#${oldState.channelId}> から退出しました。`,
        )
        .setColor(Colors.red);

      const session = await db.query.activeVcSessions.findFirst({
        where: eq(activeVcSessions.userId, userId),
      });

      if (session && oldState.channel) {
        const duration = now.getTime() - session.joinTime.getTime();
        await logVcSession(
          userId,
          username,
          oldState.channelId,
          oldState.channel.name,
          "voice",
          session.joinTime,
          now,
        );
        embed.addFields({
          name: "通話時間",
          value: formatDuration(duration),
          inline: true,
        });

        if (session.isStreaming && session.streamStartTime) {
          const streamDuration =
            now.getTime() - session.streamStartTime.getTime();
          await logStreamSession(userId, username, streamDuration);
          embed.addFields({
            name: "配信時間",
            value: formatDuration(streamDuration),
            inline: true,
          });
        }

        await db
          .delete(activeVcSessions)
          .where(eq(activeVcSessions.userId, userId));
      }
      await logChannel.send({ embeds: [embed] });
    } else if (
      oldState.channelId &&
      newState.channelId &&
      oldState.channelId !== newState.channelId
    ) {
      embed
        .setTitle("ボイスチャンネル移動")
        .setDescription(
          `${member} が <#${oldState.channelId}> から <#${newState.channelId}> に移動しました。`,
        )
        .setColor(Colors.yellow);

      const session = await db.query.activeVcSessions.findFirst({
        where: eq(activeVcSessions.userId, userId),
      });

      if (session && oldState.channel) {
        const duration = now.getTime() - session.joinTime.getTime();
        await logVcSession(
          userId,
          username,
          oldState.channelId,
          oldState.channel.name,
          "voice",
          session.joinTime,
          now,
        );
        embed.addFields({
          name: "前のチャンネルでの通話時間",
          value: formatDuration(duration),
          inline: true,
        });
      }

      await db
        .insert(activeVcSessions)
        .values({
          userId,
          channelId: newState.channelId,
          joinTime: now,
          isStreaming: session?.isStreaming ?? false,
          streamStartTime: session?.streamStartTime,
        })
        .onConflictDoUpdate({
          target: activeVcSessions.userId,
          set: { channelId: newState.channelId, joinTime: now },
        });

      await logChannel.send({ embeds: [embed] });
    }

    if (oldState.streaming !== newState.streaming) {
      if (newState.streaming) {
        await db
          .update(activeVcSessions)
          .set({
            isStreaming: true,
            streamStartTime: now,
          })
          .where(eq(activeVcSessions.userId, userId));
      } else {
        const session = await db.query.activeVcSessions.findFirst({
          where: eq(activeVcSessions.userId, userId),
        });
        if (session?.isStreaming && session.streamStartTime) {
          const streamDuration =
            now.getTime() - session.streamStartTime.getTime();
          await logStreamSession(userId, username, streamDuration);
          await db
            .update(activeVcSessions)
            .set({
              isStreaming: false,
              streamStartTime: null,
            })
            .where(eq(activeVcSessions.userId, userId));
        }
      }
    }
  },
);

```

---
### File: `src/listeners/message/disboardBump/index.ts`
---

```ts
import type { Message } from "discord.js";
import { createListener } from "../../../utils/builders/listenerBuilder.js";
import { handleBump } from "../../../utils/helpers/bumpHelper.js";

export default createListener(
  "disboardBumpHandler",
  "messageCreate",
  async (message: Message) => {
    await handleBump(message, message.client, "Disboard", "アップしたよ");
  },
  {
    ignoreBots: false,
    channels: ["bump"],
    users: ["302050872383242240"],
  },
);

```

---
### File: `src/listeners/message/dissokuBump/index.ts`
---

```ts
import type { Message, PartialMessage } from "discord.js";
import { createListener } from "../../../utils/builders/listenerBuilder.js";
import { handleBump } from "../../../utils/helpers/bumpHelper.js";

export default createListener(
  "dissokuBumpHandler",
  "messageUpdate",
  async (
    _oldMessage: Message | PartialMessage,
    newMessage: Message | PartialMessage,
  ) => {
    if (newMessage.partial) return;
    await handleBump(newMessage, newMessage.client, "Dissoku", "アップしたよ");
  },
  {
    ignoreBots: false,
    channels: ["bump"],
    users: ["761562078095867916"],
  },
);

```

---
### File: `src/listeners/message/introductionMessage/index.ts`
---

```ts
import type { GuildTextBasedChannel } from "discord.js";
import { EmbedBuilder, PermissionsBitField } from "discord.js";
import { config } from "../../../config/env.js";
import { Colors } from "../../../constants/Colors.js";
import { createListener } from "../../../utils/builders/listenerBuilder.js";
import {
  getStickyMessageId,
  setStickyMessageId,
} from "../../../utils/managers/dataManager.js";

const SPAM_THRESHOLD_COUNT = 3;
const SPAM_TIMEFRAME_MS = 60 * 1000;
const SPAM_COOLDOWN_MS = 5 * 60 * 1000;
0;
type SubmissionAttempts = {
  timestamps: number[];
  spamNotifiedAt: number | null;
};
const userSubmissionAttempts = new Map<string, SubmissionAttempts>();

const CORRECT_TEMPLATE_HEADERS = [
  "【名前/Name】",
  "【出身/Country】",
  "【言語/Language】",
  "【勉強/Studying】",
  "【趣味/Hobby】",
  "【一言/Intro】",
];

const CORRECT_TEMPLATE_STRING = CORRECT_TEMPLATE_HEADERS.join("\n");

const getErrorCode = (error: unknown): number | undefined => {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code?: unknown }).code;
    return typeof code === "number" ? code : undefined;
  }
  return undefined;
};

/**
 * Creates a pointer line with appropriate spacing for full-width and half-width characters.
 * @param {string} line The content of the line with the error.
 * @param {number} errorIndex The index in the line where the error occurred.
 * @returns {string} A string with mixed spaces and a '^' to point at the error.
 */
const createAlignmentPointer = (line: string, errorIndex: number): string => {
  const specificFullWidthRegex = /[【】名前出身言語勉強趣味一]/;
  const pointerParts = [];

  for (let i = 0; i < line.length; i++) {
    if (i === errorIndex) {
      pointerParts.push("^");
      break;
    }
    const char = line[i];

    pointerParts.push(specificFullWidthRegex.test(char) ? "　" : " ");
  }

  const allFullWidth = [];
  const fullWidthChars = [];

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const isFullWidth = specificFullWidthRegex.test(char);

    if (i >= pointerParts.length) {
      allFullWidth.push(isFullWidth);
    }

    if (isFullWidth) {
      fullWidthChars.push({ char, index: i });
    }
  }

  return pointerParts.join("");
};

type InvalidLineError = {
  type: "INVALID_LINE";
  message: string;
  lineNumber: number;
  lineContent: string;
  expectedHeader: string;
  charIndex: number;
};

type MissingLineError = {
  type: "MISSING_LINE";
  message: string;
  problematicContent: string;
  expectedHeader: string;
};

type ValidationResult =
  | { isValid: true }
  | { isValid: false; error: InvalidLineError | MissingLineError };

const validateWelcomeMessage = (content: string): ValidationResult => {
  const messageLines = content.split("\n");

  for (let i = 0; i < CORRECT_TEMPLATE_HEADERS.length; i++) {
    const expectedHeader = CORRECT_TEMPLATE_HEADERS[i];

    if (i >= messageLines.length || messageLines[i].trim() === "") {
      const existingContent = messageLines.slice(0, i).join("\n");
      return {
        isValid: false,
        error: {
          type: "MISSING_LINE",
          message: `The line for "${expectedHeader}" is missing.`,
          problematicContent:
            existingContent.length > 0
              ? existingContent
              : "(Your message was empty)",
          expectedHeader: expectedHeader,
        },
      };
    }

    const userLine = messageLines[i];
    const userLineTrimmed = userLine.trimRight();

    if (userLineTrimmed.startsWith(expectedHeader)) {
      continue;
    }

    let diffIndex = 0;
    while (
      diffIndex < expectedHeader.length &&
      diffIndex < userLineTrimmed.length &&
      expectedHeader[diffIndex] === userLineTrimmed[diffIndex]
    ) {
      diffIndex++;
    }

    const leadingSpaces = userLine.length - userLine.trimLeft().length;
    const pointerIndex = diffIndex + leadingSpaces;

    return {
      isValid: false,
      error: {
        type: "INVALID_LINE",
        message: `Line ${i + 1} has a format error.`,
        lineNumber: i,
        lineContent: userLine,
        expectedHeader: expectedHeader,
        charIndex: pointerIndex,
      },
    };
  }
  return { isValid: true };
};

export default createListener(
  "welcomeMessageFormatChecker",
  "messageCreate",
  async (message) => {
    const channel = message.channel as unknown as GuildTextBasedChannel;
    const author = message.author;
    const member = message.member;
    const guild = message.guild;
    const now = Date.now();

    if (!guild || !member) {
      console.error(
        "welcomeMessage listener: Could not get guild or member object from the message. Skipping.",
      );
      return;
    }

    const botMember = guild.members.me;
    if (!botMember) {
      console.error(
        "welcomeMessage listener: Could not get bot's member object. Skipping.",
      );
      return;
    }

    const channelPermissions = channel.permissionsFor(botMember);

    if (
      !channelPermissions ||
      !channelPermissions.has(PermissionsBitField.Flags.SendMessages) ||
      !channelPermissions.has(PermissionsBitField.Flags.ViewChannel)
    ) {
      console.warn(
        `welcomeMessage listener: Bot missing SendMessages or ViewChannel permission in ${channel.name}. Listener will not function effectively.`,
      );
      return;
    }

    const validationResult = validateWelcomeMessage(message.content);

    if (validationResult.isValid) {
      const welcomeRoleId = config.roles.verified;
      if (welcomeRoleId) {
        const roleToAssign = guild.roles.cache.get(welcomeRoleId);
        if (!roleToAssign) {
          console.error(
            `welcomeMessage listener: Welcome role (ID: ${welcomeRoleId}) not found in guild ${guild.id}.`,
          );
        } else {
          if (!member.roles.cache.has(welcomeRoleId)) {
            if (
              !botMember.permissions.has(PermissionsBitField.Flags.ManageRoles)
            ) {
              console.warn(
                `welcomeMessage listener: Bot is missing 'Manage Roles' permission in guild ${guild.id}. Cannot assign welcome role.`,
              );
            } else if (
              botMember.roles.highest.position <= roleToAssign.position
            ) {
              console.warn(
                `welcomeMessage listener: Bot's highest role (${botMember.roles.highest.name}) is not high enough to assign welcome role '${roleToAssign.name}' (position ${roleToAssign.position}) in guild ${guild.id}. Bot role position: ${botMember.roles.highest.position}.`,
              );
            } else {
              try {
                await member.roles.add(roleToAssign);
                console.log(
                  `welcomeMessage listener: Successfully assigned role '${roleToAssign.name}' to ${member.user.tag}.`,
                );
              } catch (error) {
                console.error(
                  `welcomeMessage listener: Failed to assign role '${roleToAssign.name}' to ${member.user.tag}. Error:`,
                  error,
                );
              }
            }
          }
        }
      } else {
        console.log(
          "welcomeMessage listener: WELCOME_ROLE_ID is not defined, skipping role assignment.",
        );
      }

      try {
        const botStickyMessageId = getStickyMessageId();
        if (botStickyMessageId) {
          try {
            const oldStickyMessage = await channel.messages.fetch({
              message: botStickyMessageId,
              force: true,
              cache: false,
            });
            if (
              oldStickyMessage?.deletable &&
              channelPermissions.has(PermissionsBitField.Flags.ManageMessages)
            ) {
              await oldStickyMessage.delete();
            }
          } catch (error) {
            const err = error as unknown;
            const code = getErrorCode(err);
            if (code !== 10008) {
              console.warn(
                "welcomeMessage listener: Error deleting old sticky message:",
                err instanceof Error ? err.message : String(err),
              );
            }
          }
        }

        const stickyEmbed = new EmbedBuilder()
          .setColor(Colors.green)
          .setTitle("自己紹介へようこそ！")
          .setDescription(
            `以下のテンプレートを使用して自己紹介をお願いします：\n\`\`\`\n${CORRECT_TEMPLATE_STRING}\n\`\`\``,
          )
          .setFooter({
            text: "このメッセージは新しい自己紹介が投稿されると更新されます。",
          });

        if (channelPermissions.has(PermissionsBitField.Flags.SendMessages)) {
          const newStickyMessage = await channel.send({
            embeds: [stickyEmbed],
          });
          await setStickyMessageId(newStickyMessage.id);
        }
      } catch (error) {
        const err = error as unknown;
        console.error(
          "welcomeMessage listener: Error handling sticky message for correctly formatted welcome:",
          err instanceof Error ? err.message : String(err),
        );
      }
    } else {
      try {
        let attempts = userSubmissionAttempts.get(author.id);
        if (!attempts) {
          attempts = { timestamps: [], spamNotifiedAt: null };
          userSubmissionAttempts.set(author.id, attempts);
        }

        attempts.timestamps = attempts.timestamps.filter(
          (ts: number) => now - ts < SPAM_TIMEFRAME_MS,
        );
        attempts.timestamps.push(now);

        let isCurrentlySpamming =
          attempts.timestamps.length > SPAM_THRESHOLD_COUNT;

        if (
          attempts.spamNotifiedAt &&
          now - attempts.spamNotifiedAt < SPAM_COOLDOWN_MS
        ) {
          isCurrentlySpamming = true;
        } else if (
          attempts.spamNotifiedAt &&
          now - attempts.spamNotifiedAt >= SPAM_COOLDOWN_MS
        ) {
          attempts.spamNotifiedAt = null;
          if (attempts.timestamps.length <= SPAM_THRESHOLD_COUNT) {
            isCurrentlySpamming = false;
          }
        }

        if (
          message.deletable &&
          channelPermissions.has(PermissionsBitField.Flags.ManageMessages)
        ) {
          await message.delete();
        } else if (
          message.deletable &&
          !channelPermissions.has(PermissionsBitField.Flags.ManageMessages)
        ) {
          console.warn(
            `welcomeMessage listener: Bot missing 'Manage Messages' permission in ${channel.name}. Cannot delete incorrectly formatted message.`,
          );
        }

        if (!isCurrentlySpamming) {
          const error = validationResult.error;
          let deletedMessageFieldValue: string = "";
          let errorReasonFieldValue: string = "";

          if (error.type === "INVALID_LINE") {
            const pointer = createAlignmentPointer(
              error.lineContent,
              error.charIndex,
            );
            const lineToShow = error.lineContent.substring(0, 950);
            deletedMessageFieldValue = `\`\`\`\n${lineToShow}\n${pointer}\n\`\`\``;

            errorReasonFieldValue = `The format on line ${
              error.lineNumber + 1
            } is incorrect. It should start with \`${
              error.expectedHeader
            }\`, but there's an error at the position marked with \`^\`.`;
          } else if (error.type === "MISSING_LINE") {
            const contentToShow = (error.problematicContent ?? "").substring(
              0,
              950,
            );
            deletedMessageFieldValue = `\`\`\`\n${contentToShow}${
              contentToShow.length > 0 ? "\n" : ""
            }<-- The line for "${
              error.expectedHeader
            }" is missing here.\n\`\`\``;

            errorReasonFieldValue = `You seem to be missing the line for \`${error.expectedHeader}\`.\nPlease include all headers from the template, in the correct order.`;
          }

          const feedbackEmbed = new EmbedBuilder()
            .setColor(Colors.red)
            .setTitle("自己紹介の形式エラー")
            .setDescription(
              `投稿していただいた自己紹介は、形式が正しくなかったため削除されました。以下の正しいテンプレートをご利用の上、もう一度投稿してください。`,
            )
            .addFields(
              {
                name: "エラーの理由 / Reason for Error",
                value: errorReasonFieldValue || "",
              },
              {
                name: "正しいテンプレート / Correct Template",
                value: `\`\`\`\n${CORRECT_TEMPLATE_STRING}\n\`\`\``,
              },
              {
                name: "削除されたメッセージ / Deleted Message",
                value: deletedMessageFieldValue || "",
              },
            )
            .setTimestamp();

          if (channelPermissions.has(PermissionsBitField.Flags.SendMessages)) {
            await channel.send({
              content: author.toString(),
              embeds: [feedbackEmbed],
            });
          }
        } else {
          if (!attempts.spamNotifiedAt) {
            attempts.spamNotifiedAt = now;
            try {
              const spamDmEmbed = new EmbedBuilder()
                .setColor(Colors.yellow)
                .setTitle("形式エラーのメッセージ送信頻度について")
                .setDescription(
                  `自己紹介チャンネルで、形式が正しくないメッセージを短時間に複数回送信されたため、一時的にチャンネルでのフィードバックを停止します。\n\n正しいテンプレートをご確認の上、しばらく時間をおいてから再度お試しください。\n（この通知から${Math.floor(
                    SPAM_COOLDOWN_MS / 60000,
                  )}分間はチャンネルでのフィードバックが抑制されます）`,
                )
                .addFields({
                  name: "正しいテンプレート",
                  value: `\`\`\`\n${CORRECT_TEMPLATE_STRING}\n\`\`\``,
                })
                .setTimestamp();
              await author.send({ embeds: [spamDmEmbed] });
            } catch (dmError) {
              const err = dmError as unknown;
              console.warn(
                `welcomeMessage listener: Failed to DM user ${author.tag} about spamming:`,
                err instanceof Error ? err.message : String(err),
              );
            }
          }
        }
      } catch (error) {
        const err = error as unknown;
        console.error(
          "welcomeMessage listener: Error handling incorrectly formatted welcome message:",
          err instanceof Error ? err.message : String(err),
        );
      }
    }
  },
  {
    ignoreBots: false,
    channels: ["welcome"],
  },
);

```

---
### File: `src/listeners/message/stats/messageStatTracker.ts`
---

```ts
import { sql } from "drizzle-orm";
import { config } from "../../../config/env.js";
import { db } from "../../../db/index.js";
import {
  channels,
  dailyChannelStats,
  dailyUserStats,
  hourlyActivity,
  hourlyUserActivity,
  users,
} from "../../../db/schema.js";
import { createListener } from "../../../utils/builders/listenerBuilder.js";

export default createListener(
  "messageStatTracker",
  "messageCreate",
  async (message) => {
    if (!message.inGuild()) return;

    if (message.guild.id === config.ids.testGuild) {
      return;
    }

    if (message.channel.id === config.channels.welcome) {
      return;
    }

    const userId = message.author.id;
    const username = message.author.username;
    const channelId = message.channel.id;
    const channelName = message.channel.name;
    const today = new Date().toISOString().slice(0, 10);
    const hour = message.createdAt.getUTCHours();

    try {
      await db
        .insert(users)
        .values({ id: userId, username })
        .onConflictDoUpdate({ target: users.id, set: { username } });

      await db
        .insert(channels)
        .values({ id: channelId, name: channelName, type: "text" })
        .onConflictDoUpdate({
          target: channels.id,
          set: { name: channelName, type: "text" },
        });

      await db
        .insert(dailyUserStats)
        .values({ userId, date: today, messages: 1 })
        .onConflictDoUpdate({
          target: [dailyUserStats.userId, dailyUserStats.date],
          set: {
            messages: sql`${dailyUserStats.messages} + 1`,
          },
        });

      await db
        .insert(dailyChannelStats)
        .values({ channelId, date: today, messages: 1 })
        .onConflictDoUpdate({
          target: [dailyChannelStats.channelId, dailyChannelStats.date],
          set: {
            messages: sql`${dailyChannelStats.messages} + 1`,
          },
        });

      await db
        .insert(hourlyActivity)
        .values({ date: today, hour, messages: 1 })
        .onConflictDoUpdate({
          target: [hourlyActivity.date, hourlyActivity.hour],
          set: {
            messages: sql`${hourlyActivity.messages} + 1`,
          },
        });

      await db
        .insert(hourlyUserActivity)
        .values({ date: today, hour, userId })
        .onConflictDoNothing();
    } catch (error) {
      console.error("Error logging message stats:", error);
    }
  },
  {
    ignoreChannels: ["welcome"],
  },
);

```

---
### File: `src/interactions/buttons/ReplyButton.ts`
---

```ts
import {
  ActionRowBuilder,
  type ButtonInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import type { InteractionModule } from "../../handlers/interactionHandler.js";

export default {
  customId: "reply_button",
  async execute(interaction: ButtonInteraction) {
    const confessionId = interaction.customId.split("_")[2];

    const modal = new ModalBuilder()
      .setCustomId(`reply_modal_${confessionId}`)
      .setTitle("返信を投稿 / Post a Reply");

    const replyInput = new TextInputBuilder()
      .setCustomId("reply_input")
      .setLabel("返信メッセージ。The reply message.")
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder(
        "ここに返信を入力してください。\nWrite the reply message you want to send.",
      );

    const actionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
      replyInput,
    );
    modal.addComponents(actionRow);

    await interaction.showModal(modal);
  },
} as InteractionModule;

```

---
### File: `src/interactions/modals/ConfessModal.ts`
---

```ts
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  MessageFlags,
  type ModalSubmitInteraction,
  type TextChannel,
} from "discord.js";
import type { InteractionModule } from "../../handlers/interactionHandler.js";
import {
  generateAnonymousId,
  getRandomColor,
} from "../../utils/helpers/confessionHelper.js";
import {
  getNextConfessionId,
  logConfession,
} from "../../utils/managers/confessionManager.js";

export default {
  customId: "confess_modal",
  async execute(interaction: ModalSubmitInteraction) {
    await interaction.deferUpdate();
    const confessionMessage =
      interaction.fields.getTextInputValue("confession_input");
    const anonymousId = generateAnonymousId();
    const confessionId = await getNextConfessionId();
    const randomColor = getRandomColor();

    const replyButton = new ButtonBuilder()
      .setCustomId(`reply_button_${confessionId}`)
      .setLabel("返信 / Reply")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      replyButton,
    );

    const confessionEmbed = new EmbedBuilder()
      .setTitle(`${anonymousId} (#${confessionId})`)
      .setColor(randomColor)
      .setDescription(confessionMessage)
      .setFooter({
        text: "投稿するか返信したい場合は、/confess または /reply を使用してください。",
      });

    try {
      if (!interaction.channel) {
        await interaction.followUp({
          content:
            "チャンネルが見つかりませんでした。\nCould not find the channel to post your confession.",
          flags: MessageFlags.Ephemeral,
        });
        return;
      }
      const sentMessage = await (interaction.channel as TextChannel).send({
        embeds: [confessionEmbed],
        components: [row],
      });
      await logConfession(confessionId, sentMessage.id);
      console.log(
        `Logged confession #${confessionId} with message ID ${sentMessage.id} by user ${interaction.user.tag}`,
      );
    } catch (error) {
      console.error("Error posting confession message:", error);
      await interaction.followUp({
        content:
          "メッセージの投稿中にエラーが発生しました。\nAn error occurred while posting your message.",
        flags: MessageFlags.Ephemeral,
      });
    }
  },
} as InteractionModule;

```

---
### File: `src/interactions/modals/ReplyModal.ts`
---

```ts
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  DiscordAPIError,
  EmbedBuilder,
  MessageFlags,
  type ModalSubmitInteraction,
  type TextChannel,
} from "discord.js";
import type { InteractionModule } from "../../handlers/interactionHandler.js";
import {
  generateAnonymousId,
  getRandomColor,
} from "../../utils/helpers/confessionHelper.js";
import {
  getConfessionMessageId,
  getNextConfessionId,
  logConfession,
} from "../../utils/managers/confessionManager.js";

export default {
  customId: "reply_modal",
  async execute(interaction: ModalSubmitInteraction) {
    const targetIdStr = interaction.customId.split("_")[2];
    const targetId = parseInt(targetIdStr, 10);
    const replyMessage = interaction.fields.getTextInputValue("reply_input");

    const originalMessageId = await getConfessionMessageId(targetId);

    if (!originalMessageId) {
      console.warn(`Confession #${targetId} not found in messageMap.`);
      return interaction.reply({
        content: `投稿 #${targetId} が見つかりませんでした。番号が正しいか確認してください。\nPost #${targetId} could not be found. Please check the number.`,
        flags: MessageFlags.Ephemeral,
      });
    }

    try {
      const originalMessage =
        await interaction.channel?.messages.fetch(originalMessageId);
      const originalEmbed = originalMessage?.embeds[0];
      console.log(`Fetched original message for reply to #${targetId}.`);

      const titleMatch = originalEmbed?.title?.match(/(.+) \(#\d+\)/);
      const originalAuthorName = titleMatch
        ? titleMatch[1].trim()
        : originalEmbed?.title;
      const originalDescription = originalEmbed?.description || "";

      let contentToQuote = "";
      if (originalDescription.includes("\n> ")) {
        contentToQuote = originalDescription.split("\n\n").pop() ?? "";
      } else {
        contentToQuote = originalDescription;
      }

      const messageUrl = `https://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${originalMessageId}`;
      const quotedText = `> **${originalAuthorName}** **([#${targetId}](${messageUrl}))**\n> ${contentToQuote.split("\n").join("\n> ")}\n\n`;

      const newAnonymousId = generateAnonymousId();
      const newReplyId = await getNextConfessionId();
      const randomColor = getRandomColor();

      const replyButton = new ButtonBuilder()
        .setCustomId(`reply_button_${newReplyId}`)
        .setLabel("返信 / Reply")
        .setStyle(ButtonStyle.Primary);

      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        replyButton,
      );

      const replyEmbed = new EmbedBuilder()
        .setTitle(`${newAnonymousId} (#${newReplyId})`)
        .setColor(randomColor)
        .setDescription(`${quotedText}${replyMessage}`)
        .setFooter({
          text: "投稿するか返信したい場合は、/confess または /reply を使用してください。",
        });

      const sentMessage = await (interaction.channel as TextChannel).send({
        embeds: [replyEmbed],
        components: [row],
      });
      await logConfession(newReplyId, sentMessage.id);
      console.log(
        `Logged reply #${newReplyId} with message ID ${sentMessage.id} by user ${interaction.user.tag}`,
      );
      await interaction.deferUpdate();
    } catch (error) {
      console.error(
        `Error processing reply to confession #${targetId}:`,
        error,
      );
      if (error instanceof DiscordAPIError && error.code === 10008) {
        return interaction.reply({
          content: `投稿 #${targetId} は削除されたようです。\nIt seems post #${targetId} has been deleted.`,
          flags: MessageFlags.Ephemeral,
        });
      }
      return interaction.reply({
        content:
          "返信の処理中にエラーが発生しました。\nAn error occurred while processing your reply.",
        flags: MessageFlags.Ephemeral,
      });
    }
  },
} as InteractionModule;

```

---
### File: `src/interactions/components/listunverified/index.ts`
---

```ts
import {
  type ButtonInteraction,
  type Guild,
  type GuildMember,
  MessageFlags,
  type StringSelectMenuInteraction,
} from "discord.js";
import { generateFakeMembers } from "../../../commands/slash/management/listunverified/index.js";
import { config } from "../../../config/env.js";
import type { InteractionModule } from "../../../handlers/interactionHandler.js";
import {
  generatePage,
  type UnverifiedMember,
} from "../../../utils/helpers/listUnverifiedHelper.js";

type SortCriteria = "username" | "joinedAt" | "createdAt";
type SortOrder = "asc" | "desc";

const sortFunctions: Record<
  SortCriteria,
  (a: UnverifiedMember, b: UnverifiedMember) => number
> = {
  username: (a, b) => a.user.username.localeCompare(b.user.username),
  joinedAt: (a, b) => (a.joinedTimestamp ?? 0) - (b.joinedTimestamp ?? 0),
  createdAt: (a, b) => a.user.createdTimestamp - b.user.createdTimestamp,
};

const getUnverifiedMembers = async (guild: Guild): Promise<GuildMember[]> => {
  const verifiedRoleId = config.roles.verified;
  if (!verifiedRoleId) return [];
  const role = guild.roles.cache.get(verifiedRoleId);
  if (!role) return [];
  await guild.members.fetch();
  return Array.from(
    guild.members.cache
      .filter((member) => !member.user.bot && !member.roles.cache.has(role.id))
      .values(),
  );
};

export default {
  customId: "listunverified",
  async execute(interaction: ButtonInteraction | StringSelectMenuInteraction) {
    if (
      !interaction.message.interactionMetadata ||
      interaction.user.id !== interaction.message.interactionMetadata.user.id
    ) {
      return await interaction.reply({
        content:
          "あなたはこのインタラクションの元の使用者ではありません。\nYou are not the original user of this interaction.",
        flags: MessageFlags.Ephemeral,
      });
    }

    await interaction.deferUpdate();

    let currentPage: number = 0,
      sortCriteria: SortCriteria = "username",
      sortOrder: SortOrder = "asc",
      action: string,
      isTestMode: boolean = false,
      testModeFlag: string;
    let memberArray: UnverifiedMember[];

    if (interaction.isButton()) {
      let currentPageStr: string;
      [, action, currentPageStr, sortCriteria, sortOrder, testModeFlag] =
        interaction.customId.split("_") as [
          string,
          string,
          string,
          SortCriteria,
          SortOrder,
          string,
        ];
      currentPage = parseInt(currentPageStr, 10);
      isTestMode = testModeFlag === "1";

      if (action === "prev" && currentPage > 0) currentPage--;
      else if (action === "next") currentPage++;
      else if (action === "sort")
        sortOrder = sortOrder === "asc" ? "desc" : "asc";
    } else if (interaction.isStringSelectMenu()) {
      let currentPageStr: string;
      [, action, currentPageStr, sortOrder, testModeFlag] =
        interaction.customId.split("_") as [
          string,
          string,
          string,
          SortOrder,
          string,
        ];
      currentPage = parseInt(currentPageStr, 10);
      sortCriteria = interaction.values[0] as SortCriteria;
      isTestMode = testModeFlag === "1";
    }

    if (isTestMode) {
      memberArray = generateFakeMembers();
    } else {
      if (!interaction.guild) {
        await interaction.followUp({
          content:
            "ギルド情報が取得できませんでした。\nGuild information could not be retrieved.",
          flags: MessageFlags.Ephemeral,
        });
        return;
      }
      memberArray = await getUnverifiedMembers(interaction.guild);
    }

    memberArray.sort((a, b) => {
      const comparison = sortFunctions[sortCriteria](a, b);
      return sortOrder === "asc" ? comparison : -comparison;
    });

    const updatedPage = generatePage(
      memberArray,
      sortCriteria,
      sortOrder,
      currentPage,
      isTestMode,
    );
    if ("flags" in updatedPage) {
      const { flags: _, ...rest } = updatedPage;
      await interaction.editReply(rest);
    } else {
      const { _flags: _, ...rest } = updatedPage as Record<string, unknown>;
      await interaction.editReply(rest);
    }
  },
} as InteractionModule;

```

---
### File: `src/interactions/components/top/index.ts`
---

```ts
import type {
  ButtonInteraction,
  StringSelectMenuInteraction,
} from "discord.js";
import type { InteractionModule } from "../../../handlers/interactionHandler.js";
import {
  generateComponentsForTop,
  generateTopReply,
  type TopCategory,
  type TopTimeframe,
} from "../../../utils/helpers/topHelper.js";

const processTopInteraction = async (
  interaction: ButtonInteraction | StringSelectMenuInteraction,
) => {
  if (!interaction.inGuild() || !interaction.guild) return;

  const parts = interaction.customId.split("-");
  const action = parts[1];
  let category: TopCategory,
    timeframe: TopTimeframe,
    showTimeframeButtons: boolean,
    isTestMode: boolean;

  if (action === "timeframe") {
    const subAction = parts[2] as "show" | "back";
    category = parts[3] as TopCategory;
    timeframe = parts[4] as TopTimeframe;
    isTestMode = parts[5] === "1";
    showTimeframeButtons = subAction === "show";

    const newComponents = generateComponentsForTop({
      category,
      timeframe,
      showTimeframeButtons,
      isTestMode,
    });
    await interaction.editReply({ components: newComponents });
    return;
  }

  if (action === "refresh") {
    category = parts[2] as TopCategory;
    timeframe = parts[3] as TopTimeframe;
    isTestMode = parts[4] === "1";
    showTimeframeButtons = false;
  } else if (interaction.isStringSelectMenu()) {
    category = interaction.values[0] as TopCategory;
    timeframe = parts[2] as TopTimeframe;
    showTimeframeButtons = parts[3] === "1";
    isTestMode = parts[4] === "1";
  } else {
    category = parts[2] as TopCategory;
    timeframe = parts[3] as TopTimeframe;
    showTimeframeButtons = action === "select";
    isTestMode = parts[4] === "1";
  }

  const reply = await generateTopReply({
    guild: interaction.guild,
    client: interaction.client,
    category,
    timeframe,
    showTimeframeButtons,
    isTestMode,
  });

  const { flags: _, ...rest } = reply;
  await interaction.editReply(rest);
};

export default {
  customId: "top-",
  async execute(interaction: ButtonInteraction | StringSelectMenuInteraction) {
    await interaction.deferUpdate();

    processTopInteraction(interaction).catch((err) => {
      console.error("Failed to process /top interaction:", err);
      interaction
        .followUp({
          content: "An error occurred while processing your request.",
          ephemeral: true,
        })
        .catch(console.error);
    });
  },
} as InteractionModule;

```

---
### File: `src/interactions/components/activity/index.ts`
---

```ts
import type {
  ButtonInteraction,
  StringSelectMenuInteraction,
} from "discord.js";
import type { InteractionModule } from "../../../handlers/interactionHandler.js";
import {
  type ActivityCategory,
  generateActivityReply,
} from "../../../utils/helpers/activityHelper.js";
import type { TopTimeframe } from "../../../utils/helpers/topHelper.js";

const processActivityInteraction = async (
  interaction: ButtonInteraction | StringSelectMenuInteraction,
) => {
  if (!interaction.inGuild() || !interaction.guild) return;

  const parts = interaction.customId.split("-");
  const action = parts[1];
  let category: ActivityCategory,
    timeframe: TopTimeframe,
    showTimeframeButtons: boolean,
    isTestMode: boolean;

  if (action === "timeframe") {
    const subAction = parts[2] as "show" | "back";
    category = parts[3] as ActivityCategory;
    timeframe = parts[4] as TopTimeframe;
    isTestMode = parts[5] === "1";
    showTimeframeButtons = subAction === "show";
  } else if (action === "refresh") {
    category = parts[2] as ActivityCategory;
    timeframe = parts[3] as TopTimeframe;
    isTestMode = parts[4] === "1";
    showTimeframeButtons = false;
  } else if (interaction.isStringSelectMenu()) {
    category = interaction.values[0] as ActivityCategory;
    timeframe = parts[2] as TopTimeframe;
    showTimeframeButtons = parts[3] === "1";
    isTestMode = parts[4] === "1";
  } else {
    category = parts[2] as ActivityCategory;
    timeframe = parts[3] as TopTimeframe;
    isTestMode = parts[4] === "1";
    showTimeframeButtons = true;
  }

  const reply = await generateActivityReply({
    guild: interaction.guild,
    category,
    timeframe,
    showTimeframeButtons,
    isTestMode,
  });

  const { flags: _, ...rest } = reply;
  await interaction.editReply(rest);
};

export default {
  customId: "activity-",
  async execute(interaction: ButtonInteraction | StringSelectMenuInteraction) {
    await interaction.deferUpdate();

    processActivityInteraction(interaction).catch((err) => {
      console.error("Failed to process /activity interaction:", err);
      interaction
        .followUp({
          content: "An error occurred while processing your request.",
          ephemeral: true,
        })
        .catch(console.error);
    });
  },
} as InteractionModule;

```

---
### File: `src/commands/slash/utility/uptime/index.ts`
---

```ts
import { EmbedBuilder, MessageFlags } from "discord.js";
import { Colors } from "../../../../constants/Colors.js";
import { createCommand } from "../../../../utils/builders/commandBuilder.js";

/**
 * Formats milliseconds into a human-readable string (e.g., "1日 3時間 5分 22秒").
 * @param {number} milliseconds The total milliseconds of uptime.
 * @returns {string} A formatted uptime string.
 */
const formatUptime = (milliseconds: number): string => {
  let totalSeconds = Math.floor(milliseconds / 1000);
  const days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const parts = [];
  if (days > 0) {
    parts.push(`${days}日`);
  }
  if (hours > 0) {
    parts.push(`${hours}時間`);
  }
  if (minutes > 0) {
    parts.push(`${minutes}分`);
  }
  parts.push(`${seconds}秒`);

  return parts.join(" ");
};

export default createCommand(
  "uptime",
  "BOTの稼働時間を表示します。Displays the bot's uptime.",
  async (interaction, client): Promise<void> => {
    if (!client.readyAt) {
      await interaction.reply({
        content: "Bot is not ready yet. Please try again in a moment.",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    const uptimeMilliseconds = Date.now() - client.readyAt.getTime();
    const uptimeString = formatUptime(uptimeMilliseconds);
    const startTime = Math.floor(client.readyAt.getTime() / 1000);
    const startTimeString = `<t:${startTime}:F>`;

    const embed = new EmbedBuilder()
      .setTitle("BOT Uptime")
      .setColor(Colors.green)
      .addFields(
        {
          name: "稼働時間 / Uptime",
          value: uptimeString,
          inline: false,
        },
        {
          name: "起動日時 / Started At",
          value: startTimeString,
          inline: false,
        },
      )
      .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
);

```

---
### File: `src/commands/slash/utility/vc/index.ts`
---

```ts
import {
  type Client,
  Collection,
  EmbedBuilder,
  type GuildMember,
  MessageFlags,
  type VoiceChannel,
  type VoiceState,
} from "discord.js";
import { config } from "../../../../config/env.js";
import { Colors } from "../../../../constants/Colors.js";
import type { HandlerOptions } from "../../../../handlers/commandHandler.js";
import {
  createCommand,
  type GuildCommandInteraction,
} from "../../../../utils/builders/commandBuilder.js";

const isEmoji = (str: string): boolean => {
  if (str.length > 2) {
    return false;
  }
  const emojiRegex = /\p{Emoji}/u;
  return emojiRegex.test(str);
};

const sendVoiceChannelCreationLog = async (
  interaction: GuildCommandInteraction,
  client: Client<boolean>,
  channel: VoiceChannel,
  emoji: string | null,
  jpName: string | null,
  enName: string | null,
  limit: number | null,
) => {
  const logChannelId = config.channels.voiceLog;

  const logChannel = (await client.channels
    .fetch(logChannelId)
    .catch(() => null)) as VoiceChannel;
  if (!logChannel || !logChannel.isTextBased()) return;

  const member = interaction.member;
  if (!member) return;

  const embed = new EmbedBuilder()
    .setAuthor({
      name: member.user.tag,
      iconURL: member.user.displayAvatarURL(),
    })
    .setTitle("一時的なボイスチャンネル作成")
    .setDescription(
      `${member} が一時的なボイスチャンネル <#${channel.id}> を作成しました。`,
    )
    .setColor(Colors.green)
    .addFields(
      {
        name: "チャンネル名",
        value: `${emoji}${jpName} | ${enName}`,
        inline: false,
      },
      {
        name: "ユーザー制限",
        value: limit === 0 ? "無制限" : `${limit}人`,
        inline: true,
      },
      { name: "自動削除", value: "4分間の非アクティブ状態後", inline: true },
    )
    .setFooter({
      text: `ID: ${member.user.id}`,
    })
    .setTimestamp();

  await logChannel.send({ embeds: [embed] });
};

const sendVoiceChannelDeletionLog = async (
  _: GuildCommandInteraction,
  client: Client<boolean>,
  channel: VoiceChannel,
) => {
  const logChannelId = config.channels.voiceLog;

  const logChannel = (await client.channels
    .fetch(logChannelId)
    .catch(() => null)) as VoiceChannel;
  if (!logChannel || !logChannel.isTextBased()) return;

  const embed = new EmbedBuilder()
    .setTitle("一時的なボイスチャンネル削除")
    .setDescription(
      `一時的なボイスチャンネル **${channel.name}** が非アクティブのため削除されました。`,
    )
    .setColor(Colors.red)
    .setTimestamp();

  await logChannel.send({ embeds: [embed] });
};

const toTitleCase = (str: string | null) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default createCommand(
  "vc",
  "一時的なボイスチャンネルを作成する。Create a temporary voice channel.",
  async (
    interaction: GuildCommandInteraction,
    client: Client<boolean>,
    _options: HandlerOptions,
  ): Promise<void> => {
    try {
      const emoji = interaction.options.getString("emoji");
      const jpName = interaction.options.getString("jpname");
      const enName = interaction.options.getString("enname");
      const limit = interaction.options.getInteger("limit");

      const formattedEnName = toTitleCase(enName);

      if (!emoji || !isEmoji(emoji)) {
        await interaction.reply({
          content: [
            "有効な絵文字を入力してください。カスタム絵文字や一部の新しい絵文字は対応されていません。",
            "Please provide a valid emoji. Custom and some new emojis are not supported.",
          ].join("\n"),
          flags: MessageFlags.Ephemeral,
        });
        return;
      }

      await interaction.deferReply();

      const channel = await interaction.guild.channels.create({
        name: `${emoji}${jpName} | ${formattedEnName}`,
        type: 2,
        userLimit: limit ?? undefined,
        parent: config.channels.voiceCategory,
      });

      await sendVoiceChannelCreationLog(
        interaction,
        client,
        channel.isVoiceBased()
          ? channel
          : ((await interaction.guild.channels.fetch(
              channel.id,
            )) as VoiceChannel),
        emoji,
        jpName,
        formattedEnName,
        limit,
      );

      const checkInactivity = async () => {
        const vc = await interaction.guild.channels
          .fetch(channel.id)
          .catch(() => null);
        if (!vc) return;

        const members =
          vc.members &&
          typeof (vc.members as Collection<string, GuildMember>).size ===
            "number"
            ? (vc.members as { size: number })
            : null;

        if (members && members.size === 0) {
          setTimeout(
            async () => {
              const currentVC = await interaction.guild.channels
                .fetch(channel.id)
                .catch(() => null);
              if (
                currentVC &&
                currentVC.type === 2 &&
                "members" in currentVC &&
                currentVC.members instanceof Collection &&
                currentVC.members.size === 0
              ) {
                await currentVC.delete().catch(console.error);
                await sendVoiceChannelDeletionLog(
                  interaction,
                  client,
                  currentVC,
                );
                client.removeListener("voiceStateUpdate", voiceStateListener);
              }
            },
            1000 * 60 * 4,
          );
        }
      };

      checkInactivity();

      const voiceStateListener = (
        oldState: VoiceState,
        newState: VoiceState,
      ) => {
        if (
          oldState.channelId === channel.id ||
          newState.channelId === channel.id
        ) {
          checkInactivity();
        }
      };

      client.on("voiceStateUpdate", voiceStateListener);

      const jpSuccessMessage = `(${
        limit === 0 ? "無制限" : `${limit}人制限`
      }) 一時的なボイスチャンネル ${channel} を作成しました！`;

      const enSuccessMessage = `(${
        limit === 0 ? "No limit" : `Max ${limit} people`
      }) Created temporary voice channel ${channel}!`;

      await interaction.editReply({
        content: [
          jpSuccessMessage,
          "4分間の非アクティブ状態の後に削除されます。",
          enSuccessMessage,
          "It will be deleted after 4 minutes of inactivity.",
        ].join("\n"),
      });
    } catch (error) {
      console.error(error);
      const errorMessage = [
        "ボイスチャンネルの作成中にエラーが発生しました。",
        "There was an error while creating the voice channel.",
      ].join("\n");

      if (interaction.replied || interaction.deferred) {
        await interaction.editReply({ content: errorMessage });
      } else {
        await interaction.reply({
          content: errorMessage,
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  },
  {
    setup: (builder) => {
      builder
        .addStringOption((option) =>
          option
            .setName("emoji")
            .setDescription("チャンネル名の絵文字。Emoji for the channel name.")
            .setRequired(true),
        )
        .addStringOption((option) =>
          option
            .setName("jpname")
            .setDescription(
              "ボイスチャンネルの名前 (日本語)。Name of the voice channel (Japanese).",
            )
            .setRequired(true),
        )
        .addStringOption((option) =>
          option
            .setName("enname")
            .setDescription(
              "ボイスチャンネルの名前 (英語)。Name of the voice channel (English).",
            )
            .setRequired(true),
        )
        .addIntegerOption((option) =>
          option
            .setName("limit")
            .setDescription(
              "ユーザー制限 (0は無制限)。User limit (0 for unlimited).",
            )
            .setRequired(true)
            .setMinValue(0)
            .setMaxValue(99),
        );
      return builder;
    },
  },
);

```

---
### File: `src/commands/slash/stats/top/index.ts`
---

```ts
import {
  AttachmentBuilder,
  type InteractionEditReplyOptions,
} from "discord.js";
import { createCommand } from "../../../../utils/builders/commandBuilder.js";
import {
  generateComponentsForTop,
  generateInitialTopReply,
  type TopCategory,
  type TopTimeframe,
  timeframeLabels,
} from "../../../../utils/helpers/topHelper.js";
import {
  generateOverviewImage,
  type OverviewData,
} from "../../../../utils/services/imageGenerator.js";
import { getMockTopData } from "./top.mock.js";

export default createCommand(
  "top",
  "サーバーランキングを表示する。Displays the server leaderboards.",
  async (interaction) => {
    await interaction.deferReply();

    const isTestMode = interaction.options.getBoolean("test") ?? false;

    let reply: InteractionEditReplyOptions;

    if (isTestMode) {
      const category: TopCategory = "overview";
      const timeframe: TopTimeframe = "7";
      const showTimeframeButtons = false;

      const mockOverviewData = getMockTopData(category, timeframe);
      const serverIconUrl = interaction.guild.iconURL({
        extension: "png",
        size: 128,
      });
      const timeframeLabel = timeframeLabels[timeframe];

      // Cast mockOverviewData to the expected type
      const imageBuffer = await generateOverviewImage(
        mockOverviewData as OverviewData,
        serverIconUrl,
        interaction.guild.name,
        timeframeLabel,
      );
      const attachment = new AttachmentBuilder(imageBuffer, {
        name: "leaderboard.png",
      });
      const components = generateComponentsForTop({
        category,
        timeframe,
        showTimeframeButtons,
        isTestMode,
      });
      reply = { files: [attachment], components };
    } else {
      const initialReply = await generateInitialTopReply(
        interaction.guild,
        interaction.client,
      );
      const { flags: _, ...rest } = initialReply;
      reply = rest;
    }

    await interaction.editReply(reply);
  },
  {
    setup: (builder) => {
      builder.addBooleanOption((option) =>
        option
          .setName("test")
          .setDescription(
            "テストモードで実行し、偽のデータを生成します。(Run in test mode with fake data.)",
          )
          .setRequired(false),
      );
      return builder;
    },
  },
);

```

---
### File: `src/commands/slash/stats/top/top.mock.ts`
---

```ts
import type {
  TopCategory,
  TopTimeframe,
} from "../../../../utils/helpers/topHelper.js";
import type { LeaderboardItem } from "../../../../utils/services/imageGenerator.js";

// All Time

const allTimeUserMessages: LeaderboardItem[] = [
  { name: "MockUser Alpha (alpha)", value: 1500 },
  { name: "MockUser Beta (beta)", value: 1200 },
  { name: "MockUser Gamma (gamma)", value: 950 },
  { name: "MockUser Delta (delta)", value: 700 },
  { name: "MockUser Epsilon (epsilon)", value: 500 },
  { name: "MockUser Zeta (zeta)", value: 300 },
  { name: "MockUser Eta (eta)", value: 150 },
  { name: "MockUser Theta (theta)", value: 100 },
  { name: "MockUser Iota (iota)", value: 50 },
  { name: "MockUser Kappa (kappa)", value: 25 },
];

const allTimeChannelMessages: LeaderboardItem[] = [
  { name: "💬総合｜general", value: 6000, type: "text" },
  { name: "😂ミーム｜memes", value: 4500, type: "text" },
  { name: "🗨️雑談｜off-topic", value: 3000, type: "text" },
  { name: "🎨アート｜art", value: 2500, type: "text" },
  { name: "🎮ゲーム｜gaming", value: 2200, type: "text" },
  { name: "📚勉強｜study", value: 1800, type: "text" },
  { name: "🎵音楽｜music", value: 1500, type: "text" },
  { name: "📢告知｜announcements", value: 1200, type: "text" },
  { name: "📷写真｜photos", value: 800, type: "text" },
  { name: "👊バンプ｜bump", value: 600, type: "text" },
];

const allTimeUserVC: LeaderboardItem[] = [
  { name: "MockVoice Alpha (alpha)", value: 90.5 },
  { name: "MockVoice Beta (beta)", value: 75.2 },
  { name: "MockVoice Gamma (gamma)", value: 50.1 },
  { name: "MockVoice Delta (delta)", value: 45.0 },
  { name: "MockVoice Epsilon (epsilon)", value: 38.8 },
  { name: "MockVoice Zeta (zeta)", value: 30.0 },
  { name: "MockVoice Eta (eta)", value: 25.5 },
  { name: "MockVoice Theta (theta)", value: 20.0 },
  { name: "MockVoice Iota (iota)", value: 12.5 },
  { name: "MockVoice Kappa (kappa)", value: 10.0 },
];

const allTimeChannelVC: LeaderboardItem[] = [
  { name: "🎧チル｜chill", value: 260.0, type: "voice" },
  { name: "🎮ゲーム｜gaming", value: 190.5, type: "voice" },
  { name: "📚勉強｜study", value: 100.0, type: "voice" },
  { name: "🎵音楽｜music", value: 85.0, type: "voice" },
  { name: "💬雑談｜chat", value: 70.0, type: "voice" },
  { name: "🖌️アート｜art", value: 65.0, type: "voice" },
  { name: "👊バンプ｜bump", value: 60.0, type: "voice" },
  { name: "📢告知｜announcements", value: 50.0, type: "voice" },
  { name: "📷写真｜photos", value: 40.0, type: "voice" },
  { name: "🎲遊び｜fun", value: 30.0, type: "voice" },
];

const allTimeUserBumps: LeaderboardItem[] = [
  { name: "MockBumper Alpha (alpha)", value: 60 },
  { name: "MockBumper Beta (beta)", value: 50 },
  { name: "MockBumper Gamma (gamma)", value: 35 },
  { name: "MockBumper Delta (delta)", value: 30 },
  { name: "MockBumper Epsilon (epsilon)", value: 25 },
  { name: "MockBumper Zeta (zeta)", value: 20 },
  { name: "MockBumper Eta (eta)", value: 18 },
  { name: "MockBumper Theta (theta)", value: 15 },
  { name: "MockBumper Iota (iota)", value: 10 },
  { name: "MockBumper Kappa (kappa)", value: 5 },
];

const allTimeUserStreamHours: LeaderboardItem[] = [
  { name: "MockStreamer Alpha (alpha)", value: 45.0 },
  { name: "MockStreamer Beta (beta)", value: 38.5 },
  { name: "MockStreamer Gamma (gamma)", value: 25.0 },
  { name: "MockStreamer Delta (delta)", value: 22.0 },
  { name: "MockStreamer Epsilon (epsilon)", value: 20.0 },
  { name: "MockStreamer Zeta (zeta)", value: 18.5 },
  { name: "MockStreamer Eta (eta)", value: 15.0 },
  { name: "MockStreamer Theta (theta)", value: 12.0 },
  { name: "MockStreamer Iota (iota)", value: 10.0 },
  { name: "MockStreamer Kappa (kappa)", value: 8.0 },
];

/**
 * Scales and slightly randomizes leaderboard data to simulate different timeframes.
 * @param data The base leaderboard data array.
 * @param factor The scaling factor (e.g., 0.5 for 50%).
 * @returns A new array with scaled values.
 */
const scaleData = (
  data: LeaderboardItem[],
  factor: number,
): LeaderboardItem[] => {
  return data
    .map((item) => ({
      ...item,
      // Scale value and add +/- 10% randomness so it's not negative
      value: Math.max(0, item.value * factor * (0.9 + Math.random() * 0.2)),
    }))
    .sort((a, b) => b.value - a.value); // Re-sort after scaling
};

// Generate data for different timeframes by scaling "all time" data
const dataFor30Days = {
  msg_users: scaleData(allTimeUserMessages, 0.4),
  vc_users: scaleData(allTimeUserVC, 0.5),
  stream_users: scaleData(allTimeUserStreamHours, 0.6),
  bump_users: scaleData(allTimeUserBumps, 0.3),
  msg_channels: scaleData(allTimeChannelMessages, 0.4),
  vc_channels: scaleData(allTimeChannelVC, 0.5),
};

const dataFor7Days = {
  msg_users: scaleData(dataFor30Days.msg_users, 0.35),
  vc_users: scaleData(dataFor30Days.vc_users, 0.4),
  stream_users: scaleData(dataFor30Days.stream_users, 0.5),
  bump_users: scaleData(dataFor30Days.bump_users, 0.3),
  msg_channels: scaleData(dataFor30Days.msg_channels, 0.35),
  vc_channels: scaleData(dataFor30Days.vc_channels, 0.4),
};

const dataFor1Day = {
  msg_users: scaleData(dataFor7Days.msg_users, 0.2),
  vc_users: scaleData(dataFor7Days.vc_users, 0.25),
  stream_users: scaleData(dataFor7Days.stream_users, 0.3),
  bump_users: scaleData(dataFor7Days.bump_users, 0.15),
  msg_channels: scaleData(dataFor7Days.msg_channels, 0.2),
  vc_channels: scaleData(dataFor7Days.vc_channels, 0.25),
};

// The main mock data object structured by timeframe
export const mockTopData = {
  "1": {
    ...dataFor1Day,
    overview: {
      messages: { users: dataFor1Day.msg_users.slice(0, 3) },
      bumps: { users: dataFor1Day.bump_users.slice(0, 3) },
      voice: { users: dataFor1Day.vc_users.slice(0, 3) },
      stream: { users: dataFor1Day.stream_users.slice(0, 3) },
    },
  },
  "7": {
    ...dataFor7Days,
    overview: {
      messages: { users: dataFor7Days.msg_users.slice(0, 3) },
      bumps: { users: dataFor7Days.bump_users.slice(0, 3) },
      voice: { users: dataFor7Days.vc_users.slice(0, 3) },
      stream: { users: dataFor7Days.stream_users.slice(0, 3) },
    },
  },
  "30": {
    ...dataFor30Days,
    overview: {
      messages: { users: dataFor30Days.msg_users.slice(0, 3) },
      bumps: { users: dataFor30Days.bump_users.slice(0, 3) },
      voice: { users: dataFor30Days.vc_users.slice(0, 3) },
      stream: { users: dataFor30Days.stream_users.slice(0, 3) },
    },
  },
  all: {
    msg_users: allTimeUserMessages,
    vc_users: allTimeUserVC,
    stream_users: allTimeUserStreamHours,
    bump_users: allTimeUserBumps,
    msg_channels: allTimeChannelMessages,
    vc_channels: allTimeChannelVC,
    overview: {
      messages: { users: allTimeUserMessages.slice(0, 3) },
      bumps: { users: allTimeUserBumps.slice(0, 3) },
      voice: { users: allTimeUserVC.slice(0, 3) },
      stream: { users: allTimeUserStreamHours.slice(0, 3) },
    },
  },
};

/**
 * Function to retrieve mock data based on category and timeframe.
 * @param category The category requested.
 * @param timeframe The timeframe requested ('1', '7', '30', 'all').
 * @returns Array of LeaderboardItem or an overview structure.
 */
export const getMockTopData = (
  category: TopCategory,
  timeframe: TopTimeframe,
) => {
  const timeframeData = mockTopData[timeframe] ?? mockTopData["7"]; // Default to 7 days if invalid
  return timeframeData[category] ?? [];
};

```

---
### File: `src/commands/slash/stats/activity/activity.mock.ts`
---

```ts
import type { TopTimeframe } from "../../../../utils/helpers/topHelper.js";

export interface VoiceActivityData {
  hourlyActivity: number[];
  totalDurationHours: number;
  averageParticipants: number;
  peakHour: number;
}

export interface MessageActivityData {
  hourlyActivity: number[];
  totalMessages: number;
  averageParticipants: number;
  mostActiveHour: number;
}

// Base data for a 7-day period
const baseVoiceActivity: VoiceActivityData = {
  hourlyActivity: [
    10, 5, 2, 1, 0, 0, 2, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 100, 120,
    150, 130, 90, 40,
  ],
  totalDurationHours: 120.5,
  averageParticipants: 5.2,
  peakHour: 20,
};

const baseMessageActivity: MessageActivityData = {
  hourlyActivity: [
    80, 90, 70, 50, 30, 20, 10, 20, 30, 40, 50, 60, 80, 100, 120, 130, 110, 100,
    140, 160, 180, 200, 150, 100,
  ],
  totalMessages: 50210,
  averageParticipants: 42,
  mostActiveHour: 21,
};

/**
 * Scales activity data for different timeframes.
 * @param data The base activity data.
 * @param factor The scaling factor.
 * @returns Scaled activity data.
 */
const scaleActivityData = <T extends VoiceActivityData | MessageActivityData>(
  data: T,
  factor: number,
): T => {
  const scaledHourly = data.hourlyActivity.map((v) =>
    Math.round(v * factor * (0.9 + Math.random() * 0.2)),
  );

  if ("totalMessages" in data) {
    return {
      ...data,
      hourlyActivity: scaledHourly,
      totalMessages: Math.round(data.totalMessages * factor),
      averageParticipants: Math.round(
        data.averageParticipants * (0.8 + Math.random() * 0.4),
      ),
    } as T;
  }

  return {
    ...data,
    hourlyActivity: scaledHourly,
    totalDurationHours: data.totalDurationHours * factor,
    averageParticipants: data.averageParticipants * (0.8 + Math.random() * 0.4),
  } as T;
};

// Generate data for different timeframes
const dataFor30Days = {
  message: scaleActivityData(baseMessageActivity, 4.3),
  voice: scaleActivityData(baseVoiceActivity, 4.3),
};

const dataFor7Days = {
  message: baseMessageActivity,
  voice: baseVoiceActivity,
};

const dataFor1Day = {
  message: scaleActivityData(baseMessageActivity, 1 / 7),
  voice: scaleActivityData(baseVoiceActivity, 1 / 7),
};

const dataForAllTime = {
  message: scaleActivityData(baseMessageActivity, 10),
  voice: scaleActivityData(baseVoiceActivity, 10),
};

export const mockActivityData = {
  "1": dataFor1Day,
  "7": dataFor7Days,
  "30": dataFor30Days,
  all: dataForAllTime,
};

/**
 * Retrieves mock data based on category and timeframe.
 * @param category The category ('message' or 'voice').
 * @param timeframe The timeframe ('1', '7', '30', 'all').
 */
export const getMockActivityData = (
  category: "message" | "voice",
  timeframe: TopTimeframe,
) => {
  const timeframeData = mockActivityData[timeframe] ?? mockActivityData["7"];
  return timeframeData[category];
};

```

---
### File: `src/commands/slash/stats/activity/index.ts`
---

```ts
import type { InteractionEditReplyOptions } from "discord.js";
import { createCommand } from "../../../../utils/builders/commandBuilder.js";
import {
  type ActivityCategory,
  generateActivityReply,
} from "../../../../utils/helpers/activityHelper.js";
import type { TopTimeframe } from "../../../../utils/helpers/topHelper.js";

export default createCommand(
  "activity",
  "サーバーのアクティビティ統計を表示します。Displays server activity statistics.",
  async (interaction) => {
    await interaction.deferReply();

    const isTestMode = interaction.options.getBoolean("test") ?? false;

    const category: ActivityCategory = "voice";
    const timeframe: TopTimeframe = "7";
    const showTimeframeButtons = false;

    const reply = await generateActivityReply({
      guild: interaction.guild,
      category,
      timeframe,
      showTimeframeButtons,
      isTestMode,
    });

    const { flags: _, ...rest } = reply;
    await interaction.editReply(rest as InteractionEditReplyOptions);
  },
  {
    setup: (builder) => {
      builder.addBooleanOption((option) =>
        option
          .setName("test")
          .setDescription(
            "テストモードで実行し、偽のデータを生成します。(Run in test mode with fake data.)",
          )
          .setRequired(false),
      );
      return builder;
    },
  },
);

```

---
### File: `src/commands/slash/social/confess/index.ts`
---

```ts
import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { createCommand } from "../../../../utils/builders/commandBuilder.js";

export default createCommand(
  "confess",
  "匿名でメッセージを投稿します。Post a message anonymously.",
  async (interaction): Promise<void> => {
    const modal = new ModalBuilder()
      .setCustomId("confess_modal")
      .setTitle("匿名で投稿 / Post an Anonymous Confession");

    const messageInput = new TextInputBuilder()
      .setCustomId("confession_input")
      .setLabel("投稿したいメッセージ。The message you want to confess.")
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder(
        "ここにメッセージを入力してください。\nWrite the anonymous message you want to send.",
      );

    const actionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
      messageInput,
    );
    modal.addComponents(actionRow);

    await interaction.showModal(modal);
  },
  {
    allowedChannels: ["confessions"],
  },
);

```

---
### File: `src/commands/slash/social/reply/index.ts`
---

```ts
import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { createCommand } from "../../../../utils/builders/commandBuilder.js";

export default createCommand(
  "reply",
  "特定の投稿に匿名で返信する。Reply anonymously to a specific confession.",
  async (interaction): Promise<void> => {
    const targetId = interaction.options.getInteger("id");

    const modal = new ModalBuilder()
      .setCustomId(`reply_modal_${targetId}`)
      .setTitle("返信を投稿 / Post a Reply");

    const replyInput = new TextInputBuilder()
      .setCustomId("reply_input")
      .setLabel("返信メッセージ。The reply message.")
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder(
        "ここに返信を入力してください。\nWrite the reply message you want to send.",
      );

    const actionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
      replyInput,
    );
    modal.addComponents(actionRow);

    await interaction.showModal(modal);
  },
  {
    allowedChannels: ["confessions"],
    setup: (builder) => {
      builder.addIntegerOption((option) =>
        option
          .setName("id")
          .setDescription(
            "返信したい投稿の番号。The # of the confession to reply to.",
          )
          .setRequired(true)
          .setMinValue(1),
      );
      return builder;
    },
  },
);

```

---
### File: `src/commands/slash/owneronly/restart/index.ts`
---

```ts
import { EmbedBuilder } from "discord.js";
import { Colors } from "../../../../constants/Colors.js";
import { createCommand } from "../../../../utils/builders/commandBuilder.js";
import {
  type RestartInfo,
  setRestartInfo,
} from "../../../../utils/managers/dataManager.js";

export default createCommand(
  "restart",
  "BOTを再起動する。Restarts the bot.",
  async (interaction): Promise<void> => {
    await interaction.deferReply();

    const embed = new EmbedBuilder()
      .setTitle("BOTの再起動")
      .setColor(Colors.yellow)
      .setDescription("BOTを再起動しています...")
      .setFooter({ text: "しばらくお待ちください。" })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });

    const restartInfo = {
      triggeringUserId: interaction.user.id,
      channelId: interaction.channel.id,
      timestamp: Date.now(),
    } satisfies RestartInfo;

    try {
      await setRestartInfo(restartInfo);
      console.log(`Restart info saved by /restart command.`);
    } catch (writeError) {
      console.error(
        "Failed to write restart info during manual restart:",
        writeError,
      );
      embed
        .setColor(Colors.red)
        .setDescription("再起動情報の保存に失敗しました。再起動を中止します。")
        .setFooter({ text: "エラーが発生しました。" });
      await interaction.editReply({ embeds: [embed] });
      return;
    }

    setTimeout(() => {
      console.log(
        `Bot restarting due to /restart command issued by ${interaction.user.tag}...`,
      );
      process.exit(0);
    }, 3000);
  },
  {
    ownerOnly: true,
    setup: (builder) => builder.setDefaultMemberPermissions(0),
  },
);

```

---
### File: `src/commands/slash/owneronly/update/update.mock.ts`
---

```ts
import { parseGitUpdateOutput } from "../../../../utils/helpers/gitUpdateHelper.js";

interface MockUpdateScenario {
  commitLog: string;
  pullStdout: string;
  fetchStderr: string;
  needsNpmInstall: boolean;
  npmOutput?: string;
  npmFieldName?: string;
}

const mockScenarios: Record<string, MockUpdateScenario> = {
  normal: {
    commitLog: "442cd19 - test: see git output",
    pullStdout: `Updating 2c3c50f..442cd19\nFast-forward\n src/commands/owneronly/update/index.js | 1 +\n 1 file changed, 1 insertion(+)`,
    fetchStderr: `From https://github.com/chev0004/Maybe-Bot\n   2c3c50f..442cd19  develop    -> origin/develop`,
    needsNpmInstall: false,
  },
  rename: {
    commitLog: "1ecc43f - refactor: rename folder",
    pullStdout: `Updating 442cd19..1ecc43f\nFast-forward\n src/commands/{confessions => social}/confess/index.js | 0\n 2 files changed, 0 insertions(+), 0 deletions(-)\n rename src/commands/{confessions => social}/confess/index.js (100%)`,
    fetchStderr: `From https://github.com/chev0004/Maybe-Bot\n   442cd19..1ecc43f  develop    -> origin/develop`,
    needsNpmInstall: false,
  },
  npm: {
    commitLog: "a1b2c3d - feat: add new dependency",
    pullStdout: `Updating 1ecc43f..a1b2c3d\nFast-forward\n package.json | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)`,
    fetchStderr: `From https://github.com/chev0004/Maybe-Bot\n   1ecc43f..a1b2c3d  develop    -> origin/develop`,
    needsNpmInstall: true,
    npmFieldName: "依存関係 / Dependencies (Simulated)",
    npmOutput: [
      "+ some-new-package@1.2.3",
      "+ another-dependency@4.5.6",
      "",
      "Added 2 packages, audited 153 packages in 4.2s",
      "Found 3 low severity vulnerabilities",
    ].join("\n"),
  },
  no_changes: {
    commitLog: "",
    pullStdout: "Already up to date.",
    fetchStderr: `From https://github.com/chev0004/Maybe-Bot\n = [up to date]      develop    -> origin/develop`, // Example
    needsNpmInstall: false,
  },
};

/**
 * Gets the mock data for a specific update scenario.
 * Defaults to the 'normal' scenario if the requested one doesn't exist.
 * @param scenarioName The name of the scenario (e.g., 'normal', 'rename', 'npm').
 * @returns The mock data object for the scenario.
 */
export const getMockUpdateData = (
  scenarioName: string | null,
): MockUpdateScenario => {
  const scenarioKey =
    scenarioName && mockScenarios[scenarioName] ? scenarioName : "normal";
  return mockScenarios[scenarioKey];
};

/**
 * Parses the mock git output for a given scenario.
 * @param scenarioName The name of the scenario.
 * @returns Parsed output suitable for the embed.
 */
export const parseMockGitUpdateOutput = (scenarioName: string | null) => {
  const mockData = getMockUpdateData(scenarioName);
  return parseGitUpdateOutput(
    mockData.commitLog,
    mockData.pullStdout,
    mockData.fetchStderr,
  );
};

```

---
### File: `src/commands/slash/owneronly/update/index.ts`
---

```ts
import { exec } from "child_process";
import { EmbedBuilder, MessageFlags } from "discord.js";
import util from "util";
import { Colors } from "../../../../constants/Colors.js";
import { createCommand } from "../../../../utils/builders/commandBuilder.js";
import { parseGitUpdateOutput } from "../../../../utils/helpers/gitUpdateHelper.js";
import { setRestartInfo } from "../../../../utils/managers/dataManager.js";
import { getMockUpdateData, parseMockGitUpdateOutput } from "./update.mock.js";

const execPromise = util.promisify(exec);
const PULLED_BRANCH = "develop";

const truncateField = (text: string, maxLength = 1000): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
};

export default createCommand(
  "update",
  "GitHubから最新のコミットを取得し、BOTを再起動する。Pulls the latest changes from GitHub and restarts the bot.",
  async (interaction): Promise<void> => {
    const isTestMode = interaction.options.getBoolean("test") ?? false;
    const isForceMode = interaction.options.getBoolean("force") ?? false;
    const testScenario = interaction.options.getString("test_scenario");

    if (isTestMode) {
      await interaction.deferReply({ flags: MessageFlags.Ephemeral });

      const mockData = getMockUpdateData(testScenario);
      const { changes, files, repo } = parseMockGitUpdateOutput(testScenario);

      const embed = new EmbedBuilder()
        .setTitle(`BOTの更新 (TEST${isForceMode ? " / FORCE" : ""})`)
        .setColor(Colors.yellow)
        .setDescription(
          "これはテスト実行です。BOTは実際の更新や再起動を行いません。",
        )
        .setFields(
          {
            name: "更新内容 / Changes",
            value: `\`\`\`ansi\n${truncateField(changes)}\n\`\`\``,
          },
          {
            name: "更新ファイル / Files Changed",
            value: `\`\`\`ansi\n${truncateField(files)}\n\`\`\``,
          },
          {
            name: "リポジトリ / Repository",
            value: `\`\`\`ansi\n${truncateField(repo)}\n\`\`\``,
          },
        )
        .setFooter({
          text: `BOTは再起動しません • ${new Date().toLocaleDateString("ja-JP")}`,
        });
      if (mockData.needsNpmInstall) {
        embed.addFields({
          name: mockData.npmFieldName || "NPM Install (Simulated)",
          value: `\`\`\`\n${truncateField(mockData.npmOutput || "Simulated NPM install output.")}\n\`\`\``,
        });
      }

      await interaction.editReply({ embeds: [embed] });
      return;
    }

    await interaction.deferReply();
    const embed = new EmbedBuilder()
      .setTitle(`BOTの更新${isForceMode ? " (FORCE)" : ""}`)
      .setColor(Colors.yellow)
      .setDescription(`最新のコミット (${PULLED_BRANCH} ブランチ) を確認中...`);
    await interaction.editReply({ embeds: [embed] });

    try {
      const { stderr: fetchStderr } = await execPromise("git fetch origin");
      const { stdout: commitLog } = await execPromise(
        `git log HEAD..origin/${PULLED_BRANCH} --pretty=format:"%h - %s"`,
      );
      const { stdout: packageJsonDiff } = await execPromise(
        `git diff HEAD..origin/${PULLED_BRANCH} -- package.json`,
      );
      const needsNpmInstall = packageJsonDiff.length > 0;

      if (!isForceMode && !commitLog && !needsNpmInstall) {
        embed
          .setColor(Colors.purple)
          .setDescription(
            `BOTは既に最新の状態です (${PULLED_BRANCH} ブランチ)。`,
          );
        await interaction.editReply({ embeds: [embed] });
        return;
      }

      const pullCommand = isForceMode
        ? `git reset --hard origin/${PULLED_BRANCH}`
        : `git pull origin ${PULLED_BRANCH}`;
      const { stdout: pullStdout } = await execPromise(pullCommand);

      const { changes, files, repo } = parseGitUpdateOutput(
        commitLog,
        pullStdout,
        fetchStderr,
      );
      embed
        .setColor(Colors.green)
        .setDescription("正常に更新されました。")
        .setFields(
          {
            name: "更新内容 / Changes",
            value: `\`\`\`ansi\n${truncateField(changes)}\n\`\`\``,
          },
          {
            name: "更新ファイル / Files Changed",
            value: `\`\`\`ansi\n${truncateField(files)}\n\`\`\``,
          },
          {
            name: "リポジトリ / Repository",
            value: `\`\`\`ansi\n${truncateField(repo)}\n\`\`\``,
          },
        );

      if (needsNpmInstall) {
        embed.addFields({
          name: "依存関係 / Dependencies",
          value: "```依存関係を処理中...```",
        });
        await interaction.editReply({ embeds: [embed] });

        try {
          const { stdout: npmStdout } = await execPromise("npm install");
          const addedMatch = npmStdout.match(/added (\d+ packages?)/);
          const auditMatch = npmStdout.match(/audited (\d+ packages?)/);
          const timeMatch = npmStdout.match(/in (\d+s|\d+\.\d+s)/);
          const vulnerabilityMatch = npmStdout.match(
            /(\d+)\s+(low|moderate|high|critical)\s+severity vulnerabilities/,
          );
          const summaryLines = [];
          if (addedMatch) summaryLines.push(`- Added: ${addedMatch[1]}`);
          if (auditMatch) summaryLines.push(`- Audited: ${auditMatch[1]}`);
          if (timeMatch) summaryLines.push(`- Time: ${timeMatch[1]}`);
          if (vulnerabilityMatch)
            summaryLines.push(`- Vulnerabilities: ${vulnerabilityMatch[0]}`);
          embed.spliceFields(-1, 1, {
            name: "依存関係 / Dependencies",
            value: `\`\`\`\n${truncateField(summaryLines.join("\n") || "NPM install completed.")}\n\`\`\``,
          });
        } catch (npmError) {
          console.error("Error during npm install:", npmError);
          const err = npmError as Error & { stderr?: string; stdout?: string };
          embed
            .setColor(Colors.red)
            .setDescription(
              "依存関係のインストール中にエラーが発生しました。BOTの更新は行われましたが、再起動は中止します。",
            )
            .spliceFields(-1, 1, {
              name: "NPM Install Error",
              value: `\`\`\`\n${truncateField(err.stderr || err.stdout || err.message)}\n\`\`\``,
            });
          await interaction.editReply({ embeds: [embed] });
          return;
        }
      }

      embed.addFields({
        name: "ビルド / Build",
        value: "```ビルド中...```",
      });
      await interaction.editReply({ embeds: [embed] });

      try {
        const { stdout: buildStdout } = await execPromise("npm run build");
        const buildOutput = buildStdout || "ビルドが正常に完了しました。";
        embed.spliceFields(-1, 1, {
          name: "ビルド / Build",
          value: `\`\`\`\n${truncateField(buildOutput.slice(-1000))}\n\`\`\``,
        });
      } catch (buildError) {
        console.error("Error during build:", buildError);
        const err = buildError as Error & { stderr?: string; stdout?: string };
        embed
          .setColor(Colors.red)
          .setDescription(
            "ビルド中にエラーが発生しました。BOTの更新は行われましたが、再起動は中止します。",
          )
          .spliceFields(-1, 1, {
            name: "Build Error",
            value: `\`\`\`\n${truncateField(err.stderr || err.stdout || err.message)}\n\`\`\``,
          });
        await interaction.editReply({ embeds: [embed] });
        return;
      }

      embed.setFooter({
        text: `BOTが再起動中... • ${new Date().toLocaleDateString("ja-JP")}`,
      });
      await interaction.editReply({ embeds: [embed] });

      const restartInfo = {
        triggeringUserId: interaction.user.id,
        channelId: interaction.channel.id,
        timestamp: Date.now(),
      };
      await setRestartInfo(restartInfo);

      setTimeout(() => {
        console.log(`Bot restarting due to /update command...`);
        process.exit(0);
      }, 3000);
    } catch (error) {
      console.error("Error during update process:", error);
      const err = error as Error & { stderr?: string };
      embed
        .setColor(Colors.red)
        .setDescription("更新プロセス中にエラーが発生しました。")
        .setFields({
          name: "Error",
          value: `\`\`\`\n${truncateField(err.stderr || err.message)}\n\`\`\``,
        });
      await interaction.editReply({ embeds: [embed] }).catch(console.error);
    }
  },
  {
    ownerOnly: true,
    setup: (builder) => {
      builder
        .addBooleanOption((option) =>
          option
            .setName("test")
            .setDescription(
              "TESTモードで実行し、実際の更新や再起動は行いません。",
            )
            .setRequired(false),
        )
        .addBooleanOption((option) =>
          option
            .setName("force")
            .setDescription("ローカルの変更を強制的に上書きします。")
            .setRequired(false),
        )
        .addStringOption((option) =>
          option
            .setName("test_scenario")
            .setDescription(
              "testモードでシミュレーションするシナリオを選択します。",
            )
            .setRequired(false)
            .addChoices(
              { name: "Normal Update", value: "normal" },
              { name: "Rename Update", value: "rename" },
              { name: "NPM Install Update", value: "npm" },
            ),
        );
      return builder;
    },
  },
);

```

---
### File: `src/commands/slash/minecraft/smite/index.ts`
---

```ts
import type { HandlerOptions } from "../../../../handlers/commandHandler.js";
import { createCommand } from "../../../../utils/builders/commandBuilder.js";
import { handleApprovalProcess } from "../../../../utils/helpers/approvalHelper.js";

export default createCommand(
  "smite",
  "人に神罰を与える。Punish someone with the God's Wrath.",
  async (interaction, _client, options: HandlerOptions): Promise<void> => {
    const { exarotonClient, SERVER_ID } = options;
    const victimUsername = interaction.options.getString("victim", true);

    const requiredApprovals = 1;
    const actionMessage = `${victimUsername} に神罰を与える`;
    const actionMessageEN = `Smite ${victimUsername} with God's Wrath`;

    await handleApprovalProcess(
      interaction,
      requiredApprovals,
      actionMessage,
      actionMessageEN,
      async (pollMessage) => {
        const server = exarotonClient.server(SERVER_ID);
        const command = Array(100)
          .fill(
            `execute at ${victimUsername} run summon minecraft:lightning_bolt ~ ~ ~`,
          )
          .join("\n");

        await server.executeCommand(command);
        await pollMessage.reply(`${victimUsername} に神罰を与えました。`);
      },
      "神罰が失敗しました。",
    );
  },
  {
    setup: (builder) => {
      builder.addStringOption((option) =>
        option
          .setName("victim")
          .setDescription(
            "神罰を受ける者の名を入力。Enter the username of the victim to be smitten.",
          )
          .setRequired(true),
      );
      return builder;
    },
  },
);

```

---
### File: `src/commands/slash/minecraft/startserver/index.ts`
---

```ts
import type { HandlerOptions } from "../../../../handlers/commandHandler.js";
import { createCommand } from "../../../../utils/builders/commandBuilder.js";
import { handleApprovalProcess } from "../../../../utils/helpers/approvalHelper.js";

export default createCommand(
  "startserver",
  "マイクラサーバーを起動させる。Starts the MineCraft server.",
  async (interaction, _client, options: HandlerOptions): Promise<void> => {
    const { exarotonClient, SERVER_ID } = options;
    const requiredApprovals = 1;
    const actionMessage = "サーバーを起動する";
    const actionMessageEN = "start the server";

    await handleApprovalProcess(
      interaction,
      requiredApprovals,
      actionMessage,
      actionMessageEN,
      async (pollMessage) => {
        const server = exarotonClient.server(SERVER_ID);
        await server.get();
        await server.start();
        const startMsg = await pollMessage.reply("サーバーが起動中...");
        let attempts = 0;
        const maxAttempts = 18;
        const pollInterval = 10000;
        const intervalId = setInterval(async () => {
          attempts++;
          try {
            await server.get();
            if (server.status === 1) {
              clearInterval(intervalId);
              await startMsg.edit("サーバーが起動しました！");
            } else if (attempts >= maxAttempts) {
              clearInterval(intervalId);
              await startMsg.edit("サーバーの起動確認がタイムアウトしました。");
            }
          } catch (_err) {
            clearInterval(intervalId);
            await startMsg.edit("サーバー状態の確認に失敗しました。");
          }
        }, pollInterval);
      },
      "サーバーの起動に失敗しました。",
    );
  },
);

```

---
### File: `src/commands/slash/minecraft/statusserver/index.ts`
---

```ts
import { EmbedBuilder } from "discord.js";
import { Colors } from "../../../../constants/Colors.js";
import { Strings } from "../../../../constants/Strings.js";
import type { HandlerOptions } from "../../../../handlers/commandHandler.js";
import { createCommand } from "../../../../utils/builders/commandBuilder.js";

export default createCommand(
  "statusserver",
  "マイクラサーバーの現在状況を表示。Display the current server stats",
  async (interaction, _client, options: HandlerOptions): Promise<void> => {
    const { exarotonClient, SERVER_ID } = options;

    await interaction.deferReply();
    try {
      const server = exarotonClient.server(SERVER_ID);
      await server.get();

      const statusCode = server.status;
      const statusMap = {
        0: "オフライン",
        1: "オンライン",
        2: "起動中",
        3: "再起動中",
        4: "保存中",
        5: "ロード中",
        6: "停止中",
        7: "保留中",
      } as const;
      const statusString =
        statusMap[statusCode as keyof typeof statusMap] ?? "Unknown";

      let embedColor = Colors.purple;
      if (statusCode === 1) {
        embedColor = Colors.green;
      } else if ([2, 3, 4, 5, 6, 7].includes(statusCode)) {
        embedColor = Colors.yellow;
      } else if (statusCode === 0) {
        embedColor = Colors.red;
      }

      const embed = new EmbedBuilder()
        .setTitle("サーバーの現在状況")
        .setColor(embedColor)
        .setFooter({
          text: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setTimestamp();

      embed.setDescription(`**ステータス**: ${statusString}`);

      if (statusCode === 1) {
        const playerCount = server.players.count;
        const playerMax = server.players.max;
        const playerList = server.players.list;

        embed.addFields(
          {
            name: "プレーヤー数",
            value: `${playerCount} / ${playerMax}`,
            inline: true,
          },
          {
            name: "プレーヤーリスト",
            value: playerCount > 0 ? playerList.join(", ") : "なし",
            inline: false,
          },
        );
      }

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error("Error fetching server status:", error);
      await interaction.editReply(Strings.Errors.FetchServerInfo);
    }
  },
);

```

---
### File: `src/commands/slash/minecraft/whitelist/index.ts`
---

```ts
import { EmbedBuilder } from "discord.js";
import { Colors } from "../../../../constants/Colors.js";
import { Strings } from "../../../../constants/Strings.js";
import type { HandlerOptions } from "../../../../handlers/commandHandler.js";
import { createCommand } from "../../../../utils/builders/commandBuilder.js";

type ExarotonError = {
  message?: string;
  response?: { body?: unknown };
  body?: unknown;
};

/**
 * Parses the Exaroton API error for a user-friendly message.
 * @param {Error} error The error object from the catch block.
 * @returns {string} A formatted error message.
 */
const parseExarotonError = (error: unknown) => {
  const err = error as ExarotonError;
  let errorMessage = err.message || Strings.Errors.Unknown;

  const parseBody = (body: string) => {
    try {
      const errorBody = JSON.parse(body);
      if (errorBody.success === false && errorBody.error) {
        return `API Error: ${errorBody.error}`;
      }
      if (errorBody.message) {
        return `API Message: ${errorBody.message}`;
      }
    } catch {
      return `Details: ${body.substring(0, 500)}`;
    }
    return null;
  };

  const body = err.response?.body ?? err.body;
  if (typeof body === "string" && body.length > 0) {
    const parsedMessage = parseBody(body);
    if (parsedMessage) {
      errorMessage = `${err.message ?? "Error"}\n${parsedMessage}`;
    }
  }

  return errorMessage;
};

export default createCommand(
  "whitelist",
  "マイクラサーバーのホワイトリストにユーザーを追加する。Adds a user to the Minecraft server whitelist.",
  async (interaction, _client, options: HandlerOptions): Promise<void> => {
    await interaction.deferReply();

    const { exarotonClient, SERVER_ID } = options;
    const originalUsername = interaction.options.getString("username", true);
    const isBedrock = interaction.options.getBoolean("bedrock") ?? false;

    let usernameToWhitelist = originalUsername;
    if (isBedrock) {
      usernameToWhitelist = `.${originalUsername}`;
    }

    const embed = new EmbedBuilder()
      .setTitle("ホワイトリスト追加処理")
      .setFooter({
        text: "おめでとうございます",
      })
      .setTimestamp();

    try {
      const server = exarotonClient.server(SERVER_ID);
      await server.get();

      const whitelist = server.getPlayerList("whitelist");
      await whitelist.addEntry(usernameToWhitelist);

      embed
        .setColor(Colors.green)
        .setDescription(
          `ユーザー「${usernameToWhitelist}」をホワイトリストに追加しました。`,
        )
        .addFields({
          name: "プラットフォーム",
          value: isBedrock ? "Bedrock" : "Java",
          inline: true,
        });
      if (isBedrock) {
        embed.addFields({
          name: "備考",
          value: "Bedrockユーザーとしてプレフィックス `.` が追加されました。",
          inline: false,
        });
      }

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(
        `Error adding user ${usernameToWhitelist} to whitelist:`,
        error,
      );
      const errorMessage = parseExarotonError(error);

      embed
        .setColor(Colors.red)
        .setDescription(
          `ユーザー「${usernameToWhitelist}」のホワイトリスト追加に失敗しました。`,
        )
        .addFields({
          name: "エラー詳細",
          value: `\`\`\`\n${errorMessage.substring(0, 1000)}\n\`\`\``,
        });

      await interaction.editReply({ embeds: [embed] });
    }
  },
  {
    ownerOnly: true,
    setup: (builder) => {
      builder
        .addStringOption((option) =>
          option
            .setName("username")
            .setDescription(
              "ホワイトリストに追加するユーザー名。The username to add to the whitelist.",
            )
            .setRequired(true),
        )
        .addBooleanOption((option) =>
          option
            .setName("bedrock")
            .setDescription(
              "統合版ユーザーの場合はtrueを選択。Set to true if the user is a Bedrock player.",
            )
            .setRequired(false),
        );
      return builder;
    },
  },
);

```

---
### File: `src/commands/slash/management/listunverified/index.ts`
---

```ts
import {
  EmbedBuilder,
  type Guild,
  type InteractionEditReplyOptions,
  PermissionsBitField,
  type Role,
} from "discord.js";
import { config } from "../../../../config/env.js";

import { Colors } from "../../../../constants/Colors.js";

import { Strings } from "../../../../constants/Strings.js";
import { createCommand } from "../../../../utils/builders/commandBuilder.js";
import {
  generatePage,
  type UnverifiedMember,
} from "../../../../utils/helpers/listUnverifiedHelper.js";
import { mockData as listUnverifiedMockData } from "./listunverified.mock.js";

const sortFunctions = {
  username: (
    a: { user: { username: string } },
    b: { user: { username: string } },
  ) => a.user.username.localeCompare(b.user.username),
  joinedAt: (a: { joinedTimestamp: number }, b: { joinedTimestamp: number }) =>
    a.joinedTimestamp - b.joinedTimestamp,
  createdAt: (
    a: { user: { createdTimestamp: number } },
    b: { user: { createdTimestamp: number } },
  ) => a.user.createdTimestamp - b.user.createdTimestamp,
};

/**
 * Generates fake members for testing purposes.
 * Note: This function is only intended for use within the test mode of the command.
 * @returns An array of fake member objects adhering to the UnverifiedMember structure.
 */
export const generateFakeMembers = (): UnverifiedMember[] => {
  return listUnverifiedMockData.default();
};

export default createCommand(
  "listunverified",
  "認証ロールを持たないメンバーをリスト表示します。Lists members without the verified role.",
  async (interaction): Promise<void> => {
    await interaction.deferReply();

    const isTestMode = interaction.options.getBoolean("test") ?? false;
    const guild = interaction.guild as Guild;
    let memberArray: UnverifiedMember[] = [];

    if (isTestMode) {
      memberArray = listUnverifiedMockData.default();
    } else {
      const verifiedRoleId = config.roles.verified;
      if (!verifiedRoleId) {
        await interaction.editReply(
          Strings.Errors.ConfigNotSet("VERIFIED_ROLE_ID"),
        );
        return;
      }
      const role = guild.roles.cache.get(verifiedRoleId) as Role;

      const botMember = guild.members.me;
      if (!botMember?.permissions.has(PermissionsBitField.Flags.ViewChannel)) {
        await interaction.editReply(Strings.Permissions.BotViewChannel);
        return;
      }
      await guild.members.fetch();
      const membersWithoutRole = guild.members.cache.filter(
        (member) => !member.user.bot && !member.roles.cache.has(role.id),
      );
      if (membersWithoutRole.size === 0) {
        const embed = new EmbedBuilder()
          .setTitle(`ロール「${role.name}」を持たないメンバーはいません。`)
          .setDescription(
            `全てのメンバーがロール「${role.name}」を所有しています。\nAll members currently have the role "${role.name}".`,
          )
          .setColor(Colors.green)
          .setFooter({
            text: interaction.user.username,
            iconURL: interaction.user.displayAvatarURL(),
          })
          .setTimestamp();
        await interaction.editReply({ embeds: [embed] });
        return;
      }
      memberArray = Array.from(
        membersWithoutRole.values(),
      ) as UnverifiedMember[];
    }

    const initialSortCriteria = "username";
    const initialSortOrder = "asc";
    memberArray.sort(sortFunctions[initialSortCriteria]);
    const initialPage = generatePage(
      memberArray,
      initialSortCriteria,
      initialSortOrder,
      0,
      isTestMode,
    );
    const { flags: _, ...replyOptions } = initialPage;
    await interaction.editReply(replyOptions as InteractionEditReplyOptions);
  },
  {
    adminOnly: true,
    setup: (builder) => {
      builder
        .addBooleanOption((option) =>
          option
            .setName("test")
            .setDescription(
              "テストモードで実行し、偽のデータを生成します。(Run in test mode with fake data.)",
            )
            .setRequired(false),
        )
        .setDefaultMemberPermissions(0);
      return builder;
    },
  },
);

```

---
### File: `src/commands/slash/management/listunverified/listunverified.mock.ts`
---

```ts
import type { UnverifiedMember } from "../../../../utils/helpers/listUnverifiedHelper.js";

/**
 * Generates a specified number of fake GuildMember-like objects for testing.
 * @param count The number of fake members to generate.
 * @returns An array of fake member objects.
 */
const generateFakeMembersArray = (count: number): UnverifiedMember[] => {
  const fakeMembers: UnverifiedMember[] = [];
  for (let i = 0; i < count; i++) {
    const fakeId = (
      BigInt(Date.now()) -
      BigInt(i * 100000) +
      BigInt(Math.floor(Math.random() * 10000))
    ).toString();
    const threeYearsInMillis = 3 * 365 * 24 * 60 * 60 * 1000;
    const createdAt =
      Date.now() - Math.floor(Math.random() * threeYearsInMillis);
    const joinedAt =
      createdAt + Math.floor(Math.random() * (Date.now() - createdAt));

    fakeMembers.push({
      id: fakeId,
      joinedTimestamp: joinedAt,
      user: {
        id: fakeId,
        username: `FakeUser${String(i + 1).padStart(3, "0")}`,
        createdTimestamp: createdAt,
      },
      roles: {
        cache: {
          has: () => false,
        },
      },
    } as unknown as UnverifiedMember);
  }
  return fakeMembers;
};

// Export different scenarios or a default generator
export const mockData = {
  default: () => generateFakeMembersArray(151),
  empty: () => [],
  few: () => generateFakeMembersArray(3),
};

```

---
### File: `src/commands/slash/adminonly/purge/index.ts`
---

```ts
import {
  Collection,
  type Message,
  MessageFlags,
  PermissionsBitField,
  type SlashCommandBuilder,
  type Snowflake,
} from "discord.js";
import { Strings } from "../../../../constants/Strings.js";
import { createCommand } from "../../../../utils/builders/commandBuilder.js";

const FOURTEEN_DAYS_IN_MS = 1000 * 60 * 60 * 24 * 14;

export default createCommand(
  "purge",
  "チャンネルからメッセージを削除します。Deletes messages from a channel.",
  async (interaction): Promise<void> => {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    if (
      !interaction.guild?.members.me?.permissions.has(
        PermissionsBitField.Flags.ManageMessages,
      )
    ) {
      await interaction.editReply({
        content: Strings.Permissions.BotMissing(
          "メッセージの管理",
          "Manage Messages",
        ),
      });
      return;
    }

    const amount = interaction.options.getInteger("amount");
    const user = interaction.options.getUser("user");
    const link = interaction.options.getString("link");

    if ((amount && link) || (!amount && !link)) {
      await interaction.editReply({
        content:
          "「amount」または「link」のどちらか一方を指定してください。\nPlease specify either the 'amount' or the 'link' option, but not both.",
      });
      return;
    }

    let messagesToDelete: Collection<Snowflake, Message> | Message[] = [];
    let tooOldCount = 0;

    if (link) {
      const match = link.match(/channels\/\d+\/\d+\/(\d+)/);
      if (!match || !match[1]) {
        await interaction.editReply({
          content:
            "無効なメッセージリンクです。\nInvalid message link provided.",
        });
        return;
      }
      const messageId = match[1];

      try {
        const fetchedMessages = await interaction.channel.messages.fetch({
          limit: 100,
        });
        const messageArray = Array.from(fetchedMessages.values());
        const targetIndex = messageArray.findIndex(
          (msg) => msg.id === messageId,
        );

        if (targetIndex === -1) {
          await interaction.editReply({
            content:
              "指定されたメッセージは直近100件のメッセージ内に見つかりませんでした。\nCould not find the linked message within the last 100 messages.",
          });
          return;
        }

        const rawMessagesToDelete = messageArray.slice(0, targetIndex + 1);
        let messagesToDelete: Message[];

        messagesToDelete = rawMessagesToDelete.filter(
          (msg) => Date.now() - msg.createdTimestamp < FOURTEEN_DAYS_IN_MS,
        );
        tooOldCount = rawMessagesToDelete.length - messagesToDelete.length;
      } catch (error) {
        console.error("Error fetching messages for purge by link:", error);
        await interaction.editReply({
          content: Strings.Errors.FetchMessages,
        });
        return;
      }
    } else if (amount) {
      try {
        const fetchedMessages = await interaction.channel.messages.fetch({
          limit: amount,
        });

        const messagesToFilter = user
          ? fetchedMessages.filter((msg) => msg.author.id === user.id)
          : fetchedMessages;

        messagesToDelete = messagesToFilter.filter(
          (msg) => Date.now() - msg.createdTimestamp < FOURTEEN_DAYS_IN_MS,
        );
        tooOldCount = messagesToFilter.size - messagesToDelete.size;
      } catch (error) {
        console.error("Error fetching messages for purge by amount:", error);
        await interaction.editReply({
          content: Strings.Errors.FetchMessages,
        });
        return;
      }
    }

    const deleteCount =
      messagesToDelete instanceof Collection
        ? messagesToDelete.size
        : messagesToDelete.length;

    if (!messagesToDelete || deleteCount === 0) {
      let reply =
        "削除対象のメッセージが見つかりませんでした。\nNo messages were found to delete.";
      if (tooOldCount > 0) {
        reply += `\n(${tooOldCount}件のメッセージは14日以上経過しているため削除できませんでした。)\n(${tooOldCount} messages were too old to delete.)`;
      }
      await interaction.editReply({ content: reply });
      return;
    }

    try {
      await interaction.channel.bulkDelete(messagesToDelete, true);

      let reply = `✅ ${deleteCount}件のメッセージを削除しました。\nSuccessfully deleted ${deleteCount} messages.`;
      if (user) {
        reply += `\n\n👤 **対象ユーザー:** ${user.tag}\n**Filtered by user:** ${user.tag}`;
      }
      if (tooOldCount > 0) {
        reply += `\n\n⚠️ ${tooOldCount}件のメッセージは14日以上経過しているため削除できませんでした。\n${tooOldCount} messages were older than 14 days and could not be deleted.`;
      }

      await interaction.editReply({ content: reply });
    } catch (error) {
      console.error("Error during bulk delete:", error);
      await interaction.editReply({
        content: Strings.Errors.DeleteMessages,
      });
    }
  },
  {
    adminOnly: true,
    setup: (builder: SlashCommandBuilder) => {
      builder
        .addIntegerOption((option) =>
          option
            .setName("amount")
            .setDescription(
              "削除するメッセージの数 (1-100)。The number of messages to delete (1-100).",
            )
            .setMinValue(1)
            .setMaxValue(100)
            .setRequired(false),
        )
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription(
              "このユーザーのメッセージのみを削除します。Only delete messages from this user.",
            )
            .setRequired(false),
        )
        .addStringOption((option) =>
          option
            .setName("link")
            .setDescription(
              "このメッセージまでのすべてのメッセージを削除します。Delete all messages up to this message link.",
            )
            .setRequired(false),
        );
      return builder;
    },
  },
);

```

---
### File: `src/commands/message/adminonly/purgeto/index.ts`
---

```ts
import {
  ActionRowBuilder,
  ApplicationCommandType,
  ButtonBuilder,
  type ButtonInteraction,
  ButtonStyle,
  ComponentType,
  type ContextMenuCommandInteraction,
  EmbedBuilder,
  type GuildTextBasedChannel,
  type Message,
  MessageFlags,
  PermissionsBitField,
} from "discord.js";
import { Colors } from "../../../../constants/Colors.js";
import { Strings } from "../../../../constants/Strings.js";
import { createMenuCommand } from "../../../../utils/builders/menuCommandBuilder.js";

const FOURTEEN_DAYS_IN_MS = 1000 * 60 * 60 * 24 * 14;

export default createMenuCommand(
  "Purge to here",
  ApplicationCommandType.Message,
  async (
    interaction: ContextMenuCommandInteraction,
    _client,
    _options,
  ): Promise<void> => {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    if (
      !interaction.guild ||
      !interaction.channel ||
      !interaction.channel.isTextBased()
    ) {
      await interaction.editReply({
        content: Strings.Replies.GuildOnly,
      });
      return;
    }

    if (
      !interaction.guild.members.me ||
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ManageMessages,
      )
    ) {
      await interaction.editReply({
        content: Strings.Permissions.BotMissing(
          "メッセージの管理",
          "Manage Messages",
        ),
      });
      return;
    }

    if (!interaction.isMessageContextMenuCommand()) {
      await interaction.editReply({
        content:
          "このコマンドはメッセージのコンテキストメニューからのみ使用できます。\nThis command can only be used from a message context menu.",
      });
      return;
    }

    const targetMessage = interaction.targetMessage;
    let messagesToDelete: Message[] = [];
    let tooOldCount = 0;

    try {
      const fetchedMessages = await interaction.channel.messages.fetch({
        limit: 100,
      });
      const messageArray = Array.from(fetchedMessages.values()).sort(
        (a, b) => b.createdTimestamp - a.createdTimestamp,
      );
      const targetIndex = messageArray.findIndex(
        (msg) => msg.id === targetMessage.id,
      );

      if (targetIndex === -1) {
        await interaction.editReply({
          content:
            "選択されたメッセージは直近100件のメッセージ内に見つかりませんでした。\nCould not find the target message within the last 100 messages.",
        });
        return;
      }

      const rawMessagesToDelete = messageArray.slice(0, targetIndex + 1);
      messagesToDelete = rawMessagesToDelete.filter(
        (msg) => Date.now() - msg.createdTimestamp < FOURTEEN_DAYS_IN_MS,
      );
      tooOldCount = rawMessagesToDelete.length - messagesToDelete.length;
    } catch (error) {
      console.error("Error during message fetching for purge:", error);
      await interaction.editReply({
        content: Strings.Errors.FetchMessages,
      });
      return;
    }

    if (messagesToDelete.length === 0) {
      const noMessagesEmbed = new EmbedBuilder()
        .setColor(Colors.purple)
        .setTitle("削除対象メッセージなし / No Messages to Delete")
        .setDescription(
          "削除対象のメッセージが見つかりませんでした。\nNo messages were found to delete.",
        );
      if (tooOldCount > 0) {
        noMessagesEmbed.addFields({
          name: "注意 / Warning",
          value: `(${tooOldCount}件の古いメッセージは無視されます。)\n(${tooOldCount} older messages will be ignored.)`,
        });
      }
      await interaction.editReply({ embeds: [noMessagesEmbed] });
      return;
    }

    const confirmButton = new ButtonBuilder()
      .setCustomId("confirm_purge")
      .setLabel("確認")
      .setStyle(ButtonStyle.Danger);

    const cancelButton = new ButtonBuilder()
      .setCustomId("cancel_purge")
      .setLabel("キャンセル")
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      confirmButton,
      cancelButton,
    );

    const confirmationEmbed = new EmbedBuilder()
      .setColor(Colors.purple)
      .setTitle("削除の確認 / Deletion Confirmation")
      .setDescription(
        `選択されたメッセージまで${messagesToDelete.length}件のメッセージを削除してもよろしいですか？\n` +
          `Are you sure you want to delete ${messagesToDelete.length} message(s) up to the selected message?`,
      );

    if (tooOldCount > 0) {
      confirmationEmbed.addFields({
        name: "注意 / Warning",
        value:
          `${tooOldCount}件のメッセージは14日以上経過しているため削除できません。\n` +
          `${tooOldCount} messages are older than 14 days and will be ignored.`,
      });
    }

    const confirmationMessage = await interaction.editReply({
      embeds: [confirmationEmbed],
      components: [row],
    });

    const filter = (i: ButtonInteraction) => i.user.id === interaction.user.id;

    try {
      const confirmation = await confirmationMessage.awaitMessageComponent({
        filter,
        componentType: ComponentType.Button,
        time: 15_000,
      });

      if (confirmation.customId === "confirm_purge") {
        const purgingEmbed = new EmbedBuilder()
          .setColor(Colors.yellow)
          .setDescription("メッセージを削除しています...\nPurging messages...");
        await confirmation.update({ embeds: [purgingEmbed], components: [] });

        const guildTextChannel =
          interaction.channel as unknown as GuildTextBasedChannel;
        await guildTextChannel.bulkDelete(messagesToDelete, true);

        const successEmbed = new EmbedBuilder()
          .setColor(Colors.green)
          .setTitle("成功 / Success")
          .setDescription(
            `✅ ${messagesToDelete.length}件のメッセージを正常に削除しました。\nSuccessfully deleted ${messagesToDelete.length} messages.`,
          );

        if (tooOldCount > 0) {
          successEmbed.addFields({
            name: "注意 / Warning",
            value: `⚠️ ${tooOldCount}件のメッセージは14日以上経過しているため削除できませんでした。\n${tooOldCount} messages were older than 14 days and could not be deleted.`,
          });
        }

        await interaction.editReply({ embeds: [successEmbed], components: [] });
      } else if (confirmation.customId === "cancel_purge") {
        const cancelEmbed = new EmbedBuilder()
          .setColor(Colors.red)
          .setTitle("キャンセル済み / Canceled")
          .setDescription("パージがキャンセルされました。\nPurge canceled.");
        await confirmation.update({ embeds: [cancelEmbed], components: [] });
      }
    } catch {
      const timedOutEmbed = new EmbedBuilder()
        .setColor(Colors.yellow)
        .setTitle("タイムアウト / Timed Out")
        .setDescription(Strings.Replies.ConfirmationTimeout);

      const timedOutRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
        confirmButton.setDisabled(true),
        cancelButton.setDisabled(true),
      );

      await interaction.editReply({
        embeds: [timedOutEmbed],
        components: [timedOutRow],
      });
    }
  },
  {
    requiredPermissions: [PermissionsBitField.Flags.ManageMessages],
  },
);

```

---
### File: `src/assets/fonts/NotoSans-Bold.ttf`
---

```
[Warning: Could not decode file content. It may be binary or have an unsupported encoding.]
```

---
### File: `src/assets/fonts/NotoSans-Regular.ttf`
---

```
[Warning: Could not decode file content. It may be binary or have an unsupported encoding.]
```

---
### File: `src/assets/fonts/NotoSansJP-Regular.ttf`
---

```
[Warning: Could not decode file content. It may be binary or have an unsupported encoding.]
```

---
### File: `src/assets/icons/bump.png`
---

```
[Warning: Could not decode file content. It may be binary or have an unsupported encoding.]
```

---
### File: `src/assets/icons/chat.png`
---

```
[Warning: Could not decode file content. It may be binary or have an unsupported encoding.]
```

---
### File: `src/assets/icons/mic.png`
---

```
[Warning: Could not decode file content. It may be binary or have an unsupported encoding.]
```

---
### File: `src/assets/icons/stream.png`
---

```
[Warning: Could not decode file content. It may be binary or have an unsupported encoding.]
```

---
### File: `src/assets/images/Maybe-Icon.png`
---

```
[Warning: Could not decode file content. It may be binary or have an unsupported encoding.]
```

---
### File: `drizzle/meta/0000_snapshot.json`
---

```json
{
  "id": "f4027b27-6d41-4f22-9a10-f7aad48bc5fd",
  "prevId": "00000000-0000-0000-0000-000000000000",
  "version": "7",
  "dialect": "postgresql",
  "tables": {
    "public.channel_stats": {
      "name": "channel_stats",
      "schema": "",
      "columns": {
        "channel_id": {
          "name": "channel_id",
          "type": "text",
          "primaryKey": true,
          "notNull": true
        },
        "messages": {
          "name": "messages",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "default": 0
        },
        "vc_hours": {
          "name": "vc_hours",
          "type": "real",
          "primaryKey": false,
          "notNull": false,
          "default": 0
        },
        "stream_hours": {
          "name": "stream_hours",
          "type": "real",
          "primaryKey": false,
          "notNull": false,
          "default": 0
        },
        "last_updated": {
          "name": "last_updated",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "default": "now()"
        }
      },
      "indexes": {},
      "foreignKeys": {
        "channel_stats_channel_id_channels_id_fk": {
          "name": "channel_stats_channel_id_channels_id_fk",
          "tableFrom": "channel_stats",
          "tableTo": "channels",
          "columnsFrom": ["channel_id"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    },
    "public.channels": {
      "name": "channels",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    },
    "public.top_channels": {
      "name": "top_channels",
      "schema": "",
      "columns": {
        "category": {
          "name": "category",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "rank": {
          "name": "rank",
          "type": "integer",
          "primaryKey": false,
          "notNull": true
        },
        "channel_id": {
          "name": "channel_id",
          "type": "text",
          "primaryKey": false,
          "notNull": false
        },
        "value": {
          "name": "value",
          "type": "real",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "top_channels_channel_id_channels_id_fk": {
          "name": "top_channels_channel_id_channels_id_fk",
          "tableFrom": "top_channels",
          "tableTo": "channels",
          "columnsFrom": ["channel_id"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "top_channels_category_rank_pk": {
          "name": "top_channels_category_rank_pk",
          "columns": ["category", "rank"]
        }
      },
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    },
    "public.top_users": {
      "name": "top_users",
      "schema": "",
      "columns": {
        "category": {
          "name": "category",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "rank": {
          "name": "rank",
          "type": "integer",
          "primaryKey": false,
          "notNull": true
        },
        "user_id": {
          "name": "user_id",
          "type": "text",
          "primaryKey": false,
          "notNull": false
        },
        "value": {
          "name": "value",
          "type": "real",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {
        "top_users_user_id_users_id_fk": {
          "name": "top_users_user_id_users_id_fk",
          "tableFrom": "top_users",
          "tableTo": "users",
          "columnsFrom": ["user_id"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "top_users_category_rank_pk": {
          "name": "top_users_category_rank_pk",
          "columns": ["category", "rank"]
        }
      },
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    },
    "public.user_stats": {
      "name": "user_stats",
      "schema": "",
      "columns": {
        "user_id": {
          "name": "user_id",
          "type": "text",
          "primaryKey": true,
          "notNull": true
        },
        "bumps": {
          "name": "bumps",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "default": 0
        },
        "messages": {
          "name": "messages",
          "type": "integer",
          "primaryKey": false,
          "notNull": false,
          "default": 0
        },
        "vc_hours": {
          "name": "vc_hours",
          "type": "real",
          "primaryKey": false,
          "notNull": false,
          "default": 0
        },
        "stream_hours": {
          "name": "stream_hours",
          "type": "real",
          "primaryKey": false,
          "notNull": false,
          "default": 0
        },
        "last_updated": {
          "name": "last_updated",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false,
          "default": "now()"
        }
      },
      "indexes": {},
      "foreignKeys": {
        "user_stats_user_id_users_id_fk": {
          "name": "user_stats_user_id_users_id_fk",
          "tableFrom": "user_stats",
          "tableTo": "users",
          "columnsFrom": ["user_id"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    },
    "public.user_vc_channel_hours": {
      "name": "user_vc_channel_hours",
      "schema": "",
      "columns": {
        "user_id": {
          "name": "user_id",
          "type": "text",
          "primaryKey": false,
          "notNull": false
        },
        "channel_id": {
          "name": "channel_id",
          "type": "text",
          "primaryKey": false,
          "notNull": false
        },
        "hours": {
          "name": "hours",
          "type": "real",
          "primaryKey": false,
          "notNull": false,
          "default": 0
        }
      },
      "indexes": {},
      "foreignKeys": {
        "user_vc_channel_hours_user_id_users_id_fk": {
          "name": "user_vc_channel_hours_user_id_users_id_fk",
          "tableFrom": "user_vc_channel_hours",
          "tableTo": "users",
          "columnsFrom": ["user_id"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "user_vc_channel_hours_channel_id_channels_id_fk": {
          "name": "user_vc_channel_hours_channel_id_channels_id_fk",
          "tableFrom": "user_vc_channel_hours",
          "tableTo": "channels",
          "columnsFrom": ["channel_id"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "user_vc_channel_hours_user_id_channel_id_pk": {
          "name": "user_vc_channel_hours_user_id_channel_id_pk",
          "columns": ["user_id", "channel_id"]
        }
      },
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    },
    "public.users": {
      "name": "users",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true
        },
        "username": {
          "name": "username",
          "type": "text",
          "primaryKey": false,
          "notNull": false
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    }
  },
  "enums": {},
  "schemas": {},
  "sequences": {},
  "roles": {},
  "policies": {},
  "views": {},
  "_meta": {
    "columns": {},
    "schemas": {},
    "tables": {}
  }
}

```

---
### File: `drizzle/meta/0001_snapshot.json`
---

```json
{
  "id": "d800efe8-9b68-4d6b-9ca9-fa3680801127",
  "prevId": "f4027b27-6d41-4f22-9a10-f7aad48bc5fd",
  "version": "7",
  "dialect": "postgresql",
  "tables": {
    "public.channels": {
      "name": "channels",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    },
    "public.daily_channel_stats": {
      "name": "daily_channel_stats",
      "schema": "",
      "columns": {
        "channel_id": {
          "name": "channel_id",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "date": {
          "name": "date",
          "type": "date",
          "primaryKey": false,
          "notNull": true
        },
        "messages": {
          "name": "messages",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "default": 0
        },
        "vc_hours": {
          "name": "vc_hours",
          "type": "real",
          "primaryKey": false,
          "notNull": true,
          "default": 0
        }
      },
      "indexes": {},
      "foreignKeys": {
        "daily_channel_stats_channel_id_channels_id_fk": {
          "name": "daily_channel_stats_channel_id_channels_id_fk",
          "tableFrom": "daily_channel_stats",
          "tableTo": "channels",
          "columnsFrom": ["channel_id"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "daily_channel_stats_channel_id_date_pk": {
          "name": "daily_channel_stats_channel_id_date_pk",
          "columns": ["channel_id", "date"]
        }
      },
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    },
    "public.daily_user_stats": {
      "name": "daily_user_stats",
      "schema": "",
      "columns": {
        "user_id": {
          "name": "user_id",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "date": {
          "name": "date",
          "type": "date",
          "primaryKey": false,
          "notNull": true
        },
        "messages": {
          "name": "messages",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "default": 0
        },
        "vc_hours": {
          "name": "vc_hours",
          "type": "real",
          "primaryKey": false,
          "notNull": true,
          "default": 0
        },
        "stream_hours": {
          "name": "stream_hours",
          "type": "real",
          "primaryKey": false,
          "notNull": true,
          "default": 0
        },
        "bumps": {
          "name": "bumps",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "default": 0
        }
      },
      "indexes": {},
      "foreignKeys": {
        "daily_user_stats_user_id_users_id_fk": {
          "name": "daily_user_stats_user_id_users_id_fk",
          "tableFrom": "daily_user_stats",
          "tableTo": "users",
          "columnsFrom": ["user_id"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "daily_user_stats_user_id_date_pk": {
          "name": "daily_user_stats_user_id_date_pk",
          "columns": ["user_id", "date"]
        }
      },
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    },
    "public.users": {
      "name": "users",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true
        },
        "username": {
          "name": "username",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    }
  },
  "enums": {},
  "schemas": {},
  "sequences": {},
  "roles": {},
  "policies": {},
  "views": {},
  "_meta": {
    "columns": {},
    "schemas": {},
    "tables": {}
  }
}

```

---
### File: `drizzle/meta/0002_snapshot.json`
---

```json
{
  "id": "6ed70b13-0d78-4404-b7e8-dc39e8e725fe",
  "prevId": "d800efe8-9b68-4d6b-9ca9-fa3680801127",
  "version": "7",
  "dialect": "postgresql",
  "tables": {
    "public.channels": {
      "name": "channels",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "type": {
          "name": "type",
          "type": "channel_type",
          "typeSchema": "public",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    },
    "public.daily_channel_stats": {
      "name": "daily_channel_stats",
      "schema": "",
      "columns": {
        "channel_id": {
          "name": "channel_id",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "date": {
          "name": "date",
          "type": "date",
          "primaryKey": false,
          "notNull": true
        },
        "messages": {
          "name": "messages",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "default": 0
        },
        "vc_hours": {
          "name": "vc_hours",
          "type": "real",
          "primaryKey": false,
          "notNull": true,
          "default": 0
        }
      },
      "indexes": {},
      "foreignKeys": {
        "daily_channel_stats_channel_id_channels_id_fk": {
          "name": "daily_channel_stats_channel_id_channels_id_fk",
          "tableFrom": "daily_channel_stats",
          "tableTo": "channels",
          "columnsFrom": ["channel_id"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "daily_channel_stats_channel_id_date_pk": {
          "name": "daily_channel_stats_channel_id_date_pk",
          "columns": ["channel_id", "date"]
        }
      },
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    },
    "public.daily_user_stats": {
      "name": "daily_user_stats",
      "schema": "",
      "columns": {
        "user_id": {
          "name": "user_id",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "date": {
          "name": "date",
          "type": "date",
          "primaryKey": false,
          "notNull": true
        },
        "messages": {
          "name": "messages",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "default": 0
        },
        "vc_hours": {
          "name": "vc_hours",
          "type": "real",
          "primaryKey": false,
          "notNull": true,
          "default": 0
        },
        "stream_hours": {
          "name": "stream_hours",
          "type": "real",
          "primaryKey": false,
          "notNull": true,
          "default": 0
        },
        "bumps": {
          "name": "bumps",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "default": 0
        }
      },
      "indexes": {},
      "foreignKeys": {
        "daily_user_stats_user_id_users_id_fk": {
          "name": "daily_user_stats_user_id_users_id_fk",
          "tableFrom": "daily_user_stats",
          "tableTo": "users",
          "columnsFrom": ["user_id"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "daily_user_stats_user_id_date_pk": {
          "name": "daily_user_stats_user_id_date_pk",
          "columns": ["user_id", "date"]
        }
      },
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    },
    "public.users": {
      "name": "users",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true
        },
        "username": {
          "name": "username",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    }
  },
  "enums": {
    "public.channel_type": {
      "name": "channel_type",
      "schema": "public",
      "values": ["text", "voice"]
    }
  },
  "schemas": {},
  "sequences": {},
  "roles": {},
  "policies": {},
  "views": {},
  "_meta": {
    "columns": {},
    "schemas": {},
    "tables": {}
  }
}

```

---
### File: `drizzle/meta/0003_snapshot.json`
---

```json
{
  "id": "02574a25-6b7a-4a39-8dfd-65caec90aefd",
  "prevId": "6ed70b13-0d78-4404-b7e8-dc39e8e725fe",
  "version": "7",
  "dialect": "postgresql",
  "tables": {
    "public.active_vc_sessions": {
      "name": "active_vc_sessions",
      "schema": "",
      "columns": {
        "user_id": {
          "name": "user_id",
          "type": "text",
          "primaryKey": true,
          "notNull": true
        },
        "channel_id": {
          "name": "channel_id",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "join_time": {
          "name": "join_time",
          "type": "timestamp with time zone",
          "primaryKey": false,
          "notNull": true
        },
        "is_streaming": {
          "name": "is_streaming",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "default": false
        },
        "stream_start_time": {
          "name": "stream_start_time",
          "type": "timestamp with time zone",
          "primaryKey": false,
          "notNull": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "active_vc_sessions_user_id_users_id_fk": {
          "name": "active_vc_sessions_user_id_users_id_fk",
          "tableFrom": "active_vc_sessions",
          "tableTo": "users",
          "columnsFrom": ["user_id"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "active_vc_sessions_channel_id_channels_id_fk": {
          "name": "active_vc_sessions_channel_id_channels_id_fk",
          "tableFrom": "active_vc_sessions",
          "tableTo": "channels",
          "columnsFrom": ["channel_id"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    },
    "public.channels": {
      "name": "channels",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "type": {
          "name": "type",
          "type": "channel_type",
          "typeSchema": "public",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    },
    "public.daily_channel_stats": {
      "name": "daily_channel_stats",
      "schema": "",
      "columns": {
        "channel_id": {
          "name": "channel_id",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "date": {
          "name": "date",
          "type": "date",
          "primaryKey": false,
          "notNull": true
        },
        "messages": {
          "name": "messages",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "default": 0
        },
        "vc_hours": {
          "name": "vc_hours",
          "type": "real",
          "primaryKey": false,
          "notNull": true,
          "default": 0
        }
      },
      "indexes": {},
      "foreignKeys": {
        "daily_channel_stats_channel_id_channels_id_fk": {
          "name": "daily_channel_stats_channel_id_channels_id_fk",
          "tableFrom": "daily_channel_stats",
          "tableTo": "channels",
          "columnsFrom": ["channel_id"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "daily_channel_stats_channel_id_date_pk": {
          "name": "daily_channel_stats_channel_id_date_pk",
          "columns": ["channel_id", "date"]
        }
      },
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    },
    "public.daily_user_stats": {
      "name": "daily_user_stats",
      "schema": "",
      "columns": {
        "user_id": {
          "name": "user_id",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "date": {
          "name": "date",
          "type": "date",
          "primaryKey": false,
          "notNull": true
        },
        "messages": {
          "name": "messages",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "default": 0
        },
        "vc_hours": {
          "name": "vc_hours",
          "type": "real",
          "primaryKey": false,
          "notNull": true,
          "default": 0
        },
        "stream_hours": {
          "name": "stream_hours",
          "type": "real",
          "primaryKey": false,
          "notNull": true,
          "default": 0
        },
        "bumps": {
          "name": "bumps",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "default": 0
        }
      },
      "indexes": {},
      "foreignKeys": {
        "daily_user_stats_user_id_users_id_fk": {
          "name": "daily_user_stats_user_id_users_id_fk",
          "tableFrom": "daily_user_stats",
          "tableTo": "users",
          "columnsFrom": ["user_id"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "daily_user_stats_user_id_date_pk": {
          "name": "daily_user_stats_user_id_date_pk",
          "columns": ["user_id", "date"]
        }
      },
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    },
    "public.users": {
      "name": "users",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true
        },
        "username": {
          "name": "username",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    }
  },
  "enums": {
    "public.channel_type": {
      "name": "channel_type",
      "schema": "public",
      "values": ["text", "voice"]
    }
  },
  "schemas": {},
  "sequences": {},
  "roles": {},
  "policies": {},
  "views": {},
  "_meta": {
    "columns": {},
    "schemas": {},
    "tables": {}
  }
}

```

---
### File: `drizzle/meta/0004_snapshot.json`
---

```json
{
  "id": "171e64e5-72bc-4c04-8a88-22c9715f34b6",
  "prevId": "02574a25-6b7a-4a39-8dfd-65caec90aefd",
  "version": "7",
  "dialect": "postgresql",
  "tables": {
    "public.active_vc_sessions": {
      "name": "active_vc_sessions",
      "schema": "",
      "columns": {
        "user_id": {
          "name": "user_id",
          "type": "text",
          "primaryKey": true,
          "notNull": true
        },
        "channel_id": {
          "name": "channel_id",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "join_time": {
          "name": "join_time",
          "type": "timestamp with time zone",
          "primaryKey": false,
          "notNull": true
        },
        "is_streaming": {
          "name": "is_streaming",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "default": false
        },
        "stream_start_time": {
          "name": "stream_start_time",
          "type": "timestamp with time zone",
          "primaryKey": false,
          "notNull": false
        }
      },
      "indexes": {},
      "foreignKeys": {
        "active_vc_sessions_user_id_users_id_fk": {
          "name": "active_vc_sessions_user_id_users_id_fk",
          "tableFrom": "active_vc_sessions",
          "tableTo": "users",
          "columnsFrom": ["user_id"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        },
        "active_vc_sessions_channel_id_channels_id_fk": {
          "name": "active_vc_sessions_channel_id_channels_id_fk",
          "tableFrom": "active_vc_sessions",
          "tableTo": "channels",
          "columnsFrom": ["channel_id"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    },
    "public.channels": {
      "name": "channels",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "type": {
          "name": "type",
          "type": "channel_type",
          "typeSchema": "public",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    },
    "public.confessions": {
      "name": "confessions",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "integer",
          "primaryKey": true,
          "notNull": true
        },
        "message_id": {
          "name": "message_id",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    },
    "public.daily_channel_stats": {
      "name": "daily_channel_stats",
      "schema": "",
      "columns": {
        "channel_id": {
          "name": "channel_id",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "date": {
          "name": "date",
          "type": "date",
          "primaryKey": false,
          "notNull": true
        },
        "messages": {
          "name": "messages",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "default": 0
        },
        "vc_hours": {
          "name": "vc_hours",
          "type": "real",
          "primaryKey": false,
          "notNull": true,
          "default": 0
        }
      },
      "indexes": {},
      "foreignKeys": {
        "daily_channel_stats_channel_id_channels_id_fk": {
          "name": "daily_channel_stats_channel_id_channels_id_fk",
          "tableFrom": "daily_channel_stats",
          "tableTo": "channels",
          "columnsFrom": ["channel_id"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "daily_channel_stats_channel_id_date_pk": {
          "name": "daily_channel_stats_channel_id_date_pk",
          "columns": ["channel_id", "date"]
        }
      },
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    },
    "public.daily_user_stats": {
      "name": "daily_user_stats",
      "schema": "",
      "columns": {
        "user_id": {
          "name": "user_id",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "date": {
          "name": "date",
          "type": "date",
          "primaryKey": false,
          "notNull": true
        },
        "messages": {
          "name": "messages",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "default": 0
        },
        "vc_hours": {
          "name": "vc_hours",
          "type": "real",
          "primaryKey": false,
          "notNull": true,
          "default": 0
        },
        "stream_hours": {
          "name": "stream_hours",
          "type": "real",
          "primaryKey": false,
          "notNull": true,
          "default": 0
        },
        "bumps": {
          "name": "bumps",
          "type": "integer",
          "primaryKey": false,
          "notNull": true,
          "default": 0
        }
      },
      "indexes": {},
      "foreignKeys": {
        "daily_user_stats_user_id_users_id_fk": {
          "name": "daily_user_stats_user_id_users_id_fk",
          "tableFrom": "daily_user_stats",
          "tableTo": "users",
          "columnsFrom": ["user_id"],
          "columnsTo": ["id"],
          "onDelete": "no action",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {
        "daily_user_stats_user_id_date_pk": {
          "name": "daily_user_stats_user_id_date_pk",
          "columns": ["user_id", "date"]
        }
      },
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    },
    "public.users": {
      "name": "users",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "text",
          "primaryKey": true,
          "notNull": true
        },
        "username": {
          "name": "username",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    }
  },
  "enums": {
    "public.channel_type": {
      "name": "channel_type",
      "schema": "public",
      "values": ["text", "voice"]
    }
  },
  "schemas": {},
  "sequences": {},
  "roles": {},
  "policies": {},
  "views": {},
  "_meta": {
    "columns": {},
    "schemas": {},
    "tables": {}
  }
}

```

---
### File: `drizzle/meta/_journal.json`
---

```json
{
  "version": "7",
  "dialect": "postgresql",
  "entries": [
    {
      "idx": 0,
      "version": "7",
      "when": 1759262101427,
      "tag": "0000_common_doctor_spectrum",
      "breakpoints": true
    },
    {
      "idx": 1,
      "version": "7",
      "when": 1759275112541,
      "tag": "0001_parallel_namorita",
      "breakpoints": true
    },
    {
      "idx": 2,
      "version": "7",
      "when": 1759285011085,
      "tag": "0002_confused_talos",
      "breakpoints": true
    },
    {
      "idx": 3,
      "version": "7",
      "when": 1759542140713,
      "tag": "0003_nebulous_carnage",
      "breakpoints": true
    },
    {
      "idx": 4,
      "version": "7",
      "when": 1759543937666,
      "tag": "0004_low_tyrannus",
      "breakpoints": true
    }
  ]
}

```

---
### File: `.husky/_/.gitignore`
---

```
*
```

---
### File: `.husky/_/h`
---

```
#!/usr/bin/env sh
[ "$HUSKY" = "2" ] && set -x
n=$(basename "$0")
s=$(dirname "$(dirname "$0")")/$n

[ ! -f "$s" ] && exit 0

if [ -f "$HOME/.huskyrc" ]; then
	echo "husky - '~/.huskyrc' is DEPRECATED, please move your code to ~/.config/husky/init.sh"
fi
i="${XDG_CONFIG_HOME:-$HOME/.config}/husky/init.sh"
[ -f "$i" ] && . "$i"

[ "${HUSKY-}" = "0" ] && exit 0

export PATH="node_modules/.bin:$PATH"
sh -e "$s" "$@"
c=$?

[ $c != 0 ] && echo "husky - $n script failed (code $c)"
[ $c = 127 ] && echo "husky - command not found in PATH=$PATH"
exit $c

```

---
### File: `.husky/_/pre-commit`
---

```
#!/usr/bin/env sh
. "$(dirname "$0")/h"
```

---
### File: `.husky/_/pre-merge-commit`
---

```
#!/usr/bin/env sh
. "$(dirname "$0")/h"
```

---
### File: `.husky/_/prepare-commit-msg`
---

```
#!/usr/bin/env sh
. "$(dirname "$0")/h"
```

---
### File: `.husky/_/commit-msg`
---

```
#!/usr/bin/env sh
. "$(dirname "$0")/h"
```

---
### File: `.husky/_/post-commit`
---

```
#!/usr/bin/env sh
. "$(dirname "$0")/h"
```

---
### File: `.husky/_/applypatch-msg`
---

```
#!/usr/bin/env sh
. "$(dirname "$0")/h"
```

---
### File: `.husky/_/pre-applypatch`
---

```
#!/usr/bin/env sh
. "$(dirname "$0")/h"
```

---
### File: `.husky/_/post-applypatch`
---

```
#!/usr/bin/env sh
. "$(dirname "$0")/h"
```

---
### File: `.husky/_/pre-rebase`
---

```
#!/usr/bin/env sh
. "$(dirname "$0")/h"
```

---
### File: `.husky/_/post-rewrite`
---

```
#!/usr/bin/env sh
. "$(dirname "$0")/h"
```

---
### File: `.husky/_/post-checkout`
---

```
#!/usr/bin/env sh
. "$(dirname "$0")/h"
```

---
### File: `.husky/_/post-merge`
---

```
#!/usr/bin/env sh
. "$(dirname "$0")/h"
```

---
### File: `.husky/_/pre-push`
---

```
#!/usr/bin/env sh
. "$(dirname "$0")/h"
```

---
### File: `.husky/_/pre-auto-gc`
---

```
#!/usr/bin/env sh
. "$(dirname "$0")/h"
```

---
### File: `.husky/_/husky.sh`
---

```sh
echo "husky - DEPRECATED

Please remove the following two lines from $0:

#!/usr/bin/env sh
. \"\$(dirname -- \"\$0\")/_/husky.sh\"

They WILL FAIL in v10.0.0
"
```

