import {
  AutocompleteInteraction,
  ButtonInteraction,
  CommandInteraction,
  ModalSubmitInteraction,
  SelectMenuInteraction,
  SlashCommandBuilder, StringSelectMenuInteraction
} from 'discord.js';

export default interface Command {
  command: () => SlashCommandBuilder,
  execute: (interaction: CommandInteraction) => any,
  handleButton?: (interaction: ButtonInteraction) => any,
  handleStringSelectMenu?: (interaction: StringSelectMenuInteraction) => any,
  handleModalSubmit?: (interaction: ModalSubmitInteraction) => any,
  handleAutocomplete?: (interaction: AutocompleteInteraction) => any
};