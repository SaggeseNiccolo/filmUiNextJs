"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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

const getFilm = async (id: string) => {
	const res = await fetch(
		`http://www.omdbapi.com/?i=${id}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
	);
	const data = await res.json();
	console.log(data);
	return data;
};

export default function Details({
	params: { id },
}: {
	params: { id: string };
}) {
	const [film, setFilm] = useState<Film>({} as Film);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getFilm(id).then((data) => {
			setFilm(data);
			setLoading(false);
		});
	}, [id]);

	return (
		<div className="flex items-center justify-center min-h-screen">
			{loading ? (
				<div className="animate-pulse">
					<div className="flex justify-center items-center bg-slate-900 rounded-lg h-64 w-44 mb-2">
						<svg
							className="w-10 h-10 text-gray-200 dark:text-gray-600"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 16 20"
						>
							<path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
							<path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
						</svg>
					</div>
					<h3 className="bg-slate-900 h-6 w-2/3 mb-2 rounded-lg" />
					<p className="bg-slate-900 h-4 w-1/3 rounded-lg" />
				</div>
			) : (
				<div className="flex flex-row items-center justify-center px-24 gap-8">
					<Image
						src={film.Poster}
						alt={film.Title}
						width={300}
						height={450}
						className="rounded-lg"
						priority={true}
					/>
					<div className="flex flex-col w-1/2 justify-around">
						<h1 className="text-4xl font-bold mt-6">
							{film.Title}
						</h1>
						<p className="text-lg mt-2">{film.Plot}</p>
						<p className="text-lg mt-8">
							<strong>Year:</strong> {film.Year}
						</p>
						<p className="text-lg mt-2">
							<strong>Rated:</strong> {film.Rated}
						</p>
						<p className="text-lg mt-2">
							<strong>Released:</strong> {film.Released}
						</p>
						<p className="text-lg mt-2">
							<strong>Runtime:</strong> {film.Runtime}
						</p>
						<p className="text-lg mt-2">
							<strong>Genre:</strong> {film.Genre}
						</p>
						<p className="text-lg mt-2">
							<strong>Director:</strong> {film.Director}
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
