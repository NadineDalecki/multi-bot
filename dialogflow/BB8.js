module.exports = {
	name: "BB8",
	execute: async function (client, message, functions, set) {
		messageWithoutName = ""
		if (message.mentions.has(client.user.id) || message.cleanContent.toLowerCase().startsWith(client.user.username.toLowerCase() + " ")) {
			messageWithoutName = message.cleanContent.substr(message.cleanContent.indexOf(" ") + 1)
			messageWithCharacter = `${set[client.user.username].character} ${messageWithoutName}`
		functions.OpenAIAnswer(client, message, messageWithCharacter)
		} else if (message.channel.type == "DM" || message.cleanContent.toLowerCase().includes(client.user.username.toLowerCase())) {
			messageWithoutName = message.cleanContent
			messageWithCharacter = `${set[client.user.username].character} ${messageWithoutName}`
		functions.OpenAIAnswer(client, message, messageWithCharacter)
		}
	}
}
