import { Client } from "discord.js";

/**
 * A custom listener builder with advanced filtering options.
 * @param {string} name The descriptive name for the listener.
 * @param {string} event The name of the Discord event to listen for.
 * @param {Function} execute The function to execute when the event is triggered.
 * @param {Object} [options={}] Filtering options for the listener.
 * @param {boolean} [options.ignoreBots=true] Whether to ignore bot users.
 * @param {string[]} [options.channels] An array of channel IDs where the listener should be active.
 * @param {string[]} [options.ignoreChannels] An array of channel IDs where the listener should be ignored.
 * @param {string[]} [options.users] An array of user IDs where the listener should be active.
 * @param {string[]} [options.ignoreUsers] An array of user IDs where the listener should be ignored.
 * @param {string[]} [options.roles] An array of role IDs where the listener should be active.
 * @param {string[]} [options.ignoreRoles] An array of role IDs where the listener should be ignored.
 * @returns {Object} A listener object compatible with the bot's listener handler.
 */
export const createListener = (name, event, execute, options = {}) => {
  const {
    ignoreBots = true,
    channels,
    ignoreChannels,
    users,
    ignoreUsers,
    roles,
    ignoreRoles,
  } = options;

  const filterFunction = (...args) => {
    const context = args[0];

    if (!context || !context.client || (ignoreBots && context.author?.bot)) {
      return false;
    }

    if (ignoreChannels?.length && ignoreChannels.includes(context.channelId)) {
      return false;
    }

    if (channels?.length && !channels.includes(context.channelId)) {
      return false;
    }

    if (ignoreUsers?.length && ignoreUsers.includes(context.author?.id)) {
      return false;
    }

    if (users?.length && !users.includes(context.author?.id)) {
      return false;
    }

    if (context.member?.roles) {
      if (
        ignoreRoles?.length &&
        ignoreRoles.some((roleId) => context.member.roles.cache.has(roleId))
      ) {
        return false;
      }
      if (
        roles?.length &&
        !roles.some((roleId) => context.member.roles.cache.has(roleId))
      ) {
        return false;
      }
    }

    return true;
  };

  return {
    name,
    event,
    execute: async (...args) => {
      if (filterFunction(...args)) {
        const client = args.find((arg) => arg instanceof Client);
        const filteredArgs = args.filter(
          (arg) =>
            arg !== client &&
            arg !==
              args.find(
                (a) => typeof a === "object" && Object.hasOwn(a, "channels"),
              ),
        );
        await execute(...filteredArgs);
      }
    },
  };
};
