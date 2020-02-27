const saveLink = require("../modules/savelink")
const { RichEmbed } = require("discord.js")

exports.run = (client, message, args) => {
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