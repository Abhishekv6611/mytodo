import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function TodoLists(Data,formatDate) {
  const [edit,setEdit]=useState(null)
  const [editText, setEditText] = useState("");

  const[data,setData]=useState(Data)
   console.log('data',data);

useEffect(()=>{
  setData(Data)
},[Data])
   
   
  const handleDelete=async(id)=>{
    try {
      const res=await fetch(`http://localhost:5000/api/todo/delete/${id}`,{
       method:"DELETE",
      })
      const DeleteItem=await res.json()
      if(DeleteItem.success){
        setData((prevData) => prevData.filter((item) => item._id !== id));
     
      }else{
        console.log('error deleting item',DeleteItem.message);     
      }
  } catch (error) {
   console.log(error);
  }
   }


const handleEdit=(item)=>{
    setEdit(item._id)
    setEditText(item.todo)
}

const handleEditSubmit=async()=>{
  if(!edit) return
  try {
    const res=await fetch(`http://localhost:5000/api/todo/edit/${edit}`,{
     method:"PUT",
     headers:{
       "Content-Type":"application/json"
     },
     body:JSON.stringify({todo:editText}) 
    })
    const EditedTodo=await res.json()
    
    if(EditedTodo.success){
     setData((prevData)=>prevData.map((item)=>item._id==edit?{...item,todo:editText}:item))
     setEdit(null)
     setEditText('')
    }else{
     console.log('error in editing');
    }

} catch (error) {
  console.log(error);
}
}

  return (
    <div>
      {edit && (
        <div className="flex justify-center items-center my-4">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Edit todo"
            className="border p-2 rounded mr-2"
          />
          <button
            onClick={handleEditSubmit}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={() => {
              setEdit(null);
              setEditText("");
            }}
            className="bg-gray-500 text-white px-3 py-1 ml-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      )}

      {data.map((item) => (
        <div key={item._id} className="flex justify-center items-center">
          <div className=" bg-slate-400 hover:bg-slate-500 cursor-pointer shadow-sm max-w-md w-full text-center mt-1 p-3 rounded-lg">
            <div className="flex justify-between">
            <div onClick={()=>handleDelete(item._id)} className="bg-red-500 max-w-7 p-1 rounded-lg flex justify-center items-center hover:bg-red-600">
             <MdDelete  className=" rounded-sm  text-white"/> 
            </div>
            <p className="mb-1 font-light text-sm text-center">
              {formatDate(item.CreatedAt)}
            </p>
            <div className="bg-green-500 max-w-7 p-1 rounded-lg flex justify-center items-center hover:bg-green-600">
             <FaEdit onClick={()=>handleEdit(item)}  className="rounded-sm  text-white"/> 
            </div>
            </div>
            <ul className="relative">
              <li>{item.todo}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
