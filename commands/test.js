//Example of exporting and making command and its purpose 
module.exports = {
  name: 'test',
  description: 'this is test command',
  execute(message, args){
    message.channel.send("radi export !!!!!");
  }

}