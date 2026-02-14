import { config } from "../../config/env.js";
/**
 * A custom listener builder with advanced filtering options.
 * @param {string} name The descriptive name for the listener.
 * @param {string} event The name of the Discord event to listen for.
 * @param {Function} execute The function to execute when the event is triggered.
 * @param {Object} [options={}] Filtering options for the listener.
 * @param {boolean} [options.ignoreBots=true] Whether to ignore other bot users.
 * @param {boolean} [options.ignoreSelf=true] Whether to ignore the bot's own events.
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
    ignoreSelf = true,
    channels: channelKeys,
    ignoreChannels,
    users,
    ignoreUsers,
    roles,
    ignoreRoles,
  } = options;
  const filterFunction = (...args) => {
    const context = event === "messageUpdate" ? args[1] : args[0];
    if (!context) {
      return false;
    }
    if (
      typeof context === "object" &&
      context !== null &&
      "author" in context &&
      "channelId" in context
    ) {
      const message = context;
      if (message.author?.bot) {
        const isSelf = message.author.id === message.client.user.id;
        if (isSelf && ignoreSelf) {
          return false;
        }
        if (!isSelf && ignoreBots) {
          return false;
        }
      }
      if (
        ignoreChannels?.length &&
        ignoreChannels.includes(message.channelId)
      ) {
        return false;
      }
      if (channelKeys?.length) {
        const requiredChannelIds = channelKeys.map(
          (key) => config.channels[key],
        );
        if (!requiredChannelIds.includes(message.channelId)) {
          return false;
        }
      }
      if (ignoreUsers?.length && ignoreUsers.includes(message.author?.id)) {
        return false;
      }
      if (users?.length && !users.includes(message.author?.id)) {
        return false;
      }
      if (message.member?.roles) {
        if (
          ignoreRoles?.length &&
          ignoreRoles.some((roleId) => message.member?.roles.cache.has(roleId))
        ) {
          return false;
        }
        if (
          roles?.length &&
          !roles.some((roleId) => message.member?.roles.cache.has(roleId))
        ) {
          return false;
        }
      }
    } else {
      return true;
    }
    return true;
  };
  return {
    name,
    event,
    execute: async (...args) => {
      if (filterFunction(...args)) {
        await execute(...args);
      }
    },
  };
};
