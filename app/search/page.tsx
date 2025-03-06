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
import { haversineDistance } from '@/utils/utils';

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
				alert('No favorite dogs to match.');
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

	const findClosestDogs = async () => {
		try {
			const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
			const favoriteDogs = dogs.filter(dog => favorites.includes(dog.id));
			if (favoriteDogs.length === 0) {
				alert('No favorite dogs selected.');
				return;
			}
			const { data } = await axios.post(
				'https://frontend-take-home-service.fetch.com/locations',
				favoriteDogs.map(dog => dog.zip_code),
				{
					withCredentials: true,
				}
			);
			navigator.geolocation.getCurrentPosition(
				position => {
					const userLatitude = position.coords.latitude;
					const userLongitude = position.coords.longitude;

					let closestDog = null;
					let minDistance = Infinity;

					data.forEach((location: { latitude: number; longitude: number; zip_code: string }) => {
						const distance = haversineDistance(
							userLatitude,
							userLongitude,
							location.latitude,
							location.longitude
						);
						if (distance < minDistance) {
							minDistance = distance;
							closestDog = favoriteDogs.find(dog => dog.zip_code === location.zip_code);
						}
					});

					setMatchedDog(closestDog || null);
					setIsModalOpen(true);
					console.log('Closest dog:', closestDog);
				},
				error => {
					console.error('Error getting user location:', error);
				}
			);
		} catch (error) {
			console.error('Error finding closest dog:', error);
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

			<div className="search-buttons-container">
				<button onClick={() => fetchDogs()} className="search-button">
					Search
				</button>
				<button onClick={findMatch} className="find-match-button">
					Find Match
				</button>
				<button onClick={findClosestDogs} className="find-match-button">
					Find closest match
				</button>
			</div>

			<div className={`dog-grid`}>
				{dogs.map(dog => (
					<Card key={dog.id} dog={dog} />
				))}
			</div>
			<PaginationControls page={page} setPage={setPage} />
			<MatchedDogModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} matchedDog={matchedDog} />
		</div>
	);
}
