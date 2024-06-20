const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getCharacterStats = require('../modules/maple-api-modules/character-info-modules/maple-character-stats');
const colors = require('../assets/colors.js');
const commandLogger = require('../logger/command-logger');
const randomQuote = require('../modules/random-quote');
const icons = require('../assets/icons.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('스탯')
    .setDescription('용사님의 스탯 정보를 라라가 알아봐 드릴게요!')
    .addStringOption(option =>
      option.setName('닉네임')
        .setDescription('닉네임을 입력하세요.')
        .setRequired(true)),
  async execute(interaction) {
    commandLogger.logCommandUsage(interaction); // 로그 기록
    const nickname = interaction.options.getString('닉네임');

    try {
      const statsInfo = await getCharacterStats(nickname);
      const { final_stat, character_class } = statsInfo;
      const currentDate = new Date().toISOString().split('T')[0];

      // 스탯 정보를 하나의 큰 문자열로 병합
      let statsDescription = final_stat.map(stat => {
        // 숫자를 쉼표로 구분하여 표시
        const statValue = stat.stat_value ? parseFloat(stat.stat_value.replace(/,/g, '')).toLocaleString() : stat.stat_value;
        return `-\`${stat.stat_name}\`  **${statValue}**`;
      }).join('\n');

      const embed = new EmbedBuilder()
        .setThumbnail(icons.statElixir)
        .setTitle(`${nickname}의 스탯 정보`)
        .setColor(colors.primary)
        .setDescription(`> ${currentDate} 기준\n> 클래스: ${character_class}\n\n${statsDescription}`)
        .setFooter({ text: randomQuote.getRandomQuote(), iconURL: icons.mapleLeaf });

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('캐릭터 스탯을 가져오는 중 오류가 발생했습니다:', error); // 오류 메시지를 로그에 출력합니다.
      commandLogger.logCommandIssue(interaction, error); // 로그 기록

      const embed = new EmbedBuilder()
        .setColor(colors.error)
        .setTitle("입력한 닉네임의 용사님을 찾을 수 없어요!")
        .setDescription("메이플스토리 랭킹 서버에 등록되어 있지 않거나, 잘못된 닉네임을 입력하셨어요. 다시 입력해주세요!");
      await interaction.reply({ embeds: [embed] });
    }
  }
};
