const elixirsData = require('../data/elixirs.json');
const levelExpTable = require('../data/levelExpTable.json');

const calculateElixirResults = (currentLevel, currentExpPercentage, elixirsUsed) => {
  // 현재 레벨에서의 경험치를 계산
  let currentExp = (levelExpTable[currentLevel.toString()] * currentExpPercentage) / 100;

  // elixirsUsed 객체의 각 키에 대해 반복하여 사용할 비약의 정보를 가져오기
  Object.keys(elixirsUsed).forEach(elixirKey => {
    const elixirInfo = elixirsData[elixirKey]; // 해당 비약의 정보를 가져오기
    const elixirCount = elixirsUsed[elixirKey]; // 사용할 비약의 갯수를 가져오기

    // 사용할 비약의 갯수만큼 반복하여 경험치를 계산하기
    for (let i = 0; i < elixirCount; i++) {
      // 현재 레벨이 해당 비약의 최대 사용 레벨 이하인 경우
      if (currentLevel < elixirInfo.maxLevel) {
        currentLevel++; // 레벨 증가
        // 경험치는 그대로 유지
      } else {
        // 현재 레벨이 비약의 최대 레벨을 초과하는 경우, 고정 경험치를 적용
        currentExp += elixirInfo.fixedExp;
        while (currentExp >= levelExpTable[currentLevel.toString()] && currentLevel < 300) {
          currentExp -= levelExpTable[currentLevel.toString()]; // 현재 레벨의 경험치를 빼기
          currentLevel++; // 레벨 증가
        }
      }
    }
  });

  // 최종 경험치 퍼센트를 계산
  const finalExpPercentage = (currentExp / levelExpTable[currentLevel.toString()]) * 100;

  // 결과로 현재 레벨과 경험치 퍼센트를 반환
  return {
    level: currentLevel,
    percentage: finalExpPercentage
  };
};


module.exports = calculateElixirResults;
