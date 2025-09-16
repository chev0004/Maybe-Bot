import {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} from "discord.js";

const channelTopicMap = new Map([
  [
    "1268080191641747467", // 📢発表｜announcements
    "サーバーからの最新情報や大事なお知らせを確認できるチャンネル\nStay updated with server-wide announcements and important news",
  ],
  [
    "1265539750589104160", // 📜ルール｜rules
    "サーバーでのルールを確認する場所。参加前に必ず読んでね！\nCheck here for server rules. Please read before participating!",
  ],
  [
    "1351173422461354034", // 📝マイクラルール｜minecraft-rules
    "サーバー内マイクラの専用ルール。プレイ前に確認必須！\nMinecraft server-specific rules. Please review before playing!",
  ],
  [
    "1351342345387380780", // 🧭マイクラ接続方法｜minecraft-server-guides
    "マイクラ鯖への接続方法やガイドはこちら\nGuides and instructions for connecting to our Minecraft server",
  ],
  [
    "1265539750589104161", // モデレイターオンリー
    "モデレーター専用。運営用の内部連絡チャンネル\nFor moderators only. Internal management discussions",
  ],
  [
    "1265544236582043728", // 🌟雑談｜general
    "なんでも気軽に話せるメインチャット\nMain channel for general chit-chat about anything",
  ],
  [
    "1265546681118752819", // 🌟雑談2｜general2
    "人が多い時やサブ用の雑談スペース\nExtra space for general chat when the main one is busy",
  ],
  [
    "1265547718559010946", // 🇯🇵日本語｜jp-only
    "日本語だけで会話するチャンネル\nChat in Japanese only",
  ],
  [
    "1265547794236702864", // 🇬🇧英語｜en-only
    "英語のみで会話するチャンネル\nChat in English only",
  ],
  [
    "1265550664121978970", // 😖呟き｜vent
    "気持ちの吐き出し・悩み相談用\nA safe space to vent frustrations or share feelings",
  ],
  [
    "1265549651579244616", // 🙋質問｜questions
    "勉強に関する質問を気軽にどうぞ！\nAsk any study-related questions here!",
  ],
  [
    "1268078843365818399", // 📚文法｜grammar
    "文法に関する質問や解説を共有\nDiscuss and ask about grammar points",
  ],
  [
    "1268079139081031756", // 🗂単語｜vocabulary
    "新しい単語を学んだり質問する場所\nShare, learn, and ask about vocabulary",
  ],
  [
    "1268079221243248691", // 🗣発音｜pronunciation
    "発音練習・質問用\nPractice and ask questions about pronunciation",
  ],
  [
    "1268079516245557310", // 📝読み書き｜reading-writing
    "読解や作文を練習するチャンネル\nFor practicing reading comprehension and writing",
  ],
  [
    "1268083009974698028", // 📺アニメ・漫画｜anime-manga
    "アニメ・マンガについて自由に語ろう！\nDiscuss and share about anime and manga",
  ],
  [
    "1268082629568102431", // 🎬映画｜movies
    "映画の感想・おすすめを話そう\nTalk about your favorite movies and recommendations",
  ],
  [
    "1268082475326898237", // 🎵音楽｜music
    "音楽全般の話題・シェア用\nShare and discuss music of all genres",
  ],
  [
    "1270581964939989174", // 🍛ご飯｜food
    "食べ物や料理について話すチャンネル\nChat about food, cooking, and tasty finds",
  ],
  [
    "1269835085113462885", // 🛩旅行｜travel
    "行ったことのある場所や旅行情報をシェア！\nShare travel pics, stories and tips",
  ],
  [
    "1337053599938641921", // 🏞景色｜scenery
    "景色・自然・写真を投稿しよう\nPost and enjoy pictures of scenery and nature",
  ],
  [
    "1339889024298389524", // 🐾動物｜animals
    "ペットや動物に関する話題用\nTalk and share about pets and animals",
  ],
  [
    "1395241410642579609", // 💪筋トレ｜fitness
    "筋トレや健康の話を共有\nDiscuss fitness, workouts, and health tips",
  ],
  [
    "1336562147744026624", // 💻機械｜tech
    "テクノロジーやプログラミングの話題\nTalk about technology, programming, gadgets, and innovations",
  ],
  [
    "1268084247391109211", // 🔖作品｜opus
    "自作の作品や創作物をシェア！\nShare your creations and original works",
  ],
  [
    "1265550621474427020", // 😎自慢｜show-off
    "自分の誇れることを披露する場所\nShow off your achievements or cool stuff",
  ],
  [
    "1265550731784618005", // 🎨お絵描き｜drawings
    "描いたイラストを投稿してね！\nShare your drawings and art",
  ],
  [
    "1268082410445340675", // 🎮ゲーム｜games
    "ゲームに関する雑談や情報交換\nTalk and share about games",
  ],
  [
    "1268082743720284223", // 😂ミーム｜memes
    "面白いミームを投稿する場所\nShare funny memes",
  ],
  [
    "1265834440416952431", // 🍑しりとり｜shiritori
    "日本語でしりとりしよう！\nPlay shiritori here",
  ],
  [
    "1336569140885848084", // 🍑英語しりとり｜en-shiritori
    "英語でしりとりを楽しもう！\nPlay shiritori in English!",
  ],
  [
    "1347451905277820999", // 📝日記｜diaries
    "自分の日記や近況を書いて共有\nWrite and share diary-style updates",
  ],
  [
    "1417284953325961376", // 🤫匿名｜anonymous
    "匿名で秘密や本音を共有できる場所\nPost confessions or thoughts anonymously",
  ],
  [
    "1350684629010485248", // ⛏マイクラ｜minecraft
    "マイクラ関連の話題・スクショ投稿可\nTalk about Minecraft and share screenshots",
  ],
  [
    "1266937597872312382", // 📸スクショ｜screenshots
    "面白い・カッコいいスクショを投稿！\nPost funny or cool screenshots",
  ],
  [
    "1270266441651982416", // 🤖ボット用｜bot-commands
    "ボット用コマンドをここで入力\nUse bot commands here",
  ],
  [
    "1273075573266059376", // 🎙vcログ｜vc-logs
    "VC参加ログを確認できる場所\nLogs of who joined or left voice chats",
  ],
]);

