module.exports = {
	name: "KVN",
	execute: async function (client, message, functions, set) {
		if (message.channel.type == "DM") {
			const text = functions.CleanMessage(client, message)
			functions.OpenAIAnswer(client, message, text)
		}
	}
}
