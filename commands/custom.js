const saveLink = require("../modules/savecustomlink")
const { MessageEmbed } = require("discord.js")

exports.run = (client, message, args) => {
    const customUrl = args[0]
    args.shift()
    const longUrl = args.join(" ")
    if (!longUrl) {
        return message.reply("You need to provide a URL for me to shorten!")
    }
    if (customUrl.length > 10) {
        return message.reply("Your custom URL can't be longer than 10 characters!")
    }
    saveLink(message.author, longUrl, customUrl)
        .then(data => {
            const embed = new MessageEmbed()
                .setTitle("New short link created!")
                .setColor("GREEN")
                .setDescription(`**Short link** ${data.shortUrl}`)
            message.channel.send(embed)
        })
        .catch(err => {
            if (err == "Url already exists") {
                const embed = new MessageEmbed()
                    .setColor("RED")
                    .setTitle("That URL already exists!")
                    .setDescription("Try again with a different name!")

                message.channel.send(embed)
            } else {
                const embed = new MessageEmbed()
                    .setColor("RED")
                    .setTitle("An error ocurred!")
                    .setDescription("Try again later!")
                message.channel.send(embed)
            }
        })
}

exports.info = {
    name: `custom`,
    aliases: [],
    description: `Creates a short URL with custom name.`,
    usage: `custom <name> <url>`
}