import { createCommand } from "../../../utils/builders/commandBuilder.js";
import { handleApprovalProcess } from "../../../utils/helpers/approvalHelper.js";

export default createCommand(
  "startserver",
  "マイクラサーバーを起動させる。Starts the MineCraft server.",
  async (interaction, _client, options) => {
    const { exarotonClient, SERVER_ID } = options;
    const requiredApprovals = 1;
    const actionMessage = "サーバーを起動する";
    const actionMessageEN = "start the server";

    await handleApprovalProcess(
      interaction,
      requiredApprovals,
      actionMessage,
      actionMessageEN,
      async (pollMessage) => {
        const server = exarotonClient.server(SERVER_ID);
        await server.get();
        await server.start();
        const startMsg = await pollMessage.reply("サーバーが起動中...");
        let attempts = 0;
        const maxAttempts = 18;
        const pollInterval = 10000;
        const intervalId = setInterval(async () => {
          attempts++;
          try {
            await server.get();
            if (server.status === 1) {
              clearInterval(intervalId);
              await startMsg.edit("サーバーが起動しました！");
            } else if (attempts >= maxAttempts) {
              clearInterval(intervalId);
              await startMsg.edit("サーバーの起動確認がタイムアウトしました。");
            }
          } catch (_err) {
            clearInterval(intervalId);
            await startMsg.edit("サーバー状態の確認に失敗しました。");
          }
        }, pollInterval);
      },
      "サーバーの起動に失敗しました。",
    );
  },
);
