const  mongoose = require ('mongoose')
const mongoUrl = "mongodb://127.0.0.1:27017/inotebook"

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