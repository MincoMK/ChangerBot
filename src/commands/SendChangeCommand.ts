import {
    ActionRow,
    ActionRowBuilder,
    BufferResolvable,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    CacheType,
    CommandInteraction,
    EmbedBuilder,
    ModalBuilder,
    ModalSubmitInteraction,
    SlashCommandBuilder,
    TextInputBuilder,
    TextInputStyle
} from 'discord.js';
import Command from '../structures/Command';
import check from "../utils/checker";

export default class SendChangeCommand implements Command {
    command() {
        return new SlashCommandBuilder()
            .addStringOption(o => o
                .setName('아이디')
                .setDescription('아이디를 입력해주세요.')
            ).addStringOption(o => o
                .setName('비밀번호')
                .setDescription('비밀번호를 입력해주세요.')
            ).setName('불량체크')
            .setDescription('불량을 체크합니다.');
    }

    async execute(interaction: CommandInteraction) {
        const email: string = (<any>interaction.options).getString('아이디');
        const password: string = (<any>interaction.options).getString('비밀번호');
        const checkResult = await check(email, password);
        console.log(checkResult);
        interaction.reply({content: checkResult ? '정상계정' : '불량계정', ephemeral: false})
    }
}