module.exports = {
    name: "skip",
    inVoiceChannel: true,
    run: async (bot, message, args) => {
        const queue = bot.distube.getQueue(message);
        if (!queue) return message.reply('There is nothing in the queue!');
        try {
            const song = queue.skip();
        } catch (e) {
            message.channel.send('Error');
        }
    }
}