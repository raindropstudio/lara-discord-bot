const solErdaTable = require("../data/solErdaTable.json");

const solErdaCalculator = (coreName, startLevel, endLevel) => {
  const coreInfo = solErdaTable[coreName];

  if (!coreInfo) {
    throw new Error(`Invalid coreName: ${coreName}`);
  }

  // startLevel 데이터 유효성 검사
  if (!coreInfo[startLevel]) {
    throw new Error(
      `Invalid startLevel: ${startLevel} for coreName: ${coreName}`
    );
  }

  let solErda = 0;
  let solErdaPiece = 0;

  // endLevel을 포함하지 않고, startLevel부터 endLevel - 1까지 반복
  for (let i = startLevel; i < endLevel; i++) {
    if (!coreInfo[i]) {
      throw new Error(`Missing data for level ${i} for coreName: ${coreName}`);
    }
    solErda += coreInfo[i].solErda;
    solErdaPiece += coreInfo[i].solErdaPiece;
  }

  return {
    solErda: solErda,
    solErdaPiece: solErdaPiece,
  };
};

module.exports = {
  solErdaCalculator: solErdaCalculator,
};
