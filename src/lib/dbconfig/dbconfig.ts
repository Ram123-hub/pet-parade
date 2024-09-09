import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!,{
      serverSelectionTimeoutMS: 50000
    });
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Mongo db connected successfully");
    });
    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDb is running." + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("something goes wrong");
    console.log(error);
  }
}
