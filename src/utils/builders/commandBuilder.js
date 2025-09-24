import {
  MessageFlags,
  PermissionsBitField,
  SlashCommandBuilder,
} from "discord.js";

export const createCommand = (
  name,
  description,
  execute,
  {
    ownerOnly = false,
    adminOnly = false,
    setup = (builder) => builder,
    allowedChannels = [],
  } = {},
) => {
  const builder = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description);

  if (adminOnly || ownerOnly) {
    builder.setDefaultMemberPermissions(0);
  }

  const data = setup(builder);

  return {
    data,
    ownerOnly,
    async execute(interaction, client, options) {
      if (ownerOnly && interaction.user.id !== process.env.OWNER_ID) {
        await interaction.reply({
          content:
            "このコマンドを使用する権限がありません。\nYou are not authorized to use this command.",
          flags: MessageFlags.Ephemeral,
        });
        return;
      }

      if (
        adminOnly &&
        !interaction.member.permissions.has(
          PermissionsBitField.Flags.Administrator,
        )
      ) {
        await interaction.reply({
          content:
            "このコマンドは管理者のみが使用できます。\nOnly administrators can use this command.",
          flags: MessageFlags.Ephemeral,
        });
        return;
      }

      if (
        allowedChannels.length > 0 &&
        !allowedChannels.includes(interaction.channelId)
      ) {
        const allowedChannelsMentions = allowedChannels
          .map((id) => `<#${id}>`)
          .join("、");
        await interaction.reply({
          content: `このコマンドはこのチャンネルでは使用できません。${allowedChannelsMentions} で使用してください。`,
          flags: MessageFlags.Ephemeral,
        });
        return;
      }

      await execute(interaction, client, options);
    },
  };
};
