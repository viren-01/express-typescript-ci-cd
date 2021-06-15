import mongoose from 'mongoose';
import config from '../../config/config';
import logger from '../logger/logging';

const connect = async() => {
    const dbUri = config.dbUri as string;
    try {
        await mongoose
            .connect(dbUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        logger.info(`DB`, `Database Connection Established`);
    } catch (err) {
        logger.error(`DB`, `Connection Failed`, err);
        process.exit(1);
    }
}

export {
    connect
}
