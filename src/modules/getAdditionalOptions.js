const additionalStatsTable = require('../data/additionalStatsTable');

const getAdditionalOptions = (inputName) => {
    // additionalStatsTable의 각 그룹(예: fafnir1, fafnir2 등)을 반복
    for (const group in additionalStatsTable) {
        // 현재 그룹의 무기 목록을 가져옴
        const weapons = additionalStatsTable[group].weapons;
        // 입력받은 아이템 이름과 일치하는 무기를 찾고, 공백은 무시
        const foundItem = weapons.find(weapon => weapon.replace(/\s+/g, '') === inputName.replace(/\s+/g, ''));

        if (foundItem) {
            return { name: foundItem, options: additionalStatsTable[group].options };
        }
    }
    return null;
};

module.exports = getAdditionalOptions;