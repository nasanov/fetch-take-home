'use client';

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from '@/components/LogoutButton';
import Card from '@/components/Card';
import '../../styles/Search.css';
import { Dog } from '@/types';

export default function SearchPage() {
	const [breeds, setBreeds] = useState<string[]>([]);
	const [selectedBreed, setSelectedBreed] = useState('');
	const [dogs, setDogs] = useState<Dog[]>([]);
	const [page, setPage] = useState(1);
	const [sort, setSort] = useState('breed:asc');

	useEffect(() => {
		const fetchBreeds = async () => {
			try {
				const { data } = await axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', {
					withCredentials: true,
				});
				setBreeds(data);
			} catch (error) {
				console.error('Error fetching breeds:', error);
			}
		};

		fetchBreeds();
	}, []);

	const fetchDogs = useCallback(async () => {
		if (!selectedBreed) return;

		try {
			const res = await axios.get('https://frontend-take-home-service.fetch.com/dogs/search', {
				params: {
					breeds: selectedBreed,
					size: 10,
					from: (page - 1) * 10,
					sort: sort,
				},
				withCredentials: true,
			});
			const foundDogs = await axios.post(
				'https://frontend-take-home-service.fetch.com/dogs',
				res.data.resultIds, // TODO: No more than 100 ids
				{
					withCredentials: true,
				}
			);
			setDogs(foundDogs.data);
		} catch (error) {
			console.error('Error fetching dogs:', error);
		}
	}, [selectedBreed, page, sort]);

	useEffect(() => {
		fetchDogs();
	}, [fetchDogs]);

	return (
		<div className="search-container">
			<div className="search-header">
				<h1 className="search-title">Dog Search</h1>
				<LogoutButton />
			</div>

			<div className="search-select-container">
				<label className="search-select-label">Select a Breed:</label>
				<select
					value={selectedBreed}
					onChange={e => setSelectedBreed(e.target.value)}
					className="search-select"
				>
					<option value="">All Breeds</option>
					{/* // TODO_NURS: This doesn't work */}
					{breeds.map(breed => (
						<option key={breed} value={breed}>
							{breed}
						</option>
					))}
				</select>

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

			<button onClick={() => fetchDogs()} className="search-button">
				Search
			</button>

			<div className={`dog-grid ${dogs.length > 2 ? 'dog-grid-md' : ''}`}>
				{dogs.map(dog => (
					<Card key={dog.id} dog={dog} />
				))}
			</div>

			<div className="pagination">
				<button
					disabled={page === 1}
					onClick={() => setPage(page - 1)}
					className={`pagination-button ${
						page === 1 ? 'pagination-button-disabled' : 'pagination-button-enabled'
					}`}
				>
					Previous
				</button>
				<span>Page {page}</span>
				<button onClick={() => setPage(page + 1)} className="pagination-button pagination-button-enabled">
					Next
				</button>
			</div>
		</div>
	);
}
