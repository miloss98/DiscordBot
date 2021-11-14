const fetch = require("node-fetch");

module.exports = {
  name: 'joke',
  description: 'send back a joke',
  execute(message, args){
    
     getJokes = () => {
         return fetch('https://api.chucknorris.io/jokes/random')
      .then(res => {
         return res.json();
        })
      .then(data => {
         return data.value;
     })
    }
    getQuote().then(quote => message.reply(quote));
  }
}