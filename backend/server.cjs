const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('./modules/logger.cjs');
const processHandler = require('./modules/processErrorHandler.cjs');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', require('./api/routes.cjs'));

app.listen(port, () => {
    logger.info(`Server started on port ${port}`,"server/api");
});

processHandler(process, "api")