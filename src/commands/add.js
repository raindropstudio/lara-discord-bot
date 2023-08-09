const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('덧셈하기')
		.setDescription('두 개의 숫자를 더합니다.')
		.addNumberOption(option => 
			option.setName('처음')
				.setDescription('첫번째 숫자를 입력하세요.')
				.setRequired(true))
		.addNumberOption(option => 
			option.setName('둘')
				.setDescription('두번째 숫자를 입력하세요.')
				.setRequired(true)),
	async execute(interaction) {
		const firstNumber = interaction.options.getNumber('처음');
		const secondNumber = interaction.options.getNumber('둘');
		const result = firstNumber + secondNumber;

		const resultEmbed = new EmbedBuilder()
			.setColor(0x0099ff)
			.setTitle('덧셈 결과')
			.setDescription(`${firstNumber} + ${secondNumber} = ${result} 입니다.`);

		await interaction.reply({ embeds: [resultEmbed] });
	},
};