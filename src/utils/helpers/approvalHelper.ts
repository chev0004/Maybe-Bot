import type {
  CommandInteraction,
  Message,
  MessageReaction,
  User,
} from "discord.js";
import { Strings } from "../../constants/Strings.js";

export const handleApprovalProcess = async (
  interaction: CommandInteraction,
  requiredApprovals: number,
  actionMessage: string,
  actionMessageEN: string,
  successCallback: (pollMessage: Message) => Promise<void>,
  failureMessage: string,
): Promise<void> => {
  await interaction.deferReply();
  try {
    const pollMessage = await interaction.editReply(
      `${actionMessage}には${requiredApprovals}つの承認が必要です。\n✅を押して承認してください。\nWe need ${requiredApprovals} ${
        requiredApprovals === 1 ? "approval" : "approvals"
      } to ${actionMessageEN}.\nReact with ✅ to approve.`,
    );

    await pollMessage.react("✅");

    const filter = (reaction: MessageReaction, user: User) => {
      return reaction.emoji.name === "✅" && !user.bot;
    };

    const uniqueApprovals = new Set<string>();

    const collector = pollMessage.createReactionCollector({
      filter,
      time: 60_000,
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
        await pollMessage.reply(Strings.Replies.ApprovalTimeout);
      }
    });
  } catch (error) {
    console.error(error);
    await interaction.editReply(Strings.Errors.Generic);
  }
};
