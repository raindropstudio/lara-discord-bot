require('dotenv').config();
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const Discord = require("discord.js");
const token = process.env.DISCORD_BOT_TOKEN;
const { clientId, guildId } = require("../config.json");
const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });

const commandFiles = fs
    .readdirSync("./src/commands")
    .filter((file) => file.endsWith(".js"));

const commands = [];

client.commands = new Discord.Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

client.once("ready", () => {
    console.log("Ready!");

    const CLIENT_ID = client.user.id;
    const rest = new REST({ version: "10" }).setToken(token);

    rest.put(Routes.applicationCommands(CLIENT_ID), {
        body: commands,
    })
        .then(() =>
            console.log("Successfully registered application commands.")
        )
        .catch(console.error);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
        });
    }
});

client.login(token);