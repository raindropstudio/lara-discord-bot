const axios = require('axios');
const cheerio = require('cheerio');

const getCashProbability = async () => {
    const url = `https://maplestory.nexon.com/Guide/CashShop/Probability/RoyalStyle`;

    // axios를 사용하여 HTML 데이터 가져오기
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);
    const items = $('#container > div > div.contents_wrap > table').find('tr').slice(1).map((i, element) => {
        const columns = $(element).find('td');
        let itemName, probability;
    
        // 첫 번째 행일 경우
        if (i === 0) {
            itemName = columns.eq(1).text().trim(); // 첫 번째 행의 경우 itemName이 두 번째 td에 위치
            probability = columns.eq(2).text().trim(); // 첫 번째 행의 경우 probability가 세 번째 td에 위치
        } else {
            itemName = columns.eq(0).text().trim(); // 나머지 행에서는 itemName이 첫 번째 td에 위치
            probability = columns.eq(1).text().trim(); // 나머지 행에서는 probability가 두 번째 td에 위치
        }
    
        return {
            itemName,
            probability
        };
    }).get();
    
    return {
        royalStyle: {
            title: '로얄스타일 확률',
            items: items
        }
    };
};

// 함수 실행 및 결과 출력
getCashProbability().then(data => console.log(JSON.stringify(data, null, 2)));
