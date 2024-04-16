import "./App.css";
import Box from "@mui/material/Box";
import TaskManager from "./components/TaskManager";
import SearchAppBar from "./components/NavBar";

function App() {
	return (
		<div className="App">
			<SearchAppBar></SearchAppBar>
			<Box
				sx={{
					minHeight: "100vh", // Ensures form fills viewport height
				}}
			>
				<TaskManager />
			</Box>
		</div>
	);
}

export default App;
