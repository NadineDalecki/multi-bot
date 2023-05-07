module.exports = {
	name: "KVN",
	execute: async function (client, message, functions, set) {
		if (message.channel.type == "DM") {
			functions.OpenAIAnswer(client, message)
		}
	}
}
