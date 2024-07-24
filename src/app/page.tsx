import SearchBar from "src/components/searchBar";
import Clock from "src/components/clock";

export default function Home() {
	return (
		<main className="flex flex-col gap-9 items-center justify-center min-h-svh p-6 max-w-7xl mx-auto">
			<h1 className="font-number text-6xl md:text-9xl text-neutral-950 dark:text-neutral-50">
				<Clock />
			</h1>
			<SearchBar />
		</main>
	);
}
