const axios = require('axios');
const cheerio = require('cheerio');

const getUserInfo = async (nickname) => {
    const url = `https://maplestory.nexon.com/N23Ranking/World/Total?c=${encodeURIComponent(nickname)}&w=0`;

    // Create a new axios instance with headers
    const instance = axios.create({
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
            'Accept-Charset': 'utf-8'
        }
    });

    const response = await instance.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    let characterImg = $('#container > div > div > div:nth-child(4) > div.rank_table_wrap > table > tbody > tr.search_com_chk > td.left > span > img').attr('src');
    let characterServerImg = $('#container > div > div > div:nth-child(4) > div.rank_table_wrap > table > tbody > tr.search_com_chk > td.left > dl > dt > a > img').attr('src');

    characterImg = characterImg.replace('https://', 'http://');
    characterImg = characterImg.replace('/180', '');

    const userInfo = {
        nickname: $('#container > div > div > div:nth-child(4) > div.rank_table_wrap > table > tbody > tr.search_com_chk > td.left > dl > dt > a').text(), 
        experience: $('#container > div > div > div:nth-child(4) > div.rank_table_wrap > table > tbody > tr.search_com_chk > td:nth-child(4)').text(),
        level: $('#container > div > div > div:nth-child(4) > div.rank_table_wrap > table > tbody > tr.search_com_chk > td:nth-child(3)').text(),
        job: $('#container > div > div > div:nth-child(4) > div.rank_table_wrap > table > tbody > tr.search_com_chk > td.left > dl > dd').text(),
        guild: $('#container > div > div > div:nth-child(4) > div.rank_table_wrap > table > tbody > tr.search_com_chk > td:nth-child(6)').text(),
        pop: $('#container > div > div > div:nth-child(4) > div.rank_table_wrap > table > tbody > tr.search_com_chk > td:nth-child(5)').text(),
        characterImg: characterImg,
        serverImg: characterServerImg
    };

    return userInfo;
};

module.exports = getUserInfo;