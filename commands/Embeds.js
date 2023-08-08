const {MessageEmbed } = require("discord.js")

module.exports = {
	name: "e",
	async execute(client, message, functions, args, set, MessageEmbed) {
		message.delete().catch(_ => {})
		const adminRoles = set[client.user.username].adminRoles

		if (message.channel.type == "DM" || message.member.permissions.has("ADMINISTRATOR")) {
			const data = await functions.SpreadsheetGET(client)
			const sheet = data.doc.sheetsByTitle["Embeds"]
			const rows = await sheet.getRows()

			let embed = rows.filter(embed => embed.name == args.join(" "))
			try {
				const finalEmbed = functions.EmbedBuilder(embed)
				message.channel.send({ embeds: [finalEmbed] })
			} catch (e) {
				console.log(e.message)
			}
		}
	}
}
