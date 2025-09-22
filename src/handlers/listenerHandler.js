import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class ListenerHandler {
  constructor(client, options = {}) {
    this.client = client;
    this.listeners = new Map();
    this.options = options;
  }

  async loadListeners() {
    try {
      const listenersPath = path.join(__dirname, "..", "listeners");
      const listenerFolders = fs.readdirSync(listenersPath);

      for (const folder of listenerFolders) {
        const folderPath = path.join(listenersPath, folder);

        if (!fs.statSync(folderPath).isDirectory()) continue;

        const listenerFile = path.join(folderPath, "index.js");

        if (fs.existsSync(listenerFile)) {
          const listenerModule = await import(`file://${listenerFile}`);
          const listener = listenerModule.default;

          if (listener.name && listener.execute && listener.event) {
            this.listeners.set(listener.name, listener);

            this.client.on(listener.event, (...args) => {
              listener.execute(...args, this.client, this.options);
            });

            console.log(
              `Loaded listener: ${listener.name} for event ${listener.event}`,
            );
          } else {
            console.log(
              `Listener at ${listenerFile} is missing required properties`,
            );
          }
        }
      }
    } catch (error) {
      console.error("Error loading listeners:", error);
    }
  }
}
