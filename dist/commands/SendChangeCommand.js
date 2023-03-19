"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const checker_1 = __importDefault(require("../utils/checker"));
class SendChangeCommand {
    command() {
        return new discord_js_1.SlashCommandBuilder()
            .addStringOption(o => o
            .setName('아이디')
            .setDescription('아이디를 입력해주세요.')).addStringOption(o => o
            .setName('비밀번호')
            .setDescription('비밀번호를 입력해주세요.')).setName('불량체크')
            .setDescription('불량을 체크합니다.');
    }
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = interaction.options.getString('아이디');
            const password = interaction.options.getString('비밀번호');
            const checkResult = yield (0, checker_1.default)(email, password);
            console.log(checkResult);
            interaction.reply({ content: checkResult ? '정상계정' : '불량계정', ephemeral: false });
        });
    }
}
exports.default = SendChangeCommand;
