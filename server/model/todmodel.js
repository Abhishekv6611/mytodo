import mongoose from 'mongoose';

const TodSchema=new mongoose.Schema({
    todo:{
        type:String,
        require:true,
    },
    CreatedAt:{
        type:Date,
        default:Date.now
    }
})
const TODO_List=mongoose.model('MYTODO',TodSchema)
export default TODO_List
