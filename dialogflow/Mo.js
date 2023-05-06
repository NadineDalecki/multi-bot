module.exports = {
    name: "Mo",
    execute: async function (client, message, functions, set) {

        if (message.channel.type == "DM" ||
            message.mentions.has(client.user.id) ||
            message.cleanContent.startsWith(client.user.username + " ") ||
            message.cleanContent.startsWith(client.user.username.toLowerCase() + " ")) {

            if (message.mentions.has(client.user.id) ||
                message.cleanContent.startsWith(client.user.username + " ") ||
                message.cleanContent.startsWith(client.user.username.toLowerCase() + " ")) {

                messageWithoutName = message.cleanContent.substr(message.cleanContent.indexOf(" ") + 1)
               
                const answer = await functions.DialogflowQuery(client, messageWithoutName, message);
                if (answer.intent === "Default Fallback Intent") {
                functions.OpenAIAnswer(client, message)
                }
                else {
                message.reply(answer.response);
                }
            }
            else {
                const answer = await functions.DialogflowQuery(client, message.cleanContent, message);
                if (answer.intent === "Default Fallback Intent") {
                    functions.OpenAIAnswer(client, message)
                    }
                    else {
                    message.reply(answer.response);
                    }

                console.log(answer)
            }
        }
    }
}


//