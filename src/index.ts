import { Client, IntentsBitField, SlashCommandSubcommandBuilder } from 'discord.js';
import { botToken, commandTestGuildId } from './config';
import * as commandManager from './utils/command.manager';
import PingCommand from './commands/PingCommand';
import SendChangeCommand from './commands/SendChangeCommand';
import express from 'express';
import mainRouter from './routes/index';
import check from "./utils/checker";


export const client = new Client({ intents: new IntentsBitField(65535) });

client.on('ready', () => {
  console.log('Bot ready!');
  commandManager.registerCommand(new PingCommand());
  commandManager.registerCommand(new SendChangeCommand());
  if (commandTestGuildId)
    commandManager.deployCommands(client, commandTestGuildId);
  else
    commandManager.deployCommands(client);
})

export default function startBot() {
  client.login(botToken);
}

startBot();

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mainRouter);
app.listen(9999, () => {
    console.log('Server ready!');
})