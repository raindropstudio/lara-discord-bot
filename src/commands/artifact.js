const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const colors = require('../assets/colors.js');
const commandLogger = require('../logger/command-logger');
const randomQuote = require('../modules/random-quote');
const icons = require('../assets/icons.js');
const getArtifactInfo = require('../modules/maple-api-modules/character-info-modules/maple-character-artifact.js');
const getUnionInfo = require('../modules/maple-api-modules/character-info-modules/maple-character-union.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('아티팩트')
    .setDescription('용사님의 아티팩트 정보를 라라가 알아봐 드릴게요!')
    .addStringOption(option =>
      option.setName('닉네임')
        .setDescription('닉네임을 입력하세요.')
        .setRequired(true)),
  async execute(interaction) {
    commandLogger.logCommandUsage(interaction); // 로그 기록
    const nickname = interaction.options.getString('닉네임');

    try {
      const artifactInfo = await getArtifactInfo(nickname);
      const unionInfo = await getUnionInfo(nickname);
      //console.log('API 응답:', artifactInfo);

      // 검색한 현재 날짜
      const currentDate = new Date().toISOString().split('T')[0];

      const embed = new EmbedBuilder()
        .setThumbnail(icons.mapleLeaf)
        .setTitle(`${nickname}의 아티팩트 정보`)
        .setColor(colors.primary)
        .setDescription(`> ${currentDate} 기준`, true)
        .addFields(
          { name: '【 아티팩트 레벨 】', value: `**${unionInfo.union_artifact_level}**`, inline: false },
          { name: '【 아티팩트 경험치 】', value: `\`${unionInfo.union_artifact_exp}\``, inline: false }
        );

        // union_artifact_effect 정보를 필드로 추가
        artifactInfo.union_artifact_effect.forEach(effect => {
          embed.addFields(
            { name: `**${effect.name}**`, value: `Lv.${effect.level}`, inline: true }
          );
        });

      embed.setFooter({ text: randomQuote.getRandomQuote(), iconURL: icons.mapleLeaf });
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.log('아티팩트 정보를 가져오는 중 오류가 발생했습니다:', error);
      commandLogger.logCommandIssue(interaction, error); // 로그 기록

      const embed = new EmbedBuilder()
        .setColor(colors.error)
        .setTitle("입력한 닉네임의 용사님을 찾을 수 없어요!")
        .setDescription("메이플스토리 랭킹 서버에 등록되어 있지 않거나, 잘못된 닉네임을 입력하셨어요. 다시 입력해주세요!");
      await interaction.reply({ embeds: [embed] });
    }
  }
};
