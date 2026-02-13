import { createCommand } from "../../../../utils/builders/commandBuilder.js";
import { generateActivityReply } from "../../../../utils/helpers/activityHelper.js";
export default createCommand(
  "activity",
  "サーバーのアクティビティ統計を表示します。Displays server activity statistics.",
  async (interaction) => {
    await interaction.deferReply();
    const isTestMode = interaction.options.getBoolean("test") ?? false;
    const category = "voice";
    const timeframe = "7";
    const showTimeframeButtons = false;
    const reply = await generateActivityReply({
      guild: interaction.guild,
      category,
      timeframe,
      showTimeframeButtons,
      isTestMode,
    });
    const { flags: _, ...rest } = reply;
    await interaction.editReply(rest);
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
