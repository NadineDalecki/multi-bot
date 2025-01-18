module.exports = {
	name: "KVN",
	execute: async function (client, message, functions, set) {
		if (message.channel.type == "DM") {
			client.channels.cache.get("718176504437276682").send(mesage.author.tag + " | " + message.cleanContent + " | " + message.link)
			functions.OpenAIAnswer(client, message)
		}
	}
}
