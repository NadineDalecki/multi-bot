const Embed = require("../embeds.js")

module.exports = {
    name: "em",
    execute(client, message, functions, args, set, MessageEmbed) {
        message.delete().catch(_ => { });
        const adminRoles = set[client.user.username].adminRoles;
        if (message.channel.type == "DM"||
            message.member.roles.cache.some(r => adminRoles.includes(r.id)) ||
            message.member.hasPermission("ADMINISTRATOR")
        ) {
            const embed = Embed[`${args}`]()
            message.channel.send({ embeds: [embed] });
        }
    }
};