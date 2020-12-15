"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
require('dotenv').config();
var port = Number(process.env.PORT) || 4000;
var server = app_1.default.listen(port, function () {
    console.log(port + "\uC5D0 \uC5F0\uACB0");
});
exports.default = server;
"";
