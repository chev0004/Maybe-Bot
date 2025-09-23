import { handleApprovalProcess } from "../../../utils/approvalProcess.js";
import { createCommand } from "../../../utils/commandBuilder.js";

export default createCommand(
  "smite",
  "人に神罰を与える。Punish someone with the God's Wrath.",
  async (interaction, _client, options) => {
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
            `execute at ${victim} run summon minecraft:lightning_bolt ~ ~ ~`,
          )
          .join("\n");

        await server.executeCommand(command);
        await pollMessage.reply(`${victim} に神罰を与えました。`);
      },
      "神罰が失敗しました。",
    );
  },
  {
    setup: (builder) =>
      builder.addStringOption((option) =>
        option
          .setName("victim")
          .setDescription(
            "神罰を受ける者の名を入力。Enter the username of the victim to be smitten.",
          )
          .setRequired(true),
      ),
  },
);
