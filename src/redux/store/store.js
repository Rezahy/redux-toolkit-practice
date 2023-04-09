import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import cocktailReducer, {
	fetchCocktails,
	fetchSearchCocktails,
} from "../features/slice/cocktailSlice";

export const store = configureStore({
	reducer: {
		app: cocktailReducer,
	},
	middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
});
// listener for actions
const unsubscribe = store.subscribe(() =>
	console.log("store subscribed", store.getState())
);
// unsubscribe();
// const initialFetch = async () => {
// 	const result = await store.dispatch(fetchCocktails()).unwrap();
// 	console.log(`result ${result}`);
// 	const result2 = await store
// 		.dispatch(fetchSearchCocktails({ searchText: "ab" }))
// 		.unwrap();
// 	console.log(result2);
// };

// initialFetch();
