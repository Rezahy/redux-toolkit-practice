import { useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchSearchCocktails } from "../redux/features/slice/cocktailSlice";

const SearchInput = () => {
	const dispatch = useDispatch();
	const handlerSubmit = () => {};

	const handleChange = () => {
		const searchText = searchInputRef.current.value;

		dispatch(fetchSearchCocktails({ searchText }));
	};
	const searchInputRef = useRef();
	return (
		<section className="py-5 border-b-2 border-black">
			<form action="">
				<div className="flex justify-center items-center">
					<input
						type="text"
						ref={searchInputRef}
						onChange={handleChange}
						placeholder="search cocktails"
						className="border border-black rounded-lg px-3 pt-1 pb-1.5 outline-none placeholder:text-sm placeholder:text-center md:w-1/5 min-w-0 shadow-md"
					/>
				</div>
			</form>
		</section>
	);
};
export default SearchInput;
