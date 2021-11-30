const { DiscordAPIError } = require('discord.js');
const weather = require('weather-js');

module.exports = {
    name: 'weather',
    description: 'finds the weather in user given city/zip',
    run: async (bot, message, args, Discord) => {
        let city = args.join(' ');
        if (!city) return message.reply('Please provide a city or zip code to search.');

        weather.find({ search: city, degreeType: 'F' }, (error, result) => {
            if (error) return message.channel.send('Something went wrong!');
            
            let data = result[0];
            const weatherEmbed = new Discord.MessageEmbed()
                .setAuthor('Weather Forecast', data.current.imageUrl)
                .setColor('#2fcff7')
                .setThumbnail(data.current.imageUrl)
                .addField('City', data.location.name, true)
                .addField('Sky Condition', data.current.skytext, true)
                .addField('Temperature', data.current.temperature, true)
                .addField('Wind Speed', data.current.windspeed, true)
                .addField('Timezone', data.location.timezone, true)
                .addField('Day', data.current.day, true)
                .setFooter(data.current.date);

            message.channel.send({embeds: [weatherEmbed]});
        });
    }
}