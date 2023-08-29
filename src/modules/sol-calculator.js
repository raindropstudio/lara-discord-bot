const solErdaTable = require('../data/solErdaTable.json')

const solErdaCalculator = (coreName, startLevel, endLevel) => {
    const coreInfo = solErdaTable[coreName];

    if (!coreInfo) {
        throw new Error(`Invalid coreName: ${coreName}`);
    }

    if (!coreInfo[startLevel]) {
        throw new Error(`Invalid startLevel: ${startLevel} for coreName: ${coreName}`);
    }

    let solErda = coreInfo[startLevel].solErda;
    let solErdaPiece = coreInfo[startLevel].solErdaPiece;

    for (let i = startLevel; i < endLevel; i++) {
        if (!coreInfo[i]) {
            throw new Error(`Missing data for level ${i} for coreName: ${coreName}`);
        }
        solErda += coreInfo[i].solErda;
        solErdaPiece += coreInfo[i].solErdaPiece;
    }

    return {
        solErda: solErda,
        solErdaPiece: solErdaPiece
    };
};

module.exports = {
    solErdaCalculator: solErdaCalculator
};