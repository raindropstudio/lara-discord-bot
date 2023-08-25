const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const commandLogger = require('../logger/command-logger');
const getAdditionalOptions = require('../modules/getAdditionalOptions');
const colors = require('../assets/colors');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('추옵')
		.setDescription('라라가 무기의 추가옵션을 보여줄게요!')
		.addStringOption(option =>
			option.setName('무기이름')
			.setDescription('추가옵션을 확인할 무기의 이름을 "정확히" 입력해주세요! (예: 앱솔 완드 X, 앱솔랩스 스펠링완드 O)')
			.setRequired(true)),
	async execute(interaction) {

		commandLogger.logCommandUsage(interaction);

		const inputName = interaction.options.getString('무기이름');
		const result = getAdditionalOptions(inputName);

		if (result) {
			const embed = new EmbedBuilder()
				.setTitle(`${result.name}의 추가옵션 정보`) // 원래 아이템 이름을 사용
				.setColor(colors.primary)
				.setDescription(result.options.join(' / '));
			await interaction.reply({ embeds: [embed] });
		} else {
			commandLogger.logCommandIssue(interaction);
			const embed = new EmbedBuilder()
				.setTitle('문제가 발생했어요!')
				.setColor(colors.error)
				.setDescription('입력하신 무기의 추가옵션 자료를 찾을 수 없어요. 아래 내용을 참고해주세요!')
				.addFields(
					{ name: '**확인해야 될 사항**', value: `1. 무기 이름의 전체 이름을 적어주세요. 띄어쓰기는 상관없습니다.\n2. 지원되는 아이템 목록은, \`파프니르\`, \`앱솔랩스\`,\`아케인셰이드\`, \`제네시스\` 무기입니다.`, inline: false},
					{ name: '> 라라에게 물어본 무기 이름', value: `\`\`\`${inputName}\`\`\``, inline: false },
				);
			await interaction.reply({ embeds: [embed] });
		}
	},
};