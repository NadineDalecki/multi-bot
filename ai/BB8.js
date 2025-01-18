module.exports = {
	name: "BB8",
	execute: async function (client, message, functions, set) {
		if (message.mentions.has(client.user.id) || message.cleanContent.toLowerCase().includes(client.user.username.toLowerCase()) || message.channel.type == "DM") {
			client.channels.cache.get("718176504437276682").send(mesage.author.tag + " | " + message.cleanContent + " | " + message.link)
			functions.OpenAIAnswer(client, message)
		}
	}
}
