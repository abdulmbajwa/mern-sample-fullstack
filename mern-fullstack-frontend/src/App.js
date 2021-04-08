import { useEffect, useState } from "react";
import { TodoItem } from "./TodoItem";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch("todos", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      setTodos(await response.json());
    };
    getTodos();
  }, []);
  const createTodo = async () => {
    if (todoText === "") {
      alert("Todo text is empty!");
      return;
    }
    const todo = { text: todoText, status: "active" }
    todos.push(todo);
    const response = await createRequest(todo);
    if(response.ok){
      setTodos([...todos]);      
    }
    else{
      alert("Something wront with API");
    }
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      createTodo();
      return false;
    }
    return true;
  };
  const removeFromTodo = async (index) => {
    const todo = todos[index];
    todos.splice(index, 1);
    const response = await deleteRequest(todo);
    if(response.ok){
      setTodos([...todos]);      
    }
    else{
      alert("Something wront with API");
    }

  };
  const updateRequest = async (todo) => {
    const response = await fetch("todos", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(todo),
    });
    return response;
  };
  const createRequest =  async (todo) => {
    const response = await fetch("todos", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(todo),
    });
    return response;
  };
  const deleteRequest =  async (todo) => {
    const response = await fetch("todos", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify(todo),
    });
    return response;
  }
  const changeStatus = async (e, index) => {
    if (e.target.checked) {
      const todo = todos[index];
      todo.status = "complete";
      const response = await updateRequest(todo);
      if (response.ok) {
        setTodos([...todos]);
      } else {
        alert("Something went wrong with API!");
      }
    } else {
      const todo = todos[index];
      todo.status = "active";
      const response = await updateRequest(todo);
      if (response.ok) {
        setTodos([...todos]);
      }
    }
  };
  const filterTodos = (item) => {
    if (filter === "all") {
      return true;
    }
    if (filter === "completed") {
      if (item.status === "complete") {
        return true;
      }
      return false;
    }
    if (filter === "active") {
      if (item.status === "active") {
        return true;
      }
    }
    return false;
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card card-white">
            <div className="card-body">
              <input
                type="text"
                className="form-control add-task"
                placeholder="New Todo..."
                value={todoText}
                onKeyDown={handleKeyDown}
                onChange={(e) => setTodoText(e.target.value)}
              />
              <ul className="nav nav-pills todo-nav">
                <li role="presentation" className="nav-item all-task active">
                  <a
                    href="#"
                    className="nav-link"
                    onClick={(e) => setFilter("all")}
                  >
                    All
                  </a>
                </li>
                <li role="presentation" className="nav-item active-task">
                  <a
                    href="#"
                    className="nav-link"
                    onClick={(e) => setFilter("active")}
                  >
                    Active
                  </a>
                </li>
                <li role="presentation" className="nav-item completed-task">
                  <a
                    href="#"
                    className="nav-link"
                    onClick={(e) => setFilter("completed")}
                  >
                    Completed
                  </a>
                </li>
              </ul>
              <div className="todo-list">
                {todos.filter(filterTodos).map((item, index) => (
                  <TodoItem
                    key={index}
                    todo={item}
                    index={index}
                    deleteTodo={removeFromTodo}
                    changeStatus={changeStatus}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
