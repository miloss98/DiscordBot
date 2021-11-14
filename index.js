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
client.once("ready", () => {
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

getJokes = () => {
  return fetch('https://api.chucknorris.io/jokes/random')
  .then(res => {
    return res.json()
  })
  .then(data => {
    return data.value;
  })
}

//Zen quotes function + API
 getQuote = () => {
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data[0]["q"] + " - " + data[0]["a"];
    })
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
  } else if (command === 'inspire'){
    getQuote().then(quote => msg.reply(quote))
  } else if (command === "joke") {
    getJokes().then(jokes => msg.reply(jokes))
  } else if (command === 'clear'){
    client.commands.get('clear').execute(msg, args);
    //Music bot commands 
  } else if(command === 'play') {
        let queue = client.player.createQueue(msg.guild.id);
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
        
    } else if (command === 'nowplaying') {
        msg.reply(`Now playing:  ${guildQueue.nowPlaying}  :dvd:`);
    } else  if(command === 'shuffle') {
        guildQueue.shuffle();
        msg.reply("Shuffle enabled! ")
    } else  if(command === 'pause') {
        guildQueue.setPaused(true);
        msg.reply("Song paused! :pause_button: ")
    } else if(command === 'resume') {
        guildQueue.setPaused(false);
        msg.reply("Song resumed! :arrow_forward: ")
    } else if(command === 'skip') {
        guildQueue.skip();
        msg.reply("Skipped! :ballot_box_with_check: ")
    } else if (command === 'stop') {
        guildQueue.stop();
        msg.reply("Stopped, leaving channel! :wave: ");
    } else if(command === 'remaining') {
        const ProgressBar = guildQueue.createProgressBar();
        msg.reply(' :hourglass: ' + ProgressBar.prettier + ' :hourglass_flowing_sand: ');
    } else if(command === 'loop') {
        if(guildQueue.setRepeatMode(RepeatMode.SONG)){
          msg.reply("Loop enabled! :repeat:")
        } else{
          guildQueue.setRepeatMode(RepeatMode.DISABLED);
          msg.reply("Loop disabled! :x: ")
        }
    }
})

//Function for 24/7 bot hosting
keepAlive();

//.env secrets (bot token)
const token = process.env['token']
client.login(token);


