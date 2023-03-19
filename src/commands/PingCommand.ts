import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import Command from '../structures/Command';

export default class PingCommand implements Command {
  command() {
    return new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Ping!')
  }

  execute(interaction: CommandInteraction) {
    interaction.reply('Pong!');
  }
}