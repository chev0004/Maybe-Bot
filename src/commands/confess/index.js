import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Colors } from "../../constants/Colors.js";

const ADJECTIVES = [
  "Viscous", "Whiskery", "Wiggly", "Wrinkly",
  "Mucky", "Mucous", "Mushy", "Oozing", "Playful",
  "Drooly", "Farty", "Festering", "Fluffy", "Fuzzy", 
  "Grimy", "Icky", "Infested", "Delicate", "Gentle",
  "Moist", "Moldy", "Morbid", "Glistening", "Happy",
  "Chubby", "Chirpy", "Cooing", "Cuddly", "Adorable", 
  "Sticky", "Suppurating", "Sweet", "Velvety", "Soft",
  "Creepy", "Crusty", "Decaying", "Drippy", "Blushing",
  "Gelatinous", "Giggly", "Gooey", "Greasy", "Darling",
  "Bloated", "Blubbery", "Bouncy", "Bubbly", "Bulbous", 
  "Plump", "Pox-marked", "Pulpy", "Pungent", "Purring", 
  "Putrid", "Rancid", "Reeking", "Seeping", "Precious",
  "Septic", "Shiny", "Sloppy", "Sludgy", "Slimy", "Smelly", 
  "Snotty", "Soggy", "Sparkly", "Squishy", "Rosy", 'Silky'
];

const NOUNS = [
  "Botfly", "Bristle", "Bunny", "Caterpillar", "Lollipop",
  "Chick", "Chinchilla", "Cockroach", "Cupcake", "Bubble",
  "Fawn", "Fluffball", "Fungus", "Gloop", "Goop", "Cookie",
  "Abscess", "Axolotl", "Bile", "Blob", "Booger", "Cheese", 
  "Pustule", "Rat", "Roach", "Scab", "Scum", "Slime", "Sloth", 
  "Grime", "Gristle", "Gunk", "Hamster", "Jellybean", "Daisy",
  "Kitten", "Leech", "Lump", "Maggot", "Marshmallow", "Mochi",  
  "Cyst", "Drool", "Dumpling", "Dustbunny", "Earwax", "Mucus",
  "Poop", "Porridge", "Pudding", "Puff", "Puppy", "Pus", "Panda",
  "Tadpole", "Toad", "Troll", "Ulcer", "Vomit", "Worm", "Penguin",
  "Sludge", "Slug", "Snail", "Snotball", "Spore", "Squid", "Petal",
  "Mudpie", "Nugget", "Phlegm", "Pickle", "Pigeon", "Koala", "Star"
];


function generateAnonymousId() {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  return `${adj} ${noun}`;
}

function getRandomColor() {
  const colorKeys = Object.keys(Colors);
  const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
  return Colors[randomKey];
}

export default {
  data: new SlashCommandBuilder()
    .setName("confess")
    .setDescription("匿名でメッセージを投稿します。(Post a message anonymously.)")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("投稿したいメッセージ。(The message you want to confess.)")
        .setRequired(true)
    ),

  async execute(interaction) {
    const confessionsChannelId = process.env.CONFESSIONS_CHANNEL_ID;

    if (!confessionsChannelId) {
      return interaction.reply({
        content: "このコマンドは設定されていません。管理者に連絡してください。\nThis command is not configured. Please contact an administrator.",
        ephemeral: true,
      });
    }

    if (interaction.channelId !== confessionsChannelId) {
      return interaction.reply({
        content: `このコマンドはこのチャンネルでは使用できません。<#${confessionsChannelId}> で使用してください。\nThis command can only be used in the <#${confessionsChannelId}> channel.`,
        ephemeral: true,
      });
    }

    const confessionMessage = interaction.options.getString("message");
    const anonymousId = generateAnonymousId();
    const randomColor = getRandomColor();

    const confessionEmbed = new EmbedBuilder()
      .setTitle(anonymousId)
      .setDescription(confessionMessage)
      .setColor(randomColor)
      .setFooter({ text: "自分の秘密を共有するには /confess を使用してください。" })
    
    try {
      await interaction.channel.send({ embeds: [confessionEmbed] });

      await interaction.reply({
        content: "あなたの告白は匿名で投稿されました。\nYour confession has been posted anonymously.",
        ephemeral: true,
      });
    } catch (error) {
      console.error("Error processing confession:", error);
      await interaction.reply({
        content: "メッセージの投稿中にエラーが発生しました。\nAn error occurred while posting your message.",
        ephemeral: true,
      });
    }
  },
};