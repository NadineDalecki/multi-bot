module.exports = {
	name: "BB8",
	execute: async function (client, message, functions, set) {
		messageWithoutName = ""

		if (message.mentions.has(client.user.id) || message.cleanContent.toLowerCase().startsWith(client.user.username.toLowerCase() + " ") || message.channel.type == "DM") {
			const text = functions.CleanMessage(client, message)
			functions.OpenAIAnswer(client, message, text)
		}
	}
}
