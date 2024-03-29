require('dotenv').config();
const getCharacterOCID = require('./maple-ocid');
const axios = require('axios');
const api_token = process.env.MAPLE_API_TOKEN;

const characterStats = async(characterName, date = '') => {
  const ocid = await getCharacterOCID(characterName);
  const url = `https://open.api.nexon.com/maplestory/v1/character/stat?ocid=${ocid}${date ? "&date=" + date : ""}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'x-nxopen-api-key': api_token,
      },
    });
    const characterStatsData = response.data;
    //console.log(characterStatsData);
    return characterStatsData;
  } catch (error) {
    console.error("캐릭터 스탯 관련 정보를 호출 중 오류가 발생했습니다:", error.message);
    if (error.response) {
      console.log(characterName);
      console.log(error.response.data);
      console.log(url);
      return error;
    }
  }
}
module.exports = characterStats;