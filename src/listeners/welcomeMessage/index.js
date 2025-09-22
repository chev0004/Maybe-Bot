import { EmbedBuilder, PermissionsBitField } from "discord.js";
import { Colors } from "../../constants/Colors.js";
import {
  getStickyMessageId,
  setStickyMessageId,
} from "../../utils/dataManager.js";
import { createListener } from "../../utils/listenerBuilder.js";

const SPAM_THRESHOLD_COUNT = 3;
const SPAM_TIMEFRAME_MS = 60 * 1000;
const SPAM_COOLDOWN_MS = 5 * 60 * 1000;

const userSubmissionAttempts = new Map();

const WELCOME_CHANNEL_ID = process.env.WELCOME_CHANNEL_ID;
const WELCOME_ROLE_ID = process.env.VERIFIED_ROLE_ID;

const CORRECT_TEMPLATE_HEADERS = [
  "【名前/Name】",
  "【出身/Country】",
  "【言語/Language】",
  "【勉強/Studying】",
  "【趣味/Hobby】",
  "【一言/Intro】",
];

const CORRECT_TEMPLATE_STRING = CORRECT_TEMPLATE_HEADERS.join("\n");

/**
 * Creates a pointer line with appropriate spacing for full-width and half-width characters.
 * @param {string} line The content of the line with the error.
 * @param {number} errorIndex The index in the line where the error occurred.
 * @returns {string} A string with mixed spaces and a '^' to point at the error.
 */
const createAlignmentPointer = (line, errorIndex) => {
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

const validateWelcomeMessage = (content) => {
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
    const channel = message.channel;
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
      if (WELCOME_ROLE_ID) {
        const roleToAssign = guild.roles.cache.get(WELCOME_ROLE_ID);
        if (!roleToAssign) {
          console.error(
            `welcomeMessage listener: Welcome role (ID: ${WELCOME_ROLE_ID}) not found in guild ${guild.id}.`,
          );
        } else {
          if (!member.roles.cache.has(WELCOME_ROLE_ID)) {
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
            const oldStickyMessage = await channel.messages.fetch(
              botStickyMessageId,
              { force: true, cache: false },
            );
            if (
              oldStickyMessage?.deletable &&
              channelPermissions.has(PermissionsBitField.Flags.ManageMessages)
            ) {
              await oldStickyMessage.delete();
            }
          } catch (error) {
            if (error.code !== 10008) {
              console.warn(
                "welcomeMessage listener: Error deleting old sticky message:",
                error.message,
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
        console.error(
          "welcomeMessage listener: Error handling sticky message for correctly formatted welcome:",
          error,
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
          (ts) => now - ts < SPAM_TIMEFRAME_MS,
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
          let deletedMessageFieldValue;
          let errorReasonFieldValue;

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
            const contentToShow = error.problematicContent.substring(0, 950);
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
                value: errorReasonFieldValue,
              },
              {
                name: "正しいテンプレート / Correct Template",
                value: `\`\`\`\n${CORRECT_TEMPLATE_STRING}\n\`\`\``,
              },
              {
                name: "削除されたメッセージ / Deleted Message",
                value: deletedMessageFieldValue,
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
              console.warn(
                `welcomeMessage listener: Failed to DM user ${author.tag} about spamming:`,
                dmError.message,
              );
            }
          }
        }
      } catch (error) {
        console.error(
          "welcomeMessage listener: Error handling incorrectly formatted welcome message:",
          error,
        );
      }
    }
  },
  { channels: [WELCOME_CHANNEL_ID] },
);
