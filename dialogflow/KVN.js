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

                messageWithoutName = message.cleanContent.substr(message.cleanContent.indexOf(" ") + 1)
                console.log(messageWithoutName)

                const answer = await functions.DialogflowQuery(client, messageWithoutName, message);
                message.reply(answer.response);

            }
            else {
                const answer = await functions.DialogflowQuery(client, message.cleanContent, message);
                message.reply(answer.response);
            }
        }
    }
}
