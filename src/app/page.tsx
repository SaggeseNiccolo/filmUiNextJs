"use client";

import { useEffect, useState } from "react";
import MovieCard, { MovieCardSkeleton } from "./components/MovieCard";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import Link from "next/link";

export async function getFilms(title: string, page: number) {
	const res = await fetch(
		`http://www.omdbapi.com/?s=${title}&page=${page}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
	);
	const data = await res.json();
	console.log(data);
	return data;
}

export default function Home() {
	const [films, setFilms] = useState([]);
	const [title, setTitle] = useState("spider");
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getFilms(title, page).then((data) => {
			setFilms(data);
			setLoading(false);
		});
	}, [title, page]);

	const handleSearch = (search: string) => {
		setLoading(true);
		setPage(1);
		setTitle(search.toLowerCase().trim());
	};

	const handlePagination = (type: string) => {
		if (type === "prev") {
			if (page === 1) return;
			setFilms([]);
			setPage(page - 1);
		} else {
			setFilms([]);
			setPage(page + 1);
		}
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-between px-24 py-12">
			<SearchBar handleSearch={handleSearch} />
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{loading
					? [...Array(10)].map((_, i) => (
							<MovieCardSkeleton key={i} />
					  ))
					: (films as any)?.Search?.map((film: { imdbID: any }) => (
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
					  ))}
			</div>
			{loading === false && (
				<Pagination handlePagination={handlePagination} />
			)}
		</main>
	);
}
