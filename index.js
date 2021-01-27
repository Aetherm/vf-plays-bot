const botVersion = '0.1-alpha';
const botColor = '0xDE494E';
const Discord = require('discord.js');
const keySender = require('node-key-sender');
const { prefix, token, icon } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
    //sets the bots status
    client.user.setActivity(`requests | ${prefix}info`, { type: `LISTENING` }).then();
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'ping' && !args.length) {
        // send back "pong!" to the channel the message was sent in
        message.channel.send('pong&').then();
    }
});
client.login(token).then();