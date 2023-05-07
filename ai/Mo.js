module.exports = {
	name: "Mo",
	execute: async function (client, message, functions, set) {
		if (message.cleanContent.startsWith(",")) {
			functions.OpenAIAnswer(client, message)
		}
	}
}
