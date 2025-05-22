import { EmbedBuilder, PermissionsBitField } from "discord.js";
import { Colors } from "../../constants/Colors.js";

const SPAM_THRESHOLD_COUNT = 3;
const SPAM_TIMEFRAME_MS = 60 * 1000;
const SPAM_COOLDOWN_MS = 5 * 60 * 1000;

let botStickyMessageId = null;
const userSubmissionAttempts = new Map();

const WELCOME_CHANNEL_ID = process.env.WELCOME_CHANNEL_ID;

const CORRECT_TEMPLATE_HEADERS = [
  "【名前/Name】",
  "【出身/Country】",
  "【言語/Language】",
  "【勉強/Studying】",
  "【趣味/Hobby】",
  "【一言/Intro】",
];

const CORRECT_TEMPLATE_STRING = CORRECT_TEMPLATE_HEADERS.join("\n");

function isValidWelcomeMessage(content) {
  const messageLines = content.split("\n");
  if (messageLines.length < CORRECT_TEMPLATE_HEADERS.length) {
    return false;
  }
  for (let i = 0; i < CORRECT_TEMPLATE_HEADERS.length; i++) {
    if (!messageLines[i].trimRight().startsWith(CORRECT_TEMPLATE_HEADERS[i])) {
      return false;
    }
  }
  return true;
}

export default {
  name: "welcomeMessageFormatChecker",
  event: "messageCreate",
  async execute(message, client) {
    if (!WELCOME_CHANNEL_ID) {
      return;
    }

    if (message.author.bot || message.channel.id !== WELCOME_CHANNEL_ID) {
      return;
    }

    const channel = message.channel;
    const author = message.author;
    const now = Date.now();

    if (channel.isTextBased() && channel.guild) {
      const botMember = channel.guild.members.me;
      if (botMember) {
        const permissions = channel.permissionsFor(botMember);
        if (
          !permissions.has(PermissionsBitField.Flags.SendMessages) ||
          !permissions.has(PermissionsBitField.Flags.ViewChannel)
        ) {
          return;
        }
      }
    }

    if (isValidWelcomeMessage(message.content)) {
      try {
        if (botStickyMessageId) {
          try {
            const oldStickyMessage = await channel.messages.fetch(
              botStickyMessageId
            );
            if (
              oldStickyMessage &&
              oldStickyMessage.deletable &&
              channel
                .permissionsFor(client.user)
                ?.has(PermissionsBitField.Flags.ManageMessages)
            ) {
              await oldStickyMessage.delete();
            }
          } catch (error) {
            if (error.code !== 10008) {
            }
          }
          botStickyMessageId = null;
        }

        const stickyEmbed = new EmbedBuilder()
          .setColor(Colors.green)
          .setTitle("自己紹介へようこそ！")
          .setDescription(
            `以下のテンプレートを使用して自己紹介をお願いします：\n\`\`\`\n${CORRECT_TEMPLATE_STRING}\n\`\`\`\n`
          )
          .setFooter({
            text: "このメッセージは新しい自己紹介が投稿されると更新されます。",
          });

        if (
          channel
            .permissionsFor(client.user)
            ?.has(PermissionsBitField.Flags.SendMessages)
        ) {
          const newStickyMessage = await channel.send({
            embeds: [stickyEmbed],
          });
          botStickyMessageId = newStickyMessage.id;
        }
      } catch (error) {
        console.error(
          "Error handling correctly formatted welcome message:",
          error
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
          (ts) => now - ts < SPAM_TIMEFRAME_MS
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
          channel
            .permissionsFor(client.user)
            ?.has(PermissionsBitField.Flags.ManageMessages)
        ) {
          await message.delete();
        }

        if (!isCurrentlySpamming) {
          const userMessageSnippet =
            message.content.length > 800
              ? message.content.substring(0, 800) + "..."
              : message.content;

          const feedbackEmbed = new EmbedBuilder()
            .setColor(Colors.red)
            .setTitle("自己紹介の形式エラー")
            .setDescription(
              `投稿していただいた自己紹介は、形式が正しくなかったため削除されました。以下の正しいテンプレートをご利用の上、もう一度投稿してください。`
            )
            .addFields(
              {
                name: "正しいテンプレート / Correct Template",
                value: `\`\`\`\n${CORRECT_TEMPLATE_STRING}\n\`\`\``,
              },
              {
                name: "削除されたメッセージ / Deleted Message",
                value: `\`\`\`\n${userMessageSnippet}\n\`\`\``,
              }
            )
            .setTimestamp();

          if (
            channel
              .permissionsFor(client.user)
              ?.has(PermissionsBitField.Flags.SendMessages)
          ) {
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
                    SPAM_COOLDOWN_MS / 60000
                  )}分間はフィードバックが抑制されます）`
                )
                .addFields({
                  name: "正しいテンプレート",
                  value: `\`\`\`\n${CORRECT_TEMPLATE_STRING}\n\`\`\``,
                })
                .setTimestamp();
              await author.send({ embeds: [spamDmEmbed] });
            } catch (dmError) {}
          }
        }
      } catch (error) {
        console.error(
          "Error handling incorrectly formatted welcome message:",
          error
        );
      }
    }
  },
};
