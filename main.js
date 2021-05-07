const Discord = require("discord.js")
const fetch = require("node-fetch")
const client = new Discord.Client()

require('dotenv').config();

let count = 0

// queries a quote from inspirational quote api
function getQuote() {
    return fetch("https://zenquotes.io/api/random")
      .then(res => {
        return res.json()
        })
      .then(data => {
        return data[0]["q"] + " -" + data[0]["a"]
      })
  }
function getDog() {
    return fetch("https://dog.ceo/api/breeds/image/random")
    .then(res => {
        return res.json()
    })
    .then(data => {
        return data["message"]
    })
}

  // the sad keywords the bot responds to
  sadWords = ["sad", "blue", "brokenhearted", "dejected", "depressed", "despondent", "disconsolate", "doleful", "downcast", "downhearted", "gloomy", "glum", "heartbroken", "heartsick", "heartsore", "heavyhearted", 
  "inconsolable", "joyless", "low", "low-spirited", "melancholic", "melancholy", "miserable", "mournful", "saddened", "sorrowful", "sorry", "unhappy", "woeful", "wretched", "aggrieved", "distressed", "troubled", 
  "uneasy", "unquiet", "upset", "worried", "despairing", "hopeless", "sunk", "disappointed", "discouraged", "disheartened", "dispirited", "suicidal", "suicide", "tearful", "cry", "tears",
  "regret", "rueful", "agonized", "anguished", "grieving", "wailing", "weeping", "bleak", "darkening", "depressing", "desolate", "dismal", "drear", "dreary", "morbid", "somber", "die", "perish", "pass away", "decease",
  "perish", "lifeless", "breathless", "kill", "murder", "agony", "hell", "torture", "curse", "torment", "horror", "misery", "anxious", "petrified", "afraid", "terrified", "fearf", "afraid", "panic", "depression", 
  "gloom", "bummer", "horrible"]

  // confirmation message
  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
  })
  
  client.on("message", msg => {
    if (msg.author.bot) return
      
    if (sadWords.some(word => msg.content.includes(word))) {
        count++;
        getQuote().then(quote => msg.channel.send('`' + quote + '`'))
        getDog().then(dog => msg.channel.send(dog))

        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .addFields(
                { name: 'montaro says...', value: 'I see you are a bit depressed... Here is a dog and an inspirational quote to lower your depression :)' },
                { name: 'Total Suicides Prevented', value: count, inline: true },
            )

        msg.channel.send(exampleEmbed);
    }
  })
  
  client.login('');