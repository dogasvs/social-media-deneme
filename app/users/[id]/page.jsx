import Back from "@/svgs/back/page";
import Link from "next/link";

export default async function UsersDetail({ params }) {
  const { id } = params;
  const user = await fetch(`https://dummyjson.com/users/${id}`).then(res => res.json());
  const res = await fetch(`https://dummyjson.com/users/${id}/todos`);
  const usersTodos = await res.json();

  const completedTodos = usersTodos.todos.filter(todo => todo.completed);
  const incompleteTodos = usersTodos.todos.filter(todo => !todo.completed);

  return (
    <div className="usersDetail">
      <Link href={"/"} className="backLink"> <Back /> </Link>

      <div className="usersDetailImportInfo">
        <img src="/background.png" alt="Background Image" />
        <img
          src={user.gender === "female" ? "/female.png" : "/man.png"}
          alt={`${user.firstName}'s profile image`}
          className="detailProfileImage"
        />
      </div>

      <div className="userDetailInfo">
          <h3> {user.firstName} {user.lastName} <span className="username">@{user.username}</span> </h3>
          <p className="email">{user.email}</p>
          <p><strong>University: </strong>{user.university}</p>
          <p><strong>Position: </strong>{user.company.title}</p>
      </div>

      <div className="todosContainer">
        {usersTodos.todos.length > 0 && (
          <div className="allTodos">
            <h2>TODOS</h2>
            {usersTodos.todos.map(x => (
              <div className="userDetailTodo" key={x.id}>
                <p>{x.todo}</p>
              </div>
            ))}
          </div>
        )}

        {completedTodos.length > 0 && (
          <div className="completedTodos">
            <h2>Completed</h2>
            {completedTodos.map(x => (
              <div className="userDetailTodo" key={x.id}>
                <p>{x.todo}</p>
              </div>
            ))}
          </div>
        )}

        {incompleteTodos.length > 0 && (
          <div className="incompleteTodos">
            <h2>Incomplete</h2>
            {incompleteTodos.map(x => (
              <div className="userDetailTodo" key={x.id}>
                <p>{x.todo}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
