const icons = require('../assets/icons');

const getServerIconUrl = (serverName) => {
  if (!['리부트', '리부트2'].includes(serverName)) {
    const serverIconNumber = icons[serverName];
    return `https://ssl.nexon.com/s2/game/maplestory/renewal/common/world_icon/icon_${serverIconNumber}.png`;
  } else {
    return `https://ssl.nexon.com/s2/game/maplestory/renewal/common/world_icon/icon_2.png`;
  }
}

module.exports = getServerIconUrl;