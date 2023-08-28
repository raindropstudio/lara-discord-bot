const hexaStatsTable = require('../data/hexaStatsTable.json');

const calculateHexaStats = (coreName, startLevel, endLevel) => {
    const coreInfo = hexaStatsTable[coreName]
    let solErda = coreInfo[startLevel].solErda;
    let solErdaFragment = coreInfo[startLevel].solErdaFragment;

    for(let i = startLevel; i < endLevel; i++) {
        solErda += coreInfo[i].solErda;
        solErdaFragment += coreInfo[i].solErdaFragment;
    }

    return {
        solErda: solErda,
        solErdaFragment: solErdaFragment
    };

};

module.exports = calculateHexaStats;