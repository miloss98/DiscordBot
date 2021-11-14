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
	  .setDescription('This is the list of all available commands:')
	  .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz8kPGo8k-vDEpE4wSf6FAJKypbEA0CiEOLA&usqp=CAU')
	  .addFields(
		  { name: ":one:  $inspire", value: 'Sends back inspirational quote.' },
		  { name: ":two:  $joke", value: 'Replies with a joke.' },
      { name: ":three:  $clear", value: 'Deletes desired amount of messages. (max 100) ' },
      { name: ":four:  $play", value: 'Plays the song, e.g. $play <song name> .' },
      { name: ":five:  $nowplaying", value: 'Shows the currently playing song.' },
      { name: ":seven:  $pause", value: 'Pause.' },
      { name: ":eight:  $resume", value: 'Resume.' },
      { name: ":nine:  $loop", value: 'Toggles the loop.' },
      { name: ":one::zero:  $skip", value: 'Skips the currently playing song.' },
      { name: ":one::one:  $stop", value: 'Stops the song and disconnects from channel.' },
      { name: ":one::two:  $remaining", value: 'Shows the progress bar of the currently playing song.' },
      
  	)
	  .setImage('https://theancestory.com/wp-content/uploads/2021/05/Mini_Khabib_with_Khabib_Nurmagomedov-300x291.jpg')
	  .setTimestamp()
	  .setFooter('Bot Hasbi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz8kPGo8k-vDEpE4wSf6FAJKypbEA0CiEOLA&usqp=CAU');

    message.channel.send({ embeds: [newEmbed] });

  }
}