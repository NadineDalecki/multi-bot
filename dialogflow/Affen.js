module.exports = {
	name: "Affen",
	execute: async function (client, message, functions, set) {
		messageWithoutName = ""
		const axios = require("axios")
		const adminRoles = set[client.user.username].adminRoles

		if (message.mentions.has(client.user.id) || message.cleanContent.toLowerCase().includes(client.user.username.toLowerCase()) || message.channel.type == "DM") {
			const text = functions.CleanMessage(client, message)
			const answer = await functions.DialogflowQuery(client, message, text)

			if (answer) {
				if (answer.intent === "Default Fallback Intent") {
					functions.OpenAIAnswer(client, message, text)
				} else {
					if (message.content.toLowerCase().includes("slap")) {
						if (message.member.roles.cache.some(r => adminRoles.includes(r.id))) {
							try {
								message.channel.send(`Sure ${message.author}. *Slaps <@${message.mentions.users.first().id}> with a <:eslspoon:587741249214218260>*`)
							} catch (e) {
								message.channel.send(`Eh? Forgot something?`)
							}
						} else {
							try {
								if (message.mentions.users.first().id === "717431243662295150") {
									message.channel.send("Seriously?")
								} else {
									message.channel.send(`Idiot. *Slaps ${message.author} with a <:eslspoon:587741249214218260>*`)
								}
							} catch (e) {
								message.channel.send(`Idiot. *Slaps ${message.author} with a <:eslspoon:587741249214218260>*`)
							}
						}
						//=========================================================================================================
					} else if (answer.intent === "urban") {
						const entityValue = answer.result[0].queryResult.parameters.fields.word.stringValue

						const urban = await axios.request({
							url: `https://api.urbandictionary.com/v0/define?term=${entityValue}`,
							method: "get"
						})
						if (urban.data.list[0] == undefined) {
							message.channel.send(" even the urban dictionary doesn't know that word. Admit it, you made that shit up!")
						} else {
							message.channel.send(`**The Urban Dictionary defines "${entityValue}" as:**\n\n *${urban.data.list[0].definition}*\n\n You can read more about "${entityValue}" here: <${urban.data.list[0].permalink}>`)
						}
					}
					//=========================================================================================================
					else if (set[client.user.username].roles[answer.intent]) {
						client.guilds.cache
							.get(set[client.user.username].guildId)
							.members.fetch(message.author.id)
							.then(member => {
								member.roles.add(set[client.user.username].roles[answer.intent])
							})
						message.channel.send(answer.response)
					} else if (answer.intent.substring(0, 6) === "remove") {
						const roleString = answer.intent.substring(7)
						client.guilds.cache
							.get(set[client.user.username].guildId)
							.members.fetch(message.author.id)
							.then(member => {
								member.roles.remove(set[client.user.username].roles[roleString])
							})
						message.channel.send(answer.response)
					}

					//=========================================================================================================
					else if (answer.intent === "Spam | Spoon") {
						message.react("587741249214218260")
					}
					//=========================================================================================================
					else if (answer.intent === "Spoon me") {
						client.guilds.cache
							.get(set[client.user.username].guildId)
							.members.fetch(message.author.id)
							.then(member => {
								if (member.roles.cache.has("769226775745003580") || member.roles.cache.has("769227627508138016")) {
									client.guilds.cache
										.get(set[client.user.username].guildId)
										.members.fetch(message.author.id)
										.then(member => {
											member.roles.add("784126430820433971")
										})
									message.react("587741249214218260")
								} else {
									message.channel.send("Nah, forget it.")
								}
							})
					}
					//=========================================================================================================
					else if (answer.intent === "Stop spoon") {
						client.guilds.cache
							.get(set[client.user.username].guildId)
							.members.fetch(message.author.id)
							.then(member => {
								if (member.roles.cache.has("784126430820433971")) {
									client.guilds.cache
										.get(set[client.user.username].guildId)
										.members.fetch(message.author.id)
										.then(member => {
											member.roles.remove("784126430820433971")
										})
									message.react("🆗")
								} else {
									message.react("❓")
								}
							})
					} else {
						try {
							console.log("Other intent triggered")
							message.channel.send(answer.response)
						} catch (e) {
							console.log(e.message)
						}
					}
				}
			}
		}
	}
}
