import { createCommand } from "../../../../utils/builders/commandBuilder.js";
import { generateInitialTopReply } from "../../../../utils/helpers/topHelper.js";

export default createCommand(
  "top",
  "サーバーランキングを表示する。Displays the server leaderboards.",
  async (interaction) => {
    await interaction.deferReply();

    const initialReply = await generateInitialTopReply(
      interaction.guild,
      interaction.client,
    );

    const { flags: _, ...rest } = initialReply;
    await interaction.editReply(rest);
  },
);
