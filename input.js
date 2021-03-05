const KEY_SENDER = require('node-key-sender');
const KEYS = require('./sample-keys.json');

//delay of a key press, 1000ms / 60 frames = ~17
KEY_SENDER.setOption('globalDelayPressMillisec', 17);

module.exports = {
    setPressFor: function (millisec){
        KEY_SENDER.setOption('globalDelayPressMillisec', millisec)
    },
    up: function () {
        KEY_SENDER.sendKey(KEYS.UP[1]);
    },
    rightUp: function () {
        KEY_SENDER.sendCombination([KEYS.BUTTON_R[1], KEYS.RIGHT[1], KEYS.UP[1]]);
        //KEY_SENDER.sendKey(KEYS.RIGHT[1]);
        //KEY_SENDER.sendKey(KEYS.UP[1]);
    },
    right: function () {
        KEY_SENDER.sendKey(KEYS.RIGHT[1]);
    },
    rightDown: function () {
        KEY_SENDER.sendCombination([KEYS.BUTTON_R[1], KEYS.RIGHT[1], KEYS.DOWN[1]]);
        //KEY_SENDER.sendKey(KEYS.RIGHT[1]);
        //KEY_SENDER.sendKey(KEYS.DOWN[1]);
    },
    down: function () {
        KEY_SENDER.sendKey(KEYS.DOWN[1]);
    },
    leftDown: function () {
        KEY_SENDER.sendCombination([KEYS.BUTTON_R[1], KEYS.LEFT[1], KEYS.DOWN[1]]);
        //KEY_SENDER.sendKey(KEYS.LEFT[1]);
        //KEY_SENDER.sendKey(KEYS.DOWN[1]);
    },
    left: function () {
        KEY_SENDER.sendKey(KEYS.LEFT[1]);
    },
    leftUp: function () {
        KEY_SENDER.sendCombination([KEYS.BUTTON_R[1], KEYS.LEFT[1], KEYS.UP[1]]);
        //KEY_SENDER.sendKey(KEYS.LEFT[1]);
        //KEY_SENDER.sendKey(KEYS.UP[1]);
    },
    a: function () {
        KEY_SENDER.sendKey(KEYS.BUTTON_A[1]);
    },
    b: function () {
        KEY_SENDER.sendKey(KEYS.BUTTON_B[1]);
    },
    x: function () {
        KEY_SENDER.sendKey(KEYS.BUTTON_X[1]);
    },
    y: function () {
        KEY_SENDER.sendKey(KEYS.BUTTON_Y[1]);
    },
    start: function () {
        KEY_SENDER.sendKey(KEYS.START[1])
    },
    select: function () {
        KEY_SENDER.sendKey(KEYS.SELECT[1])
    },
    r: function () {
        KEY_SENDER.sendKey(KEYS.BUTTON_R[1])
    },
    l: function () {
        KEY_SENDER.sendKey(KEYS.BUTTON_L[1])
    },
    screenMode0: function () {
        KEY_SENDER.sendCombination(["control", "0"])
    },
    screenMode1: function () {
        KEY_SENDER.sendCombination(["control", "1"])
    },
    screenMode2: function () {
        KEY_SENDER.sendCombination(["control", "2"])
    },
    switchPrimaryScreen: function () {
        KEY_SENDER.sendKey("space");
    }
};