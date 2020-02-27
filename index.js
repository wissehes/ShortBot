const Discord = require("discord.js")
const client = new Discord.Client()
const fs = require("fs");
const express = require("express")
const session = require('express-session');

const config = require("./config")
const app = express()

const connectDB = require('./modules/db');

client.config = config;

connectDB();

client.on("ready", () => {
  console.log("Bot Ready!")
  client.user.setActivity("sh!help | shbo.xyz", { type: 'PLAYING' })
})

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

app.use(session({
  secret: 'OwO UwU OwU UwO',
  resave: false,
  saveUninitialize: true,
  expires: 604800000,
  //cookie: { secure: true },
}));
app.set('view engine', 'ejs');
app.use('/s/', require('./routes/redirect'));
app.use('/', require('./routes/index'))
app.use('/discord', require('./routes/discord'));
app.use('/static', express.static('views/static'))

app.listen(config.port, () => {
  console.log("App running!")
})

client.login(config.token)