const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Gets bot ping.'),
	async execute(interaction) {
        let ping = interaction.createdTimestamp - Date.now()
		await interaction.reply(`${ping}ms`);
	},
};