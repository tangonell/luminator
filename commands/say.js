const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Repeats after you.')
        .addStringOption(option =>
            option.setName('string')
                .setDescription('Input to echo back.')
                .setRequired(true)),
	async execute(interaction) {
        let str = interaction.options.getString('string')
        await interaction.reply(`${str}`)
	},
};