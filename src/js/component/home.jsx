import React from "react";
import TodoList from "./todoList";

const Home = () => {
	return (
		<div className="todolist">
			<div className="contenttask">
				<h1>To Do list</h1>
				<div className="card">
					<TodoList/>
				</div>
			</div>
		</div>
	);
};

export default Home;
