import {
  type CacheType,
  type ChatInputCommandInteraction,
  type Client,
  type GuildBasedChannel,
  MessageFlags,
  PermissionsBitField,
  SlashCommandBuilder,
} from "discord.js";
import { config } from "../../config/env.js";
import type { HandlerOptions } from "../../handlers/commandHandler.js";

export type GuildCommandInteraction = ChatInputCommandInteraction<"cached"> & {
  guild: NonNullable<ChatInputCommandInteraction["guild"]>;
  channel: GuildBasedChannel;
};

export interface CommandDefinition<
  I extends ChatInputCommandInteraction = ChatInputCommandInteraction,
> {
  data: SlashCommandBuilder;
  ownerOnly: boolean;
  execute: (
    interaction: I,
    client: Client<boolean>,
    options: HandlerOptions,
  ) => Promise<void>;
}

type ChannelKey = keyof typeof config.channels;

type CreateCommandType = {
  // Overload: guildOnly = true (default)
  (
    name: string,
    description: string,
    execute: (
      interaction: GuildCommandInteraction,
      client: Client<boolean>,
      options: HandlerOptions,
    ) => Promise<void>,
    options?: {
      ownerOnly?: boolean;
      adminOnly?: boolean;
      guildOnly?: true;
      allowedChannels?: ChannelKey[];
      setup?: (builder: SlashCommandBuilder) => SlashCommandBuilder;
    },
  ): CommandDefinition<GuildCommandInteraction>;

  // Overload: guildOnly = false
  (
    name: string,
    description: string,
    execute: (
      interaction: ChatInputCommandInteraction<CacheType>,
      client: Client<boolean>,
      options: HandlerOptions,
    ) => Promise<void>,
    options: {
      ownerOnly?: boolean;
      adminOnly?: boolean;
      guildOnly: false;
      setup?: (builder: SlashCommandBuilder) => SlashCommandBuilder;
      allowedChannels?: ChannelKey[];
    },
  ): CommandDefinition<ChatInputCommandInteraction<CacheType>>;
};

/**
 * A custom command builder that simplifies creating chat input commands.
 * @param {string} name The name of the command.
 * @param {string} description The description of the command.
 * @param {Function} execute The function to execute when the command is run.
 * @param {Object} options Additional options for the command.
 * @param {boolean} [options.ownerOnly=false] Whether the command should only be usable by the owner.
 * @param {boolean} [options.adminOnly=false] Whether the command should only be usable by server administrators.
 * @param {boolean} [options.guildOnly=true] Whether the command should only be usable within a guild. Defaults to true.
 * @param {string[]} [options.allowedChannels=[]] An array of channel IDs where the command can be used.
 * @param {function(SlashCommandBuilder): SlashCommandBuilder} [options.setup] An optional function to configure the SlashCommandBuilder.
 * @returns {Object} A command object compatible with the bot's command handler.
 */
export const createCommand: CreateCommandType = <
  I extends ChatInputCommandInteraction = ChatInputCommandInteraction,
>(
  name: string,
  description: string,
  execute: (
    interaction: I,
    client: Client<boolean>,
    options: HandlerOptions,
  ) => Promise<void>,
  {
    ownerOnly = false,
    adminOnly = false,
    guildOnly = true,
    setup = (builder: SlashCommandBuilder) => builder,
    allowedChannels = [] as ChannelKey[],
  }: {
    ownerOnly?: boolean;
    adminOnly?: boolean;
    guildOnly?: boolean;
    setup?: (builder: SlashCommandBuilder) => SlashCommandBuilder;
    allowedChannels?: ChannelKey[];
  } = {},
): CommandDefinition<I> => {
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
    async execute(
      interaction: ChatInputCommandInteraction<CacheType>,
      client: Client<boolean>,
      options: HandlerOptions,
    ) {
      if (
        guildOnly &&
        (!interaction.guild ||
          !interaction.channel ||
          interaction.channel.isDMBased())
      ) {
        await interaction.reply({
          content:
            "このコマンドはサーバー内でのみ使用できます。\nThis command can only be used in a server.",
          flags: MessageFlags.Ephemeral,
        });
        return;
      }

      if (ownerOnly && interaction.user.id !== config.ids.owner) {
        await interaction.reply({
          content:
            "このコマンドを使用する権限がありません。\nYou are not authorized to use this command.",
          flags: MessageFlags.Ephemeral,
        });
        return;
      }

      if (
        adminOnly &&
        !(
          interaction.member &&
          typeof interaction.member.permissions !== "string" &&
          interaction.member.permissions.has(
            PermissionsBitField.Flags.Administrator,
          )
        )
      ) {
        await interaction.reply({
          content:
            "このコマンドは管理者のみが使用できます。\nOnly administrators can use this command.",
          flags: MessageFlags.Ephemeral,
        });
        return;
      }

      if (allowedChannels.length > 0) {
        const requiredChannelIds = allowedChannels.map(
          (key) => config.channels[key],
        );
        if (!requiredChannelIds.includes(interaction.channelId)) {
          const allowedChannelsMentions = requiredChannelIds
            .map((id) => `<#${id}>`)
            .join("、");
          await interaction.reply({
            content: `このコマンドはこのチャンネルでは使用できません。${allowedChannelsMentions} で使用してください。`,
            flags: MessageFlags.Ephemeral,
          });
          return;
        }
      }

      await execute(interaction as I, client, options);
    },
  };
};
