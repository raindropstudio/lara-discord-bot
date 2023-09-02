const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { solErdaCalculator } = require('../modules/sol-calculator');
const colors = require('../assets/colors.js');
const randomQuote = require('../modules/random-quote');
const icons = require('../assets/icons.js');
const commandLogger = require('../logger/command-logger');

//코어 종류 이름 매핑
const coreTypeDisplayNames = {
    skillCore: '스킬코어(오리진스킬)',
    masteryCore: '마스터리코어(4차강화스킬)',
    enhanceCore: '강화코어(5차강화코어)'
};

function validateLevels(startLevel, targetLevel) {
    if (startLevel >= 30 || startLevel < 0) {
        return "시작 레벨은 0 ~ 29 사이여야 해요!";
    }

    if (targetLevel > 30 || targetLevel <= 0) {
        return "목표 레벨은 0 ~ 30 사이여야 해요!";
    }

    if (startLevel >= targetLevel) {
        return "시작 레벨은 목표 레벨보다 작아야 해요!";
    }

    return null;
}

function createErrorEmbed(interaction, message) {
    commandLogger.logCommandIssue(interaction, message); // 이 부분도 수정
    const embed = new EmbedBuilder()
        .setColor(colors.error)
        .setTitle("다시 입력해주세요!")
        .setDescription(message);
    return embed;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('솔에르다')
        .setDescription('라라가 6차 스킬 강화에 필요한 재료 갯수를 계산해 드릴게요!')
        .addStringOption(option =>
            option.setName('코어종류')
            .setDescription('강화할 코어의 종류를 선택하세요.')
            .setRequired(true)
            .addChoices(
                { name: '스킬코어(오리진스킬)', value: 'skillCore' },
                { name: '마스터리코어(4차강화스킬)', value: 'masteryCore' },
                { name: '강화코어(5차강화코어)', value: 'enhanceCore' }
            )
        )
        .addNumberOption(option =>
        option.setName('시작레벨')
            .setDescription('강화를 시작할 레벨을 입력하세요.')
            .setRequired(true))
        .addNumberOption(option =>
            option.setName('목표레벨')
            .setDescription('강화 목표 레벨을 입력하세요.')
            .setRequired(true)),

    async execute(interaction) {
        commandLogger.logCommandUsage(interaction);

        const coreType = interaction.options.getString('코어종류');
        const startLevel = interaction.options.getNumber('시작레벨');
        const targetLevel = interaction.options.getNumber('목표레벨');

        const errorMessage = validateLevels(startLevel, targetLevel);
        if (errorMessage) {
            const errorEmbed = createErrorEmbed(interaction, errorMessage);
            await interaction.reply({ embeds: [errorEmbed] });
            return;
        }

        const coreTypeDisplayName = coreTypeDisplayNames[coreType] || coreType;
        const result = solErdaCalculator(coreType, startLevel, targetLevel);

        const embed = new EmbedBuilder()
            .setColor(colors.primary)
            .setThumbnail(icons.solErda)
            .setTitle(`${coreTypeDisplayName} 강화 계산기`)
            .setDescription(`\`${startLevel}레벨 -> ${targetLevel}레벨\` 까지 강화하는데 필요한 재료 갯수입니다.`)
            .addFields(
                { name: '【 총 필요한 솔 에르다 갯수 】', value: `> \`${result.solErda}개\``, inline: false },
                { name: '【 총 필요한 솔 에르다 조각 갯수 】', value: `> \`${result.solErdaPiece}개\``, inline: false },
            )
            .setFooter({ text: randomQuote.getRandomQuote(), iconURL: icons.mapleLeap });
            await interaction.reply({ embeds: [embed] });

    }
}