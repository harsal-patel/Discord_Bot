module.exports = {
    name: 'poll',
    description: 'creates a poll for users to vote on',

    async run (bot, message, args, Discord) {

        const string = args.join(' '); // concatenates input into one string
        const stringSplit = string.split(' - '); // splits string at hyphens and puts pieces into array
        let first = stringSplit[0].toString();
        firstLower = first.toLowerCase(); // allows for capitals in y/n

        if (firstLower == 'y/n' && stringSplit.length == 2) {
            const question = stringSplit[1];

            const pollEmbed = new Discord.MessageEmbed()
                .setColor('#9b42f5')
                .setTitle('Poll')
                .setDescription(`${question}`)
                .addField('\u200B', '-----------------------------------------------------------------')
                .setFooter('Vote with the emojis below!');
                
            const pollMessage = await message.channel.send({embeds: [pollEmbed]});
            await pollMessage.react('✅');
            await pollMessage.react('❌');
        } else if (!isNaN(stringSplit[0]) && stringSplit[0] <= 6 && stringSplit[0] > 1 && stringSplit.length > stringSplit[0]) {
            const question = stringSplit[1];
            
            const pollEmbed = new Discord.MessageEmbed()
                .setColor('#9b42f5')
                .setTitle('Poll')
                .setDescription(`${question}`)
                .setFooter('Vote with the emojis below!');

            for (let i = 1; i <= stringSplit[0]; i++) {
                let num = i;
                let numString = num.toString();
                pollEmbed.addField(numString, stringSplit[i + 1]);
            }
            pollEmbed.addField('\u200B', '-----------------------------------------------------------------');
            
            const pollMessage = await message.channel.send({embeds: [pollEmbed]});
            if (stringSplit[0] > 0) await pollMessage.react('1️⃣');
            if (stringSplit[0] > 1) await pollMessage.react('2️⃣');
            if (stringSplit[0] > 2) await pollMessage.react('3️⃣');
            if (stringSplit[0] > 3) await pollMessage.react('4️⃣');
            if (stringSplit[0] > 4) await pollMessage.react('5️⃣');
            if (stringSplit[0] > 5) await pollMessage.react('6️⃣');
        } else { return message.reply('Please use -help to see what -poll command requires.'); }
    }
}