"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const discord_js_1 = require("discord.js");
const config_1 = require("./config");
const commandManager = __importStar(require("./utils/command.manager"));
const PingCommand_1 = __importDefault(require("./commands/PingCommand"));
const SendChangeCommand_1 = __importDefault(require("./commands/SendChangeCommand"));
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
exports.client = new discord_js_1.Client({ intents: new discord_js_1.IntentsBitField(65535) });
process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
});
process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
});
exports.client.on('ready', () => {
    console.log('Bot ready!');
    commandManager.registerCommand(new PingCommand_1.default());
    commandManager.registerCommand(new SendChangeCommand_1.default());
    if (config_1.commandTestGuildId)
        commandManager.deployCommands(exports.client, config_1.commandTestGuildId);
    else
        commandManager.deployCommands(exports.client);
});
function startBot() {
    exports.client.login(config_1.botToken);
}
exports.default = startBot;
startBot();
const app = (0, express_1.default)();
app.use(express_1.default.static(__dirname + '/public'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(index_1.default);
app.listen(9999, () => {
    console.log('Server ready!');
});
