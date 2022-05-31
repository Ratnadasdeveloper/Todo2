import React from "react";
import axios, { useEffect, useState } from "react";

const Todos = () => {
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/todos?_page=${page}&_limit=5`)
      .then((r) => {
        setTodos(r.data);
        setTotalCount(Number(r.headers["x-total-count"]));
      });
  }, [page]);
  return (
    <div className="App">
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.id} {`:`} {todo.value}
        </div>
      ))}
      <button
        disabled={page <= 1}
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);
          }
        }}
      >
        {" "}
        {`<`}{" "}
      </button>

      <button onClick={() => setPage(page + 1)}> {">"}</button>
    </div>
  );
};

export default Todos;
