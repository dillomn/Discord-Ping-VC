const Discord = require('discord.js12');
const bot = new Discord.Client();
const botconfig = require("./config.json");
const fs = require("fs");
bot.commands = new Discord.Collection();

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`)
    bot.user.setStatus('idle')
    bot.user.setActivity(`Testing testing testing`);
});


bot.on('voiceStateUpdate', (oldState, newState ) => {
    if (oldState.channel === null && newState.channel !== null) {
        console.log("A user just joined vc !")
    } else {
        console.log("A user just left the vc !")   
    }
});


bot.login(botconfig.token);