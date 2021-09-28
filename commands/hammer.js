const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js')

module.exports = {
    guildOnly: true,
	data: new SlashCommandBuilder()
		.setName('hammer')
		.setDescription('The Banhammer!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('kick')
                .setDescription('Kicks the user')
                .addUserOption(option => option.setName('user').setDescription('User to kick.').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('ban')
                .setDescription('Bans the user.')
                .addUserOption(option => option.setName('user').setDescription('User to ban.').setRequired(true))),
	async execute(interaction) {
        message = 'You don\'t have permissions to do that.'
        switch (interaction.options.getSubcommand()) {
            case "kick":
                if (interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
                const user_kick = interaction.options.getMember('user')
                await user_kick.kick()
                await interaction.reply('Kicked the user.')
                } else interaction.reply(message)
                break;

            case "ban":
                if (interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                const user_ban = interaction.options.getMember('user')
                await user_ban.ban()
                await interaction.reply('Banned the user.')
                } else interaction.reply(message)
                break;
        }
	},
};