import { SlashCommandBuilder } from "discord.js";

/**
 * A custom command builder that simplifies creating chat input commands.
 * @param {string} name The name of the command.
 * @param {string} description The description of the command.
 * @param {Function} execute The function to execute when the command is run.
 * @param {Object} options Additional options for the command.
 * @param {boolean} [options.ownerOnly=false] Whether the command should only be usable by the owner.
 * @param {function(SlashCommandBuilder): SlashCommandBuilder} [options.setup] An optional function to configure the SlashCommandBuilder.
 * @returns {Object} A command object compatible with the bot's command handler.
 */
export const createChatCommand = (
  name,
  description,
  execute,
  { ownerOnly = false, setup = (builder) => builder } = {},
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
          ephemeral: true,
        });
        return;
      }
      await execute(interaction, client, options);
    },
  };
};
