const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	guildOnly: true,
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Replies with bot invite.'),
	async execute(interaction) {
        const invite = 'https://discord.com/api/oauth2/authorize?client_id=891321517219123233&permissions=8&scope=bot%20applications.commands'
		await interaction.reply(`[invite](${invite})`);
	},
};