const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Gets bot ping.'),
	async execute(interaction) {
		const sent = await interaction.reply({ content: `Pinging...`, fetchReply: true });
		interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms\n`
							+ `Websocket heartbeat: ${interaction.client.ws.ping}ms`);
	},
};