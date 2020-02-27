const saveLink = require("../modules/savelink")
const { RichEmbed } = require("discord.js")

exports.run = (client, message, args) => {
    if(!args[0]){
        return message.reply("You need to provide a URL for me to shorten!")
    }
    const longUrl = args.join(" ")
    saveLink(message.author, longUrl, true)
        .then(data => {
            const embed = new RichEmbed()
                .setTitle("New short link created!")
                .setColor("GREEN")
                .setDescription(`**Short link** ${data.shortUrl}`)
            message.channel.send(embed)
        })
        .catch(console.log)
}

exports.info = {
    name: `secret`,
    aliases: ['private', 'hidden'],
    description: `Creates a private URL`,
    usage: `private <url>`
}