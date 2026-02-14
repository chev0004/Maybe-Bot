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
