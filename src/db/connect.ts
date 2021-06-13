import mongoose from 'mongoose';
import config from '../../config/config';
import logger from '../logger/logging';

export async function connect() {
    const dbUri = config.dbUri as string;
    try {
        await mongoose
            .connect(dbUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        logger.info(`Server`, `Database Connection Established`);
    } catch (err) {
        logger.error(`Server`, `Connection Failed`, err);
        process.exit(1);
    }
}
