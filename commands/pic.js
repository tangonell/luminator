const { SlashCommandBuilder } = require('@discordjs/builders');

const querystring = require('querystring');
const r2          = require('r2');
const Discord     = require('discord.js');

const DOG_API_URL   = "https://api.thedogapi.com/"
const DOG_API_KEY   = "f401007a-d818-4940-858b-4101bcdcf35a"

const CAT_API_URL   = "https://api.thecatapi.com/"
const CAT_API_KEY   = "0e1a124e-02a7-4c5d-9801-d0cd2e432a21"

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pic')
		.setDescription('Gets various pics.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('dog')
                .setDescription('Gets a dog pic.'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('cat')
                .setDescription('Gets a cat pic.')),
	async execute(interaction) {
        let API_KEY = ''
        let API_URL = ''
        switch (interaction.options.getSubcommand()) {
            case "dog":
                API_URL = DOG_API_URL
                API_KEY = DOG_API_KEY
            break
            case "cat":
                API_URL = CAT_API_URL
                API_KEY = CAT_API_KEY
            break
        }
        async function messageRecieved() {
            try {
                // pass the name of the user who sent the message for stats later, expect an array of images to be returned.
                var images = await loadImage(interaction.user.username);

                // get the Image, and first Breed from the returned object.
                var image = images[0];
                var breed = image.breeds[0];

                await interaction.reply('Fetching...')
                await interaction.editReply({ content: '**'+ breed.name + '**\n'+ breed.temperament, files: [ image.url ] } );

            } catch(error) {
                console.log(error)
            }
        }
        // Makes a request to theDogAPI.com for a random dog image with breed info attached.
        async function loadImage(sub_id) {
        // you need an API key to get access to all the iamges, or see the requests you've made in the stats for your account
            var headers = {
                'X-API-KEY': API_KEY,
            }
            var query_params = {
                'has_breeds': true,     // we only want images with at least one breed data object - name, temperament etc
                'mime_types':'jpg,png', // we only want static images as Discord doesn't like gifs
                'size':'small',         // get the small images as the size is prefect for Discord's 390x256 limit
                'sub_id': sub_id,       // pass the message senders username so you can see how many images each user has asked for in the stats
                'limit' : 1             // only need one
            }
            // convert this obejc to query string 
            let queryString = querystring.stringify(query_params);

            try {
                // construct the API Get request url
                let _url = API_URL + `v1/images/search?${queryString}`;
                // make the request passing the url, and headers object which contains the API_KEY
                var response = await r2.get(_url , {headers} ).json
            } catch (e) {
                console.log(e)
            }
            return response;

        }
        await messageRecieved()
	},
};