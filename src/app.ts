import express from 'express';
import cors from 'cors';
import config from '../config/config';
import logger from './logger/logging';
import { connect } from './db/connect';
import swaggerUI from 'swagger-ui-express';
import swaggerDoc from '../swagger.json';
import './controllers/index';
import indexRouter from './routes/index';
import http from 'http';
import { Server } from 'socket.io';

try {
    const NAMESPACE = 'Server';
    const port: any = process.env.port || config.port;
    const host = config.host as string;

    const app = express();

    app.use(express.json());
    app.use(cors());
    //app.use(cookieParser());

    /* Routes */
    app.use(indexRouter);

    // serve swagger
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));


    const server = http.createServer(app);
    const io = new Server(server);
    let timer = 60;
    setInterval(() => {
        timer = timer - 1;
    }, 1000)
    io.on('connection', (socket) => {
        console.log(`User Connected with ID : ${socket.id}`);

        setInterval(() => {
            if (timer >= 0) {
                io.emit('timer', timer);
            }
        }, 1000)

    })

    server.listen(3000, () => {
        logger.info(NAMESPACE, `Server running on 3000`);
        //connect();
    })
} catch (error) {
    console.log(`Server terminated: ${error}`);
}
