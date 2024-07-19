export default function Home() {
	return (
		<main className="flex items-center justify-center min-h-svh">
			<div className="relative">
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
