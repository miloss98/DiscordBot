const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const keepAlive = require("./server");
const fetch = require("node-fetch");
const fs = require("fs");
const { RepeatMode } = require('discord-music-player');
const { Player } = require("discord-music-player");

const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]});

//Bot prefix
const prefix = "$";

//.env secrets
const GUILD_ID = process.env['guild_id'];
const CLIENT_ID = process.env['client_id'];

//Message on successful start and setting bot activity
client.on("ready", () => {
  console.log("Hasbulla vas sada posmatra !!");
  client.user.setActivity("Zadruga 5" , { type: "WATCHING"});
})

//Making new player
const player = new Player(client, {
    leaveOnEmpty: false, 
});
client.player = player;

//Code which finds all files with .js extension
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

//Commands
client.on("messageCreate", async (msg) => {

  let guildQueue = client.player.getQueue(msg.guild.id);

  //Bot will not react to prefixless messages
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  //Main commands
  if (command === "help") {
     client.commands.get('help').execute(msg, args, Discord);
  } else  if (command === "joke") {
     client.commands.get('joke').execute(msg, args);
  } else  if (command === "inspire") {
     client.commands.get('inspire').execute(msg, args);
  } else  if (command === 'weather') {
     client.commands.get('weather').execute(client, msg, args, Discord);
  } else if (command === 'clear'){
    client.commands.get('clear').execute(msg, args);
    //Music bot commands 
  } else if(command === 'play') {
      if(!args.length) return msg.reply("You need to enter song name! ");
        let queue = client.player.createQueue(msg.guild.id);
        if(msg.member.voice.channel){
         await queue.join(msg.member.voice.channel);
         let song = await queue.play(args.join(' ')).catch(_ => {
            if(!guildQueue){
              queue.stop(); 
            }
        }); 
        song.setData({
          initMessage: msg
          });
           let queue2 = player.getQueue(msg.guild.id);
        let { initMessage } = queue2.nowPlaying.data;
        await initMessage.reply(`:musical_note:  Song: ${song.name} added to the queue! :writing_hand: `);
        } else {
          msg.reply("You need to be in a voice channel!");
        }
  
    } else if (command === 'nowplaying') {
        if(!guildQueue || guildQueue === undefined){
          msg.reply("Nothing is playing at the moment...")
        }else{
           msg.reply(`Now playing:  ${guildQueue.nowPlaying}  :dvd:`);
        }
    } else if(command === 'shuffle') {
      if(guildQueue){
        guildQueue.shuffle();
        msg.reply("Shuffle enabled!")
        }else{
          msg.reply("Nothing is playing at the moment...")
        } 
    } else if(command === 'pause') {
      if(guildQueue){
        guildQueue.setPaused(true);
        msg.reply("Song paused! :pause_button: ")
        }else{
          msg.reply("Nothing is playing at the moment...")
        }    
    } else if(command === 'resume') {
       if(guildQueue){
        guildQueue.setPaused(false);
        msg.reply("Song resumed! :arrow_forward: ")
        }else{
          msg.reply("Nothing is playing at the moment...")
        } 
    } else if(command === 'skip') {
       if(guildQueue){
        guildQueue.skip();
        msg.reply("Skipped! :ballot_box_with_check: ")
       }else{
         msg.reply("Nothing is playing at the moment...")
       }
    } else if (command === 'stop') {
      if(guildQueue){
        guildQueue.stop();
        msg.reply("Stopped, leaving channel! :wave: ");
      }else{
        msg.reply("Nothing is playing at the moment...")
      }

    } else if(command === 'remaining') {
      if(guildQueue){
        const ProgressBar = guildQueue.createProgressBar();
        msg.reply(' :hourglass: ' + ProgressBar.prettier + ' :hourglass_flowing_sand: ');
      }else{
        msg.reply("Nothing is playing at the moment...")
      }
    } else if(command === 'loop') {
      if(guildQueue){
        if(guildQueue.setRepeatMode(RepeatMode.SONG)){
          msg.reply("Loop enabled! :repeat:")
        } else{
          guildQueue.setRepeatMode(RepeatMode.DISABLED);
          msg.reply("Loop disabled! :x: ")
        }
    }else{
      msg.reply("Nothing is playing at the moment...")
    }
    }
})

//Function for 24/7 bot hosting
keepAlive();

//.env secrets (bot token)
const token = process.env['token']
client.login(token);


