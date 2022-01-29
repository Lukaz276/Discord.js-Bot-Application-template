const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');

const { token } = require('./config.json');
const client = new Client({intents: [Intents.FLAGS.GUILDS]});


/**
 * Handling for all buttons in ./buttons
 */
// @ts-ignore
client.buttons = new Collection();
const buttonFiles = fs.readdirSync('./buttons').filter((file) => file.endsWith('.js'));

for(const file of buttonFiles){
	const button = require(`./buttons/${file}`);
	// @ts-ignore
	client.buttons.set(button.customId, button);
}



/**
 * Command handling for all files in ./commands
 */
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// @ts-ignore
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});



/**
 * Event Handling of all files in ./events
 */
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


<<<<<<< HEAD
client.login(token);
=======

client.login(token);
>>>>>>> b93915934def9dd54d8044c23130caee2f058456
