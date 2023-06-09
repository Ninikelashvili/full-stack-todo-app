import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TodoForm from "../components/TodoForm";
import { Spinner } from "../components/Spinner";
import { getTodos, reset } from "../features/todos/todoSlice";
import { TodoItem } from "../components/TodoItem";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { todos, isLoading, isError, message } = useSelector(
    (state) => state.todos
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }

    dispatch(getTodos());

    return () => {
      dispatch(reset());
    };
  }, [user, dispatch, navigate]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section>
        <h1>Welcome {user && user.name}</h1>
        {/* <p>Todos Dashboard</p> */}
      </section>

      <TodoForm />

      <section>
        {todos.length > 0 ? (
          <div>
            {todos?.map((todo) => (
              <TodoItem key={todo._id} todo={todo} />
            ))}
          </div>
        ) : (
          <h3>No Todos</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
