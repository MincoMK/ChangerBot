"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class PingCommand {
    command() {
        return new discord_js_1.SlashCommandBuilder()
            .setName('ping')
            .setDescription('Ping!');
    }
    execute(interaction) {
        interaction.reply('Pong!');
    }
}
exports.default = PingCommand;