export default {
  data: new SlashCommandBuilder()
    .setName("settopics")
    .setDescription("Sets channel topics in bulk based on a predefined list.")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const guild = interaction.guild;
    const updatedChannels = [];
    const skippedChannels = [];
    const failedChannels = [];

    for (const [channelId, newTopic] of channelTopicMap.entries()) {
      const channel = await guild.channels.fetch(channelId).catch(() => null);

      if (!channel) {
        failedChannels.push({ id: channelId, reason: "Channel not found." });
        continue;
      }

      if (typeof channel.setTopic !== "function") {
        failedChannels.push({ name: channel.name, reason: "Does not support topics." });
        continue;
      }

      if (channel.topic === newTopic) {
        skippedChannels.push(channel.name);
        continue;
      }

      try {
        await channel.setTopic(newTopic);
        updatedChannels.push(channel.name);
      } catch (error) {
        console.error(`Failed to update topic for ${channel.name}:`, error);
        failedChannels.push({ name: channel.name, reason: error.message });
      }
    }

    const embed = new EmbedBuilder()
      .setTitle("Channel Topic Update Report")
      .setColor("#5865F2")
      .setTimestamp();

    if (updatedChannels.length > 0) {
      embed.addFields({
        name: `✅ Updated (${updatedChannels.length})`,
        value: updatedChannels.map(name => `- ${name}`).join('\n').substring(0, 1024)
      });
    }

    if (skippedChannels.length > 0) {
      embed.addFields({
        name: `⏭️ Skipped (${skippedChannels.length}) - Already up-to-date`,
        value: skippedChannels.map(name => `- ${name}`).join('\n').substring(0, 1024)
      });
    }

    if (failedChannels.length > 0) {
      embed.addFields({
        name: `❌ Failed (${failedChannels.length})`,
        value: failedChannels.map(f => `- ${f.name || f.id}: ${f.reason}`).join('\n').substring(0, 1024)
      });
    }
    
    if (updatedChannels.length === 0 && skippedChannels.length === 0 && failedChannels.length === 0) {
        embed.setDescription("No channels matched the predefined list.");
    }

    await interaction.editReply({ embeds: [embed] });
  },
};