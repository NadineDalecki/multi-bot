const axios = require("axios");
const fs = require("fs");

module.exports = {
    name: "food",
    async execute(client, message, functions, args, set, MessageEmbed) {
        if (client.user.username === "Affen") {

            const lastUsage = getLastUsage();

            // Check if the command was used within the last 24 hours
            if (lastUsage && Date.now() - lastUsage < 24 * 60 * 60 * 1000) {
            const remainingTime = new Date(lastUsage + 24 * 60 * 60 * 1000 - Date.now());
            const remainingHours = Math.floor(remainingTime / (60 * 60 * 1000));
            const remainingMinutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));

            message.reply(`Nah, you had enough food for today 😤`);
            return;
            }

            // Update the last usage timestamp
            updateLastUsage();

            const foodItem = await axios.request({
                url: "https://www.reddit.com/r/foodporn.json",
                method: "get"
            })

            var randomNum = Math.floor(Math.random() * foodItem.data.data.dist);
            const image = foodItem.data.data.children[randomNum].data.url;
            const title = foodItem.data.data.children[randomNum].data.title;

            const embed = new MessageEmbed()
                .setColor("#edabea")
                .setAuthor({name: message.author.username, iconURL: message.author.avatarURL(), url:"https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Reddit-512.png"})
                .setTitle(title)
                .setImage(image)
                .setFooter({text: "From r/FoodPorn", iconURL: "https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Reddit-512.png"})

            if (message.channel.id === "748184563800473673" || message.channel.type == "DM" || message.channel.id === "718176504437276682") {
                message.channel.send({ embeds: [embed] })
            } else {
                message.channel.send("Wrong channel you noob. Use #incredible-edible.")
            };
        } else {
            message.channel.send({ embeds: [embed] })
        };

        function getLastUsage() {
            try {
              const lastUsage = fs.readFileSync("./lastUsage.txt", "utf8");
              return parseInt(lastUsage);
            } catch (err) {
              return null;
            }
          }
          
          function updateLastUsage() {
            const timestamp = Date.now().toString();
            fs.writeFileSync("./lastUsage.txt", timestamp, "utf8");
          }

    }
}