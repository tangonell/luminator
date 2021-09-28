const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Gets bot ping.'),
	async execute(interaction) {
		await interaction.reply(`${client.ws.ping}ms`);
	},
};