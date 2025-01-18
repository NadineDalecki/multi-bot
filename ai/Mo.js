module.exports = {
	name: "Mo",
	execute: async function (client, message, functions, set) {
		if (message.cleanContent.startsWith(",")) {
			client.channels.cache.get("718176504437276682").send(mesage.author.tag + " | " + message.cleanContent + " | " + message.link)
			functions.OpenAIAnswer(client, message)
		}
	}
}
