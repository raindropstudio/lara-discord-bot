require('dotenv').config();
const axios = require('axios');
const api_token = process.env.MAPLE_API_TOKEN;
const getCharacterOCID = require('./maple-ocid');

async function getArtifactInfo(characterName, date = '') {
  const ocid = await getCharacterOCID(characterName);
  const url = `https://open.api.nexon.com/maplestory/v1/user/union-artifact?ocid=${ocid}${date ? '&date=' + date : ''}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'x-nxopen-api-key': api_token,
      },
    });
    const artifactInfo = response.data;
    return artifactInfo;
  } catch (error) {
    console.error('API 호출 중 오류가 발생했습니다: ', error.message);
    if (error.response) {
      console.log(characterName);
      console.log(error.response.data);
      return error.response.data;
    }
  }
}

module.exports = getArtifactInfo;