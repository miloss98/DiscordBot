const weather = require('weather-js');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'weather',
  description: 'weatwqewqewq',
  async execute(client, message, args, Discord){
      weather.find({search: args.join(" "), degreeType: `C`}, function(error, result){
        if(!args[0]) return message.reply("Search input missing!")
      
        if(result === undefined || result.length === 0)
        return message.reply("Invalid input!");

        let current = result[0].current;
        let location = result[0].location;

        message.channel.send("Getting results...").then(m => {

            const embed = new MessageEmbed()
            .setAuthor(`Current weather for ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setDescription(`**${current.skytext}**`)
            .addField('Timezone', `UTC ${location.timezone}`, true)
            .addField('Degree Type', `Celsius`, true)
            .addField('Temperature', `${current.temperature}°`, true)
            .addField('Wind', `${current.winddisplay}`, true)
            .addField('Feels Like', `${current.feelslike}°`, 
            true)
            .addField('Humidity', `${current.humidity}°`, 
            true)
            .addField('Humidity', `${current.humidity}%`, 
            true)
            .setColor("PURPLE")
            
            m.edit(embed);
            
           message.channel.send({ embeds: [embed] });

        })
      })
  }
}

