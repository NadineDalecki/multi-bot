module.exports = {
    Affen: async function(reaction, client, user, set, MessageEmbed) {
        const guild = client.guilds.cache.get(set[client.user.username].guildId)

        if (reaction.message.id == "925398083796340797") {

            guild.members.fetch(user).then((reactingUser) => { reactingUser.roles.add("549925842646597651") }) //LFT

            guild.members.fetch()

            setTimeout(function() {
                guild.roles.fetch("549925842646597651").then(role => {

                    const players = role.members.map((m) => m.user.tag);

                    players.sort()
                    const n = 3
                    const result = [[], [], []]
                    const playersPerLine = Math.ceil(players.length / 3)
                    for (let line = 0; line < n; line++) {
                        for (let i = 0; i < playersPerLine; i++) {
                            const value = players[i + line * playersPerLine]
                            if (!value) continue
                            result[line].push(value)
                        }
                    }

                    const embed = new MessageEmbed()
                        .setColor("#4A26D7")
                        .setAuthor("Players currently LOOKING FOR A TEAM")
                        .setDescription("Add/remove a reaction below to add/remove yourself from the list")
                        .addField("\u200B", result[0].join("\n"), true)
                        .addField("\u200B", result[1].join("\n"), true)
                        .addField("\u200B", result[2].join("\n"), true)

                    client.channels.cache
                        .get("553895148552192000")
                        .messages.fetch("925398083796340797")
                        .then(msg => msg.edit({ embeds: [embed] }))
                        .catch(console.error);
                });

            }, 1000);
        }
    },
    Mo: async function(reaction, client, user, set, MessageEmbed) {

        const guild = client.guilds.cache.get(set[client.user.username].guildId)

        if (reaction.message.channel.id == "718176504437276682") {
            const receivedEmbed = reaction.message.embeds[0];

            reaction.message.fetch().then(message => {
                const allReactions = reaction.message.reactions.cache.map((m) => m.emoji.name)
                receivedEmbed.setDescription(allReactions.join("\n"));
                reaction.message.edit({ embeds: [receivedEmbed] });
            })
        }
    }
}