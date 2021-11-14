const fetch = require("node-fetch");

module.exports = {
  name: 'inspire',
  description: 'sends back inspirational message',
  execute(message, args){
   
      getQuote = () => {
        return fetch("https://zenquotes.io/api/random")
      .then(res => {
        return res.json();
      })
     .then(data => {
        return data[0]["q"] + " - " + data[0]["a"];
      })
    }
    getQuote().then(quote => message.reply(quote));
  }
}