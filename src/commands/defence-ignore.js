const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const randomQuote = require('../modules/random-quote');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('방무덧셈')
		.setDescription('몬스터 방어율 무시의 증가 수치를 라라가 계산해 드릴게요!')
		.addNumberOption(option => 
			option.setName('스탯창방무')
				.setDescription('현재 내 스탯창의 방무를 입력하세요.')
				.setRequired(true))
		.addNumberOption(option => 
			option.setName('방무1')
				.setDescription('스탯창 방무에 더할 방무를 입력하세요.')
				.setRequired(true))
		.addNumberOption(option => 
			option.setName('방무2')
				.setDescription('이어서 더할 방무를 입력하세요.')
				.setRequired(false))
		.addNumberOption(option =>
			option.setName('방무3')
				.setDescription('마지막으로 더할 방무를 입력하세요.')
				.setRequired(false)),

	async execute(interaction) {
		const statIgnore = interaction.options.getNumber('스탯창방무');
		let totalIgnore = statIgnore;
		
		const firstIgnore = interaction.options.getNumber('방무1');
		if (firstIgnore != null) {
			totalIgnore = totalIgnore + (100 - totalIgnore) * firstIgnore / 100;
		}

		const secondIgnore = interaction.options.getNumber('방무2');
		if (secondIgnore != null) {
			totalIgnore = totalIgnore + (100 - totalIgnore) * secondIgnore / 100;
		}

		const thirdIgnore = interaction.options.getNumber('방무3');
		if (thirdIgnore != null) {
			totalIgnore = totalIgnore + (100 - totalIgnore) * thirdIgnore / 100;
		}

		const resultEmbed = new EmbedBuilder()
			.setThumbnail('http://avatar.maplestory.nexon.com/SkillIcon/KFGDLHPBOD.png')
			//.setAuthor({ name: '방어력은 숫자일 뿐', /*iconURL: 'http://avatar.maplestory.nexon.com/SkillIcon/KFGDLHPBOD.png'*/})
			.setColor('#fcf74c')
			.setTitle('방무 증가 수치')
			.setDescription(`> 최종적으로 계산된 방무 수치입니다. \n\`\`\`${totalIgnore.toFixed(2)}%\`\`\``)
			.setFooter({ text: randomQuote.getRandomQuote(), iconURL: 'https://ssl.nexon.com/s2/game/maplestory/renewal/common/world_icon/icon_1.png' });
		await interaction.reply({ embeds: [resultEmbed] });
	},
};