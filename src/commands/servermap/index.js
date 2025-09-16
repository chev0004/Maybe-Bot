import {
  SlashCommandBuilder,
  AttachmentBuilder,
  PermissionsBitField,
  ChannelType,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("servermap")
    .setDescription(
      "Fetches a map of all server categories and channels with their IDs into a text file."
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const guild = interaction.guild;
    if (!guild) {
      return interaction.editReply(
        "This command can only be used in a server."
      );
    }

    let output = "";
    const serverName = guild.name;
    output += `Server Map for: ${serverName} (ID: ${guild.id})\n`;
    output += `Generated on: ${new Date().toUTCString()}\n`;
    output += "==================================================\n\n";

    const channels = guild.channels.cache;

    const categories = channels
      .filter((c) => c.type === ChannelType.GuildCategory)
      .sort((a, b) => a.position - b.position);

    // This function formats a single channel entry, now including its ID
    const formatChannel = (channel) => {
      let channelOutput = `- ${channel.name} (ID: ${channel.id})\n`;
      if (
        channel.type === ChannelType.GuildText ||
        channel.type === ChannelType.GuildAnnouncement
      ) {
        const topic = channel.topic || "N/A";
        channelOutput += `  Topic: ${topic.replace(/\n/g, "\n         ")}\n`;
      }
      return channelOutput;
    };

    // Process each category
    for (const category of categories.values()) {
      // Add the category ID to the output
      output += `Category: ${category.name} (ID: ${category.id})\n`;

      const channelsInCategory = channels.filter((c) => c.parentId === category.id);

      const textChannels = channelsInCategory
        .filter((c) => c.type === ChannelType.GuildText || c.type === ChannelType.GuildAnnouncement)
        .sort((a, b) => a.position - b.position);

      const voiceChannels = channelsInCategory
        .filter((c) => c.type === ChannelType.GuildVoice || c.type === ChannelType.GuildStageVoice)
        .sort((a, b) => a.position - b.position);
      
      const otherChannels = channelsInCategory
        .filter((c) => ![ChannelType.GuildText, ChannelType.GuildAnnouncement, ChannelType.GuildVoice, ChannelType.GuildStageVoice, ChannelType.GuildCategory].includes(c.type))
        .sort((a, b) => a.position - b.position);

      if (textChannels.size > 0) for (const channel of textChannels.values()) output += formatChannel(channel);
      if (voiceChannels.size > 0) for (const channel of voiceChannels.values()) output += formatChannel(channel);
      if (otherChannels.size > 0) for (const channel of otherChannels.values()) output += formatChannel(channel);
      
      if (channelsInCategory.size === 0) {
        output += "- (No channels in this category)\n";
      }

      output += "\n";
    }

    // Handle uncategorized channels
    const channelsWithoutCategory = channels.filter((c) => !c.parentId && c.type !== ChannelType.GuildCategory);
    
    if (channelsWithoutCategory.size > 0) {
        output += `Uncategorized Channels\n`;
        const textChannels = channelsWithoutCategory.filter(c => c.type === ChannelType.GuildText).sort((a,b) => a.position - b.position);
        const voiceChannels = channelsWithoutCategory.filter(c => c.type === ChannelType.GuildVoice).sort((a,b) => a.position - b.position);

        for (const channel of textChannels.values()) { output += formatChannel(channel); }
        for (const channel of voiceChannels.values()) { output += formatChannel(channel); }
    }
    
    const buffer = Buffer.from(output, "utf-8");
    const attachment = new AttachmentBuilder(buffer, {
      name: `server-map_${guild.id}.txt`,
    });

    await interaction.editReply({
      content: "Here is the final map of your server's channels, now with IDs:",
      files: [attachment],
    });
  },
};