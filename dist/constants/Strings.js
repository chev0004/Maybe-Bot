export const Strings = {
  Errors: {
    Generic: "エラーが発生しました。\nAn error occurred.",
    Unknown: "不明なエラーが発生しました。\nAn unknown error occurred.",
    FetchMessages:
      "メッセージの取得中にエラーが発生しました。\nAn error occurred while fetching messages.",
    DeleteMessages:
      "メッセージの削除中にエラーが発生しました。\nAn error occurred while deleting messages.",
    FetchServerInfo:
      "サーバー情報の取得に失敗しました。\nFailed to fetch server info.",
    ConfigNotSet: (variable) =>
      `\`${variable}\` が設定されていません。\nThe \`${variable}\` environment variable is not set.`,
  },
  Permissions: {
    UserMissing:
      "このコマンドを使用する権限がありません。\nYou are not authorized to use this command.",
    BotMissing: (jp, en) =>
      `ボットに「${jp}」権限がありません。\nI don't have the '${en}' permission to perform this action.`,
    BotViewChannel:
      "BOTにチャンネルの閲覧権限がないため、操作を実行できません。\nThe bot does not have permission to view channels, thus cannot perform this action.",
  },
  Replies: {
    GuildOnly:
      "このコマンドはサーバーのテキストチャンネルでのみ使用できます。\nThis command can only be used in a server text channel.",
    ApprovalTimeout:
      "タイムアウトまたは承認不足のため、操作をキャンセルしました。\nOperation canceled due to timeout or insufficient approvals.",
    ConfirmationTimeout:
      "15秒以内に確認が取れなかったため、キャンセルしました。\nConfirmation not received within 15 seconds, canceling.",
  },
};
