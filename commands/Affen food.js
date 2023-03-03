const axios = require("axios");
const fs = require("fs");

module.exports = {
    name: "food",
    async execute(client, message, functions, args, set, MessageEmbed) {
        if (client.user.username === "Affen") {
            if (message.channel.id === "748184563800473673" || message.channel.type == "DM" || message.channel.id === "718176504437276682") {
            
            const cooldowns = new Map();
            const now = Date.now();
            const cooldownDuration = 12 * 60 * 60 * 1000;
            const cooldownKey = `${message.author.id}-${this.name}`;
            const cooldown = cooldowns.get(cooldownKey);
            if (cooldown && now < cooldown + cooldownDuration) {
                const remainingTime = cooldown + cooldownDuration - now;
                const remainingHours = Math.ceil(remainingTime / (60 * 60 * 1000));
                message.channel.send(`Nah, you had enough food for now 😤!`);
                return;
            }
            const foodItem = await axios.request({
                url: "https://www.reddit.com/r/foodporn.json",
                method: "get"
            })

            var randomNum = Math.floor(Math.random() * foodItem.data.data.dist);
            const image = foodItem.data.data.children[randomNum].data.url;
            const title = foodItem.data.data.children[randomNum].data.title;

            const embed = new MessageEmbed()
                .setColor("#edabea")
                .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL(), url: "https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Reddit-512.png" })
                .setTitle(title)
                .setImage(image)
                .setFooter({ text: "From r/FoodPorn", iconURL: "https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Reddit-512.png" })
                
                cooldowns.set(cooldownKey, now);
                message.channel.send({ embeds: [embed] })
               
            } else {
                message.channel.send("Wrong channel you noob. Use #incredible-edible.")
            };
            
        }
    }
}