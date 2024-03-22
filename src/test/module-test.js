require("dotenv").config();
const getCharacterInfo = require("../modules/maple-api-modules/maple-character-info");
const getCharacterOCID = require("../modules/maple-api-modules/maple-ocid");

async function test() {
  try {
    const characterOCID = await getCharacterOCID("섭주");
    const characterInfo = await getCharacterInfo(characterOCID);
    console.log(characterInfo.character_level);
  } catch (error) {
    console.error("테스트 중 오류 발생:", error.message);
  }
}

test();
