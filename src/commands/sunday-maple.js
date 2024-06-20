const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getEventInfo = require('../services/event-sunday-parser');
const commandLogger = require('../logger/command-logger');
const colors = require('../assets/colors.js');
const icons = require('../assets/icons.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('썬데이메이플')
		.setDescription('설레는 일요일, 라라가 썬데이 메이플 이벤트 정보를 알려드릴게요!'),
	async execute(interaction) {
		const eventInfo = await getEventInfo();
		commandLogger.logCommandUsage(interaction);

		// 썬데이 이벤트가 없을 때
		if (typeof eventInfo === 'string') {
			const embed = new EmbedBuilder()
				.setTitle(`썬데이 메이플이 없어요!`)
				.addFields(
					{ name: '알림', value: `현재 예정되어있거나 진행중인 썬데이 메이플 이벤트가 없습니다.\n썬데이 메이플 공지는 평균적으로 금요일 오전 10시에 공지됩니다.` }
				)
				.setColor(colors.error);
			return await interaction.reply({ embeds: [embed] });
		}

		// 썬데이 이벤트 진행중일 때
		const embed = new EmbedBuilder()
			.setTitle(`썬데이 메이플 이벤트 정보 - ${eventInfo.title}`)
			.setThumbnail('http://avatar.maplestory.nexon.com/ItemIcon/KAPFNHOB.png')
			.setDescription(`[이벤트 페이지 바로가기](${eventInfo.link})\n**이벤트 기간: ${eventInfo.period}**`)
			.addFields(
				{ name: '> **세부 내용**', value: eventInfo.details }
			)
			.setImage(eventInfo.image)
			.setColor(colors.primary)
			.setFooter({ text: `썬데이 메이플 내용은 변동될 수 있으니 자세한 사항은 홈페이지를 참고해주세요.`, iconURL: icons.mapleLeaf });

		await interaction.reply({ embeds: [embed] });
	},
};