import { EmbedBuilder } from "discord.js";
import { Colors } from "../../../constants/Colors.js";
import { createCommand } from "../../../utils/builders/commandBuilder.js";

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
      embed
        .setColor(Colors.red)
        .setDescription(
          `ユーザー「${usernameToWhitelist}」のホワイトリスト追加に失敗しました。`,
        );

      let errorMessage = "不明なエラーが発生しました。";
      if (error.message) {
        errorMessage = error.message;
      }

      if (error.response?.body && typeof error.response.body === "string") {
        try {
          const errorBody = JSON.parse(error.response.body);
          if (errorBody.success === false && errorBody.error) {
            errorMessage = `${error.message || "API Error"}\nAPIエラー: ${
              errorBody.error
            }`;
          } else if (errorBody.message) {
            errorMessage = `${error.message || "API Message"}\nAPIメッセージ: ${
              errorBody.message
            }`;
          }
        } catch (parseError) {
          errorMessage = `${
            error.message || "Error"
          }\n詳細: ${error.response.body.substring(0, 500)}`;
          console.warn(
            "Could not parse error body from Exaroton API, or it was not JSON:",
            parseError,
          );
        }
      } else if (error.body && typeof error.body === "string") {
        try {
          const errorBody = JSON.parse(error.body);
          if (errorBody.success === false && errorBody.error) {
            errorMessage = `${error.message || "API Error"}\nAPIエラー: ${
              errorBody.error
            }`;
          } else if (errorBody.message) {
            errorMessage = `${error.message || "API Message"}\nAPIメッセージ: ${
              errorBody.message
            }`;
          }
        } catch (parseError) {
          errorMessage = `${
            error.message || "Error"
          }\n詳細: ${error.body.substring(0, 500)}`;
          console.warn(
            "Could not parse error.body, or it was not JSON:",
            parseError,
          );
        }
      }

      embed.addFields({
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
