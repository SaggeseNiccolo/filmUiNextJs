export default function Pagination({
	handlePagination,
	page,
}: {
	handlePagination: Function;
	page: number;
}) {
	return (
		<div className="flex justify-center items-center gap-6 text-center mt-8 select-none">
			{page === 1 ? (
				<div className=" p-2 rounded-lg w-32">Previous</div>
			) : (
				<div
					className="bg-slate-950 p-2 rounded-lg hover:bg-slate-900 transition duration-200 w-32 cursor-pointer"
					onClick={() => handlePagination("prev")}
				>
					Previous
				</div>
			)}
			<div className="text-slate-100">{page}</div>
			<div
				className="bg-slate-950 p-2 rounded-lg hover:bg-slate-900 transition duration-200 w-32 cursor-pointer"
				onClick={() => handlePagination("next")}
			>
				Next
			</div>
		</div>
	);
}
