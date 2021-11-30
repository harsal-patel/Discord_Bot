const Discord = require('discord.js');
const { Client, Intents, DiscordAPIError } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }); // creates bot
require('dotenv').config(); // loads anything in .env file into environment variable
const prefix = '-';
const fs = require('fs');
const distube = require('distube');

bot.distube = new distube.DisTube(bot, { emitNewSongOnly: true });

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // Makes sure command files are .js files
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}

bot.once('ready', () => { // bot start message
    console.log('UtilityBot is online!');
});

bot.on('messageCreate', async message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return; // checks for command prefix

    const args = message.content.slice(prefix.length).split(/ +/); // allows for multiple word commands
    const command = args.shift().toLowerCase(); // removes prefix and puts command into lowercase (so HELP and help result in same command)

    if (command === 'help') { // help command
        bot.commands.get('help').execute(message, args, Discord);
    } else if (command === 'clear') {
        bot.commands.get('clear').execute(message, args, Discord);
    } else if (command === 'play' || command === 'p') {
        const cmd = bot.commands.get('play');
        if (!cmd) return;
        if (cmd.inVoiceChannel && !message.member.voice.channel) return message.reply('You must be in a voice channel!');
        cmd.run(bot, message, args);
    } else if (command === 'poll') {
        const cmd = bot.commands.get('poll');
        if (!cmd) return;
        cmd.run(bot, message, args, Discord);
    } else if (command === 'weather') {
        const cmd = bot.commands.get('weather');
        if (!cmd) return;
        cmd.run(bot, message, args, Discord);
    } else if (command === 'stop') {
        const cmd = bot.commands.get('stop');
        if (!cmd) return;
        cmd.run(bot, message, args);
    } else if (command === 'skip') {
        const cmd = bot.commands.get('skip');
        if (!cmd) return;
        cmd.run(bot, message, args);
    } else if (command === 'queue') {
        bot.commands.get('queue').run(bot, message, args);
    } else if (command === 'pause') {
        const cmd = bot.commands.get('pause');
        if (!cmd) return;
        if (cmd.inVoiceChannel && !message.member.voice.channel) return message.reply('You must be in a voice channel!');
        cmd.run(bot, message, args);
    } else if (command === 'resume') {
        const cmd = bot.commands.get('resume');
        if (!cmd) return;
        if (cmd.inVoiceChannel && !message.member.voice.channel) return message.reply('You must be in a voice channel!');
        cmd.run(bot, message, args);
    } else {
        return message.reply('Invalid command, please use -help to see supported commands.');
    }
});

const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
bot.distube
    .on("playSong", (queue, song) => queue.textChannel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\``
    ))
    .on("addSong", (queue, song) => queue.textChannel.send(
        `Added \`${song.name}\` - \`${song.formattedDuration}\` to the queue.`
    ))

bot.login(process.env.TOKEN);