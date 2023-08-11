const levelExpTable = require('../data/levelExpTable.json');

// 백분율 계산
function calculateExpPercentage(level, currentExp){
    const numericLevel = level.replace("Lv.", ""); // 문자열에 레벨만 남기기
    const totalExpForLevel = levelExpTable[numericLevel]; // 문자열 변환

    // 콤마 제거 후 숫자로 변환
    currentExp = parseFloat(currentExp.replace(/,/g, ''));

    console.log('[status (exp-calculator.js)]: level:', numericLevel);

    if(!totalExpForLevel){
        throw new Error('err [exp-calculator.js]: 레벨이 올바르지 않습니다.');
    }

    // 계산 후 소수점 세 자리까지 반올림
    const percentage = (currentExp / totalExpForLevel) * 100;
    return percentage.toFixed(3); // 결과를 문자열로 반환
}

module.exports = calculateExpPercentage;