const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js'); // EmbedBuilder로 변경
const getEventInfo = require('../services/event-sunday-parser');
const colors = require('../assets/colors.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('썬데이메이플')
		.setDescription('썬데이 메이플 이벤트 정보를 알려줘요!'),
	async execute(interaction) {
		const eventInfo = await getEventInfo();

		// 만약 이벤트가 없다면
		if (typeof eventInfo === 'string') {
			return await interaction.reply(eventInfo);
		}

		// 만약 이벤트가 있다면
		const embed = new EmbedBuilder()
			.setTitle(`썬데이 메이플 이벤트 정보 - ${eventInfo.title}`) // 제목 추가
			.setDescription(`[이벤트 페이지 바로가기](${eventInfo.link})\n**이벤트 기간:** ${eventInfo.period}`)
			.addFields(
				{ name: '세부 내용', value: eventInfo.details } // addFields로 수정
			)
			.setImage(eventInfo.image)
			.setColor(colors.primary);

		await interaction.reply({ embeds: [embed] });
	},
};