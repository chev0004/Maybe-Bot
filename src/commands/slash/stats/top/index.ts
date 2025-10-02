// src/commands/slash/stats/top/index.ts
import { createCommand } from "../../../../utils/builders/commandBuilder.js";
import { generateInitialTopReply } from "../../../../utils/helpers/topHelper.js";

export default createCommand(
  "top",
  "Displays the server leaderboards.",
  async (interaction) => {
    await interaction.deferReply();

    const initialReply = await generateInitialTopReply(interaction.guild);

    // FIX: Destructure the reply to remove the 'flags' property, making it compatible with editReply.
    const { flags: _, ...rest } = initialReply;
    await interaction.editReply(rest);
  },
);
