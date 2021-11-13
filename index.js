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

//Making new player
const player = new Player(client, {
    leaveOnEmpty: false, 
});
client.player = player;

//Logging songs in the queue
client.player.on('channelEmpty',  (queue) =>
        console.log(`Everyone left the Voice Channel, queue ended.`)).on('songAdd',  (queue, song) =>
        console.log(`Song ${song} was added to the queue.`));

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
//Message on successful start and setting bot activity
client.once("ready", () => {
  console.log("Hasbulla vas sada posmatra !!");
  client.user.setActivity("Zadruga 5" , { type: "WATCHING"});
})

//Commands
client.on("messageCreate", async (msg) => {

  let guildQueue = client.player.getQueue(msg.guild.id);

  //Bot will not react to prefixless messages
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (msg.content === "$inspire") {
    getQuote().then(quote => msg.reply(quote))
  } else if (command === "joke") {
    getJokes().then(jokes => msg.reply(jokes))
  } else if (command === 'clear'){
    client.commands.get('clear').execute(msg, args);
    //With this 2 lines of code we can call the command demanded by user from other files.
  } else if (command === 'help'){
    client.commands.get('help').execute(msg, args, Discord);
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
        await initMessage.reply(`Now playing: ${song.name}`);
        
    }else if (command === 'nowplaying') {
        msg.reply(`Now playing: ${guildQueue.nowPlaying}`);
    }else if (command === 'stop') {
        guildQueue.stop();
    }else if(command === 'playlist') {
        let queue = client.player.createQueue(msg.guild.id);
        await queue.join(msg.member.voice.channel);
        let song = await queue.playlist(args.join(' ')).catch(_ => {
            if(!guildQueue)
                queue.stop();
        });
    }else if(command === 'skip') {
        guildQueue.skip();
    }
})

//Function for 24/7 bot hosting
keepAlive();

//.env secrets (bot token)
const token = process.env['token']
client.login(token);


