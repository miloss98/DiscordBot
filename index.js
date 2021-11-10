const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const keepAlive = require("./server");
const fetch = require("node-fetch");

const prefix = "$";

function getQuote(){
    return fetch("https://zenquotes.io/api/random")
    .then (res => {
      return res.json()
    })
    .then(data => {
      return data[0]["q"] + " - " + data[0]["a"];
    })

}

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
client.once("ready", () => {
  console.log("Hasbulla vas sada posmatra !!");
})



client.on("messageCreate", (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "seva") {
    msg.reply("Cigan!");
  } else if (command === "seha") {
    msg.reply("Cigan najveci!");
  } else if(msg.content === "$inspire"){
    getQuote().then(quote => msg.reply(quote))
  } else if (command === "micic") {
    msg.reply("Moj brat, gospodin! GOSPODAR VREMENA");
  } else if (command === "milorad") {
    msg.reply("Najveci jebac :D ");
  } else if (command === "kale") {
    msg.reply("Mmmmmmmbraleeeeeeeee!");
  } 
  
})

keepAlive();

client.login("OTA4MDY3NDg5ODEwODc4NDk0.YYwVwA.Z9Dg1MKlzdKU9oYvZPldahpVbNg");
