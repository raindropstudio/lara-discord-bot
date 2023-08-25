const { SlashCommandBuilder } = require('@discordjs/builders');
const commandLogger = require('../logger/command-logger');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('도움말')
		.setDescription('라라가 도움을 줄게요!'),
	async execute(interaction) {
		commandLogger.logCommandUsage(interaction);
		return interaction.reply('도움말 테스트');
	},
};