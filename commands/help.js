//Help command
const { MessageEmbed } = require('discord.js');

module.exports = { 

  name: "help",
  description: "listing all commands",
  execute(message, args, Discord){

   const newEmbed = new MessageEmbed()
	  .setColor('#0099ff')
	  .setTitle('View all commands')
	  .setURL('https://github.com/milos-stojanovic98/DiscordBot#readme')
	  .setAuthor('Hasbi Discord Team', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz8kPGo8k-vDEpE4wSf6FAJKypbEA0CiEOLA&usqp=CAU')
	  .setDescription('This is the list of main commands: ')
	  .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz8kPGo8k-vDEpE4wSf6FAJKypbEA0CiEOLA&usqp=CAU')
	  .addFields(
		  { name: ":one:  $joke", value: 'Replies with a joke.' },
		  { name: ":two:  $inspire", value: 'Sends back inspirational quote.' },
      { name: ":three:  $weather", value: 'Enter a city name to get weather info' },
      { name: ":four:  $clear", value: 'Clear desired amount of messages.' },
      { name: ":five:  $play", value: 'Plays the song, e.g. $play <song name> .' },
      { name: ":six:  $nowplaying", value: 'Shows the currently playing song.' },
      { name: ":seven:  $pause", value: 'Pause.' },
      { name: ":eight:  $resume", value: 'Resume.' },
      { name: ":nine:  $loop", value: 'Toggles the loop.' },
      { name: ":one::zero:  $skip", value: 'Skips the currently playing song.' },
  	)
	  .setImage('https://theancestory.com/wp-content/uploads/2021/05/Mini_Khabib_with_Khabib_Nurmagomedov-300x291.jpg')
	  .setTimestamp()
	  .setFooter('Bot Hasbi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz8kPGo8k-vDEpE4wSf6FAJKypbEA0CiEOLA&usqp=CAU');

    message.channel.send({ embeds: [newEmbed] });

  }
}