'use client';

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from '@/components/LogoutButton';
import Card from '@/components/Card';
import Modal from '@/components/Modal';
import '../../styles/Search.css';
import { Dog } from '@/types';

export default function SearchPage() {
	const [breeds, setBreeds] = useState<string[]>([]);
	const [selectedBreed, setSelectedBreed] = useState('');
	const [dogs, setDogs] = useState<Dog[]>([]);
	const [page, setPage] = useState(1);
	const [sort, setSort] = useState('breed:asc');
	const [resultsPerPage, setResultsPerPage] = useState(10);
	const [zipCodes, setZipCodes] = useState<string>('');
	const [ageMin, setAgeMin] = useState<string>('');
	const [ageMax, setAgeMax] = useState<string>('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [matchedDog, setMatchedDog] = useState<Dog | null>(null);

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
		try {
			const res = await axios.get('https://frontend-take-home-service.fetch.com/dogs/search', {
				params: {
					breeds: selectedBreed || undefined,
					zipCodes: zipCodes ? zipCodes.split(',').map(zip => zip.trim()) : undefined,
					ageMin: ageMin ? parseInt(ageMin) : undefined,
					ageMax: ageMax ? parseInt(ageMax) : undefined,
					size: resultsPerPage,
					from: (page - 1) * resultsPerPage,
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
	}, [selectedBreed, zipCodes, ageMin, ageMax, page, sort, resultsPerPage]);

	useEffect(() => {
		fetchDogs();
	}, [fetchDogs]);

	const findMatch = async () => {
		try {
			const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
			const favoriteDogs = dogs.filter(dog => favorites.includes(dog.id));
			if (favoriteDogs.length === 0) {
				console.log('No favorite dogs to match.');
				return;
			}
			const { data } = await axios.post(
				'https://frontend-take-home-service.fetch.com/dogs/match',
				favoriteDogs.map(dog => dog.id),
				{
					withCredentials: true,
				}
			);
			const matchedDogId = data.match;
			const matchedDog = dogs.find(dog => dog.id === matchedDogId);
			setMatchedDog(matchedDog || null);
			setIsModalOpen(true);
		} catch (error) {
			console.error('Error finding match:', error);
		}
	};

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
					{breeds.map(breed => (
						<option key={breed} value={breed}>
							{breed}
						</option>
					))}
				</select>

				<label className="search-select-label">Zip Codes (comma-separated):</label>
				<input
					type="text"
					value={zipCodes}
					onChange={e => setZipCodes(e.target.value)}
					className="search-input"
					placeholder="e.g., 12345, 67890"
				/>

				<div className="age-filters">
					<div>
						<label className="search-select-label">Min Age:</label>
						<input
							type="number"
							value={ageMin}
							onChange={e => setAgeMin(e.target.value)}
							className="search-input"
							min="0"
						/>
					</div>
					<div>
						<label className="search-select-label">Max Age:</label>
						<input
							type="number"
							value={ageMax}
							onChange={e => setAgeMax(e.target.value)}
							className="search-input"
						/>
					</div>
				</div>

				<label className="search-select-label">Sort by:</label>
				<select value={sort} onChange={e => setSort(e.target.value)} className="search-select">
					<option value="breed:asc">Breed (A-Z)</option>
					<option value="breed:desc">Breed (Z-A)</option>
					<option value="name:asc">Name (A-Z)</option>
					<option value="name:desc">Name (Z-A)</option>
					<option value="age:asc">Age (Youngest First)</option>
					<option value="age:desc">Age (Oldest First)</option>
				</select>

				<label className="search-select-label">Results per page:</label>
				<select
					value={resultsPerPage}
					onChange={e => {
						setResultsPerPage(Number(e.target.value));
						setPage(1); // Reset to first page when changing results per page
					}}
					className="search-select"
				>
					<option value={10}>10</option>
					<option value={20}>20</option>
					<option value={50}>50</option>
					<option value={100}>100</option>
				</select>
			</div>

			<button onClick={() => fetchDogs()} className="search-button">
				Search
			</button>

			<button onClick={findMatch} className="find-match-button">
				Find Match
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
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				{matchedDog && (
					<div className="matched-dog">
						<h2>Matched Dog</h2>
						<Card dog={matchedDog} />
						<button onClick={() => alert('Congrats! You have a new family member!')}>
							Contact the shelter
						</button>
					</div>
				)}
			</Modal>
		</div>
	);
}
