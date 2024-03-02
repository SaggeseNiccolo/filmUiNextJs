import Image from "next/image";

interface MovieCardProps {
	Title: string;
	Year: string;
	Poster: string;
}

export default function MovieCard(props: MovieCardProps) {
	return (
		<div className="p-4 cursor-pointer hover:scale-105 transition duration-200 rounded-lg bg-slate-950">
			{props.Poster !== "N/A" && (
				<Image
					src={props.Poster}
					alt={props.Title}
					width={300}
					height={450}
					priority={true}
					className="rounded-lg"
				/>
			)}
			<h3>{props.Title}</h3>
			<p className="text-end">{props.Year}</p>
		</div>
	);
}

export function MovieCardSkeleton() {
	return (
		<div className="p-4 cursor-pointer rounded-lg bg-slate-950">
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
		</div>
	);
}
