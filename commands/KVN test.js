module.exports = {
    name: "test",
    async execute(client, message, functions, args, set) {
        {
             if (client.user.username === "KVN") {
            const data = await functions.SpreadsheetGET(client);

            const sheet = data.doc.sheetsByTitle["Form responses 1"];
            const rows = await sheet.getRows();
            const cells = await sheet.loadCells('B2:D5')
           
          try {
               /* let userRow = rows.filter(row => row["Discord Username"] == message.author.tag);
                //console.log(userRow[0])

                userRow[0]["Test 31.03.2022"] = "1"
                await userRow[0].save();

                message.react("✅")
                message.author.send("I added you to our list. We will send out Oculus invitations about 30 minutes before the test. Don't forget to check our <#783287669613527041> if you run into any issues or ask for help in <#724969092506976286>! looking forward to see you in the Stadium")*/
              message.author.send("Hm. Sorry I can't sign you up right now. We have to wait until another test is announced! 👀")
            }
            catch (e) {
              /*  message.author.send("Looks like I have trouble finding your Confidentiality Agreement. 🤔 Did you maybe change your Discord tag (name#1234)? You can update it in your form submission and try again afterwards!")*/
            }
        }
        }
    }
};

//message.author.send("Hm. Sorry I can't sign you up right now. We have to wait until another test is announced! 👀")