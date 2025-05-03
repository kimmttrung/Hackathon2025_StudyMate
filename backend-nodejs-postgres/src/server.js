import express from 'express';
import viewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
require('dotenv').config();

const app = express()

// config app

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT;

app.listen(port, () => {
    console.log('Backend nodejs is running on the port: ' + port);
})


