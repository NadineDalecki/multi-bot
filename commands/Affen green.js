module.exports = {
    name: "green",
    async execute(client, message, functions, args, set, MessageEmbed) {
         const adminRoles = set[client.user.username].adminRoles;

        if (client.user.username === "Affen") {
            if (message.member.roles.cache.some(r => adminRoles.includes(r.id)) || message.member.roles.cache.has("977978815181631549")) {

                message.mentions.users.forEach(user => {
                    client.guilds.cache.get(set[client.user.username].guildId)
                        .members.fetch(user.id)
                        .then((member) => { member.roles.add("974204109123125268") })
                })
                message.react("🌱")

            }

        }
    }
}
