const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getCashEquipmentInfo = require('../modules/maple-api-modules/character-info-modules/maple-cash-equipment.js');
const colors = require('../assets/colors.js');
const commandLogger = require('../logger/command-logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('코디')
    .setDescription('라라가 용사님의 OOTD를 분석해볼게요! (영수증을 거꾸로 보며..)')
    .addStringOption(option => option.setName('닉네임').setDescription('닉네임을 입력하세요.').setRequired(true))
    .addIntegerOption(option => option.setName('프리셋').setDescription('프리셋을 입력하세요. (0: 베이스 캐시템, 1, 2, 3: 코디 캐시템 프리셋)').setRequired(false)),
  async execute(interaction) {
    commandLogger.logCommandUsage(interaction); // 로그 기록
    const characterName = interaction.options.getString('닉네임');
    const preset = interaction.options.getInteger('프리셋') || 0;

    try {
      const equipmentInfo = await getCashEquipmentInfo(characterName);
      if (equipmentInfo.error) {
        await interaction.reply(`Error: ${equipmentInfo.message}`);
        return;
      }

      let items;
      if (preset === 0) {
        items = equipmentInfo.cash_item_equipment_base || [];
      } else if (preset === 1) {
        items = equipmentInfo.cash_item_equipment_preset_1 || [];
      } else if (preset === 2) {
        items = equipmentInfo.cash_item_equipment_preset_2 || [];
      } else if (preset === 3) {
        items = equipmentInfo.cash_item_equipment_preset_3 || [];
      } else {
        await interaction.reply("잘못된 프리셋 번호입니다. 0(베이스 코디), 1, 2, 3 중 하나를 선택해주세요.");
        return;
      }

      if (items.length === 0) {
        await interaction.reply("해당 프리셋에 캐시 장비 정보가 없어요!");
        return;
      }

      const embeds = items.map(item => new EmbedBuilder()
        .setTitle(`**${item.cash_item_name}**`)
        .setColor(colors.primary)
        .setDescription(`타입: ${item.cash_item_equipment_part || '설명 없음'}`)
        .setThumbnail(item.cash_item_icon)
      );

      await interaction.reply({ embeds: embeds });
    } catch (error) {
      console.error('캐시 장비 정보를 가져오는 중 오류가 발생했습니다:', error); // 상세한 오류 로그
      commandLogger.logCommandIssue(interaction, error); // 로그 기록
      const embed = new EmbedBuilder()
        .setColor(colors.error)
        .setTitle("캐시 장비 정보를 가져오는 중 오류가 발생했습니다!")
        .setDescription("캐시 장비 정보를 가져오는 중 문제가 발생했습니다. 다시 시도해주세요.");
      await interaction.reply({ embeds: [embed] });
    }
  },
};
