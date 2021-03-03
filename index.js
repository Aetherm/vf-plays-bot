const BOT_VERSION = '0.1-alpha';
const BOT_COLOR = '0xDE494E';
const DISCORD = require('discord.js');
const { PREFIX, TOKEN, GAME} = require('./config.json');
const KEYS = require('./keys.json');
const CLIENT = new DISCORD.Client({ partials: ['MESSAGE', 'REACTION'] });
const INPUT = require('./input.js');

let inputChannel;

//the key mapping explained
const CONTROLS_MESSAGE = `D-Pad: ${KEYS.UP[0]}, ${KEYS.RIGHT_UP[0]}, ${KEYS.RIGHT[0]}, ${KEYS.RIGHT_DOWN[0]}, `+
                                    `${KEYS.DOWN[0]}, ${KEYS.LEFT_DOWN[0]}, ${KEYS.LEFT[0]}, ${KEYS.LEFT_UP[0]}\n`+
                            `A-Button: ${KEYS.BUTTON_A[0]}\n`+
                            `B-Button: ${KEYS.BUTTON_B[0]}\n`+
                            `X-Button: ${KEYS.BUTTON_X[0]}\n`+
                            `Y-Button: ${KEYS.BUTTON_Y[0]}\n`+
                            `START   : ${KEYS.START[0]}\n`+
                            `SELECT  : ${KEYS.SELECT[0]}`

CLIENT.once('ready', () => {
    console.log('Ready!');
    //sets the bots status
    CLIENT.user.setActivity(GAME, { type: `PLAYING` }).then();
});

CLIENT.login(TOKEN).then();

CLIENT.on('message', message => {

    //not listening to bot posts
    if(message.author.bot) return;

    const ARGS = message.content.slice(PREFIX.length).trim().split(' ');
    const COMMAND = ARGS.shift().toLowerCase();

    //if the channel is set to be the input channel for the chat controls
    if(inputChannel === message.channel) {

        if(emojiInput(message.content) === true){
            message.react('🆗').then();
        }else{
            message.react('❌').then();
        }
    }

    if (!message.content.startsWith(PREFIX)) return;

    //if the message wasn't send from within a DM
    if(message.guild !== null) {
        if (COMMAND === 'ping' && !ARGS.length) {
            // send back "pong!" to the channel the message was sent in
            message.channel.send('pong'+PREFIX).then();
        } else if (message.member.hasPermission('ADMINISTRATOR')) {
            if (COMMAND === 'controller' && !ARGS.length) {
                createController(message.channel).then();
            } else if (COMMAND === 'ic' && !ARGS.length){
                inputChannel = message.channel;
                message.channel.send("**This channel is now the bots main input channel**\n" +
                    "Post one of the following emojis to make an input : ]\n" +
                    CONTROLS_MESSAGE).then();
            }
        } else {
            message.channel.send("Sorry, you need to be an ADMINISTRATOR to use this :/").then();
        }
    }else{
        message.channel.send("Sorry, I can't interact with you here D: " +
            "But maybe I can show you the controls?\n"+CONTROLS_MESSAGE).then();
    }
});

//listening to reactions
CLIENT.on('messageReactionAdd', async (reaction, user) => {
    // When we receive a reaction we check if the reaction is partial or not
    if (reaction.partial) {
        // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Something went wrong with fetching the message: ', error);
            // Return as `reaction.message.author` may be undefined/null
            return;
        }
    }
    if(!user.bot)
        emojiInput(reaction.emoji.name)
});

/**
 * Converts a given emoji into the respective input operation
 *
 * @param emoji The emoji that stands for an input.
 *
 * @return boolean True if the emoji matches one of the control emojis given in the json, false if not.
 */
function emojiInput(emojiName){

    let ret = true;

    switch(emojiName) {
        case KEYS.UP[0]:
            INPUT.up();
            break;
        case KEYS.RIGHT_UP[0]:
            INPUT.rightUp();
            break;
        case KEYS.RIGHT[0]:
            INPUT.right();
            break;
        case KEYS.RIGHT_DOWN[0]:
            INPUT.rightDown();
            break;
        case KEYS.DOWN[0]:
            INPUT.down();
            break;
        case KEYS.LEFT_DOWN[0]:
            INPUT.leftDown();
            break;
        case KEYS.LEFT[0]:
            INPUT.left();
            break;
        case KEYS.LEFT_UP[0]:
            INPUT.leftUp();
            break;
        case KEYS.BUTTON_A[0]:
            INPUT.a();
            break;
        case KEYS.BUTTON_B[0]:
            INPUT.b();
            break;
        case KEYS.BUTTON_X[0]:
            INPUT.x();
            break;
        case KEYS.BUTTON_Y[0]:
            INPUT.y();
            break;
        case KEYS.START[0]:
            INPUT.start();
            break;
        case KEYS.SELECT[0]:
            INPUT.select();
            break;
        default:
            //if input did not match one of the given emojis
            ret = false;
            break;
    }
    return ret;
}

/**
 * Creates the message that holds the controls in form of reactions and posts it into the given channel
 *
 * @param channel The channel where this should be send to.
 */
async function createController(channel) {

    let reactionEmbed = new DISCORD.MessageEmbed()
        .setColor(BOT_COLOR)
        .setTitle("CONTROLLER")
        .setDescription("**IMPORTANT**\nDon't click spam! This can result in a temporal *Discord Ban*. "+
                        "Keep a few seconds between inputs. THIS IS NOT A JOKE." +
                        "If you want to be 100% safe, just post the wanted emoji in a text channel with this bot : ]")
        .addField('controls', CONTROLS_MESSAGE)

    channel.send({embed: reactionEmbed}).then(async embedMessage => {

        await embedMessage.react(KEYS.UP[0]);
        await embedMessage.react(KEYS.RIGHT_UP[0]);
        await embedMessage.react(KEYS.RIGHT[0]);
        await embedMessage.react(KEYS.RIGHT_DOWN[0]);
        await embedMessage.react(KEYS.DOWN[0]);
        await embedMessage.react(KEYS.LEFT_DOWN[0]);
        await embedMessage.react(KEYS.LEFT[0]);
        await embedMessage.react(KEYS.LEFT_UP[0]);
        await embedMessage.react(KEYS.BUTTON_A[0]);
        await embedMessage.react(KEYS.BUTTON_B[0]);
        await embedMessage.react(KEYS.BUTTON_X[0]);
        await embedMessage.react(KEYS.BUTTON_Y[0]);
        await embedMessage.react(KEYS.START[0]);
        await embedMessage.react(KEYS.SELECT[0]);
    });
}