const DISCORD = require("discord.js");
const KEYS = require("./keys.json");

module.exports = {
    cardinalDirectionsInputRow: function() {
        return new DISCORD.MessageActionRow()
            .addComponents(
                new DISCORD.MessageButton()
                    .setCustomId(KEYS.UP[0])
                    .setLabel(KEYS.UP[0])
                    .setStyle('SECONDARY'),
                new DISCORD.MessageButton()
                    .setCustomId(KEYS.RIGHT[0])
                    .setLabel(KEYS.RIGHT[0])
                    .setStyle('SECONDARY'),
                new DISCORD.MessageButton()
                    .setCustomId(KEYS.DOWN[0])
                    .setLabel(KEYS.DOWN[0])
                    .setStyle('SECONDARY'),
                new DISCORD.MessageButton()
                    .setCustomId(KEYS.LEFT[0])
                    .setLabel(KEYS.LEFT[0])
                    .setStyle('SECONDARY'),
            );
    },
    diagonalDirectionsInputRow: function() {
        return new DISCORD.MessageActionRow()
            .addComponents(
                new DISCORD.MessageButton()
                    .setCustomId(KEYS.RIGHT_UP[0])
                    .setLabel(KEYS.RIGHT_UP[0])
                    .setStyle('SECONDARY'),
                new DISCORD.MessageButton()
                    .setCustomId(KEYS.RIGHT_DOWN[0])
                    .setLabel(KEYS.RIGHT_DOWN[0])
                    .setStyle('SECONDARY'),
                new DISCORD.MessageButton()
                    .setCustomId(KEYS.LEFT_DOWN[0])
                    .setLabel(KEYS.LEFT_DOWN[0])
                    .setStyle('SECONDARY'),
                new DISCORD.MessageButton()
                    .setCustomId(KEYS.LEFT_UP[0])
                    .setLabel(KEYS.LEFT_UP[0])
                    .setStyle('SECONDARY'),
            );
    },
    primaryActionInputRow: function() {
        return new DISCORD.MessageActionRow()
            .addComponents(
                new DISCORD.MessageButton()
                    .setCustomId(KEYS.BUTTON_A[0])
                    .setLabel(KEYS.BUTTON_A[0])
                    .setStyle('SECONDARY'),
                new DISCORD.MessageButton()
                    .setCustomId(KEYS.BUTTON_B[0])
                    .setLabel(KEYS.BUTTON_B[0])
                    .setStyle('SECONDARY'),
                new DISCORD.MessageButton()
                    .setCustomId(KEYS.BUTTON_X[0])
                    .setLabel(KEYS.BUTTON_X[0])
                    .setStyle('SECONDARY'),
                new DISCORD.MessageButton()
                    .setCustomId(KEYS.BUTTON_Y[0])
                    .setLabel(KEYS.BUTTON_Y[0])
                    .setStyle('SECONDARY'),
            );
    },
    secondaryActionInputRow: function() {
        return new DISCORD.MessageActionRow()
            .addComponents(
                new DISCORD.MessageButton()
                    .setCustomId(KEYS.START[0])
                    .setLabel(KEYS.START[0])
                    .setStyle('SECONDARY'),
                new DISCORD.MessageButton()
                    .setCustomId(KEYS.SELECT[0])
                    .setLabel(KEYS.SELECT[0])
                    .setStyle('SECONDARY'),
                new DISCORD.MessageButton()
                    .setCustomId(KEYS.BUTTON_R[0])
                    .setLabel(KEYS.BUTTON_R[0])
                    .setStyle('SECONDARY'),
                new DISCORD.MessageButton()
                    .setCustomId(KEYS.BUTTON_L[0])
                    .setLabel(KEYS.BUTTON_L[0])
                    .setStyle('SECONDARY'),
            );
    },
    screenModeConfigRow: function() {
        return new DISCORD.MessageActionRow()
            .addComponents(
                new DISCORD.MessageButton()
                    .setCustomId("0️⃣")
                    .setLabel("0️⃣")
                    .setStyle('SECONDARY'),
                new DISCORD.MessageButton()
                    .setCustomId("1️⃣")
                    .setLabel("1️⃣")
                    .setStyle('SECONDARY'),
                new DISCORD.MessageButton()
                    .setCustomId("2️⃣")
                    .setLabel("2️⃣")
                    .setStyle('SECONDARY'),
                new DISCORD.MessageButton()
                    .setCustomId("🔄")
                    .setLabel("🔄")
                    .setStyle('SECONDARY'),
            );
    }
}
