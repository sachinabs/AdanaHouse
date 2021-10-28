
exports.addMenuItems = function (req, res, MongoClient,nodemailer) {
    const menuItems = req.query.menuItems;
    const time = req.query.time;
    const date = req.query.date;
    let ListOfMenuItems = menuItems.split(",");
    console.log("menu Items --->>", ListOfMenuItems)


    function makeId(length) {
        var result = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }

    let menuData = {
        'Id' : makeId(6),
        'Dish': ListOfMenuItems,
        'Date': date,
        'Time': time,
        'YesCount': 0,
        'NoCount': 0,
    }

    async function createListing(client, data_menu, response) {
        const result = await client
            .db("AdanaHouse")
            .collection("ListOfItems")
            .insertOne(data_menu);

        if (result.acknowledged === true) {
            console.warn("Menus added successfully --- <<");
            res.send(
                "<script>alert('Menus Added successfully'); </script>"
            );
        } else {
            console.log("Data Not Inserted");
            response.json({ status: false });
        }
    }
    async function main() {
        const uri =
            "mongodb+srv://sachin:sachinabs@cluster0.iaz5f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

        const client = new MongoClient(uri);

        try {
            await client.connect();
            const pen = await createListing(client, menuData, res);
        } catch (e) {
            console.log("test");
            console.error(e);
        } finally {
            await client.close();
        }
    }
    main().catch(console.error);


// Mail send Process here

    let liMenu = new Array;
    ListOfMenuItems.forEach((element,index) => {
        liMenu[index] = "<li>"+element +"</li>";
    });
   let liMenuToMailer = liMenu.toString().replace(/,/g,' ');

   
    console.log("Into mail ---<< ",liMenuToMailer);
// -----


    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'anishbalasachin13@gmail.com',
            pass: "jipsxicjskholjay",
        },
    })

    var reservers = {
        user: ["anishbalasachin13@gmail.com","jeya270199@gmail.com","navaneethstar1998@gmail.com"]
    }


    for(let i = 0 ; i<reservers.user.length;i++)
    {
        function SendMail() {
            transporter.sendMail({
                from: `"Anish"  <anishbalasachin13@gmail.com>`,
                to: reservers.user[i],
                subject: "Adana House testing --> 1.008",
    
                html: "  <h1> <center> Did you need food for "+ menuData.Time +" ??? </h1> <h4>Menu for ("+ menuData.Date +")</h4>  <ul> "+ liMenuToMailer +"  </ul>  <a href='http://localhost:1011/yes/"+ reservers.user[i] +"?time="+ menuData.Id +"'> YES I WANT </a> ---||--- <a href='http://localhost:1011/no/"+ reservers.user[i] +"?time="+ menuData.Id +"'> NO I DONT WANT </a> "
    
            }).then(console.log("Mail sended to ---<<",reservers.user[i])).catch(e =>console.log(e));
        }
    
        SendMail();
    }
}



