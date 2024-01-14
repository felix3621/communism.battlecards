const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('./server/logger.cjs');
const app = express();
const port = 5172;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', require('./server/api/routes.cjs'));

app.listen(port, () => {
    logger.debug(`Server started on port ${port}`,"api");
});


process.on('SIGINT', () => {
    logger.error(`api killed by user`,"api");
})

process.on('SIGTERM', () => {
    logger.error(`api killed by system`,"api");
})

process.on('unhandledRejection', async (reason, promise) => {
    logger.error(`unhandledRejection at: ${reason.stack}\n Reason: ${reason}`,"api");
})

process.on('uncaughtException', (error) => {
    logger.error(`uncaughtException: ${error}`,"api");
})