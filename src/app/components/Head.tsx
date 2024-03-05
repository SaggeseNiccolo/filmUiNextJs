import React from "react";

export function Head() {
	return (
		<div className="fixed w-full h-16 bg-slate-950 flex flex-row items-center z-10">
			<div className="text-lg text-slate-100 font-bold ml-4 mr-4">
				Home
			</div>
			<div className="text-lg text-slate-100">Favorites</div>
		</div>
	);
}
