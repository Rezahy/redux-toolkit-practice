import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import SingleCocktail from "./pages/SingleCocktail";
import { useEffect } from "react";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/cocktail/:id" element={<SingleCocktail />} />
				<Route
					path="*"
					element={
						<h1 className="h-screen w-full flex justify-center items-center text-3xl bg-gray-100 ">
							page not found!
						</h1>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
