import express from 'express';
import cors from 'cors';
import config from '../config/config';
import logging from './logger/logging';

const NAMESPACE = 'Server';
const port = config.port as number;
const host = config.host as string;

const app = express();

app.use(express.json());
app.use(cors());

app.listen(port, host, () =>{
    logging.info(NAMESPACE, `Server running on ${host}: ${port}`)
})