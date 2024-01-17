
const mongoose = require("mongoose");

function mongoConnect() {
    const uri = "mongodb+srv://mydatabase:mydatabase@eyobdb.ea7lwku.mongodb.net/?retryWrites=true&w=majority";
    async function connect() {
        try {
            await mongoose.connect(uri);
            console.log("connected.....");
        } catch (error) {
            console.log(error);
        }
    }
    connect();
}

module.exports=mongoConnect;