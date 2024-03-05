import { useEffect, useRef, useState } from "react";

export default function SearchBar({
	handleSearch,
}: {
	handleSearch: Function;
}) {
	const [search, setSearch] = useState("");
	const input = useRef<HTMLInputElement>(null);
	const lastSearch = useRef("");

	useEffect(() => {
		if (search.trim() === "") return;
		const timer = setTimeout(() => {
			if (search === lastSearch.current) return;
			handleSearch(search);
			lastSearch.current = search;
		}, 2000);
		return () => clearTimeout(timer);
	}, [handleSearch, search]);

	return (
		<div className="flex items-center justify-center w-full h-24 mb-6">
			<input
				type="text"
				placeholder="Search for a movie"
				className="w-2/3 p-4 text-slate-100 bg-slate-950 border-2 border-slate-800 rounded-lg transition duration-200 hover:bg-slate-900 focus:bg-slate-800"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				ref={input}
			/>
			{search && (
				<span className="relative -left-6 flex justify-center items-center">
					<span
						className="absolute cursor-pointer text-2xl transition duration-200 hover:scale-105"
						onClick={() => {
							setSearch("");
							input.current?.focus();
						}}
					>
						&times;
					</span>
				</span>
			)}
		</div>
	);
}
