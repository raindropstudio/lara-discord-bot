const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const characterOcid = require("../modules/maple-api-modules/maple-ocid.js");
const colors = require("../assets/colors.js");
const commandLogger = require("../logger/command-logger.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ocid")
    .setDescription("OCID 정보 가져오기")
    .addStringOption((option) => option.setName("아이디").setDescription("검색할 캐릭터를 입력하세요.").setRequired(true)),

  async execute(interaction) {
    const characterName = interaction.options.getString("아이디");
    try {
      const description = await characterOcid(characterName);
      const resultEmbed = new EmbedBuilder()
        .setTitle("OCID 정보")
        .setColor(parseInt(colors.error.replace("#", ""), 16))
        .setDescription(description);

      await interaction.reply({ embeds: [resultEmbed] });
    } catch (error) {
      await replyWithError(interaction, error.message);
    }

    function replyWithError(interaction, message) {
      commandLogger.logCommandIssue(interaction);

      const errorEmbed = new EmbedBuilder()
        .setTitle("OCID 조회 오류")
        .setColor(parseInt(colors.error.replace("#", ""), 16))
        .setDescription("메이플스토리 API 서버에서 조회되지 않는 캐릭터입니다.");

      if (interaction.replied || interaction.deferred) {
        return interaction.followUp({ embeds: [errorEmbed] });
      } else {
        return interaction.reply({ embeds: [errorEmbed] });
      }
    }
    commandLogger.logCommandUsage(interaction); //로그
  },
};
