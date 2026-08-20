import winston from "winston/lib/winston/config";

const logger = winston.createLogger({
    level:"info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports:[
        new winston.transports.Console()
    ]
});
export default logger