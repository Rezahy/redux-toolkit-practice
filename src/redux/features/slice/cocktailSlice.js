import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchCocktails = createAsyncThunk(
	"cocktails/fetchCocktails",
	async (data, { rejectWithValue }) => {
		// try {
		// 	const response = await fetch(
		// 		"https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
		// 	);
		// 	console.log(response);
		// 	return response.json();
		// } catch (error) {
		// 	console.log(error.message);
		// 	return rejectWithValue(error.message);
		// }
		return fetch(
			"https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
		).then((res) => res.json());
	}
);
export const fetchSingleCocktail = createAsyncThunk(
	"cocktails/fetchSingleCocktail",
	async ({ id }) => {
		return fetch(
			`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
		).then((res) => res.json());
	}
);
export const fetchSearchCocktails = createAsyncThunk(
	"cocktails/fetchSearchCocktails",
	async ({ searchText }) => {
		return fetch(
			`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`
		).then((res) => res.json());
	}
);
const initialState = {
	loading: false,
	cocktails: [],
	cocktail: [],
	error: null,
};
const cocktailSlice = createSlice({
	name: "cocktails",
	initialState,
	extraReducers: {
		[fetchCocktails.pending]: (state, action) => {
			state.loading = true;
			state.cocktails = [];
		},
		[fetchCocktails.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
			state.cocktails = action.payload.drinks;
		},
		[fetchCocktails.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},

		[fetchSingleCocktail.pending]: (state, action) => {
			state.loading = true;
		},
		[fetchSingleCocktail.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
			state.cocktail = action.payload.drinks;
		},
		[fetchSingleCocktail.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		[fetchSearchCocktails.pending]: (state, action) => {
			state.loading = true;
			state.cocktails = [];
		},
		[fetchSearchCocktails.fulfilled]: (state, action) => {
			state.loading = false;
			state.error = null;
			state.cocktails = action.payload.drinks;
		},
		[fetchSearchCocktails.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export default cocktailSlice.reducer;
