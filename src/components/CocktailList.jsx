import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchCocktails,
	fetchSearchCocktails,
} from "../redux/features/slice/cocktailSlice";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CocktailList = () => {
	const { loading, cocktails } = useSelector((state) => state.app);
	const [modifiedCocktail, setModifiedCocktail] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCocktails());
		// const fetchCocktailsHandler = async () => {
		// 	try {
		// 		const result = await dispatch(fetchCocktails()).unwrap();
		// 	} catch (error) {
		// 		console.log(error);
		// 	}
		// };
		// fetchCocktailsHandler();
	}, []);

	useEffect(() => {
		if (cocktails && cocktails.length > 0) {
			const newCocktails = cocktails.map((item) => {
				const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
					item;

				return {
					id: idDrink,
					name: strDrink,
					image: strDrinkThumb,
					info: strAlcoholic,
					glass: strGlass,
				};
			});
			setModifiedCocktail(newCocktails);
		} else {
			setModifiedCocktail([]);
		}
	}, [cocktails]);
	if (loading) {
		return (
			<div className="flex justify-center items-center mt-[200px]">
				<RotatingLines
					strokeColor="grey"
					strokeWidth="5"
					animationDuration="0.75"
					width="40"
					visible={true}
				/>
			</div>
		);
	}
	if (!cocktails) {
		return (
			<p className="flex justify-center items-center mt-[200px]">
				No Cocktails Matched with your search item
			</p>
		);
	}
	return (
		<section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5 md:p-10">
			{modifiedCocktail.map((item) => {
				const { id, name, image, info, glass } = item;
				return (
					<article key={id}>
						{/* <img
							src={image}
							alt={name}
							className="w-full rounded-t-lg object-cover"
						/> */}
						<LazyLoadImage
							alt={name}
							effect="blur"
							src={image}
							className="w-full rounded-t-lg object-cover -mb-2"
						/>
						<div className="space-y-3 py-5 px-8 bg-gray-100 rounded-b-lg ">
							<h5>{name}</h5>
							<h4>{glass}</h4>
							<p>{info}</p>
							<Link
								to={`/cocktail/${id}`}
								className="inline-block rounded-md bg-blue-500 text-white px-4 py-2"
							>
								Details
							</Link>
						</div>
					</article>
				);
			})}
		</section>
	);
};
export default CocktailList;
