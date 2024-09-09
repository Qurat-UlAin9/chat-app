import mongoose from "mongoose";

const connecttoMongoDb = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("connected to MongoDb");
    } catch (error) {
        console.log("error connecting to MongoDb", error.message)
    };
}

export default connecttoMongoDb;