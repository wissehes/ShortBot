const saveLink = require("../modules/savecustomlink")
const { RichEmbed } = require("discord.js")

exports.run = (client, message, args) => {
    const customUrl = args[0]
    args.shift()
    const longUrl = args.join(" ")
    if(!longUrl){
        return message.reply("You need to provide a URL for me to shorten!")
    }
    saveLink(message.author, longUrl, customUrl)
        .then(data => {
            const embed = new RichEmbed()
                .setTitle("New short link created!")
                .setColor("GREEN")
                .setDescription(`**Short link** ${data.shortUrl}`)
            message.channel.send(embed)
        })
        .catch(err => {
            if (err == "Url already exists") {
                const embed = new RichEmbed()
                    .setColor("RED")
                    .setTitle("That URL already exists!")
                    .setDescription("Try again with a different name!")

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