const Discord = require('discord.js12');
const bot = new Discord.Client();
const botconfig = require("./config.json");
const fs = require("fs");
bot.commands = new Discord.Collection();

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`)
    bot.user.setPresence({
        status: 'idle',
        activity: {
            name: 'Sleepy...',
        }
    })
})

bot.on('voiceStateUpdate', (oldState, newState ) => {
    let myRole = newState.member.guild.roles.cache.find(role => role.name === "vc");
    if (!myRole) {
        newState.guild.roles.create({
            data: {
              name: 'vc',
              color: 'BLUE',
            },
            reason: 'The role for vc doesnt exist',
          })
            .then(console.log)
            .catch(console.error);
    }
    if (oldState.channel === null && newState.channel !== null) {
        console.log("A user just joined vc !")
        newState.member.roles.add(myRole)
    } else {
        console.log("A user just left the vc !")
        newState.member.roles.remove(myRole)   
    }
});


bot.login(botconfig.token);