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
	return data;
}

export default function Home() {
	const initialTitle = sessionStorage.getItem("title") || "spider";
	const initialPage = parseInt(sessionStorage.getItem("page") || "1");

	const [films, setFilms] = useState([]);
	const [title, setTitle] = useState(initialTitle);
	const [page, setPage] = useState(initialPage);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getFilms(title, page).then((data) => {
			setFilms(data);
			setLoading(false);
		});
	}, [title, page]);

	useEffect(() => {
		sessionStorage.setItem("title", title);
	}, [title]);

	useEffect(() => {
		sessionStorage.setItem("page", page.toString());
	}, [page]);

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
			) : (films as any)?.Search?.length > 0 ? (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
					{(films as any)?.Search?.map((film: { imdbID: any }) => (
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
			) : (
				<div className="text-3xl text-slate-100 flex flex-1 items-center justify-center">
					No films found
				</div>
			)}
			{/* {(films as any)?.Search?.length > 0 && ( */}
			<Pagination
				handlePagination={handlePagination}
				page={page}
				maxPage={(films as any)?.totalResults / 10}
			/>
			{/* )} */}
		</main>
	);
}
