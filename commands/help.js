module.exports = {
    name: 'help',
    description: 'shows supported commands',
    execute(message, args, Discord) {
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#012E56')
            .setTitle('Commands Supported:')
            .setAuthor('UtilityBot', 'https://aux.iconspalace.com/uploads/20237046261829314473.png')
            .setThumbnail('https://aux.iconspalace.com/uploads/20237046261829314473.png')
            .addFields(
                { name: '\u200B', value: '\u200B' },
                {name: '-help', value: 'Lists supported commands'},
                {name: '-clear *n*', value: 'Clears *n* messages from channel (message calling the command is a part of *n*)'},
                {name: '-weather *city or zip code*', value: 'Displays the weather of the city or zip code provided'},
                {name: '-poll *n or y/n* - *question* - *options (if applicable)*', 
                value: 'Creates either a Yes/No poll or a poll with *n* options (all arguments must be separated by a hyphen)\n**ex. -poll y/n - Do you like this bot?**'},
                {name: '-play *query or url*', value: 'Searches Youtube or plays directly from Youtube url'},
                {name: '-pause', value: 'Pauses audio'},
                {name: '-resume', value: 'Resumes audio'},
                {name: '-stop', value: 'Ends music playback and disconnects bot from voice channel'},
                {name: '-skip', value: 'Skips current song in queue'},
                {name: '-queue', value: 'Shows music queue'},
                { name: '\u200B', value: '\u200B' }
            )
            .setFooter('More commands coming soon!');
        message.channel.send({embeds: [helpEmbed]});
    }
}