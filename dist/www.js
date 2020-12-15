"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_js_1 = require("./app.js");
var port = Number(process.env.PORT) || 4000;
var server = app_js_1.default.listen(port, function () { console.log(port + "\uC5D0 \uC5F0\uACB0"); });
exports.default = server;
