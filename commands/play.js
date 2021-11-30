const distube = require('distube');

module.exports = {
    name: 'play',
    inVoiceChannel: true,
    run: async (bot, message, args) => {
        const string = args.join(' ')
        if (!string) return message.reply('Please enter a query or url to play music');
        try {
            bot.distube.play(message, string)
        } catch (e) {
            message.channel.send('Error');
        }
    }
}