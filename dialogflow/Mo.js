module.exports = {
	name: "Mo",
	execute: async function (client, message, functions, set) {
		messageWithoutName = undefined

		if (message.mentions.has(client.user.id) || message.cleanContent.startsWith(client.user.username + " ") || message.cleanContent.startsWith(client.user.username.toLowerCase() + " ")) {
			messageWithoutName = message.cleanContent.substr(message.cleanContent.indexOf(" ") + 1)
		} else if (message.channel.type == "DM") {
			messageWithoutName = message.cleanContent
		}

		console.log(messageWithoutName)

		const answer = await functions.DialogflowQuery(client, messageWithoutName, message)
        console.log(answer.intent)
		if (answer.intent === "Default Fallback Intent") {
			functions.OpenAIAnswer(client, message)
		} else {
			message.reply(answer.response)
		}
	}
}
