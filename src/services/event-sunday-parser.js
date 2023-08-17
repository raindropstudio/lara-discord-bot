const axios = require('axios');
const cheerio = require('cheerio');

const getEventInfo = async () => {
    const url = 'https://maplestory.nexon.com/News/Event'; // 이벤트 페이지 URL
    const targetText = '썬데이 메이플'; // 찾고자 하는 텍스트
    const targetSelector = '#container > div > div.contents_wrap > div.event_board';
    const baseURL = 'https://maplestory.nexon.com';

    const instance = axios.create({
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
            'Accept-Charset': 'utf-8'
        }
    });

    const response = await instance.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // 특정 단어가 포함된 링크 찾기
    const eventLink = $(targetSelector).find('a:contains("' + targetText + '")').attr('href');

    if (!eventLink) {
        return '해당 이벤트 정보가 없습니다.'; // 특정 단어가 없을 경우
    }

    // 상세 페이지에서 이미지 가져오기
    const detailResponse = await instance.get(baseURL + eventLink);
    const detailHtml = detailResponse.data;
    const $$ = cheerio.load(detailHtml);

    // 상세 이미지 URL 가져오기
    const eventImage = $$('#container > div > div.contents_wrap > div.qs_text > div > div:nth-child(1) > div > img').attr('src');

    // 상세 내용을 가져올 selector
    const contentSelector = '#container > div > div.contents_wrap > div.qs_text > div > div.blind';

    // 상세 페이지에서 내용 가져오기
    const contentHtml = $$(contentSelector).html();

    // HTML을 일반 텍스트로 변환하기 위해 cheerio 로드
    const content$ = cheerio.load(contentHtml);

    // 제목, 기간, 내용을 추출
    const title = content$('h2').text();
    const period = content$('h3').next('p').first().text();
    const details = content$('p').slice(1).map((i, elem) => content$(elem).text().trim()).get().join('\n');

    // 결과를 객체로 반환
    return {
        link: baseURL + eventLink,
        image: eventImage && eventImage.startsWith('http') ? eventImage : (eventImage ? baseURL + eventImage : undefined),
        title: title,
        period: period,
        details: details
    };
};

/*
//테스트 코드
getEventInfo().then(result => {
    console.log(result);
});
*/

module.exports = getEventInfo;
