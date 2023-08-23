const logger = require('./logger');

function logCommandUsage(interaction) {
    // .data 속성을 사용하여 옵션들을 배열로 가져오기
    const optionsArray = interaction.options.data;
    
    // 가져온 옵션 배열을 사용하여 로그 메시지 생성
    const commandInput = interaction.commandName + ' ' + optionsArray.map(option => option.value).join(' ');
    logger.info(`${interaction.user.tag} (ID: ${interaction.user.id}) used command: ${commandInput}`);
}

module.exports = logCommandUsage;