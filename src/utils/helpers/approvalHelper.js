export const handleApprovalProcess = async (
  interaction,
  requiredApprovals,
  actionMessage,
  actionMessageEN,
  successCallback,
  failureMessage,
) => {
  await interaction.deferReply({ ephemeral: false });
  try {
    const pollMessage = await interaction.editReply(
      `${actionMessage}には${requiredApprovals}つの承認が必要です。\n✅を押して承認してください。\nWe need ${requiredApprovals} ${requiredApprovals === 1 ? "approval" : "approvals"} to ${actionMessageEN}.\nReact with ✅ to approve.`,
    );

    await pollMessage.react("✅");

    const filter = (reaction, user) => {
      return reaction.emoji.name === "✅" && !user.bot;
    };

    const uniqueApprovals = new Set();

    const collector = pollMessage.createReactionCollector({
      filter,
      time: 60000,
    });

    collector.on("collect", (_, user) => {
      uniqueApprovals.add(user.id);
      if (uniqueApprovals.size >= requiredApprovals) {
        collector.stop("enough_approvals");
      }
    });

    collector.on("end", async (_, reason) => {
      if (reason === "enough_approvals") {
        try {
          await successCallback(pollMessage);
        } catch (error) {
          console.error(error);
          await pollMessage.reply(failureMessage);
        }
      } else {
        await pollMessage.reply(
          "タイムアウトまたは承認不足のため、操作をキャンセルしました。",
        );
      }
    });
  } catch (error) {
    console.error(error);
    await interaction.editReply("エラーが発生しました。");
  }
};
