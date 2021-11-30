const distube = require('distube');

module.exports = {
    name: 'pause',
    inVoiceChannel: true,
    run: async (bot, message, args) => {
        const queue = bot.distube.getQueue(message)
        if (!queue) return message.channel.send('Queue is empty!')
        queue.pause();
        message.channel.send('Pausing...')
    }
}