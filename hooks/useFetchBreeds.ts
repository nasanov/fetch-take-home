import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchBreeds = () => {
	const [breeds, setBreeds] = useState<string[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchBreeds = async () => {
			try {
				const { data } = await axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', {
					withCredentials: true,
				});
				setBreeds(data);
			} catch (error) {
				setError('Error fetching breeds');
				console.error('Error fetching breeds:', error);
			}
		};

		fetchBreeds();
	}, []);

	return { breeds, error };
};
