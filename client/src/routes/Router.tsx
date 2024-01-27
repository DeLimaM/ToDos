import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ToDoList from "../components/ToDoList.tsx";
import AddToDo from "../components/AddToDo.tsx";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<ToDoList />} />
				<Route path="/add" element={<AddToDo />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
