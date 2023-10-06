import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  try {
    const mogoURL = process.env.MOGODBCONNECTIONSRRING;
    const connection = await mongoose.connect(mogoURL);
    console.log("Connection to the mongoDB");
    return connection;
  } catch (error) {
    console.log(error, "error");
  }
};
export default connectDB;
