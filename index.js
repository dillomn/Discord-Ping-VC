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

bot.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel
  
  
    if(oldUserChannel === undefined && newUserChannel !== undefined) {
  
       // User Joins a voice channel
       console.log("A user just joined vc !")
  
    } else if(newUserChannel === undefined){
  
      // User leaves a voice channel
      console.log("A user just left vc !")
    }
  })

bot.login(botconfig.token);