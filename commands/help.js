//Help command
const { MessageEmbed } = require('discord.js');

module.exports = { 

  name: "help",
  description: "listing all commands",
  execute(message, args, Discord){

   const newEmbed = new MessageEmbed()
	  .setColor('#0099ff')
	  .setTitle('View all commands')
	  .setURL('https://github.com/stojanovic98m/DiscordBot#readme')
	  .setAuthor('MSLG team', 'https://scontent.ftzl1-1.fna.fbcdn.net/v/t1.15752-9/272374720_2711041369192489_1076611021766899007_n.png?_nc_cat=100&ccb=1-5&_nc_sid=ae9488&_nc_ohc=nPhllH4NYZ4AX862ANS&_nc_ht=scontent.ftzl1-1.fna&oh=03_AVKY2ZQ7KvIesl_ynZkWxATY4u33kAEvx7NqYxUhdlKdpA&oe=621DC037')
	  .setDescription('This is the list of main commands: ')
	  .setThumbnail('https://scontent.ftzl1-1.fna.fbcdn.net/v/t1.15752-9/272374720_2711041369192489_1076611021766899007_n.png?_nc_cat=100&ccb=1-5&_nc_sid=ae9488&_nc_ohc=nPhllH4NYZ4AX862ANS&_nc_ht=scontent.ftzl1-1.fna&oh=03_AVKY2ZQ7KvIesl_ynZkWxATY4u33kAEvx7NqYxUhdlKdpA&oe=621DC037')
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
	  .setImage('https://i.ebayimg.com/images/g/N2UAAOSw5dNWmQVs/s-l400.jpg')
	  .setTimestamp()
	  .setFooter('MSLG Bot', 'https://scontent.ftzl1-1.fna.fbcdn.net/v/t1.15752-9/272374720_2711041369192489_1076611021766899007_n.png?_nc_cat=100&ccb=1-5&_nc_sid=ae9488&_nc_ohc=nPhllH4NYZ4AX862ANS&_nc_ht=scontent.ftzl1-1.fna&oh=03_AVKY2ZQ7KvIesl_ynZkWxATY4u33kAEvx7NqYxUhdlKdpA&oe=621DC037');

    message.channel.send({ embeds: [newEmbed] });

  }
}