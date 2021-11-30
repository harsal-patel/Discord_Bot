module.exports = {
    name: "stop",
    inVoiceChannel: true,
    run: async (bot, message, args) => {
        const queue = bot.distube.getQueue(message);
        if (!queue) return message.reply('There is nothing in the queue!');
        try {
            queue.stop();
        } catch (e) {
            message.channel.send('Error');
        }
    }
}