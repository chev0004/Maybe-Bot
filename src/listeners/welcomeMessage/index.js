import { EmbedBuilder, PermissionsBitField } from "discord.js";
import { Colors } from "../../constants/Colors.js";
import { getData, saveData } from "../../utils/dataManager.js";

const SPAM_THRESHOLD_COUNT = 3;
const SPAM_TIMEFRAME_MS = 60 * 1000;
const SPAM_COOLDOWN_MS = 5 * 60 * 1000;

const userSubmissionAttempts = new Map();

const WELCOME_CHANNEL_ID = process.env.WELCOME_CHANNEL_ID;
const WELCOME_ROLE_ID = process.env.VERIFIED_ROLE_ID;

const CORRECT_TEMPLATE_HEADERS = [
  "【名前/Name】", "【出身/Country】", "【言語/Language】", "【勉強/Studying】", "【趣味/Hobby】", "【一言/Intro】",
];

const CORRECT_TEMPLATE_STRING = CORRECT_TEMPLATE_HEADERS.join("\n");

function createAlignmentPointer(line, errorIndex) {
  const specificFullWidthRegex = /[【】名前出身言語勉強趣味一]/;
  const pointerParts = [];
  
  for (let i = 0; i < line.length; i++) {
    if (i === errorIndex) {
      pointerParts.push("^");
      break;
    }
    pointerParts.push(specificFullWidthRegex.test(line[i]) ? "　" : " ");
  }
  return pointerParts.join("");
}

function validateWelcomeMessage(content) {
  const messageLines = content.split("\n");
  for (let i = 0; i < CORRECT_TEMPLATE_HEADERS.length; i++) {
    const expectedHeader = CORRECT_TEMPLATE_HEADERS[i];
    if (i >= messageLines.length || messageLines[i].trim() === "") {
      return { isValid: false, error: { type: "MISSING_LINE", message: `The line for "${expectedHeader}" is missing.`, problematicContent: messageLines.slice(0, i).join("\n") || "(Your message was empty)", expectedHeader } };
    }
    const userLine = messageLines[i];
    if (userLine.trimRight().startsWith(expectedHeader)) continue;
    let diffIndex = 0;
    while (diffIndex < expectedHeader.length && diffIndex < userLine.length && expectedHeader[diffIndex] === userLine[diffIndex]) diffIndex++;
    return { isValid: false, error: { type: "INVALID_LINE", message: `Line ${i + 1} has a format error.`, lineNumber: i, lineContent: userLine, expectedHeader, charIndex: diffIndex } };
  }
  return { isValid: true };
}

