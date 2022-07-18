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

bot.on('voiceStateUpdate', (oldState, newState ) => { // This activates when the bot detects a user joining a vc
    let vcRole = newState.member.guild.roles.cache.find(role => role.name === "vc"); // Assign variable "vcRole" to a roll named "vc"
    if (!vcRole) { // If the role doesnt exist run the following 
        newState.guild.roles.create({ // Creates a role named "vc"
            data: {
              name: 'vc',
              color: 'BLUE',
            },
            reason: 'The role for vc doesnt exist',
          })
            .then(console.log)
            .catch(console.error);
    }
    if (oldState.channel === null && newState.channel !== null) { // If a user joins vc give them vcRole
        console.log("A user just joined vc !")
        newState.member.roles.add(vcRole)
    } else {
        console.log("A user just left the vc !") // If a user leaves remove their vc role
        newState.member.roles.remove(vcRole)   
    }
});


bot.login(botconfig.token);