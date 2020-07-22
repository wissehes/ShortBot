//Discord and fs
const Discord = require("discord.js")
const client = new Discord.Client()
const fs = require("fs");
//Express and handlebars
const express = require("express")
const exphbs = require('express-handlebars');
const session = require('express-session');
//Config and express init
const config = require("./config")
const app = express()
const cors = require("cors")
    //Load the connectDB Function
const connectDB = require('./modules/db');

client.config = config;

connectDB();

client.on("ready", () => {
    console.log("Bot Ready!")
    client.user.setActivity(`${config.prefix}help | shbo.xyz`, { type: 'PLAYING' })
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
        if (props.info) {
            if (props.info.aliases) {
                for (var i = 0; i < props.info.aliases.length; i++) {
                    client.commands.set(props.info.aliases[i], props)
                }
            }
        }
    });
});

app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    expires: 604800000,
    //cookie: { secure: true },
}));

app.engine('hbs', exphbs());
app.set('view engine', 'hbs');

if (config.dev) {
    app.use(cors());
} else {
    app.use(cors({
        origin: 'https://shbo.xyz'
    }));
}

app.use('/s/', require('./routes/redirect'));
app.use('/api/', require("./routes/api"))
app.use('/', require('./routes/index'))
app.use('/discord', require('./routes/discord'));
app.use('/static', express.static('routes/static'))
app.get("/about", (req, res) => {
    const user = req.session.user ? req.session.user : null
    res.render("about", {
        user
    })
})

app.listen(config.port, () => {
    console.log("App running!")
})

client.login(config.token)