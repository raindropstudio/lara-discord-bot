const logger = require('./logger');

function logCommandUsage(interaction) {
    const optionsArray = interaction.options.data;

    //값이 없거나 배열이 아닌 경우 예외처리 및 오류 로그 기록
    if (!optionsArray || !Array.isArray(optionsArray)) {
        logger.error("Unexpected data format in interaction options");
        return;
    }

    //명령어 실행 시 입력한 값을 로그로 기록
    const commandInput = interaction.commandName + ' ' + optionsArray.map(option => option.value).join(' ');
    logger.info(`${interaction.user.tag} (ID: ${interaction.user.id}) used command: /${commandInput}`);
}

function logCommandIssue(interaction) {
    const optionsArray = interaction.options.data;

    //값이 없거나 배열이 아닌 경우 예외처리 및 오류 로그 기록
    if (!optionsArray || !Array.isArray(optionsArray)) {
        logger.error("Unexpected data format in interaction options for logCommandIssue");
        return;
    }

    //명령어 실행 시 입력한 값을 로그로 기록
    //const commandInput = interaction.commandName + ' ' + optionsArray.map(option => option.value).join(' ');
    const logMessage = `[command issue] ${interaction.user.tag} (ID: ${interaction.user.id}) entered invalid values for command`;
    logger.warn(logMessage);
}

module.exports = {
    logCommandUsage,
    logCommandIssue
};