"use strict";
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
var config_1 = require("../config/config");
var logging_1 = require("./logger/logging");
var connect_1 = require("./db/connect");
var users_1 = require("./routes/users");
var NAMESPACE = 'Server';
var port = process.env.port || 3000;
var host = config_1["default"].host;
var app = express_1();
app.use(express_1.json());
app.use(cors_1());
app.listen(port, host, function () {
    logging_1["default"].info(NAMESPACE, "Server running on " + host + ": " + port);
    //connect_1.connect();
    users_1["default"](app);
});
