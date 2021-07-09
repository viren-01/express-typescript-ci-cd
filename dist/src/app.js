"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("../config/config"));
const logging_1 = __importDefault(require("./logger/logging"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
require("./controllers/index");
const index_1 = __importDefault(require("./routes/index"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
try {
    const NAMESPACE = 'Server';
    const port = process.env.port || config_1.default.port;
    const host = config_1.default.host;
    const app = express_1.default();
    app.use(express_1.default.json());
    app.use(cors_1.default());
    //app.use(cookieParser());
    /* Routes */
    app.use(index_1.default);
    // serve swagger
    app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    const server = http_1.default.createServer(app);
    const io = new socket_io_1.Server(server);
    let timer = 60;
    setInterval(() => {
        timer = timer - 1;
    }, 1000);
    io.on('connection', (socket) => {
        console.log(`User Connected with ID : ${socket.id}`);
        setInterval(() => {
            if (timer >= 0) {
                io.emit('timer', timer);
            }
        }, 1000);
    });
    server.listen(3000, () => {
        logging_1.default.info(NAMESPACE, `Server running on 3000`);
        //connect();
    });
}
catch (error) {
    console.log(`Server terminated: ${error}`);
}
