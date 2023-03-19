"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployCommands = exports.registerCommand = void 0;
const commands = [];
function registerCommand(cmd) {
    commands.push(cmd);
}
exports.registerCommand = registerCommand;
function deployCommands(client, guildId) {
    var _a, _b;
    if (guildId)
        (_a = client.application) === null || _a === void 0 ? void 0 : _a.commands.set(commands.map(cmd => cmd.command().toJSON()), guildId);
    else
        (_b = client.application) === null || _b === void 0 ? void 0 : _b.commands.set(commands.map(cmd => cmd.command().toJSON()));
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
        });
    });
}
exports.deployCommands = deployCommands;
