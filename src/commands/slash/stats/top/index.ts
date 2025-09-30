import { AttachmentBuilder, type SlashCommandBuilder } from "discord.js";
import { asc, eq } from "drizzle-orm";
import { db } from "../../../../db/index.js";
import { topChannels, topUsers } from "../../../../db/schema.js";
import { createCommand } from "../../../../utils/builders/commandBuilder.js";
import { generateLeaderboardImage } from "../../../../utils/services/imageGenerator.js";

const userCategories = [
  "user_messages",
  "user_vcHours",
  "user_bumps",
  "user_streamHours",
];
const channelCategories = ["channel_messages", "channel_vcHours"];
const categoryLabels: Record<string, { label: string; unit: string }> = {
  user_messages: { label: "Messages Sent", unit: "messages" },
  user_vcHours: { label: "Voice Chat Hours", unit: "hours" },
  user_bumps: { label: "Bumps", unit: "bumps" },
  user_streamHours: { label: "Stream Hours", unit: "hours" },
  channel_messages: { label: "Messages Sent", unit: "messages" },
  channel_vcHours: { label: "Voice Chat Hours", unit: "hours" },
};

export default createCommand(
  "top",
  "Displays the server leaderboards.",
  async (interaction) => {
    await interaction.deferReply();
    if (!interaction.guild) {
      await interaction.editReply("This command can only be used in a server.");
      return;
    }

    const category = interaction.options.getString("category", true);
    const { label } = categoryLabels[category];

    let data:
      | (typeof topUsers.$inferSelect)[]
      | (typeof topChannels.$inferSelect)[]
      | undefined;
    let title = "";

    if (userCategories.includes(category)) {
      title = `🏆 Top Users by ${label}`;
      const dbCategory = category.replace("user_", "");
      data = await db
        .select()
        .from(topUsers)
        .where(eq(topUsers.category, dbCategory))
        .orderBy(asc(topUsers.rank));
    } else if (channelCategories.includes(category)) {
      title = `🏆 Top Channels by ${label}`;
      const dbCategory = category.replace("channel_", "");
      data = await db
        .select()
        .from(topChannels)
        .where(eq(topChannels.category, dbCategory))
        .orderBy(asc(topChannels.rank));
    }

    if (!data || data.length === 0) {
      await interaction.editReply("This leaderboard is currently empty.");
      return;
    }

    try {
      const serverIconUrl = interaction.guild.iconURL({
        extension: "png",
        size: 128,
      });
      const imageBuffer = await generateLeaderboardImage(
        title,
        data,
        serverIconUrl,
        interaction.guild.name,
      );
      const attachment = new AttachmentBuilder(imageBuffer, {
        name: "leaderboard.png",
      });

      await interaction.editReply({ files: [attachment] });
    } catch (error) {
      console.error("Failed to generate leaderboard image:", error);
      await interaction.editReply(
        "Sorry, there was an error creating the leaderboard image.",
      );
    }
  },
  {
    setup: (builder: SlashCommandBuilder) => {
      builder.addStringOption((option) =>
        option
          .setName("category")
          .setDescription("The leaderboard category to display.")
          .setRequired(true)
          .addChoices(
            { name: "🏆 User - Messages", value: "user_messages" },
            { name: "🎤 User - VC Hours", value: "user_vcHours" },
            { name: "🚀 User - Bumps", value: "user_bumps" },
            { name: "📺 User - Stream Hours", value: "user_streamHours" },
            { name: "💬 Channel - Messages", value: "channel_messages" },
            { name: "🎧 Channel - VC Hours", value: "channel_vcHours" },
          ),
      );
      return builder;
    },
  },
);
