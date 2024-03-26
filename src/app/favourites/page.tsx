"use client";

import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Link from "next/link";

interface Film {
	Id: string;
	Title: string;
	Overview: string;
	Poster: string;
	ReleaseDate: string;
	Runtime: number;
	Genres: string[];
	Status: string;
	VoteAverage: number;
	VoteCount: number;
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
					films.map((film) => (
						<Link href={`/details/${film.Id}`} key={film.Id}>
							<MovieCard
								Title={film.Title}
								Year={film.ReleaseDate}
								Poster={`https://image.tmdb.org/t/p/w300${film.Poster}`}
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
