const dialogflow = require("@google-cloud/dialogflow");
const fs = require("fs");
const set = require("./settings.json");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { Collection, MessageEmbed } = require("discord.js");

module.exports = {
    Command: function (client, message, functions, set) {
        client.commands = new Collection();
        const commandFiles = fs
            .readdirSync("./commands")
            .filter((file) => file.endsWith(".js"));
        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            client.commands.set(command.name, command);
        }
        const args = message.content
            .slice(set[client.user.username].prefix.length)
            .split(/ +/);
        const command = args.shift().toLowerCase();
        if (!client.commands.has(command)) return;
        try {
            if (command !== "") {
                client.commands
                    .get(command)
                    .execute(client, message, functions, args, set, MessageEmbed);
            }
        } catch (error) {
            console.error(error);
        }
    },
    DialogflowIntents: function (client, message, functions, set) {
        client.dialogues = new Collection();
        const dialogflowFiles = fs
            .readdirSync("./dialogflow")
            .filter((file) => file.endsWith(".js"));
        for (const file of dialogflowFiles) {
            const dialog = require(`./dialogflow/${file}`);
            client.dialogues.set(dialog.name, dialog);
        }
        if (!client.dialogues.has(client.user.username)) return;
        try {
            client.dialogues
                .get(client.user.username)
                .execute(client, message, functions, set, MessageEmbed);
        } catch (error) {
            console.error(error);
        }
    },

    DialogflowQuery: async function (client, message) {
        const config = {
            credentials: {
                private_key: process.env[
                    `PRIVATE_KEY_${client.user.username.toUpperCase()}`
                ],
                client_email:
                    process.env[`CLIENT_EMAIL_${client.user.username.toUpperCase()}`],
            },
        };
        const sessionClient = new dialogflow.SessionsClient(config);
        const sessionPath = sessionClient.projectAgentSessionPath(
            process.env[`PROJECT_ID_${client.user.username.toUpperCase()}`],
            message.author.id.substring(0, 8)
        );
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: message.cleanContent,
                    languageCode: "en-US",
                },
            },
        };
        const result = await sessionClient.detectIntent(request);
        const intent = result[0].queryResult.intent.displayName;
        const response = result[0].queryResult.fulfillmentText;
        return { result, intent, response };
    },
    EmbedBuilder: function (embed) {
        try {
            const newEmbed = new MessageEmbed();
            if (embed[0].Color) {
                newEmbed.setColor(embed[0].Color);
            }
            if (embed[0].Title !== "undefined") {
                newEmbed.setTitle(embed[0].Title);
            }
            if (embed[0].URL !== "undefined") {
                newEmbed.setURL(embed[0].URL);
            }
            if (embed[0].Author_Text !== "undefined") {
                newEmbed.setAuthor(
                    embed[0].Author_Text,
                    embed[0].Author_Avatear_Link,
                    embed[0].Author_URL
                );
            }
            if (embed[0].Description !== "undefined") {
                newEmbed.setDescription(embed[0].Description);
            }
            if (embed[0].Thumbnail !== "undefined") {
                newEmbed.setThumbnail(embed[0].Thumbnail);
            }
            if (embed[0].Image !== "undefined") {
                newEmbed.setImage(embed[0].Image);
            }
            if (embed[0].Image !== "undefined") {
                newEmbed.setImage(embed[0].Image);
            }
            if (embed[0].Footer_Avatar_URL !== "undefined" && embed[0].Footer_Text) {
                newEmbed.setFooter(embed[0].Footer_Text, embed[0].Footer_Avatar_URL);
            }
            if (embed[0].Field_1_Title && embed[0].Field_1_Text) {
                newEmbed.addField(embed[0].Field_1_Title, embed[0].Field_1_Text);
            }
            if (embed[0].Field_2_Title && embed[0].Field_2_Text) {
                newEmbed.addField(embed[0].Field_2_Title, embed[0].Field_2_Text);
            }
            if (embed[0].Field_3_Title && embed[0].Field_3_Text) {
                newEmbed.addField(embed[0].Field_3_Title, embed[0].Field_3_Text);
            }
            if (embed[0].Field_4_Title && embed[0].Field_4_Text) {
                newEmbed.addField(embed[0].Field_4_Title, embed[0].Field_4_Text);
            }
            if (embed[0].Field_5_Title && embed[0].Field_5_Text) {
                newEmbed.addField(embed[0].Field_5_Title, embed[0].Field_5_Text);
            }
            return newEmbed;
        } catch (e) {
            console.log(
                `Looks like there is a prolem with some spreadsheet data! ${client.username}`
            );
        }
    },
    LogDelete: async function (client, message) {
        if (!message.guild) return;
        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: "MESSAGE_DELETE",
        });

        const deletionLog = fetchedLogs.entries.first();
        if (!deletionLog) return;

        const { executor, target } = deletionLog;
        if (target.id === message.author.id) {
            const embed = new MessageEmbed()
                .setDescription(`🗑️ Message deleted in <#${message.channel.id}>`)
                .setColor("#b80202")
                .addFields(
                    { name: "Author:", value: `<@${message.author.id}>`, inline: true },
                    { name: "Deleted by:", value: `<#${executor.id}>`, inline: true }
                )
                .addField("Message", message.cleanContent, false);

            client.guilds.cache
                .get(set[client.user.username].guildId)
                .channels.cache.get(set[client.user.username].logChannel)
                .send({ embeds: [embed] });
        } else {
            const embed = new MessageEmbed()
                .setDescription(`🗑️ Message deleted in <#${message.channel.id}>`)
                .setColor("#b80202")
                .addField("Author:", `<@${message.author.id}>`)
                .addField("Message", message.cleanContent, false);

            client.guilds.cache
                .get(set[client.user.username].guildId)
                .channels.cache.get(set[client.user.username].logChannel)
                .send({ embeds: [embed] });
        }
    },
    LogEdit: async function (client, oldMessage, newMessage) {
        if (!oldMessage.author) return;
        var embed = new MessageEmbed()
            .setDescription(
                `✍️ edit in <#${newMessage.channel.id}> by <@${oldMessage.author.id}>\n\u200b\n${oldMessage.cleanContent}\n\u200b\n⬇️\n\u200b\n${newMessage.cleanContent}`
            )
            .setColor("#0091ff");

        client.guilds.cache
            .get(set[client.user.username].guildId)
            .channels.cache.get(set[client.user.username].logChannel)
            .send({ embeds: [embed] });
    },
    LogTimeout: async function (client, oldMember, newMember) {
        const fetchedLogs = await client.guilds.cache
            .get("707307751033798666")
            .fetchAuditLogs({
                limit: 1,
                type: "MEMBER_UPDATE",
            });

        const log = fetchedLogs.entries.first();
        if (!log) return;

        var timeDifference =
            newMember.communicationDisabledUntilTimestamp -
            new Date().getTime() +
            360;
        var differenceDate = new Date(timeDifference);
        var diffDays = differenceDate / (1000 * 3600 * 24);
        var diffMinutes = differenceDate.getUTCMinutes() + 1;

        const embed = new MessageEmbed()
            .setDescription(`**🔇for <@${newMember.user.id}> by <@${log.executor.id}>**`)
            .setColor("#878787");

        if (newMember.communicationDisabledUntilTimestamp != undefined) {
            if (diffDays < 0.8) embed.addField("Duration:", diffMinutes + " m", true);
            if (diffDays > 0.99 && diffDays < 5) {embed.addField("Duration:", "1 Day", true)}
            if (diffDays > 5) embed.addField("Duration:", "1 Week", true);
        } else {
            embed.setDescription(
                `**🔊 Timeout for <@${newMember.user.id}> was removed by <@${log.executor.id}>**`
            );
        }

        if (log.reason != null) { embed.addField("Reason:", log.reason, false)}

        client.guilds.cache
            .get(set[client.user.username].guildId)
            .channels.cache.get(set[client.user.username].logChannel)
            .send({ embeds: [embed] });
    },
    Mention: function(client, message) {
        try {
            if (message.content.toLowerCase().includes("nada") ||
                message.content.toLowerCase().includes("na_da") &&
                !message.content.toLowerCase().includes("canada")) {
                const embed = new MessageEmbed().setColor("#00c22a").setAuthor(`${message.author.username} mentioned you in ${message.channel.name}`, message.author.displayAvatarURL()).setDescription(`${message} \n [Link](${message.url})`)
                client.users.cache.get("338649491894829057").send({ embeds: [embed] });
            } else if (message.content.toLowerCase().includes("sendo")) {
                const embed = new MessageEmbed().setColor("#00c22a").setAuthor(`${message.author.username} mentioned you in ${message.channel.name}`, message.author.displayAvatarURL()).setDescription(`${message} \n [Link](${message.url})`)
                client.users.cache.get("119095000050040832").send({ embeds: [embed] });
            } else if (
                message.content.toLowerCase().includes("hasko") &&
                message.guildId != "387015404092129282" &&
                message.guildId != "421618914166833152" &&
                message.guildId != "707307751033798666" &&
                message.guildId != "424911215714631690") {
                const embed = new MessageEmbed().setColor("#00c22a").setAuthor(`${message.author.username} mentioned you in ${message.channel.name}`, message.author.displayAvatarURL()).setDescription(`${message} \n [Link](${message.url})`)
                client.users.cache.get("335528823615651842").send({ embeds: [embed] });
            }
        }
        catch (e) { console.log(message) }
    },
    SpreadsheetGET: async function (client) {
        const doc = new GoogleSpreadsheet(set[client.user.username].spreadsheetID);
        await doc.useServiceAccountAuth({
            client_email:
                process.env[`CLIENT_EMAIL_${client.user.username.toUpperCase()}`],
            private_key: process.env[
                `PRIVATE_KEY_${client.user.username.toUpperCase()}`
            ].replace(/\\n/g, "\n"),
        });
        await doc.loadInfo();
        return { doc };
    },
    SpreadsheetPOST: async function (client, tab, rowData) {
        const doc = new GoogleSpreadsheet(set[client.user.username].spreadsheetID);
        await doc.useServiceAccountAuth({
            client_email:
                process.env[`CLIENT_EMAIL_${client.user.username.toUpperCase()}`],
            private_key: process.env[
                `PRIVATE_KEY_${client.user.username.toUpperCase()}`
            ].replace(/\\n/g, "\n"),
        });
        await doc.loadInfo();
    },
};
