require('dotenv').config();
const axios = require('axios');
const api_token = process.env.MAPLE_API_TOKEN;

async function getGuildInfo(worldName, guildName) {
  const guildIdUrl = `https://open.api.nexon.com/maplestory/v1/guild/id?guild_name=${encodeURIComponent(guildName)}&world_name=${encodeURIComponent(worldName)}`;

  try {
    const response = await axios.get(guildIdUrl, {
      headers: {
        'x-nxopen-api-key': api_token,
      },
    });

    const guildId = response.data?.oguild_id;
    if (!guildId) {
      throw new Error('유효하지 않은 길드 이름 또는 월드 이름입니다.');
    }

    const guildInfoUrl = `https://open.api.nexon.com/maplestory/v1/guild/basic?oguild_id=${guildId}`;
    const guildResponse = await axios.get(guildInfoUrl, {
      headers: {
        'x-nxopen-api-key': api_token,
      },
    });

    return guildResponse.data;
  } catch (error) {
    console.error('API 호출 중 오류가 발생했습니다: ', error.message);
    if (error.response) {
      console.log('API 응답 데이터:', error.response.data);
    }
    throw error;
  }
}

module.exports = getGuildInfo;
