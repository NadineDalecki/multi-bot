module.exports = {
	name: "Igle",
	execute: async function (client, message, functions, set, MessageEmbed) {
		if (message.mentions.has(client.user.id) || message.cleanContent.toLowerCase().includes(client.user.username.toLowerCase()) || message.channel.type == "DM") {
			client.channels.cache.get("718176504437276682").send(mesage.author.tag + " | " + message.cleanContent + " | " + message.link)
			const answer = await functions.DialogflowQuery(client, message)
			const data = await functions.SpreadsheetGET(client)

			if (answer.intent.substring(0, 5) === "embed") {
				const rows = await data.doc.sheetsByTitle["Embeds"].getRows()
				let embed = rows.filter(row => row.name == answer.intent)
				const finalEmbed = functions.EmbedBuilder(embed)
				message.reply({ embeds: [finalEmbed] })
			} else if (answer.intent === "Specialist") {
				if (answer.result[0].queryResult.allRequiredParamsPresent === false) {
					message.reply(answer.response)
				} else if (answer.result[0].queryResult.allRequiredParamsPresent === true) {
					const sheet = data.doc.sheetsByTitle["Embeds"]
					const rows = await sheet.getRows()
					let embed = rows.filter(row => row.name == answer.result[0].queryResult.parameters.fields.Specialist.stringValue)
					const finalEmbed = functions.EmbedBuilder(embed)
					message.reply({ embeds: [finalEmbed] })
				}
			} else if (answer.intent === "Weapon") {
				if (answer.result[0].queryResult.allRequiredParamsPresent === false) {
					message.reply(answer.response)
				} else if (answer.result[0].queryResult.allRequiredParamsPresent === true) {
					const sheet = data.doc.sheetsByTitle["Embeds"]
					const rows = await sheet.getRows()
					let embed = rows.filter(row => row.name == answer.result[0].queryResult.parameters.fields.Weapon.stringValue)
					const finalEmbed = functions.EmbedBuilder(embed)
					message.reply({ embeds: [finalEmbed] })
				}
			} else if (answer.intent === "Tip") {
				const sheet = data.doc.sheetsByTitle["Tips"]
				const rows = await sheet.getRows()
				const tip = rows[Math.floor(Math.random() * rows.length)].tip
				message.channel.send("💡 " + tip)
			} else if (answer.intent === "Meme") {
				try {
					const sheet = data.doc.sheetsByTitle["Memes"]
					const rows = await sheet.getRows()
					const meme = rows[Math.floor(Math.random() * rows.length)].meme
					message.channel.send(meme)
				} catch (e) {
					console.log(e)
				}
			} else if (answer.intent === "Fun Fact") {
				const sheet = data.doc.sheetsByTitle["Fun Facts"]
				const rows = await sheet.getRows()
				const fact = rows[Math.floor(Math.random() * rows.length)].fact
				message.channel.send("🤣 " + fact)
			} else {
				message.reply(answer.response)
			}
		}
	}
}
