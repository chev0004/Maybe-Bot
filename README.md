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

### 🧭 マネジメント | Management

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
   `git clone https://github.com/chev0004/Maybe-Bot.git`
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

Maybe-Bot began as a way to bring new, fun, and useful features to my Discord community. As I started building it, the project also became the perfect opportunity to apply the architectural patterns and modern tooling I used in my professional work. My interest in language learning also found its place, leading me to develop the bot to be fully bilingual, creating a unique tool that reflects my passions for coding, community, and language.

---
