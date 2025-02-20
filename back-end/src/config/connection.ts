import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectionString = process.env.TaskManagerAppURL || 'mongodb://localhost:27017/task-manager';

const connectDB= async()=>{
    try{
        await mongoose.connect(connectionString,{
            serverSelectionTimeoutMS: 7000,

        })
        console.log("DB connected",connectionString)
    }
    catch(error){
        console.log("DB connection error :" ,error)
process.exit(1);
    }
};

export  default connectDB