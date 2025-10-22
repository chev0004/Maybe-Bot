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
