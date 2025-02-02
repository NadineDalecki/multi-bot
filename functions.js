const dialogflow = require("@google-cloud/dialogflow")
const fs = require("fs")
const set = require("./settings.json")
const {MessageEmbed } = require("discord.js")
const { GoogleSpreadsheet } = require("google-spreadsheet")
const { Collection } = require("discord.js")
const { Configuration, OpenAIApi } = require("openai")
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

module.exports = {
	AI: function (client, message, functions, set, MessageEmbed) {
		client.ai = new Collection()
		const aiFiles = fs.readdirSync("./ai").filter(file => file.endsWith(".js"))
		for (const file of aiFiles) {
			const dialog = require(`./ai/${file}`)
			client.ai.set(dialog.name, dialog)
		}
		if (!client.ai.has(client.user.username)) return
		try {
			client.ai.get(client.user.username).execute(client, message, functions, set, MessageEmbed)
		} catch (error) {
			client.channels.cache.get("718176504437276682").send(e.message)
		}
	},
	Command: function (client, message, functions, set, MessageEmbed) {
		client.commands = new Collection()
		const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))
		for (const file of commandFiles) {
			const command = require(`./commands/${file}`)
			client.commands.set(command.name, command)
		}
		const args = message.content.slice(set[client.user.username].prefix.length).split(/ +/)
		const command = args.shift().toLowerCase()
		if (!client.commands.has(command)) return
		try {
			if (command !== "") {
				client.commands.get(command).execute(client, message, functions, args, set, MessageEmbed)
				client.channels.cache.get("718176504437276682").send(mesage.author.tag + " | " + message.cleanContent + " | " + message.link)
			}
		} catch (error) {
			console.error(error)
		}
	},
	DialogflowQuery: async function (client, message) {
		if (message.cleanContent.length < 255) {
			const config = {
				credentials: {
					private_key: process.env[`PRIVATE_KEY_${client.user.username.toUpperCase()}`].replace(/\\n/g, "\n"),
					client_email: process.env[`CLIENT_EMAIL_${client.user.username.toUpperCase()}`]
				}
			}
			const sessionClient = new dialogflow.SessionsClient(config)
			const sessionPath = sessionClient.projectAgentSessionPath(process.env[`PROJECT_ID_${client.user.username.toUpperCase()}`], message.author.id.substring(0, 11))
			let cleanMessage = message.cleanContent
			if (message.cleanContent.toLowerCase().startsWith(client.user.username.toLowerCase() + " ") || message.content.startsWith("<@" + client.user.id + ">")) {
				cleanMessage = message.cleanContent.substr(message.cleanContent.indexOf(" ") + 1)
			} else {
				cleanMessage = message.cleanContent
			}
			try {
				const request = {
					session: sessionPath,
					queryInput: {
						text: {
							text: cleanMessage,
							languageCode: "en-US"
						}
					}
				}
				const result = await sessionClient.detectIntent(request)
				const intent = result[0].queryResult.intent.displayName
				const response = result[0].queryResult.fulfillmentText
				console.log("Intent: " + intent)
				return { result, intent, response }
			} catch (e) {
				console.log(e.message)
			}
		} else {
			channel.message.send("🙈")
		}
	},
	EmbedBuilder: function (embed) {
		try {
			const newEmbed = new MessageEmbed()

			newEmbed.setDescription(embed[0].description)

			if (embed[0].Color) {
				newEmbed.setColor(embed[0].Color)
			}
			if (embed[0].Title !== "undefined") {
				newEmbed.setTitle(embed[0].Title)
			}
			if (embed[0].URL !== "undefined") {
				newEmbed.setURL(embed[0].URL)
			}
			if (embed[0].Author_Text !== "undefined") {
				newEmbed.setAuthor({ name: embed[0].Author_Text, iconURL: embed[0].Author_Avatar_Link, url: embed[0].Author_URL })
			}
			if (embed[0].Thumbnail !== "undefined") {
				newEmbed.setThumbnail(embed[0].Thumbnail)
			}
			if (embed[0].Image !== "undefined") {
				newEmbed.setImage(embed[0].Image)
			}
			if (embed[0].Footer_Avatar_URL !== "undefined" && embed[0].Footer_Text) {
				newEmbed.setFooter(embed[0].Footer_Text, embed[0].Footer_Avatar_URL)
			}
			if (embed[0].Field_1_Title && embed[0].Field_1_Text) {
				newEmbed.addFields([{ name: embed[0].Field_1_Title, value: embed[0].Field_1_Text, inline: embed[0].Field_1_Inline }])
			}
			if (embed[0].Field_2_Title && embed[0].Field_2_Text) {
				newEmbed.addFields([{ name: embed[0].Field_2_Title, value: embed[0].Field_2_Text, inline: embed[0].Field_2_Inline }])
			}
			if (embed[0].Field_3_Title && embed[0].Field_3_Text) {
				newEmbed.addFields([{ name: embed[0].Field_3_Title, value: embed[0].Field_3_Text, inline: embed[0].Field_3_Inline }])
			}
			if (embed[0].Field_4_Title && embed[0].Field_4_Text) {
				newEmbed.addFields([{ name: embed[0].Field_4_Title, value: embed[0].Field_4_Text, inline: embed[0].Field_4_Inline }])
			}
			if (embed[0].Field_5_Title && embed[0].Field_5_Text) {
				newEmbed.addFields([{ name: embed[0].Field_5_Title, value: embed[0].Field_5_Text, inline: embed[0].Field_5_Inline }])
			}
			return newEmbed
		} catch (e) {
			console.log(`Looks like there is a problem with some spreadsheet data!`)
			console.log(e.message)
		}
	},
	Mention: function (client, message) {
		try {
			if (message.content.toLowerCase().includes("nada") || (message.content.toLowerCase().includes("na_da") && !message.content.toLowerCase().includes("canada"))) {
				const embed = new MessageEmbed().setColor("#00c22a").setAuthor(`${message.author.username} mentioned you in ${message.channel.name}`, message.author.displayAvatarURL()).setDescription(`${message} \n [Link](${message.url})`)
				client.users.cache.get("338649491894829057").send({ embeds: [embed] })
			} else if (message.content.toLowerCase().includes("sendo")) {
				const embed = new MessageEmbed().setColor("#00c22a").setAuthor(`${message.author.username} mentioned you in ${message.channel.name}`, message.author.displayAvatarURL()).setDescription(`${message} \n [Link](${message.url})`)
				client.users.cache.get("119095000050040832").send({ embeds: [embed] })
			} else if (message.content.toLowerCase().includes("hasko") && message.guildId != "387015404092129282" && message.guildId != "421618914166833152" && message.guildId != "707307751033798666" && message.guildId != "424911215714631690") {
				const embed = new MessageEmbed().setColor("#00c22a").setAuthor(`${message.author.username} mentioned you in ${message.channel.name}`, message.author.displayAvatarURL()).setDescription(`${message} \n [Link](${message.url})`)
				client.users.cache.get("335528823615651842").send({ embeds: [embed] })
			}
		} catch (e) {
			console.log(message)
		}
	},
	OpenAIAnswer: async function (client, message) {
		let cleanMessage = message.cleanContent
		if (message.cleanContent.toLowerCase().startsWith(client.user.username.toLowerCase() + " ") || message.content.startsWith("<@" + client.user.id + ">")) {
			cleanMessage = message.cleanContent.substr(message.cleanContent.indexOf(" ") + 1)
		} else {
			cleanMessage = message.cleanContent
		}
		try {
			const completion = await openai.createCompletion(
				{
					model: "gpt-3.5-turbo-instruct",
					prompt: `${set[client.user.username].character} ${cleanMessage}.`,
					max_tokens: 1000
				},
				{
					timeout: 10000
				}
			)
			message.channel.send(completion.data.choices[0].text.split('"').join(""))
		} catch (e) {
			client.channels.cache.get("718176504437276682").send(mesage.author.tag + " | " + message.cleanContent + " | " + message.link)
			client.channels.cache.get("718176504437276682").send(e.message)
		}
	},
	SpreadsheetGET: async function (client) {
		const doc = new GoogleSpreadsheet(set[client.user.username].spreadsheetID)
		await doc.useServiceAccountAuth({
			client_email: process.env[`CLIENT_EMAIL_${client.user.username.toUpperCase()}`],
			private_key: process.env[`PRIVATE_KEY_${client.user.username.toUpperCase()}`].replace(/\\n/g, "\n")
		})
		await doc.loadInfo()
		return { doc }
	},
	SpreadsheetPOST: async function (client, tab, rowData) {
		const doc = new GoogleSpreadsheet(set[client.user.username].spreadsheetID)
		await doc.useServiceAccountAuth({
			client_email: process.env[`CLIENT_EMAIL_${client.user.username.toUpperCase()}`],
			private_key: process.env[`PRIVATE_KEY_${client.user.username.toUpperCase()}`].replace(/\\n/g, "\n")
		})
		await doc.loadInfo()
	}
}
