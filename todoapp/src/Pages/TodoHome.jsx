import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TodoLists from "../components/TodoLists";

export default function TodoHome() {
  const [Data, setData] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const Todos = await fetch("http://localhost:5000/api/todo");
      const Data = await Todos.json();
      console.log(Data);
      setData(Data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true, // Use 12-hour format
    };
    return date.toLocaleString("en-US", options);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log(todo);
    if (!todo) return;
    try {
      const res = await fetch("http://localhost:5000/api/todo/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchData();
        setTodo("");
      } else {
        console.log("error", data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mt-20 flex justify-center">
        <div className="bg-blue-400 p-8 rounded-t-lg shadow-lg max-w-md  w-full">
          <h2 className="text-center mb-3 font-semibold text-2xl">Add Todo</h2>
          <div className="flex gap-2 justify-center items-center ">
            <input
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="ENTER YOUR TODO LIST"
              className="border rounded border-black lg:p-2 p-1"
            />
            <div className="sm:text-sm">
              <button
                className="bg-blue-600 font-light p-3 rounded-md text-white hover:bg-blue-700"
                onClick={HandleSubmit}
              >
                Add to list
              </button>
            </div>
          </div>
        </div>
      </div>
      {Data.length === 0 ? (
        <h1 className="text-center mt-4 font-semibold text-1xl">
          Oops you got nothing in your TodoList😉🕷
        </h1>
      ) : (
        <TodoLists Data={Data} formatDate={formatDate} />
      )}
    </div>
  );
}
