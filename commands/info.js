const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    guildOnly: true,
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Displays various info.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Displays info about user.')
                .addUserOption(option => option.setName('user').setDescription('User to display info about.').setRequired(false)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Display info about current server.')),
	async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case "user":
                let username = interaction.options.getUser('user') || interaction.user
                await interaction.reply(`User Tag: ${username.tag}\n`
                                      + `User ID: ${username.id}\n`
                                      + `Created at: ${username.createdAt}\n`
                                      + `Is a bot: ${username.bot}`)
                break;
            case "server":
                
                const g = interaction.guild
                const owner = await g.fetchOwner()

                await interaction.reply(`Server Name: ${g.name}\n`
                                      + `Server ID: ${g.id}\n`
                                      + `Owner: ${owner.user.tag}\n`
                                      + `Created at: ${g.createdAt}\n`
                                      + `Members: ${g.memberCount}`)
                break;
        }
	},
};