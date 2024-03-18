export default function Pagination({
	handlePagination,
	page,
	maxPage,
}: {
	handlePagination: Function;
	page: number;
	maxPage: number;
	}) {
	maxPage = Math.ceil(maxPage);
	
	return (
		<div className="flex justify-center items-center gap-6 text-center mt-8 select-none">
			{page === 1 ? (
				<div className="px-4 py-2 rounded-lg">{"<"}</div>
			) : (
				<div
					className="bg-slate-950 px-4 py-2 rounded-lg hover:bg-slate-900 transition duration-200 cursor-pointer"
					onClick={() => handlePagination("prev")}
				>
					{"<"}
				</div>
			)}
			<div className="text-slate-100">{page}</div>
			{page === maxPage ? (
				<div className="px-4 py-2 rounded-lg"> {">"}</div>
				) : (
					<div
					className="bg-slate-950 px-4 py-2 rounded-lg hover:bg-slate-900 transition duration-200 cursor-pointer"
					onClick={() => handlePagination("next")}
				>
					{">"}
				</div>
			)}
		</div>
	);
}
