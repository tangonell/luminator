const { SlashCommandBuilder } = require('@discordjs/builders');
const {Permissions} = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Deletes a set number of messages.')
        .addIntegerOption(option =>
            option.setName('number')
                .setDescription('Number of messages to purge.')
                .setRequired(true)),
	async execute(interaction) {
        message = 'You don\'t have permissions to do that.'
        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            let num = interaction.options.getInteger('number')
            if (num < 1 || num > 100) {
                await interaction.reply("Number must be between 1 and 100.")
            } else {
                await interaction.channel.bulkDelete(num)
                await interaction.reply(`Purged ${num} messages.`)
            }
        } else interaction.reply(message)
	},
};