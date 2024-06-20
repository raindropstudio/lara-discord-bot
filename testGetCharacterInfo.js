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

    console.log("OCID API 응답:", response.data); // 응답 전체를 출력하여 확인
    const ocid = response.data.ocid; // 여기서 characterId가 아니라 ocid임을 확인
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

async function testGetCharacterInfo() {
  const characterName = "빙캔";
  const ocid = await getCharacterOCID(characterName);

  const url = `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "x-nxopen-api-key": api_token,
      },
    });

    console.log("Character Info API 응답:", response.data);
  } catch (error) {
    console.error("Character Info API 호출 중 오류가 발생했습니다: ", error.message);
    if (error.response) {
      console.log(ocid);
      console.log(error.response.data);
    }
  }
}

testGetCharacterInfo();
