const winston = require('winston'); 
const path = require('path'); 

const logFilePath = path.join(__dirname, '..', '..', 'logs', 'command-usage.log');

// Logger 객체 생성
const logger = winston.createLogger({
    level: 'info', // 로그의 최소 레벨을 'info'로 설정
    format: winston.format.combine( // 로그의 포맷을 결합하여 설정
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        // 로그 메시지의 출력 형식을 설정
        winston.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [ 
        new winston.transports.File({ filename: logFilePath })
    ]
});

// 개발 환경에서만 콘솔에 로그를 출력하도록 설정
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(), // 콘솔 로그에 색상을 추가
            winston.format.timestamp({ // 콘솔 로그에도 시간을 포함
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`) 
        )
    }));
}

module.exports = logger;
