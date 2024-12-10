const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

// Replace <username>, <password>, and <dbname> with your actual MongoDB Atlas credentials and database name
const mongoURI = "mongodb+srv://shahbazghafil:wWysiM1YHXz4j9oh@cluster0.mndhz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI).then(() => {
    console.log("connected to MongoDB Atlas!");
}).catch((err) => {
    console.log(err);
});