exports.counts = function (req, res, MongoClient) {
    const data = req.query.Date;
    async function yesCount(client) {
        const cursor = await client.db("AdanaHouse").collection("ListOfItems").find({ "Date": data });
        const results = await cursor.toArray();
        res.json(results);
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