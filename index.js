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

bot.on('voiceStateUpdate', async (oldState, newState) => {
    let vcRole = newState.member.guild.roles.cache.find(role => role.name === "vc"); // Assigns vc role to vcRole the role should either equal the vc role or "undefined"
    if (!vcRole) { // If the vcRole is undefiened it will run the following to create the role
        vcRole = await newState.guild.roles.create({
            data: {
              name: 'vc',
              color: 'BLUE',
            },
            reason: 'The role for vc doesnt exist',
          });
    }
    if (oldState.channel === null && newState.channel !== null) {  // Checks if a user has joined then assigns them the vc role
        console.log("A user just joined vc !")
        await newState.member.roles.add(vcRole)
    } else { // Checks if a user has left then removes their role
        console.log("A user just left the vc !")
        await newState.member.roles.remove(vcRole)   
    }
});


bot.login(botconfig.token);