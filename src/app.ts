import express from 'express';
import cors from 'cors';
import config from '../config/config';
import logging from './logger/logging';
import {connect} from './db/connect';
import userRouter from './routes/users';
import indexRouter from './routes/index';

const NAMESPACE = 'Server';
const port: any = process.env.port || config.port ;
const host = config.host as string;

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(indexRouter);

// app.listen(port, host, () =>{
//     logging.info(NAMESPACE, `Server running on ${host}: ${port}`);
//     connect();
// })

app.listen(3000, () =>{
    logging.info(NAMESPACE, `Server running on 3000`);
    connect();
})