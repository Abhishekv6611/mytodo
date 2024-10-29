import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const ConnectDB= async()=>{
    try {
         const DB=await mongoose.connect(process.env.MONGODB_URL)
         console.log(`mongoose connected to :${DB.connection.host}`);     
    } catch (error) {
        console.log(`ERROR :${error.message}`);
    }
}