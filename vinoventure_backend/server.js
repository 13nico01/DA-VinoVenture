const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`server läuft auf port ${port}`);
})