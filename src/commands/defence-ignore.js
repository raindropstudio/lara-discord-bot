const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const colors = require('../assets/colors.js');
const randomQuote = require('../modules/random-quote');
const icons = require('../assets/icons.js');
const commandLogger = require('../logger/command-logger');

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

		commandLogger.logCommandUsage(interaction); //로그 기록

		const statIgnore = interaction.options.getNumber('스탯창방무');
		const firstIgnore = interaction.options.getNumber('방무1');
		const secondIgnore = interaction.options.getNumber('방무2');
		const thirdIgnore = interaction.options.getNumber('방무3');

		// 입력 값을 검증하는 부분
		if (!statIgnore || statIgnore < 0 || statIgnore > 100) {
			return replyWithError(interaction, '스탯창 방무는 값이 100%를 넘길 수 없어요!');
		}

		if (!firstIgnore || firstIgnore < 0 || firstIgnore > 40 || 
			(secondIgnore && (secondIgnore < 0 || secondIgnore > 40)) || 
			(thirdIgnore && (thirdIgnore < 0 || thirdIgnore > 40))) {
			return replyWithError(interaction, '방무 옵션의 수치는 각각 40%를 넘을 수 없어요!');
		}

		let totalIgnore = statIgnore;

		if (firstIgnore != null) {
			totalIgnore = totalIgnore + (100 - totalIgnore) * firstIgnore / 100;
		}

		if (secondIgnore != null) {
			totalIgnore = totalIgnore + (100 - totalIgnore) * secondIgnore / 100;
		}

		if (thirdIgnore != null) {
			totalIgnore = totalIgnore + (100 - totalIgnore) * thirdIgnore / 100;
		}

		if (totalIgnore > 100) {
			return replyWithError(interaction);
		}
		
		//명령어 오류일 때
		function replyWithError(interaction, message) {
			commandLogger.logCommandIssue(interaction); //오류 로그 기록
			
			const errorEmbed = new EmbedBuilder()
				.setColor(colors.error)
				.setTitle('다시 입력해주세요!')
				.setDescription(message)
				//.setFooter({ text: '다시 시도해주세요.', iconURL: icons.errorIcon });
			return interaction.reply({ embeds: [errorEmbed] });
		}

		const resultEmbed = new EmbedBuilder()
			.setThumbnail(icons.defenceIgnore)
			//.setAuthor({ name: '방어력은 숫자일 뿐', /*iconURL: 'http://avatar.maplestory.nexon.com/SkillIcon/KFGDLHPBOD.png'*/})
			.setColor(colors.primary)
			.setTitle('방무 증가 수치')
			.setDescription(`> 최종적으로 계산된 방무 수치입니다. \n\`\`\`${totalIgnore.toFixed(2)}%\`\`\``)
			.setFooter({ text: randomQuote.getRandomQuote(), iconURL: icons.mapleLeaf });
		await interaction.reply({ embeds: [resultEmbed] });
	},
	
};