import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchSingleCocktail } from "../redux/features/slice/cocktailSlice";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const SingleCocktail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { loading, cocktail } = useSelector((state) => state.app);
	const [modifiedCocktail, setModifiedCocktail] = useState(null);
	useEffect(() => {
		dispatch(fetchSingleCocktail({ id }));
	}, [id]);

	useEffect(() => {
		if (cocktail.length > 0) {
			const {
				strDrink: name,
				strDrinkThumb: image,
				strAlcoholic: info,
				strCategory: category,
				strGlass: glass,
				strInstructions: instructions,
				strIngredient1,
				strIngredient2,
				strIngredient3,
				strIngredient4,
				strIngredient5,
			} = cocktail[0];
			const ingredients = [
				strIngredient1,
				strIngredient2,
				strIngredient3,
				strIngredient4,
				strIngredient5,
			];
			const newCocktail = {
				name,
				image,
				info,
				category,
				glass,
				instructions,
				ingredients,
			};
			setModifiedCocktail(newCocktail);
		} else {
			setModifiedCocktail(null);
		}
	}, [cocktail]);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<RotatingLines
					strokeColor="grey"
					strokeWidth="5"
					animationDuration="0.75"
					width="40"
					visible={true}
				/>
			</div>
		);
	} else if (!loading && !modifiedCocktail) {
		return <p>No Cocktail to Show</p>;
	} else {
		const { name, image, info, category, glass, instructions, ingredients } =
			modifiedCocktail;

		return (
			<section className="flex flex-col items-center py-5 space-y-5 px-5">
				<Link
					to="/"
					className="inline-block rounded-md bg-blue-500 text-white px-4 py-2"
				>
					Go Back
				</Link>
				<div className="flex flex-col md:flex-row">
					{/* <img
						src={image}
						alt={name}
						className="w-full rounded-lg object-cover md:h-[60vh] md:w-[60vh]"
					/> */}
					<LazyLoadImage
						alt={name}
						effect="blur"
						src={image}
						className="w-full rounded-lg object-cover md:h-[60vh] md:w-[60vh]"
					/>
					<ul className="flex-grow space-y-3 pt-5 px-8 md:pt-0 md:flex md:flex-col md:justify-center">
						<li>
							<span className="font-semibold md:text-lg">Name : </span>
							<span>{name}</span>
						</li>
						<li>
							<span className="font-semibold md:text-lg">Category :</span>
							<span>{category}</span>
						</li>
						<li>
							<span className="font-semibold md:text-lg">Info : </span>
							<span>{info}</span>
						</li>
						<li>
							<span className="font-semibold md:text-lg">Glass : </span>
							<span>{glass}</span>
						</li>
						<li>
							<span className="font-semibold md:text-lg">Instructions :</span>
							<span>{instructions}</span>
						</li>
						<li>
							<span className="font-semibold md:text-lg">ingredients : </span>
							{ingredients.map((item, index) => {
								return item ? <span key={index}>item</span> : null;
							})}
						</li>
					</ul>
				</div>
			</section>
		);
	}
};
export default SingleCocktail;
