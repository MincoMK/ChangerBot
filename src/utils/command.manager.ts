import Command from '../structures/Command';
import { Client } from 'discord.js';

const commands: Command[] = [];

export function registerCommand(cmd: Command): void {
  commands.push(cmd);
}

export function deployCommands(client: Client, guildId?: string): void {
  if (guildId)
    client.application?.commands.set(commands.map(cmd => cmd.command().toJSON()), guildId);
  else
    client.application?.commands.set(commands.map(cmd => cmd.command().toJSON()));

  client.on('interactionCreate', interaction => {
    commands.forEach(cmd => {

      if (interaction.isCommand()) {
        if (cmd.command().name === interaction.commandName) {
          cmd.execute(interaction);
        }
      }

      if (interaction.isStringSelectMenu() && cmd.handleStringSelectMenu) {
        cmd.handleStringSelectMenu(interaction);
      }

      if (interaction.isButton() && cmd.handleButton) {
        cmd.handleButton(interaction);
      }

      if (interaction.isModalSubmit() && cmd.handleModalSubmit) {
        cmd.handleModalSubmit(interaction);
      }

      if (interaction.isAutocomplete() && cmd.handleAutocomplete) {
        cmd.handleAutocomplete(interaction);
      }

    })
  });
}