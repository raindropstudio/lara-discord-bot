const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getUserInfo = require('../services/crawler');
const colors = require('../assets/colors.js');
const randomQuote = require('../modules/random-quote');
const calculateExpPercentage = require('../modules/exp-calculator.js');
const icons = require('../assets/icons.js');
const commandLogger = require('../logger/command-logger');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('검색')
		.setDescription('용사님의 정보를 라라가 알아봐 드릴게요!')
		.addStringOption(option => 
			option.setName('닉네임')
				.setDescription('닉네임을 입력하세요.')
				.setRequired(true)),
	async execute(interaction) {
		commandLogger.logCommandUsage(interaction); //로그 기록
		const nickname = interaction.options.getString('닉네임');
		
		try {
			const userInfo = await getUserInfo(nickname);

			const embed = new EmbedBuilder()
				.setAuthor({ name: '\u200B', iconURL: userInfo.serverImg})
				.setTitle(`**「   ${nickname}   」**`)
				.setColor(colors.primary)
				.setThumbnail(userInfo.characterImg)
				.setDescription(`> ${userInfo.job}\n`, inline = false)
				.addFields(
					{ name: '【 레벨 】', value: `\`${userInfo.level}\``, inline: true },
					{ name: '【 경험치 】', value: ` \`${calculateExpPercentage(userInfo.level, userInfo.experience)}% (${userInfo.experience})\``, inline: false },
					{ name: '【 인기도 】', value: `\`${userInfo.pop}\``, inline: true },
					{ name: '【 길드 】', value: userInfo.guild && userInfo.guild.length > 0 ? `\`${userInfo.guild}\`` : '없음', inline: true })
				.setFooter({ text: randomQuote.getRandomQuote(), iconURL: icons.mapleLeap });

			await interaction.reply({ embeds: [embed] });

		} catch (error) {
			commandLogger.logCommandIssue(interaction, error); //로그 기록
			// 오류가 발생한 경우 사용자에게 알려줄 임베드 생성
			const embed = new EmbedBuilder()
				.setColor(colors.error)
				.setTitle("입력한 닉네임의 용사님을 찾을 수 없어요!")
				.setDescription("메이플스토리 랭킹 서버에 등록되어 있지 않거나, 잘못된 닉네임을 입력하셨어요. 다시 입력해주세요!");

			await interaction.reply({ embeds: [embed] });
		}
	},
};