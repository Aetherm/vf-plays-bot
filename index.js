const BOT_VERSION = '0.2-alpha';
const BOT_COLOR = '0xDE494E';
const DISCORD = require('discord.js');
const { PREFIX, TOKEN, GAME} = require('./config.json');
const KEYS = require('./keys.json');
// const CLIENT = new DISCORD.Client({ partials: ['MESSAGE', 'REACTION'] });
const CLIENT = new DISCORD.Client({
    intents: [ DISCORD.Intents.FLAGS.GUILDS, DISCORD.Intents.FLAGS.GUILD_MESSAGES ]
})
const INPUT = require('./input.js');
const {cardinalDirectionsInputRow, diagonalDirectionsInputRow, primaryActionInputRow, secondaryActionInputRow, screenModeConfigRow} = require("./inputButtonRows");

let inputChannel;

//the key mapping explained
const CONTROLS_MESSAGE = `D-Pad:\n${KEYS.UP[0]}, ${KEYS.RIGHT_UP[0]}, ${KEYS.RIGHT[0]}, ${KEYS.RIGHT_DOWN[0]}, `+
                                    `${KEYS.DOWN[0]}, ${KEYS.LEFT_DOWN[0]}, ${KEYS.LEFT[0]}, ${KEYS.LEFT_UP[0]}\n`+
                            `A-Button:\n${KEYS.BUTTON_A[0]}\n`+
                            `B-Button:\n${KEYS.BUTTON_B[0]}\n`+
                            `X-Button:\n${KEYS.BUTTON_X[0]}\n`+
                            `Y-Button:\n${KEYS.BUTTON_Y[0]}\n`+
                            `START:\n${KEYS.START[0]}\n`+
                            `SELECT:\n${KEYS.SELECT[0]}\n`+
                            `R-Button:\n${KEYS.BUTTON_R[0]}\n`+
                            `L-Button:\n${KEYS.BUTTON_L[0]}\n`

CLIENT.once('ready', () => {
    console.log('Ready!');
    //sets the bots status
    CLIENT.user.setActivity(GAME, { type: `PLAYING` });
});

CLIENT.login(TOKEN).then();

CLIENT.on('messageCreate', message => {

    //not listening to bot posts
    if(message.author.bot) return;

    //if the channel is set to be the input channel for the chat
    //also hacky unusual approach without prefix
    if(inputChannel === message.channel) {

        //the message split at the spaces (in this case hopefully a valid emoji that we accept plus a duration)
        let splitMessage = message.content.trim().split(' ')
        let durationArg = parseInt(splitMessage[splitMessage.length-1]);

        //check if argument is an integer
        if(!Object.is(NaN, durationArg)) {

            if(durationArg <= 40 && durationArg >= 1)

                //100 milliseconds times the input between 1 to 20, so 4 seconds max duration
                INPUT.setPressFor(100*durationArg);
        } else{
            //delay of a key press, 1000ms / 60 frames = ~17
            INPUT.setPressFor(17);
        }

        if(emojiInput(splitMessage[0]) === true){
            message.react('🆗').then();
        }else{
            message.react('❌').then();
        }

    }

    //classic input commands
    const ARGS = message.content.slice(PREFIX.length).trim().split(' ');
    const COMMAND = ARGS.shift().toLowerCase();

    if (!message.content.startsWith(PREFIX)) return;

    //if the message wasn't send from within a DM
    if(message.guild !== null) {
        if (COMMAND === 'ping' && !ARGS.length) {
            // send back "pong!" to the channel the message was sent in
            message.channel.send('pong'+PREFIX).then();
        } else if (message.member.permissions.has('ADMINISTRATOR')) {
            if (COMMAND === 'controller' && !ARGS.length) {
                createController(message.channel).then();
            } else if (COMMAND === 'switch' && !ARGS.length){
                createScreenSwitch(message.channel).then();
            } else if (COMMAND === 'ic' && !ARGS.length){
                inputChannel = message.channel;
                message.channel.send("**This channel is now the bots main input channel**\n" +
                    "Post one of the following emojis to make an input : ]\n" +
                    "Write a number between 1 (100 milliseconds) and 40 (4 seconds) behind the emoji\n" +
                    "to control how long the button is pressed\n" +
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
    if(!user.bot) {
        //delay of a key press, 1000ms / 60 frames = ~17
        INPUT.setPressFor(17);
        emojiInput(reaction.emoji.name);
    }
});

//listening to buttons
CLIENT.on('interactionCreate', interaction => {
    if (!interaction.isButton()) return;

    emojiInput(interaction.customId);
    interaction.deferUpdate();
});

/**
 * Converts a given emoji into the respective input operation
 *
 * @param emoji The emoji that stands for an input.
 * @param duration For how long the button should be pressed.
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
        case KEYS.BUTTON_R[0]:
            INPUT.r();
            break;
        case KEYS.BUTTON_L[0]:
            INPUT.l();
            break;
        case "0️⃣":
            INPUT.screenMode0();
            break;
        case "1️⃣":
            INPUT.screenMode1();
            break;
        case "2️⃣":
            INPUT.screenMode2();
            break;
        case "🔄":
            INPUT.switchPrimaryScreen();
            break;
        default:
            //if input did not match one of the given emojis
            ret = false;
            break;
    }
    return ret;
}

/**
 * Creates the message that holds the switch to change screen modes in form of buttons and posts it into the given
 * channel
 *
 * @param channel The channel where this should be send to.
 */
async function createScreenSwitch(channel) {
    let reactionEmbed = new DISCORD.MessageEmbed()
        .setColor(BOT_COLOR)
        .setTitle("SCREEN SWITCH")
        .setDescription("Here you can switch between the different screen modes.")
        .addField("description",
            "switching between screen modes:\n0️⃣, 1️⃣, 2️⃣\n"+
            "switching primary screen:\n🔄")

    channel.send({embeds: [reactionEmbed], components: [screenModeConfigRow()]});
}

/**
 * Creates the message that holds the controls in form of buttons and posts it into the given channel
 *
 * @param channel The channel where this should be send to.
 */
async function createController(channel) {
    let reactionEmbed = new DISCORD.MessageEmbed()
        .setColor(BOT_COLOR)
        .setTitle("CONTROLLER")
        .setDescription("Click on the respective buttons to make an input!")
        .addField('controls', CONTROLS_MESSAGE)

    await channel.send({embeds: [reactionEmbed],
    components: [cardinalDirectionsInputRow(), diagonalDirectionsInputRow(), primaryActionInputRow(), secondaryActionInputRow()]});
}
