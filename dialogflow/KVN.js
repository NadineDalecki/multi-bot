module.exports = {
    name: "KVN",
    execute: async function (client, message, functions, set) {

        if (message.channel.type == "DM" ||
            message.mentions.has(client.user.id) ||
            message.cleanContent.startsWith(client.user.username + " ") ||
            message.cleanContent.startsWith(client.user.username.toLowerCase() + " ")) {

            const answer = await functions.DialogflowQuery(client, message);
            message.reply(answer.response);
        }
    }
};