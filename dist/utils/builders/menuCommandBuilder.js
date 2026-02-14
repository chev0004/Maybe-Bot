import { ContextMenuCommandBuilder, InteractionContextType, MessageFlags, PermissionsBitField, } from "discord.js";
import { config } from "../../config/env.js";
/**
 * A custom context menu command builder with advanced permission handling.
 * @param {string} name The name of the command.
 * @param {ContextMenuCommandType} type The type of the context menu command (Message or User).
 * @param {Function} execute The function to execute when the command is triggered.
 * @param {Object} [options={}] Filtering options for the command.
 * @param {boolean} [options.ownerOnly=false] Whether to restrict the command to the bot owner.
 * @param {boolean} [options.adminOnly=false] Whether to restrict the command to server administrators.
 * @param {boolean} [options.guildOnly=true] Whether the command can only be used in a guild.
 * @param {PermissionResolvable[]} [options.requiredPermissions=[]] Specific permissions a user must have to run the command.
 * @returns {Object} A command object compatible with your command handler.
 */
export const createMenuCommand = (name, type, execute, { ownerOnly = false, adminOnly = false, guildOnly = true, requiredPermissions = [], } = {}) => {
    const builder = new ContextMenuCommandBuilder()
        .setName(name)
        .setType(type)
        .setContexts(guildOnly
        ? [InteractionContextType.Guild]
        : [
            InteractionContextType.Guild,
            InteractionContextType.BotDM,
            InteractionContextType.PrivateChannel,
        ]);
    if (adminOnly || ownerOnly || requiredPermissions.length > 0) {
        let perms = 0n;
        if (adminOnly) {
            perms = PermissionsBitField.Flags.Administrator;
        }
        if (requiredPermissions.length > 0) {
            perms = new PermissionsBitField(requiredPermissions).bitfield;
        }
        builder.setDefaultMemberPermissions(adminOnly ? 0 : perms);
    }
    return {
        data: builder,
        async execute(interaction, client, options) {
            if (guildOnly && !interaction.inGuild()) {
                return interaction.reply({
                    content: "このコマンドはサーバー内でのみ使用できます。\nThis command can only be used in a server.",
                    flags: MessageFlags.Ephemeral,
                });
            }
            if (ownerOnly && interaction.user.id !== config.ids.owner) {
                return interaction.reply({
                    content: "あなたはこのコマンドを使用する権限がありません。\nYou are not authorized to use this command.",
                    flags: MessageFlags.Ephemeral,
                });
            }
            if (interaction.inGuild()) {
                if (adminOnly &&
                    typeof interaction.member.permissions !== "string" &&
                    !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                    return interaction.reply({
                        content: "管理者のみがこのコマンドを使用できます。\nOnly administrators can use this command.",
                        flags: MessageFlags.Ephemeral,
                    });
                }
                if (requiredPermissions.length > 0) {
                    const permsObj = typeof interaction.member.permissions === "string"
                        ? new PermissionsBitField(BigInt(interaction.member.permissions))
                        : interaction.member.permissions;
                    const missingPerms = permsObj.missing(requiredPermissions);
                    if (missingPerms.length > 0) {
                        return interaction.reply({
                            content: `このコマンドを使用するには、次の権限が必要です: ${missingPerms.join(", ")}\nYou are missing the following permissions to use this command: ${missingPerms.join(", ")}`,
                            flags: MessageFlags.Ephemeral,
                        });
                    }
                }
            }
            await execute(interaction, client, options);
        },
    };
};
