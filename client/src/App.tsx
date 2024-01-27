import React, { useEffect, useState } from "react";
import AddToDo from "./components/AddToDo.tsx";
import ToDoList from "./components/ToDoList.tsx";
import ToDo from "./components/types/ToDo";
import Router from "./routes/Router.tsx";

function App() {
	// render the components
	return (
		<>
			<Router />
		</>
	);
}

export default App;
