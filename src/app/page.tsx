import Time from "src/components/time";

export default function Home() {
	return (
		<main className="flex flex-col gap-9 items-center justify-center min-h-svh p-6 max-w-7xl mx-auto">
			<h1 className="font-number text-6xl md:text-9xl h-32 text-neutral-950 dark:text-neutral-50">
				<Time />
			</h1>
			<div className="relative w-full md:w-2/3">
				<input
					type="text"
					placeholder="Type to search... soon."
					autoFocus
					className="text-neutral-950 dark:text-neutral-50 w-full h-full px-4 py-2 text-lg rounded-lg bg-white border border-neutral-50 shadow-xl dark:bg-neutral-900 dark:border-neutral-800 shadow-black/5 dark:shadow-none"
				/>
			</div>
		</main>
	);
}
