import { EmbedBuilder } from "discord.js";
import { Colors } from "../../../constants/Colors.js";
import { createCommand } from "../../../utils/builders/commandBuilder.js";

/**
 * Parses the Exaroton API error for a user-friendly message.
 * @param {Error} error The error object from the catch block.
 * @returns {string} A formatted error message.
 */
const parseExarotonError = (error) => {
  let errorMessage = error.message || "An unknown error occurred.";

  const parseBody = (body) => {
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

  const body = error.response?.body || error.body;
  if (body && typeof body === "string") {
    const parsedMessage = parseBody(body);
    if (parsedMessage) {
      errorMessage = `${error.message}\n${parsedMessage}`;
    }
  }

  return errorMessage;
};

export default createCommand(
  "whitelist",
  "マイクラサーバーのホワイトリストにユーザーを追加する。Adds a user to the Minecraft server whitelist.",
  async (interaction, _client, options) => {
    await interaction.deferReply();

    const { exarotonClient, SERVER_ID } = options;
    const originalUsername = interaction.options.getString("username");
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
    setup: (builder) =>
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
        ),
  },
);
