import { SlashCommandBuilder } from "discord.js";
import { handleApprovalProcess } from "../../utils/approvalProcess.js";

export default {
  data: new SlashCommandBuilder()
    .setName("smite")
    .setDescription("人に神罰を与える。Punish someone with the God's Wrath.")
    .addStringOption((option) =>
      option
        .setName("victim")
        .setDescription(
          "神罰を受ける者の名を入力。Enter the username of the victim to be smitten."
        )
        .setRequired(true)
    ),

  async execute(interaction, _client, options) {
    const { exarotonClient, SERVER_ID } = options;
    const victim = interaction.options.getString("victim");

    const requiredApprovals = 1;
    const actionMessage = `${victim} に神罰を与える`;
    const actionMessageEN = `Smite ${victim} with God's Wrath`;

    await handleApprovalProcess(
      interaction,
      requiredApprovals,
      actionMessage,
      actionMessageEN,
      async (pollMessage) => {
        const server = exarotonClient.server(SERVER_ID);
        const command = Array(100)
          .fill(
            `execute at ${victim} run summon minecraft:lightning_bolt ~ ~ ~`
          )
          .join("\n");

        await server.executeCommand(command);
        await pollMessage.reply(`${victim} に神罰を与えました。`);
      },
      "神罰が失敗しました。"
    );
  },
};
