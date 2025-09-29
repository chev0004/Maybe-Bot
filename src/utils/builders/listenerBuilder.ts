import type { ClientEvents, Message } from "discord.js";

interface ListenerOptions {
  channels?: string[];
  ignoreChannels?: string[];
  ignoreBots?: boolean;
  ignoreSelf?: boolean;
  users?: string[];
  ignoreUsers?: string[];
  roles?: string[];
  ignoreRoles?: string[];
}

/**
 * A custom listener builder with advanced filtering options.
 * @param name The descriptive name for the listener.
 * @param event The name of the Discord event to listen for.
 * @param execute The function to execute when the event is triggered.
 * @param options Filtering options for the listener.
 * @returns A listener object compatible with the bot's listener handler.
 */
export const createListener = <K extends keyof ClientEvents>(
  name: string,
  event: K,
  execute: (...args: ClientEvents[K]) => Promise<void> | void,
  options: ListenerOptions = {},
) => {
  const {
    channels,
    ignoreChannels,
    ignoreBots = true,
    ignoreSelf = true,
    users,
    ignoreUsers,
    roles,
    ignoreRoles,
  } = options;
  const filterFunction = (...args: ClientEvents[K]): boolean => {
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
      const message = context as Message;

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

      if (channels?.length && !channels.includes(message.channelId)) {
        return false;
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
    execute: async (...args: ClientEvents[K]) => {
      if (filterFunction(...args)) {
        await execute(...args);
      }
    },
  };
};
