console.log("NodeJS Version: " + process.version)
const express = require("express")
const app = express()
app.get("/", (request, response) => {
	response.sendStatus(200)
})
app.listen()

const { Client, Intents, MessageEmbed } = require("discord.js") //
const set = require("./settings.json")
const functions = require("./functions.js")

const BotTokens = [process.env.BOT_BB8, process.env.BOT_AFFEN]

for (const token of BotTokens) {
	runBot(token)
}

function runBot(token) {
	const client = new Client({
		partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"],
		intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
		clientOptions: {
			fetchAllMembers: true
		}
	})

	client.on("error", console.log)
	process.on("error", console.log)
	process.on("uncaughtException", console.log)
	process.on("unhandledRejection", console.log)

	// READY UP =====================================
	client.once("ready", () => {
		client.user.setPresence({
			status: set[client.user.username].status,
			activities: [
				{
					name: set[client.user.username].activity.name,
					url: set[client.user.username].activity.url,
					type: set[client.user.username].activity.type
				}
			]
		})
	})
	client.login(token)

	// MESSAGE =====================================
	client.on("messageCreate", async message => {
		if (client.user.id != message.author.id && !message.author.bot && !(message.content.includes("@here") || message.content.includes("@everyone"))) {
			if (client.user.username == "Affen" && message.content.startsWith("spark://c/")){
				message.channel.send(`https://sprock.io/${message.cleanContent}`)
			}
			if (message.content.startsWith(set[client.user.username].prefix)) {
				client.channels.cache.get("718176504437276682").send(message.cleanContent)
				functions.Command(client, message, functions, set, MessageEmbed)
			} else {
				functions.AI(client, message, functions, set, MessageEmbed)
			}
		}
	})
}
