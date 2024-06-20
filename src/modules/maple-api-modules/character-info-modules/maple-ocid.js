require("dotenv").config();
const axios = require("axios");
const api_token = process.env.MAPLE_API_TOKEN;

async function getCharacterOCID(characterName) {
  const url = `https://open.api.nexon.com/maplestory/v1/id?character_name=${encodeURIComponent(characterName)}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "x-nxopen-api-key": api_token,
      },
    });

    const ocid = response.data?.ocid; // API 응답 형식에 따라 수정
    if (!ocid) {
      throw new Error('OCID not found in the response');
    }

    return ocid;
  } catch (error) {
    console.error("API 호출 중 오류가 발생했습니다: ", error.message);
    if (error.response) {
      console.log(characterName);
      console.log(error.response.data);
    }
    throw error;
  }
}

module.exports = getCharacterOCID;
