import { SlashCommandBuilder, PermissionsBitField } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("addroleall")
    .setDescription(
      "サーバーの全メンバーに特定のロールを付与します。(Adds a role to all server members.)"
    )
    .setDefaultMemberPermissions(0),

  async execute(interaction) {
    const ownerId = process.env.OWNER_ID;
    const roleIdToAdd = process.env.VERIFIED_ROLE_ID;

    if (interaction.user.id !== ownerId) {
      await interaction.reply({
        content:
          "このコマンドを使用する権限がありません。\nYou are not authorized to use this command.",
        ephemeral: true,
      });
      return;
    }

    await interaction.deferReply({ ephemeral: true });

    const guild = interaction.guild;
    if (!guild) {
      await interaction.editReply({
        content:
          "このコマンドはサーバー内でのみ実行できます。\nThis command can only be executed within a server.",
        ephemeral: true,
      });
      return;
    }

    const role = guild.roles.cache.get(roleIdToAdd);
    if (!role) {
      await interaction.editReply({
        content: `指定されたロール (ID: ${roleIdToAdd}) が見つかりませんでした。\nThe specified role (ID: ${roleIdToAdd}) was not found.`,
        ephemeral: true,
      });
      return;
    }

    if (
      !guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles)
    ) {
      await interaction.editReply({
        content:
          "ボットにロールを管理する権限がありません。\nThe bot does not have permission to manage roles.",
        ephemeral: true,
      });
      return;
    }

    if (guild.members.me.roles.highest.position <= role.position) {
      await interaction.editReply({
        content: `ボットのロール (${guild.members.me.roles.highest.name}) は、付与しようとしているロール (${role.name}) よりも低いか同じ階層にあるため、付与できません。\nThe bot's highest role (${guild.members.me.roles.highest.name}) is not high enough to assign the role "${role.name}".`,
        ephemeral: true,
      });
      return;
    }

    let members;
    try {
      members = await guild.members.fetch();
    } catch (fetchError) {
      console.error("Error fetching members:", fetchError);
      await interaction.editReply({
        content:
          "サーバーメンバーの取得中にエラーが発生しました。\nAn error occurred while fetching server members.",
        ephemeral: true,
      });
      return;
    }

    let addedCount = 0;
    let errorCount = 0;
    let alreadyHadRoleCount = 0;
    let skippedBotsCount = 0;
    const totalMembers = members.size;
    let processedCount = 0;

    const initialMessage = `処理を開始します。全${totalMembers}メンバーにロール「${role.name}」を付与中です...\nStarting process. Adding role "${role.name}" to all ${totalMembers} members... (0/${totalMembers})`;
    await interaction.editReply({
      content: initialMessage,
      ephemeral: true,
    });

    const updateFrequency = Math.max(
      1,
      Math.min(20, Math.floor(totalMembers * 0.05))
    );
    let lastUpdateTime = 0;

    for (const member of members.values()) {
      processedCount++;
      if (member.user.bot) {
        skippedBotsCount++;
        continue;
      }

      if (member.roles.cache.has(role.id)) {
        alreadyHadRoleCount++;
        continue;
      }

      try {
        await member.roles.add(role);
        addedCount++;
      } catch (err) {
        console.error(
          `Failed to add role to ${member.user.tag} (ID: ${member.id}):`,
          err.message
        );
        errorCount++;
      }

      const now = Date.now();
      if (
        (processedCount % updateFrequency === 0 ||
          processedCount === totalMembers) &&
        now - lastUpdateTime > 1000
      ) {
        try {
          await interaction.editReply({
            content: `処理中... 全${totalMembers}メンバーにロール「${role.name}」を付与中です...\nProcessing... Adding role "${role.name}" to all ${totalMembers} members... (${processedCount}/${totalMembers})`,
            ephemeral: true,
          });
          lastUpdateTime = now;
        } catch (editError) {
          if (editError.code === 10062) {
            console.warn(
              "Interaction expired while updating progress. Process continues in background."
            );
          } else {
            console.warn(
              "Failed to update progress message:",
              editError.message
            );
          }
        }
      }
    }

    const summaryMessage = [
      `ロール「${role.name}」の付与処理が完了しました。(Role "${role.name}" assignment process completed.)`,
      `------------------------------------`,
      `総メンバー数 (Total members): ${totalMembers}`,
      `処理対象外 (ボット) (Skipped - bots): ${skippedBotsCount}`,
      `正常に付与 (Successfully added): ${addedCount}`,
      `既に保有済み (Already had role): ${alreadyHadRoleCount}`,
      `付与失敗 (Failed to add): ${errorCount}`,
      errorCount > 0
        ? "失敗の詳細はコンソールログを確認してください。(Check console logs for details on failures.)"
        : "",
    ]
      .join("\n")
      .trim();

    try {
      await interaction.editReply({
        content: summaryMessage,
        ephemeral: false,
      });
    } catch (finalEditError) {
      console.warn(
        "Failed to edit final summary, attempting followup:",
        finalEditError.message
      );
      await interaction
        .followUp({ content: summaryMessage, ephemeral: true })
        .catch((followUpError) => {
          console.error(
            "Failed to send followup summary message:",
            followUpError.message
          );
          console.log("Final Summary:\n" + summaryMessage);
        });
    }
  },
};
