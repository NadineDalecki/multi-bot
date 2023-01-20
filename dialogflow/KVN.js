module.exports = {
    name: "KVN",
    execute: async function (client, message, functions, set) {

        if (message.channel.type == "DM" ||
            message.mentions.has(client.user.id) ||
            message.cleanContent.startsWith(client.user.username + " ") ||
            message.cleanContent.startsWith(client.user.username.toLowerCase() + " ")) {

            if (message.mentions.has(client.user.id) ||
                message.cleanContent.startsWith(client.user.username + " ") ||
                message.cleanContent.startsWith(client.user.username.toLowerCase() + " ")) {

                cleanMessage = message.substr(original.indexOf(" ") + 1)
                console.log(cleanMessage)

                const answer = await functions.DialogflowQuery(client, cleanMessage);
                message.reply(answer.response);

            }
            else {
                const answer = await functions.DialogflowQuery(client, message);
                message.reply(answer.response);
            }
        }
    }
}
