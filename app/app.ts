import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

import './db';
import {ApiController} from './controllers';


const app: express.Application = express();
export const port: number = parseInt(process.env.PORT || '3000', 10);

app.use(bodyParser.json());
app.use('', ApiController);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
