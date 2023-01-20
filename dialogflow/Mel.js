module.exports = {
    name: "Mel",
    execute: async function(client, message, functions, set, MessageEmbed) {

        if (message.channel.type == "DM" ||
            message.mentions.has(client.user.id) ||
            message.cleanContent.startsWith(client.user.username + " ") ||
            message.cleanContent.startsWith(client.user.username.toLowerCase() + " ")) {
                const answer = await functions.DialogflowQuery(client, message.cleanContent, message);
            const data = await functions.SpreadsheetGET(client);

            //=========================================================================================================
            if (
                message.channel.type == "DM" ||
                !message.member.roles.cache.has("748631446217818123")
            ) {
                //=========================================================================================================
                if (answer.intent.substring(0, 5) === "embed") {
                    const rows = await data.doc.sheetsByTitle["Embeds"].getRows();
                    let embed = rows.filter(row => row.name == answer.intent);
                    const finalEmbed = functions.EmbedBuilder(embed);
                    message.reply({ embeds: [finalEmbed] });
                }
                //=========================================================================================================
                else if (
                    answer.intent === "Sign Language" &&
                    (message.channel.id == "328962843800109067" ||
                        message.channel.type == "DM")
                ) {
                    const signName = answer.result[0].queryResult.parameters.fields.sign.stringValue.toLowerCase();
                    const rows = await data.doc.sheetsByTitle["ESL"].getRows();
                    try {
                        let embed = rows.filter(
                            row => row.name.toLowerCase().includes(signName)
                        );
                        message.channel.send(embed[0].url);
                    } catch (e) {
                        message.reply("Sorry I could not find a sign for it!");
                    }
                }
                //=========================================================================================================
                else if (answer.intent === "Invite | ?") {
                    const rows = await data.doc.sheetsByTitle["Server Links"].getRows();
                    const serverName =
                        answer.result[0].queryResult.parameters.fields["discord-server"]
                            .stringValue;
                    try {
                        let server = rows.filter(row => row.server == serverName);
                        message.reply(server[0].description);
                    } catch (e) {
                        console.log(e);
                    }
                }
                //=========================================================================================================
                else if (
                    answer.intent === "Sign Commands" &&
                    (message.channel.id == "328962843800109067" ||
                        message.channel.type == "DM")
                ) {
                    const rows = await data.doc.sheetsByTitle["ESL"].getRows();
                    const commands = rows.map(commands => `${commands.name}`);
                    const embed = new MessageEmbed().setDescription(
                        commands.join(" | ")
                    );
                    message.channel.send({ embeds: [embed] });
                }
                //=========================================================================================================
                else if (answer.intent === "Spam | Spoon") {
                    message.react("754602236163915788");
                }
                //=========================================================================================================
                else if (answer.intent.substring(0, 4) === "Spam") {
                    const allowedChannels = ["328962843800109067", "688765312023396374"]; //bot channel, meme channel
                    if (
                        allowedChannels.includes(message.channel.id) ||
                        message.channel.type == "DM"
                    ) {
                        message.reply(answer.response);
                    } else {
                        message.reply(
                            "Try that again in the <#328962843800109067> or in a DM!"
                        );
                    }
                }
                //=========================================================================================================
                else if (answer.intent === "Meme") {
                    if (
                        message.channel.id == "333796567746084864" ||
                        message.channel.type == "DM"
                    ) {

                        const rows = await data.doc.sheetsByTitle["Memes"].getRows();
                        const meme =
                            rows[Math.floor(Math.random() * rows.length)].meme;
                        message.channel.send(meme);
                    } else {
                        message.reply(
                            "Try that again in the <#333796567746084864> or in a DM!"
                        );
                    }
                }
                //=========================================================================================================
                else if (message.channel.id !== "333796567746084864") {
                    message.reply(answer.response);
                }
            }
        }
        // MENTIONS ==========================================================
        else if (!message.author.bot) {
            if (message.channel.type != "dm") {
                    functions.Mention(client, message)   
            }
        }
    }
};