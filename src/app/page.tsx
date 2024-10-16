"use client";

import { useEffect, useState } from "react";
import MovieCard, { MovieCardSkeleton } from "./components/MovieCard";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import Link from "next/link";

export async function getPopularFilms(page: number) {
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
		},
	};
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/popular?page=${page}&language=it-IT`,
		options
	);
	const data = await res.json();
	console.log(data);
	return data;
}

export default function Home() {
	const [films, setFilms] = useState([]);
	const [title, setTitle] = useState("");
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getPopularFilms(page).then((data) => {
			setFilms(data.results);
			setLoading(false);
		});
	}, [title, page]);

	const handleSearch = (search: string) => {
		setLoading(true);
		setPage(1);
		setTitle(search.toLowerCase().trim());
	};

	const handlePagination = (type: string) => {
		setLoading(true);
		if (type === "prev") {
			setPage(page - 1);
		} else {
			setPage(page + 1);
		}
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-between px-24 py-12">
			<SearchBar handleSearch={handleSearch} />
			{loading ? (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
					{[...Array(10)].map((_, i) => (
						<MovieCardSkeleton key={i} />
					))}
				</div>
			) : films && (films as any[]).length > 0 ? (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
					{films.map((film: any) => (
						<Link href={`/details/${film.id}`} key={film.id}>
							<MovieCard
								Title={film.title}
								Year={film.release_date}
								Poster={`https://image.tmdb.org/t/p/w300${film.poster_path}`}
							/>
						</Link>
					))}
				</div>
			) : (
				<div className="text-3xl text-slate-100 flex flex-1 items-center justify-center">
					No films found
				</div>
			)}
			{/* {(films as any)?.Search?.length > 0 && ( */}
			<Pagination
				handlePagination={handlePagination}
				page={page}
				maxPage={(films as any)?.total_pages}
			/>
			{/* )} */}
		</main>
	);
}
