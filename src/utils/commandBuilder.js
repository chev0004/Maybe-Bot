import { MessageFlags, SlashCommandBuilder } from "discord.js";

/**
 * A custom command builder that simplifies creating chat input commands.
 * @param {string} name The name of the command.
 * @param {string} description The description of the command.
 * @param {Function} execute The function to execute when the command is run.
 * @param {Object} options Additional options for the command.
 * @param {boolean} [options.ownerOnly=false] Whether the command should only be usable by the owner.
 * @param {string[]} [options.allowedChannels=[]] An array of channel IDs where the command can be used.
 * @param {string[]} [options.requiredEnvVars=[]] An array of environment variable names required for the command to run.
 * @param {function(SlashCommandBuilder): SlashCommandBuilder} [options.setup] An optional function to configure the SlashCommandBuilder.
 * @returns {Object} A command object compatible with the bot's command handler.
 */
export const createChatCommand = (
  name,
  description,
  execute,
  {
    ownerOnly = false,
    setup = (builder) => builder,
    allowedChannels = [],
    requiredEnvVars = [],
  } = {},
) => {
  const data = setup(
    new SlashCommandBuilder().setName(name).setDescription(description),
  );

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

      const missingVar = requiredEnvVars.find((v) => !process.env[v]);
      if (missingVar) {
        console.error(
          `Command "${name}" is missing required environment variable: ${missingVar}`,
        );
        await interaction.reply({
          content:
            "このコマンドは設定されていません。管理者に連絡してください。\nThis command is not configured. Please contact an administrator.",
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
