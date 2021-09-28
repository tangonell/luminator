const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Gets user avatar.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to get avatar from.')
                .setRequired(false)),
	async execute(interaction) {
        let username = interaction.options.getUser('user') || interaction.user
        await interaction.reply(`${username.displayAvatarURL()}?size=2048`)
    }
};