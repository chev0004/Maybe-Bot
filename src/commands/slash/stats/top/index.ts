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
