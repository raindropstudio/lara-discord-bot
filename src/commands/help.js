const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('도움말')
		.setDescription('라라가 도움을 줄게요!'),
	async execute(interaction) {
		return interaction.reply('도움말 테스트');
	},
};