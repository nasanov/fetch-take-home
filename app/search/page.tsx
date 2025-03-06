'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from '@/components/LogoutButton';
import Card from '@/components/Card';
import SearchFilters from '@/components/SearchFilters';
import PaginationControls from '@/components/PaginationControls';
import '../../styles/Search.css';
import { Dog } from '@/types';
import MatchedDogModal from '@/components/MatchedDogModal';
import { useFetchBreeds } from '@/hooks/useFetchBreeds';
import { useFetchDogs } from '@/hooks/useFetchDogs';

export default function SearchPage() {
	const [selectedBreed, setSelectedBreed] = useState('');
	const [page, setPage] = useState(1);
	const [sort, setSort] = useState('breed:asc');
	const [resultsPerPage, setResultsPerPage] = useState(10);
	const [zipCodes, setZipCodes] = useState<string>('');
	const [ageMin, setAgeMin] = useState<string>('');
	const [ageMax, setAgeMax] = useState<string>('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [matchedDog, setMatchedDog] = useState<Dog | null>(null);

	const { breeds } = useFetchBreeds();
	const { dogs, fetchDogs } = useFetchDogs(selectedBreed, zipCodes, ageMin, ageMax, page, sort, resultsPerPage);

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

			<SearchFilters
				breeds={breeds}
				selectedBreed={selectedBreed}
				setSelectedBreed={setSelectedBreed}
				zipCodes={zipCodes}
				setZipCodes={setZipCodes}
				ageMin={ageMin}
				setAgeMin={setAgeMin}
				ageMax={ageMax}
				setAgeMax={setAgeMax}
				sort={sort}
				setSort={setSort}
				resultsPerPage={resultsPerPage}
				setResultsPerPage={setResultsPerPage}
			/>

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
			<PaginationControls page={page} setPage={setPage} />
			<MatchedDogModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} matchedDog={matchedDog} />
		</div>
	);
}
