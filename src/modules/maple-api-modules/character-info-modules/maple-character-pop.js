require('dotenv').config();
const axios = require('axios');
const api_token = process.env.MAPLE_API_TOKEN;
const getCharacterOCID = require('./maple-ocid');

const characterPop = async(characterName, date = '') => {
  const ocid = await getCharacterOCID(characterName);
  const url = `https://open.api.nexon.com/maplestory/v1/character/popularity?ocid=${ocid}${date ? "&date=" + date : ""}`
  
  try{
    const response = await axios.get(url, {
      headers: {
        'x-nxopen-api-key': api_token,
      },
    });
    const characterPopData = response.data
    return characterPopData;
  } catch (error) {
    console.log("API 호출 중 오류가 발생했습니다. 오류내용: ", error.message);
    return error;
  }
}

module.exports = characterPop;