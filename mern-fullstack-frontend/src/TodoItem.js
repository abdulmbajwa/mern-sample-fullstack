import classnames from "classnames";
export const TodoItem = ({ todo, index, deleteTodo, changeStatus }) => {
  const checked = todo.status === "complete";
  return (
    <div
      className={classnames("todo-item", {
        complete: todo.status === "complete",
      })}
    >
      <div className="checker">
        <span className="">
          <input
            type="checkbox"
            onChange={(e) => changeStatus(e, index)}
            checked={checked}
          />
        </span>
      </div>
      <span>{todo.text}</span>
      <button
        className="float-right remove-todo-item"
        onClick={() => deleteTodo(index)}
      >
        X
      </button>
    </div>
  );
};
