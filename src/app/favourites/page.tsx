"use client";

import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Link from "next/link";

interface Film {
	Title: string;
	Plot: string;
	Poster: string;
	Year: string;
	Rated: string;
	Released: string;
	Runtime: string;
	Genre: string;
	Director: string;
	Writer: string;
	Actors: string;
	Language: string;
	Country: string;
	Awards: string;
	Ratings: { Source: string; Value: string }[];
	Metascore: string;
	imdbRating: string;
	imdbVotes: string;
	imdbID: string;
	Type: string;
	DVD: string;
	BoxOffice: string;
	Production: string;
	Website: string;
	Response: string;
}

export default function Favourites() {
	const [films, setFilms] = useState([] as Film[]);

	const getFavorite = () => {
		const favorite = localStorage.getItem("favorite");
		if (favorite) {
			const favoriteArray = JSON.parse(favorite);
			setFilms(favoriteArray);
		} else {
			setFilms([]);
		}
	};

	useEffect(() => {
		getFavorite();
	}, []);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-8">
				{films.length > 0 ? (
					films.map((film: { imdbID: any }) => (
						<Link
							href={`/details/${film.imdbID}`}
							key={film.imdbID}
						>
							<MovieCard
								Title={""}
								Year={""}
								Poster={""}
								key={film.imdbID}
								{...film}
							/>
						</Link>
					))
				) : (
					<h1>No Favourites</h1>
				)}
			</div>
		</div>
	);
}
