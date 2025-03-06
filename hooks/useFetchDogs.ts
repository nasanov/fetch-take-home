import { useState, useCallback } from 'react';
import axios from 'axios';
import { Dog } from '@/types';

export const useFetchDogs = (
	selectedBreed: string,
	zipCodes: string,
	ageMin: string,
	ageMax: string,
	page: number,
	sort: string,
	resultsPerPage: number
) => {
	const [dogs, setDogs] = useState<Dog[]>([]);
	const [error, setError] = useState<string | null>(null);

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
			setError('Error fetching dogs');
			console.error('Error fetching dogs:', error);
		}
	}, [selectedBreed, zipCodes, ageMin, ageMax, page, sort, resultsPerPage]);

	return { dogs, fetchDogs, error };
};
