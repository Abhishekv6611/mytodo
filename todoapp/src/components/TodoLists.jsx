import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function TodoLists({ Data, formatDate }) {
  return (
    <div>
      {Data.map((item) => (
        <div key={item._id} className="flex justify-center items-center">
          <div className=" bg-slate-400 hover:bg-slate-500 cursor-pointer shadow-sm max-w-md w-full text-center mt-1 p-3 rounded-lg">
            <div className="flex justify-between">
            <div className="bg-red-500 max-w-7 p-1 rounded-lg flex justify-center items-center hover:bg-red-600">
             <MdDelete  className=" rounded-sm  text-white"/> 
            </div>
            <p className="mb-1 font-light text-sm text-center">
              {formatDate(item.CreatedAt)}
            </p>
            <div className="bg-green-500 max-w-7 p-1 rounded-lg flex justify-center items-center hover:bg-green-600">
             <FaEdit  className=" rounded-sm  text-white"/> 
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
