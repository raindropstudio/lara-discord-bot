require("dotenv").config();
const axios = require("axios");
const api_token = process.env.MAPLE_API_TOKEN;

async function characterOcid(characterName) {
  const url = `https://open.api.nexon.com/maplestory/v1/id?character_name=${characterName}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "x-nxopen-api-key": api_token,
      },
    });

    const ocid = response.data.ocid;
    console.log(characterName);
    console.log(ocid);
    return ocid;
  } catch (error) {
    console.error("API 호출 중 오류가 발생했습니다: ", error.message);
    if (error.response) {
      // 서버 응답에 포함된 추가 정보를 출력
      console.log(characterName);
      console.log(error.response.data);
      return error;
    }
  }
}

module.exports = characterOcid;
