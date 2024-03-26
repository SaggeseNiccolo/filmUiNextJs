"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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

const getFilm = async (id: string) => {
	const res = await fetch(
		// `http://www.omdbapi.com/?i=${id}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
		`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=it-IT`,
		{
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
			},
		}
	);
	const data = await res.json();
	console.log(data);
	return data;
};

const addFavorite = (film: Film) => {
	const favorite = localStorage.getItem("favorite");
	if (favorite) {
		const favoriteArray = JSON.parse(favorite);
		const index = favoriteArray.findIndex(
			(fav: { Id: string }) => fav.Id === film.Id
		);
		if (index === -1) {
			localStorage.setItem(
				"favorite",
				JSON.stringify([...favoriteArray, film])
			);
		}
	} else {
		localStorage.setItem("favorite", JSON.stringify([film]));
	}
};

const removeFavorite = (id: string) => {
	const favorite = localStorage.getItem("favorite");
	if (favorite) {
		const favoriteArray = JSON.parse(favorite);
		const index = favoriteArray.findIndex(
			(fav: { Id: string }) => fav.Id === id
		);
		if (index !== -1) {
			favoriteArray.splice(index, 1);
			localStorage.setItem("favorite", JSON.stringify(favoriteArray));
		}
	}
};

const checkFavorite = (id: string) => {
	const favorite = localStorage.getItem("favorite");
	if (favorite) {
		const favoriteArray = JSON.parse(favorite);
		const index = favoriteArray.findIndex(
			(fav: { Id: string }) => fav.Id === id
		);
		if (index !== -1) {
			return true;
		}
	}
	return false;
};

const mapDataToFilm = (data: any): Film => {
	return {
		Id: data.id,
		Title: data.title,
		Overview: data.overview,
		Poster: data.poster_path,
		ReleaseDate: data.release_date,
		Runtime: data.runtime,
		Genres: data.genres.map((genre: { name: string }) => genre.name),
		Status: data.status,
		VoteAverage: data.vote_average,
		VoteCount: data.vote_count,
	};
};

export default function Details({
	params: { id },
}: {
	params: { id: string };
}) {
	const [film, setFilm] = useState<Film>({} as Film);
	const [loading, setLoading] = useState(true);
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		setIsFavorite(checkFavorite(id));
	}, [id]);

	useEffect(() => {
		getFilm(id).then((data) => {
			setFilm(mapDataToFilm(data));
			setLoading(false);
		});
	}, [id]);

	const handleFavorite = () => {
		if (!isFavorite) {
			addFavorite(film);
		} else {
			removeFavorite(id);
		}
		setIsFavorite(!isFavorite);
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div
				className="p-2 cursor-pointer absolute top-2 left-4 z-10 text-2xl hover:scale-125 transition duration-200 flex items-center justify-center"
				onClick={() => window.history.back()}
			>
				{"<"}
			</div>
			{loading ? (
				skeleton()
			) : (
				<>
					{!isFavorite ? (
						<svg
							className="w-6 h-6 text-white absolute top-4 right-4 z-10 cursor-pointer hover:scale-110 transition duration-200 active:scale-90"
							aria-hidden="true"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 20"
							onClick={() => handleFavorite()}
						>
							<path
								fillRule="evenodd"
								d="M8 16.941l-.941-.941C3.059 12.309 0 9.191 0 5.5 0 2.462 2.462 0 5.5 0 7.309 0 8.941 1.191 8 2.941 7.059 1.191 8.691 0 10.5 0 13.538 0 16 2.462 16 5.5c0 3.691-3.059 6.809-7.059 10.5L8 16.941Z"
							/>
						</svg>
					) : (
						<svg
							className="w-6 h-6 text-red-500 absolute top-4 right-4 z-10 cursor-pointer hover:scale-110 transition duration-200 active:scale-90"
							aria-hidden="true"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 20"
							onClick={() => handleFavorite()}
						>
							<path
								fillRule="evenodd"
								d="M8 16.941l-.941-.941C3.059 12.309 0 9.191 0 5.5 0 2.462 2.462 0 5.5 0 7.309 0 8.941 1.191 8 2.941 7.059 1.191 8.691 0 10.5 0 13.538 0 16 2.462 16 5.5c0 3.691-3.059 6.809-7.059 10.5L8 16.941Z"
							/>
						</svg>
					)}
					<div className="flex flex-row items-center justify-center px-24 gap-8">
						{film.Poster !== "N/A" && (
							<Image
								src={`https://image.tmdb.org/t/p/w300${film.Poster}`}
								alt={film.Title}
								width={300}
								height={450}
								className="rounded-lg"
								priority={true}
							/>
						)}
						<div className="flex flex-col w-1/2 justify-around">
							<h1 className="text-4xl font-bold">{film.Title}</h1>
							<p className="text-lg mt-2">{film.Overview}</p>
							<p className="text-lg mt-8">
								<strong>Released:</strong> {film.ReleaseDate}
							</p>
							<p className="text-lg mt-2">
								<strong>Rating:</strong>{" "}
								{film.VoteAverage.toFixed(2)} ({film.VoteCount})
							</p>
							<p className="text-lg mt-2">
								<strong>Runtime:</strong> {film.Runtime} minutes
							</p>
							<p className="text-lg mt-2">
								<strong>Genres:</strong>{" "}
								{film.Genres.join(", ")}
							</p>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

function skeleton() {
	return (
		<div className="flex flex-row items-center justify-center px-24 gap-8 animate-pulse">
			<div className="flex justify-center items-center bg-slate-900 rounded-lg h-[26rem] w-[18rem] mb-2">
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
			<div className="flex flex-col w-1/2 justify-around">
				<h1 className="bg-slate-900 h-12 w-[30rem] rounded-lg" />
				<div className="mt-2">
					<p className="bg-slate-900 h-6 w-[32rem] rounded-lg" />
					<p className="bg-slate-900 h-6 w-[32rem] rounded-lg mt-2" />
					<p className="bg-slate-900 h-6 w-[16rem] rounded-lg mt-2" />
				</div>
				<p className="bg-slate-900 h-6 w-[8rem] rounded-lg mt-8" />
				<p className="bg-slate-900 h-6 w-[12rem] rounded-lg mt-2" />
				<p className="bg-slate-900 h-6 w-[6rem] rounded-lg mt-2" />
				<p className="bg-slate-900 h-6 w-[16rem] rounded-lg mt-2" />
				<p className="bg-slate-900 h-6 w-[22rem] rounded-lg mt-2" />
			</div>
		</div>
	);
}
