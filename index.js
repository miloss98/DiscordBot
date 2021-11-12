const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const keepAlive = require("./server");
const fetch = require("node-fetch");
const fs = require("fs");

const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],});

//Bot prefix
const prefix = "$";

//.env secrets
const GUILD_ID = process.env['guild_id'];
const CLIENT_ID = process.env['client_id'];

//Code which finds all files with .js extension
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

//Zen quotes function + API
function getQuote() {
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
client.on("messageCreate", (msg) => {
  //Bot will not react to prefixless messages
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (msg.content === "$inspire") {
    getQuote().then(quote => msg.reply(quote))
  } else if (command === "proba") {
    msg.reply("Radiiiiiiii!");   
  } else if (command === 'test'){
    client.commands.get('test').execute(msg, args);
    //With this 2 lines of code we can call the command demanded by user from other files.
  }
})

//Function for 24/7 bot hosting
keepAlive();

//.env secrets (bot token)
const token = process.env['token']
client.login(token);
