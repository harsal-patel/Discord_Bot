const distube = require('distube');

module.exports = {
    name: 'resume',
    inVoiceChannel: true,
    run: async (bot, message, args) => {
        const queue = bot.distube.getQueue(message)
        if (!queue) return message.channel.send('Queue is empty!')
        queue.resume();
        message.channel.send('Resuming...')
    }
}