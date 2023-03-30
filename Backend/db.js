const  mongoose = require ('mongoose')

// const database = process.env.DATABASE
// const mongoUrl = `${database}`

// const mongoUrl = "mongodb://127.0.0.1:27017/inotebook"
const mongoUrl = "mongodb+srv://basantgoswami7050:Goswami99$@cluster0.d2vyv8e.mongodb.net/inotebook?retryWrites=true&w=majority"

mongoose.set('strictQuery', true);

async function connectToMongo() {
  await mongoose.connect(mongoUrl , () => {
    try{
        console.log("connection successfully");
    } catch(err) {
        console.log(err);
    }
  });
}

module.exports = connectToMongo 