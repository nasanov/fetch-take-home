import React from 'react';

interface SearchFiltersProps {
	breeds: string[];
	selectedBreed: string;
	setSelectedBreed: (breed: string) => void;
	zipCodes: string;
	setZipCodes: (zipCodes: string) => void;
	ageMin: string;
	setAgeMin: (ageMin: string) => void;
	ageMax: string;
	setAgeMax: (ageMax: string) => void;
	sort: string;
	setSort: (sort: string) => void;
	resultsPerPage: number;
	setResultsPerPage: (resultsPerPage: number) => void;
}

const SearchFilters = ({
	breeds,
	selectedBreed,
	setSelectedBreed,
	zipCodes,
	setZipCodes,
	ageMin,
	setAgeMin,
	ageMax,
	setAgeMax,
	sort,
	setSort,
	resultsPerPage,
	setResultsPerPage,
}: SearchFiltersProps) => {
	return (
		<div className="search-select-container">
			<div className="search-filter-row">
				<label className="search-select-label">Select a Breed:</label>
				<select
					value={selectedBreed}
					onChange={e => setSelectedBreed(e.target.value)}
					className="search-select"
				>
					<option value="">All Breeds</option>
					{breeds.map(breed => (
						<option key={breed} value={breed}>
							{breed}
						</option>
					))}
				</select>
			</div>

			<div className="search-filter-row">
				<label className="search-select-label">Zip Codes (comma-separated):</label>
				<input
					type="text"
					value={zipCodes}
					onChange={e => setZipCodes(e.target.value)}
					className="search-input"
					placeholder="e.g., 12345, 67890"
				/>
			</div>

			<div className="search-filter-row">
				<label className="search-select-label">Min Age:</label>
				<input
					type="number"
					value={ageMin}
					onChange={e => setAgeMin(e.target.value)}
					className="search-input"
					min="0"
				/>
			</div>

			<div className="search-filter-row">
				<label className="search-select-label">Max Age:</label>
				<input
					type="number"
					value={ageMax}
					onChange={e => setAgeMax(e.target.value)}
					className="search-input"
				/>
			</div>

			<div className="search-filter-row">
				<label className="search-select-label">Sort by:</label>
				<select value={sort} onChange={e => setSort(e.target.value)} className="search-select">
					<option value="breed:asc">Breed (A-Z)</option>
					<option value="breed:desc">Breed (Z-A)</option>
					<option value="name:asc">Name (A-Z)</option>
					<option value="name:desc">Name (Z-A)</option>
					<option value="age:asc">Age (Youngest First)</option>
					<option value="age:desc">Age (Oldest First)</option>
				</select>
			</div>

			<div className="search-filter-row">
				<label className="search-select-label">Results per page:</label>
				<select
					value={resultsPerPage}
					onChange={e => {
						setResultsPerPage(Number(e.target.value));
					}}
					className="search-select"
				>
					<option value={10}>10</option>
					<option value={20}>20</option>
					<option value={50}>50</option>
					<option value={100}>100</option>
				</select>
			</div>
		</div>
	);
};

export default SearchFilters;
