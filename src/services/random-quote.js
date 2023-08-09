const fs = require('fs');
const path = require('path');

// JSON 파일을 동기적으로 읽기
let rawdata = fs.readFileSync(path.join(__dirname, 'quote.json')); 
let quote = JSON.parse(rawdata);

// 랜덤 문장 추출 함수
function getRandomQuote() {
    return quote[Math.floor(Math.random() * quote.length)];
}
console.log(getRandomQuote);

module.exports = {
    getRandomQuote: getRandomQuote
};