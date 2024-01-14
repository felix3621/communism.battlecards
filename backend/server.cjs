const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('./modules/logger.cjs');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', require('./api/routes.cjs'));

app.listen(port, () => {
    logger.debug(`Server started on port ${port}`,"api");
});


process.on('SIGINT', () => {
    logger.error(`killed by user`,"api");
    process.exit(1);
})

process.on('SIGTERM', () => {
    logger.error(`killed by system`,"api");
    process.exit(1);
})

process.on('unhandledRejection', async (reason, promise) => {
    logger.error(`unhandledRejection at: ${reason.stack}\n Reason: ${reason}`,"api");
    process.exit(1);
})

process.on('uncaughtException', (error) => {
    logger.error(`uncaughtException: ${error}`,"api");
})