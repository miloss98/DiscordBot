//Clearing chat
module.exports = {
  name: 'clear',
  description: 'clearing messages',
 async execute(message, args){
   if(!args[0]) return message.reply("Please enter the amout of messages you want to delete!");
   if(isNaN(args[0])) return message.reply("Please enter a valid number!");
   if(args[0]>100) return message.reply("You cannot delete more then 100 messages!");
   if(args[0]<1) return message.reply("You must delete atleast one message!");

  await message.channel.messages.fetch({limit: args[0]}).then( messages => {
    message.channel.bulkDelete(messages);
    message.reply("Messages deleted!")
  });

   
 }
}