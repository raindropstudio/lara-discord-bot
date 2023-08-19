const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getUserInfo = require('../services/crawler');
const colors = require('../assets/colors.js');
const randomQuote = require('../modules/random-quote');
const calculateExpPercentage = require('../modules/exp-calculator.js');
const icons = require('../assets/icons.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('검색')
		.setDescription('용사님의 정보를 라라가 알아봐 드릴게요!')
		.addStringOption(option => 
			option.setName('닉네임')
				.setDescription('닉네임을 입력하세요.')
				.setRequired(true)),
	async execute(interaction) {
		const nickname = interaction.options.getString('닉네임');
		const userInfo = await getUserInfo(nickname);

		//console.log('Image URL:', userInfo.characterImg); //캐릭터 이미지 URL 검사

		const embed = new EmbedBuilder()
			.setAuthor({ name: '\u200B', iconURL: userInfo.serverImg})
			.setTitle(`**「   ${nickname}   」**`)
			.setColor(colors.primary)
			.setThumbnail(userInfo.characterImg)
			.setDescription(`> ${userInfo.job}\n`, inline = false)
			.addFields(
				//{ name: '닉네임', value: userInfo.nickname, inline: true },
				//{ name: '직업', value: userInfo.job, inline: true },
				//{ name: '\u200B', value: '\u200B', inline: false },
				{ name: '【 레벨 】', value: `\`${userInfo.level}\`  ${calculateExpPercentage(userInfo.level, userInfo.experience)}`, inline: true },
				//{ name: '\u200B', value: `\`${calculateExpPercentage(userInfo.level, userInfo.experience)} %\``, inline: true },				
				{ name: '【 경험치 】', value: `\`${userInfo.experience}\``, inline: false },
				{ name: '【 인기도 】', value: `\`${userInfo.pop}\``, inline: true },
				{ name: '【 길드 】', value: userInfo.guild && userInfo.guild.length > 0 ? `\`${userInfo.guild}\`` : '없음', inline: true })			
			//.setImage('https://ssl.nexon.com/s2/game/maplestory/renewal/common/world_icon/icon_13.png', inline = true)
			.setFooter({ text: randomQuote.getRandomQuote(), iconURL: icons.mapleLeap });
		await interaction.reply({ embeds: [embed] });
		console.log(embed);
	},
};