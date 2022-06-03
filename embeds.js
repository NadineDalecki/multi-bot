const { MessageEmbed } = require('discord.js');

module.exports = {
    Wel_EU: function () {
        const embed = new MessageEmbed()
            .setColor("#50d0d9")
            .setAuthor("Echo Arena Discord Europe")
            .setDescription("⚠️ EU players only. We kick everybody else!\n\u200b\n")
            .addField(
                "RAD/Echo",
                "[Echo Games Discord](https://discord.echo.games/)\n[RAD Media Files](https://readyatdawn.sharefile.com/share/view/sbcabc88d34842d1b)\n[Echo Font](https://www.1001fonts.com/conthrax-font.html)",
                true
            )
            .addField(
                "VRML",
                "[Discord](https://discord.com/invite/SBb628eJuQ)\n[Website](https://vrmasterleague.com/EchoArena/)\n[Rules](https://vrmasterleague.com/EchoArena/Rules/)\n[Twitch](https://www.twitch.tv/EchoArena_VRML)",
                true
            )
            .addField(
                "Roles",
                "Ask <@717431243662295150> for a role! Start your sentence with Affen and just ask for the role in a somewhat understandable sentence.\n*For example: Affen give me the god damn Looking for team role*\n\n<@&509787093208399872> Tag this role if you need a substitute for a scrim or want to start a mixed scrim.\n\n<@&869856554126565377> Keen for a 1 vs 1? Ask Affen for a fight!\n\n<@&549925842646597651> Need a team? Assign yourself this role by reacting to the embed below.\n\nAll VRML team roles and the <@&533053644774572043> role are assigned automatically by <@!803768260511662080>\n\u200b\n",
                false
            )
            .addField(
                "Trusted",
                "To be able to **create invites to the server** you need the <@&605396047275098142> role. Once another trusted member can confirm that you are from EU and are trustworthy we eventually assign the role.\n\u200b\n"
            )
            .addField(
                "Rules",
                "1️⃣ Follow the [Discord TOS](https://discord.com/terms)\n2️⃣ This is a **private** server. You NEVER share anything you read or see here.\n3️⃣ We hate **spam**. If you have a sudden urge go to <#779820405644197888>.\n4️⃣ **Scrims** are for learning, improving and having fun together. Help each other so that we may finally beat NA when another lan happens...  If you violate our Scrim-Rules in #scrims-info expect punishments or losing access to scrim channels.\n\n *All rule violations are punished depending on severity. Expect a warning, mute, kick or ban. If you are unsure if something violates these rules, ask BEFORE you do it/post it.*"
            );
        return embed
    },
    Wel_TG: function () {
        const embed = new MessageEmbed()
            .setColor("#51c3e7")
            .setDescription(
                "Stay up to date with the latest events and competitions and meet our teams! On the left you can find all of the channels, please join the ones you're interested in and have a great time!\n\u200b\n"
            )
            .addField(
                "RULES",
                "1. Use correct channels specific to your needs and region.\n2. Not tolerated: Spamming, name calling, harassing or threatening.\n3. Respect our staff and their decisions.\n4. Do not post links to malicious content.\n5. Do not advertise/promote content without permission.\n6. Impersonating others, especially staff or admins is not allowed.\n7. Our staff reserves the right to kick or ban a person.\n"
            )
            .addField(
                "\u200b",
                "*For more info check <#469509206840705024> and <#563392406741975081> after selecting a role.* \n\u200b\n"
            )
            .addField(
                "OUR TEAM",
                "<@&636249397205663764> \n<@221986262247145472> lives in his own timezone so be patient when asking him something. Otherwise a nice guy.\n\n<@&421641048155226113> \n<@338649491894829057> and <@102149885091921920> (the weird germans) keep the server in order.\n\n <@&748528192909869192> \nOur players and team members, you can usually find them lurking around in their respective game channels!\n\u200b\n"
            )
            .addField(
                "HELPFUL LINKS",
                "[Website](https://www.teamgravityvr.com/)\n[Twitter](https://twitter.com/TeamGravityVR)\n\u200b\n",
                true
            )
            .addField(
                "\u200b",
                "[Instagram](https://www.instagram.com/teamgravityvr/)\n[Facebook](https://www.facebook.com/teamgravityvr)\n\u200B\n",
                true
            )
            .addField(
                "\u200b",
                "[Twitch](https://www.twitch.tv/teamgravityvr)\n[Youtube](https://www.youtube.com/channel/UCpVwAuE6Ul63MTJAhI0DbRg)\n\u200B\n",
                true
            )
            .addField(
                "SELECT ROLES",
                "Please react with an emoji to get gain access to the game channels you are interested in. \n\n <:arena:748466627942809710> | **Echo Arena**\n <:combat:748466627854729276> | **Echo Combat** \n<:towertag:748467374105165826> | **Tower Tag** \n<:beatsaber:748466702244642926> | **Beat Saber** \n<:pistolwhip:748466627527442473> | **Pistol Whip** \n<:larcenauts:856471250133188659> | **Larcenauts**\n<:gravity:744481770296311848> | **Gravitons** - *Just some cool role...*"
            )
        return embed
    },
    WC_Regions_Img: function () {
        const embed = new MessageEmbed().setImage(
            "https://cdn.discordapp.com/attachments/861927079741095976/873138673187696720/European_Regions.png"
        );
        return embed
    },
    WC_Regions: function () {
        const embed = new MessageEmbed()
            .setColor("#0d171a")
            .setAuthor("Participation Countries and Regions")
            .setURL("https://en.wikipedia.org/wiki/Europe")
            .setDescription(
                "Your country will be determined by where you are physically located when playing.\nPer region a maximum of 13 teams will be able to participate. If a region will have more than 13 teams it will be split further!"
            )
            .addField(
                "DACH",
                "Germany\nAustria\nSwitzerland\nLiechtenstein",
                true
            )
            .addField(
                "East Europe",
                "Russia\nArmenia\nAzerbaijan\nGeorgia",
                true
            )
            .addField(
                "British Islands excluding England",
                "Ireland\nWales\nScotland\nNothern Ireland",
                true
            )
            .addField(
                "Benelux",
                "Belgium\nNetherlands\nLuxemburg",
                true
            )
            .addField(
                "England",
                "England",
                true
            )
            .addField(
                "France",
                "France",
                true
            )
            .addField(
                "Southern Europe",
                "Greece\nAndorra\nGibraltar\nItaly\nMalta\nMonaco\nPortugal\nSan Marino\nSpain\nVatican City",
                true
            )
            .addField(
                "Central East",
                "Estonia\nLatvia\nLithuania\nBelarus\nUkraine\nCzech Republic\nPoland",
                true
            )
            .addField(
                "Nordics",
                "Denmark\nFinland\nNorway\nSweden\nIceland",
                true
            )
            .addField(
                "South East Europe",
                "Albania\nBosnia and Herzegovina\nBulgaria\nCroatia\nCyprus\nHungary\nMoldova\nMontenegro\nNorth Macedonia\nRomania\nSerbia\nSlovakia\nSlovenia\nTurkey",
                true
            )
        return embed
            }
}