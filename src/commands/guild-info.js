const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const getGuildInfo = require('../modules/maple-api-modules/character-info-modules/maple-guild-info');
const colors = require('../assets/colors.js');
const commandLogger = require('../logger/command-logger');
const randomQuote = require('../modules/random-quote');
const icons = require('../assets/icons.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('길드')
    .setDescription('길드 정보를 가져옵니다.')
    .addStringOption(option =>
      option.setName('월드')
        .setDescription('월드 이름을 입력하세요.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('길드')
        .setDescription('길드 이름을 입력하세요.')
        .setRequired(true)),
  
  async execute(interaction) {
    commandLogger.logCommandUsage(interaction);
    const worldName = interaction.options.getString('월드');
    const guildName = interaction.options.getString('길드');

    try {
      const guildInfo = await getGuildInfo(worldName, guildName);
      const currentDate = new Date().toISOString().split('T')[0];

      const attachment = new AttachmentBuilder(Buffer.from(guildInfo.guild_mark_custom, 'base64'), { name: 'guild_icon.png' });

      const embed = new EmbedBuilder()
        .setThumbnail('attachment://guild_icon.png')
        .setTitle(`${guildName} 길드 정보`)
        .setColor(colors.primary)
        .setDescription(`> ${currentDate} 기준\n\n`)
        .addFields(
          { name: '길드 레벨', value: `${guildInfo.guild_level}`, inline: true },
          { name: '길드 명성', value: `${guildInfo.guild_fame.toLocaleString()}`, inline: true },
          { name: '길드 포인트', value: `${guildInfo.guild_point.toLocaleString()}`, inline: true },
          { name: '길드장', value: `${guildInfo.guild_master_name}`, inline: true },
          { name: '길드원 수', value: `${guildInfo.guild_member_count}`, inline: true }
        )
        .setFooter({ text: randomQuote.getRandomQuote(), iconURL: icons.mapleLeaf });

      // 노블스킬 추가
      if (guildInfo.guild_noblesse_skill && guildInfo.guild_noblesse_skill.length > 0) {
        const skillsDescription = guildInfo.guild_noblesse_skill.map(skill => {
          const skillEffect = skill.skill_effect.replace(/,\s?재사용 대기시간\s?\d+\s?분/g, '')
            .replace(/(\d+분 동안\s?)/g, '')
            .replace(/^효과:\s?/, '');
          return `> **${skill.skill_name}** (레벨: ${skill.skill_level})\n${skillEffect}`;
        }).join('\n\n');

        embed.addFields({ name: '노블스킬', value: skillsDescription, inline: false });
      }

      await interaction.reply({ embeds: [embed], files: [attachment] });
    } catch (error) {
      console.error('길드 정보를 가져오는 중 오류가 발생했습니다: ', error.message);
      commandLogger.logCommandIssue(interaction, error);

      const embed = new EmbedBuilder()
        .setColor(colors.error)
        .setTitle("길드 정보를 가져오는 중 오류가 발생했습니다!")
        .setDescription("길드 정보를 가져오는 중 문제가 발생했습니다. 다시 시도해주세요.");
      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
