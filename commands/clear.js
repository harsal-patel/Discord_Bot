module.exports = {
    name: 'clear',
    description: 'clears a number of messages from channel',
    async execute(message, args, Discord) {
        if (!args[0] || isNaN(args[0]) || args[0] < 1 || args[0] > 50) {
            return message.reply('-clear requires a number between 1 and 50 after the command');
        }

        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages);
        });
    }
}