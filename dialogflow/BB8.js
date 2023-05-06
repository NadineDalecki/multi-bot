module.exports = {
	name: "BB8",
	execute: async function (client, message, functions, set) {
		if (message.cleanContent.startsWith(",")) {
			messageWithoutName = message.cleanContent.substr(message.cleanContent.indexOf(" ") + 1)
			functions.OpenAIAnswer(client, message, messageWithoutName)
		}
	}
}
