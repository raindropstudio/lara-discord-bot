const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const colors = require('../assets/colors.js');
const calculateElixirResults = require('../modules/elixir-calculator');
const randomQuote = require('../modules/random-quote');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('비약')
		.setDescription('라라가 비약을 미리 마셔보고 결과를 알려드릴게요!')
		.addIntegerOption(option => 
			option.setName('현재레벨')
				.setDescription('현재 레벨을 입력하세요.')
				.setRequired(true))
		.addNumberOption(option => 
			option.setName('현재경험치퍼센트')
				.setDescription('현재 경험치 퍼센트를 입력하세요.')
				.setRequired(true))
		.addIntegerOption(option => 
			option.setName('익스트림성장의비약')
				.setDescription('사용할 익스트림 성장의 비약의 갯수를 입력하세요.')
				.setRequired(false))
		.addIntegerOption(option => 
			option.setName('성장의비약1')
				.setDescription('사용할 성장의 비약 1의 갯수를 입력하세요.')
				.setRequired(false))
		.addIntegerOption(option => 
			option.setName('성장의비약2')
				.setDescription('사용할 성장의 비약 2의 갯수를 입력하세요.')
				.setRequired(false))
        .addIntegerOption(option =>
            option.setName('성장의비약3')
                .setDescription('사용할 성장의 비약 3의 갯수를 입력하세요.')
                .setRequired(false))
        .addIntegerOption(option =>
            option.setName('태풍성장의비약')
                .setDescription('사용할 태풍 성장의 비약의 갯수를 입력하세요.')
                .setRequired(false))
        .addIntegerOption(option =>
            option.setName('극한성장의비약')
                .setDescription('사용할 극한 성장의 비약의 갯수를 입력하세요.')
                .setRequired(false)),
	async execute(interaction) {
		const currentLevel = interaction.options.getInteger('현재레벨');
		const currentExpPercentage = interaction.options.getNumber('현재경험치퍼센트');
		const extremeElixir = interaction.options.getInteger('익스트림성장의비약') || 0;
		const elixir1 = interaction.options.getInteger('성장의비약1') || 0;
		const elixir2 = interaction.options.getInteger('성장의비약2') || 0;
		const elixir3 = interaction.options.getInteger('성장의비약3') || 0;
		const typhoonElixir = interaction.options.getInteger('태풍성장의비약') || 0;
		const ultimateElixir = interaction.options.getInteger('극한성장의비약') || 0;

		const elixirResults = calculateElixirResults(currentLevel, currentExpPercentage, {
			extremeGrowthElixir: extremeElixir,
			growthElixir1: elixir1,
			growthElixir2: elixir2,
			growthElixir3: elixir3,
			typhoonGrowthElixir: typhoonElixir,
			ultimateGrowthElixir: ultimateElixir
		});

		const resultEmbed = new EmbedBuilder()
		.setColor(colors.primary)
		.setTitle('비약 사용 결과')
		.setFooter({ text: randomQuote.getRandomQuote(), iconURL: 'https://ssl.nexon.com/s2/game/maplestory/renewal/common/world_icon/icon_1.png' })
		.setDescription(`사용 전 레벨: ${currentLevel}\n사용 전 경험치%: ${currentExpPercentage}\n사용 후 레벨: ${elixirResults.level}\n사용 후 경험치%: ${elixirResults.percentage}%`);
			if (extremeElixir > 0) resultEmbed.addFields({ name: `익스트림 성장의 비약 ${extremeElixir} 개`, value: '\u200B', inline: true });
			if (elixir1 > 0) resultEmbed.addFields({ name: `성장의 비약 1 ${elixir1}개`, value: '\u200B', inline: true });
			if (elixir2 > 0) resultEmbed.addFields({ name: `성장의 비약 2 ${elixir2} 개`, value: '\u200B', inline: true });
			if (elixir3 > 0) resultEmbed.addFields({ name: `성장의 비약 3 ${elixir3} 개`, value: '\u200B', inline: true });
			if (typhoonElixir > 0) resultEmbed.addFields({ name: `태풍 성장의 비약 ${typhoonElixir} 개`, value: '\u200B', inline: true });
			if (ultimateElixir > 0) resultEmbed.addFields({ name: `극한 성장의 비약 ${ultimateElixir} 개`, value: '\u200B', inline: true });
		
		await interaction.reply({ embeds: [resultEmbed] })
		
	},
};
