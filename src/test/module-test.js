require("dotenv").config();
const getCharacterInfo = require("../modules/maple-api-modules/character-info-modules/maple-character-info");
const getCharacterOCID = require("../modules/maple-api-modules/character-info-modules/maple-ocid");
const getCharacterStats = require('../modules/maple-api-modules/character-info-modules/maple-character-stats');
const characterStats = require("../modules/maple-api-modules/character-info-modules/maple-character-stats");

async function test() {
  try {
    const characterOCID = await getCharacterOCID("섭주");
    const characterInfo = await getCharacterInfo(characterOCID);
    const characterStats = await getCharacterStats("섭주");
    //const getPowerStat = characterStats.final_stats.find(stat => stat.stat_name === "전투력");

    console.log(characterInfo.character_level);
    console.log(characterStats);
  } catch (error) {
    console.error("테스트 중 오류 발생:", error.message);
    console.log(characterStats.url);
  }
}

test("섭주");
