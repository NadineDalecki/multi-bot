console.log("NodeJS Version: " + process.version);
const express = require("express")
const app = express()
app.get("/", (request, response) => {
    response.sendStatus(200)
})
app.listen()

const { Client, Intents, MessageEmbed } = require('discord.js');
const ReactionsAdd = require("./reactionsAdd.js")
const ReactionsRemove = require("./reactionsRemove.js")
const set = require("./settings.json")
const functions = require("./functions.js")
const giphy = require("giphy-api")(process.env.GIPHY)
const schedule = require("node-schedule")

const BotTokens = [process.env.BOT_CASTER, process.env.BOT_MEL, process.env.BOT_AFFEN, process.env.BOT_ITSY, process.env.BOT_KVN, process.env.BOT_TG, process.env.BOT_IGLE, process.env.BOT_HERMES, process.env.BOT_EWAN]

for (const token of BotTokens) {
    runBot(token);
}

function runBot(token) {
    const client = new Client({
        partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER'],
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        ],
        clientOptions: {
            fetchAllMembers: true,
        },
    });

    client.on('error', console.log);
    process.on('error', console.log);
    process.on('uncaughtException', console.log);
    process.on('unhandledRejection', console.log);

    // READY UP =====================================

    const { username } = client.user;
    const {
        status,
        activity: { name, url, type },
    } = set[username];

    client.once('ready', () => {
        client.user.setPresence({ status, activities: [{ name, url, type }] });
        console.log(`${username} Ready!`);
    });

    client.login(token)



    // LOGS =====================================

    client.on('messageDelete', async (message) => {if (set[username].logDel) {functions.LogDelete(client, message);}});
    client.on('messageUpdate', (oldMessage, newMessage) => { if (set[username].logEdit == true) { functions.LogEdit(client, oldMessage, newMessage) } })
    client.on("guildMemberUpdate", async (oldMember, newMember) => { if (set[username].logTimeout == true) { functions.LogTimeout(client, oldMember, newMember) } });
    client.on('guildMemberAdd', async (member) => { if (set[username].logInvite == true) { functions.LogInvite(member) } });

    // Daily GIF TG Server =====================================
    const rule = new schedule.RecurrenceRule()
    rule.hour = 8
    rule.minute = 1

    const job = schedule.scheduleJob(rule, async function () {
        if (client.user.username === "TG Bot")
            giphy.trending(
                { limit: 1, rating: "g", fmt: "json" },
                function (err, res) {
                    client.channels.cache.get("563382017505361940").send(res.data[0].url)
                }
            )
        if (client.user.username === "Affen") {
            client.channels.cache.get("803779196374482964").send("!update_all")
        }
    })

    // REACTIONS =====================================
    client.on("messageReactionAdd", async (reaction, user) => {
        if (ReactionsAdd[client.user.username]) {
            ReactionsAdd[client.user.username](reaction, client, user, set, MessageEmbed)
        }
    })
    client.on("messageReactionRemove", async (reaction, user) => {
        if (ReactionsRemove[client.user.username]) {
            ReactionsRemove[client.user.username](reaction, client, user, set, MessageEmbed)
        }
    })

    // MESSAGE =====================================
    client.on("messageCreate", async message => {

        if (client.user.id === "1066447990354608319") {
            if (message.author.id === "931899028734627860" && message.cleanContent.includes("Mixed")) {

                let user = message.mentions.users.first();
                let mes = message.cleanContent.split(" ").slice(0, -3).join(' ')

                const scrimEmbed = new MessageEmbed()
                    .setColor(0xffffff)
                    .setDescription(`<@${user.id}> (${user.tag}) | ${mes} | [link](${message.url})`)

                client.guilds.cache
                    .get(set[client.user.username].guildId)
                    .channels.cache.get("1063239976474656898")
                    .send("<@&1066622549498269766>");

                client.guilds.cache
                    .get(set[client.user.username].guildId)
                    .channels.cache.get("1063239976474656898")
                    .send({ embeds: [scrimEmbed] });
            }
        }

        if ((client.user.id != message.author.id && !message.author.bot) &&
            !(message.content.includes("@here") || message.content.includes("@everyone"))) {
            if (message.content.startsWith(set[client.user.username].prefix)) {
                functions.Command(client, message, functions, set, MessageEmbed)
            }

            else if (message.cleanContent.length < 255) {
                functions.DialogflowIntents(client, message, functions, set)
            }
        }
    })
}