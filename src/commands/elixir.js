// elixir.js

const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const calculateElixirResults = require('../modules/elixir-calculator');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('비약')
		.setDescription('특정 레벨과 경험치에서 비약을 사용했을 때의 레벨과 경험치%를 계산해 드릴게요!')
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
			.setColor('#fcf74c')
			.setTitle('비약 사용 결과')
			.setDescription(`사용 레벨: ${currentLevel}\n사용 경험치%: ${currentExpPercentage}\n사용 후 레벨: ${elixirResults.level}\n사용 후 경험치%: ${elixirResults.percentage}%`)
			.addFields(
				{ name: `익스트림 성장의 비약 ${extremeElixir} 개`, value: '\u200B', inline: true },
				{ name: `성장의 비약 1 ${elixir1}개`, value: '\u200B', inline: true },
				{ name: `성장의 비약 2 ${elixir2} 개`, value: '\u200B', inline: true },
				{ name: `성장의 비약 3 ${elixir3} 개`, value: '\u200B', inline: true },
				{ name: `태풍 성장의 비약 ${typhoonElixir} 개`, value: '\u200B', inline: true },
				{ name: `극한 성장의 비약 ${ultimateElixir} 개`, value: '\u200B', inline: true })
		await interaction.reply({ embeds: [resultEmbed] });
	},
};
