import { type Client, type ClientEvents, Collection } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { HandlerOptions } from "./commandHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ListenerModule<K extends keyof ClientEvents> {
  name: string;
  event: K;
  execute: (...args: [...ClientEvents[K], Client, HandlerOptions]) => void;
}

const getFiles = (dir: string): string[] => {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let listenerFiles: string[] = [];
  for (const file of files) {
    if (file.isDirectory()) {
      listenerFiles = [
        ...listenerFiles,
        ...getFiles(path.join(dir, file.name)),
      ];
    } else if (file.name.endsWith(".js") || file.name.endsWith(".ts")) {
      listenerFiles.push(path.join(dir, file.name));
    }
  }
  return listenerFiles;
};

export default class ListenerHandler {
  public client: Client;
  public listeners: Collection<string, ListenerModule<keyof ClientEvents>>;
  public options: HandlerOptions;

  constructor(client: Client, options: HandlerOptions) {
    this.client = client;
    this.listeners = new Collection();
    this.options = options;
  }

  public async loadListeners(): Promise<void> {
    try {
      const listenersPath = path.join(__dirname, "..", "listeners");
      const listenerCategories = fs.readdirSync(listenersPath);

      for (const category of listenerCategories) {
        const categoryPath = path.join(listenersPath, category);
        if (fs.statSync(categoryPath).isDirectory()) {
          const listenerFiles = getFiles(categoryPath);

          for (const file of listenerFiles) {
            const listenerModule = await import(`file://${file}`);
            const listener = listenerModule.default as ListenerModule<
              keyof ClientEvents
            >;

            if (listener.name && listener.execute && listener.event) {
              this.listeners.set(listener.name, listener);

              this.client.on(listener.event, (...args) => {
                listener.execute(...args, this.client, this.options);
              });

              const listenerCategory =
                category.charAt(0).toUpperCase() + category.slice(1);
              console.log(
                `Loaded [${listenerCategory}] listener: ${listener.name} for event ${listener.event}`,
              );
            } else {
              console.log(
                `[WARNING] Listener at ${file} is missing required properties.`,
              );
            }
          }
        }
      }
    } catch (error) {
      console.error("Error loading listeners:", error);
    }
  }
}
