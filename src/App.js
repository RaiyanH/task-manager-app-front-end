import "./App.css";
import Box from "@mui/material/Box";
import TaskManager from "./components/TaskManager";

function App() {
	return (
		<div className="App">
			<header className="titleHeader">
				<h1>Jumbo</h1>
				<h5>Manage your large tasks!</h5>
			</header>
			<header class="header"></header>
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
