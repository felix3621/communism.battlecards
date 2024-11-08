const logger = require('./logger.cjs');

module.exports = (process, trace) => {
    process.on('SIGINT', () => {
        logger.error("Process killed by user",trace);
        process.exit(1);
    })
    
    process.on('SIGTERM', () => {
        logger.error("Process killed by system",trace);
        process.exit(1);
    })
    
    process.on('unhandledRejection', async (reason, promise) => {
        logger.error(`Encountered unhandledRejection: ${reason.stack}`,trace);
        process.exit(1);
    })
    
    process.on('uncaughtException', (error) => {
        logger.error(`Encountered uncaughtException: ${error.stack}`,trace);
    })
}