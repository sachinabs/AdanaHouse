const path = require('path');
exports.countForYes = function (req, res, MongoClient) {
    const user = req.params.user;
    const timeId = req.query.time;
    async function yesCount(client) {
        const cursor = await client.db("AdanaHouse").collection("ListOfItems").updateOne(
          { 
            Id : timeId
          }, 
          { $inc: 
            { 
                YesCount: 1 ,
            }
          }).then(
            res.sendFile(path.join(__dirname, '../show/show.html'))
          );
      }
      async function main() {
        const uri =
          "mongodb+srv://sachin:sachinabs@cluster0.iaz5f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        try {
          await client.connect();
          const pen = await yesCount(client, res);
        } catch (e) {
          console.error(e);
        } finally {
          await client.close();
        }
      }
      main().catch(console.error);
}