export default {
  name: "welcomeMessageFormatChecker",
  event: "messageCreate",
  async execute(message) {
    if (!WELCOME_CHANNEL_ID || message.author.bot || message.channel.id !== WELCOME_CHANNEL_ID) {
      return;
    }
    
    const channel = message.channel;
    const author = message.author;
    const member = message.member;
    const guild = message.guild;
    const now = Date.now();
    if (!guild || !member) return;
    const botMember = guild.members.me;
    if (!botMember) return;
    const channelPermissions = channel.permissionsFor(botMember);
    if (!channelPermissions || !channelPermissions.has(PermissionsBitField.Flags.SendMessages) || !channelPermissions.has(PermissionsBitField.Flags.ViewChannel)) return;

    const validationResult = validateWelcomeMessage(message.content);

    if (validationResult.isValid) {
      if (WELCOME_ROLE_ID) {
        const roleToAssign = guild.roles.cache.get(WELCOME_ROLE_ID);
        if (roleToAssign && !member.roles.cache.has(WELCOME_ROLE_ID)) {
          if (botMember.permissions.has(PermissionsBitField.Flags.ManageRoles) && botMember.roles.highest.position > roleToAssign.position) {
            try {
              await member.roles.add(roleToAssign);
            } catch (error) {
              console.error(`Failed to assign role:`, error);
            }
          }
        }
      }

      try {
        const botStickyMessageId = getData().welcome.botStickyMessageId;
        if (botStickyMessageId) {
          try {
            const oldStickyMessage = await channel.messages.fetch(botStickyMessageId, { force: true, cache: false });
            if (oldStickyMessage && oldStickyMessage.deletable && channelPermissions.has(PermissionsBitField.Flags.ManageMessages)) {
              await oldStickyMessage.delete();
            }
          } catch (error) {
            if (error.code !== 10008) console.warn("Error deleting old sticky message:", error.message);
          }
        }

        const stickyEmbed = new EmbedBuilder()
          .setColor(Colors.green)
          .setTitle("自己紹介へようこそ！")
          .setDescription(`以下のテンプレートを使用して自己紹介をお願いします：\n\`\`\`\n${CORRECT_TEMPLATE_STRING}\n\`\`\``)
          .setFooter({ text: "このメッセージは新しい自己紹介が投稿されると更新されます。" });

        if (channelPermissions.has(PermissionsBitField.Flags.SendMessages)) {
          const newStickyMessage = await channel.send({ embeds: [stickyEmbed] });
          getData().welcome.botStickyMessageId = newStickyMessage.id;
          await saveData();
        }
      } catch (error) {
        console.error("Error handling sticky message:", error);
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
          channelPermissions.has(PermissionsBitField.Flags.ManageMessages)
        ) {
          await message.delete();
        }

        if (!isCurrentlySpamming) {
          const error = validationResult.error;
          let deletedMessageFieldValue;
          let errorReasonFieldValue;

          if (error.type === "INVALID_LINE") {
            const pointer = createAlignmentPointer(
              error.lineContent,
              error.charIndex
            );
            deletedMessageFieldValue = `\`\`\`\n${error.lineContent.substring(0, 950)}\n${pointer}\n\`\`\``;
            errorReasonFieldValue = `The format on line ${error.lineNumber + 1} is incorrect. It should start with \`${error.expectedHeader}\`.`;
          } else if (error.type === "MISSING_LINE") {
            deletedMessageFieldValue = `\`\`\`\n${error.problematicContent.substring(0, 950)}\n<-- The line for "${error.expectedHeader}" is missing here.\n\`\`\``;
            errorReasonFieldValue = `You seem to be missing the line for \`${error.expectedHeader}\`.`;
          }

          const feedbackEmbed = new EmbedBuilder()
            .setColor(Colors.red)
            .setTitle("自己紹介の形式エラー")
            .setDescription(`投稿していただいた自己紹介は、形式が正しくなかったため削除されました。`)
            .addFields(
              { name: "エラーの理由 / Reason", value: errorReasonFieldValue },
              { name: "正しいテンプレート / Correct Template", value: `\`\`\`\n${CORRECT_TEMPLATE_STRING}\n\`\`\`` },
              { name: "削除されたメッセージ / Deleted Message", value: deletedMessageFieldValue }
            )
            .setTimestamp();
            
          await channel.send({ content: author.toString(), embeds: [feedbackEmbed] });

        } else if (!attempts.spamNotifiedAt) {
            attempts.spamNotifiedAt = now;
            try {
              const spamDmEmbed = new EmbedBuilder()
                .setColor(Colors.yellow)
                .setTitle("形式エラーのメッセージ送信頻度について")
                .setDescription(`自己紹介チャンネルで、形式が正しくないメッセージを短時間に複数回送信されたため、一時的にチャンネルでのフィードバックを停止します。\n\n正しいテンプレートをご確認の上、しばらく時間をおいてから再度お試しください。\n（この通知から${Math.floor(SPAM_COOLDOWN_MS / 60000)}分間はフィードバックが抑制されます）`)
                .addFields({ name: "正しいテンプレート", value: `\`\`\`\n${CORRECT_TEMPLATE_STRING}\n\`\`\`` });
              await author.send({ embeds: [spamDmEmbed] });
            } catch (dmError) {
              console.warn(`Failed to DM user ${author.tag} about spamming:`, dmError.message);
            }
        }
      } catch (error) {
        console.error("Error handling incorrect welcome message:", error);
      }
    }
  },
};