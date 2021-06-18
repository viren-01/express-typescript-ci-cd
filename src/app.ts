import express from 'express';
import cors from 'cors';
import config from '../config/config';
import logger from './logger/logging';
import { connect } from './db/connect';
import swaggerUI from 'swagger-ui-express';
import swaggerDoc from '../swagger.json';
import './controllers/index';
import { RegisterRoutes } from './routes/routes'

try {
    const NAMESPACE = 'Server';
    const port: any = process.env.port || config.port;
    const host = config.host as string;

    const app = express();

    app.use(express.json());
    app.use(cors());
    RegisterRoutes(app);
    // serve swagger
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

    app.listen(3000, () => {
        logger.info(NAMESPACE, `Server running on 3000`);
        //connect();
    })
} catch (error) {
    console.log(`Server terminated: ${error}`);
}
