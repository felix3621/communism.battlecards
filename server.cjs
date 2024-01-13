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
    console.log(`api running on port ${port}`);
});

logger.debug(`Server started on port ${port}`,"api");