const { RichEmbed } = require("discord.js")
exports.run = (client, message, args) => {
    const embed = new RichEmbed()
    .setTitle(`${client.user.username} help`)
    .setColor("BLUE")
    .setDescription(`
**sh!<url>**: Shorten provided URL.
**sh!custom <name> <url>**: Shorten provided URL with custom name.    
`)

    message.channel.send(embed)
}