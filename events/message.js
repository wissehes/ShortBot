const { MessageEmbed } = require("discord.js")
const saveLink = require("../modules/savelink")
const validUrl = require("valid-url")

module.exports = (client, message) => {

    if (message.author.bot) return;

    if (message.content == `<@!${client.user.id}>`) {
        const embed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle("Hi!")
            .setDescription(`My prefix is ${client.config.prefix}\nType ${client.config.prefix}help for all of my commands!`)
        return message.channel.send(embed)
    }

    if (message.content.toLowerCase().indexOf(client.config.prefix) !== 0) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (validUrl.isUri(command)) {
        saveLink(message.author, command)
            .then(data => {
                const embed = new MessageEmbed()
                    .setTitle("New short link created!")
                    .setColor("GREEN")
                    .setDescription(`**Short link** ${data.shortUrl}`)
                message.channel.send(embed)
            }).catch(err => {
                console.log(err)
            })
    }

    const cmd = client.commands.get(command);


    if (!cmd) return;


    cmd.run(client, message, args);
};