import TODO_List from "../model/todmodel.js"

export const GetProduct=async(req,res)=>{
    try {
        const TodoDatas=await TODO_List.find()
        return res.status(200).send({success:true,data:TodoDatas})
    } catch (error) {
        return res.status(500).send({success:false,message:"Server not Responding on get methode"})
    }
}
export const PostTodo=async(req,res)=>{
    try {
        const Data=req.body.todo
        if(Data.length===0) return res.status(401).send({success:false,message:"Please Fill the todo"})
            const TodoData=new TODO_List({
                  todo:Data
            })
            await TodoData.save()
            return res.status(201).send({success:true,message:"successfully Added to Database"})
        
    } catch (error) {
        console.log(error);
        return res.status(501).send({success:false,message:"Server was error in posting"})
    }
    
}

export const DeletedProduct=async(req,res)=>{
    try {
        const {id}=req.params
        const DeletedItem=await TODO_List.deleteOne({_id:id})
        return res.status(200).send({success:true,message:"Deleted successfully"})
    } catch (error) {
        console.log(error);
        return res.status(501).send({success:false,message:"server Error on delete"})
    }
}

export const EditedProduct=async(req,res)=>{
    try {
        const {id}=req.params
        const todo=req.body.todo
        if(!todo)return res.status(401).send({success:false,message:"Cant find todo"})

        const UpdatedTodo=await TODO_List.findByIdAndUpdate(
            id,               //id of the todo
            {todo},            //new body
            {new:true}      //edited 
        )

         if(!UpdatedTodo){
             return res.status(401).send({success:false,message:"server error"})
         }
         return res.status(200).send({ success: true, data: UpdatedTodo, message: "Todo updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(501).send({success:false,message:"server on Error"}) 
    }
}