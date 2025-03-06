import Image from 'next/image';
import '../styles/Card.css';
import { Dog } from '@/types';
import { useEffect, useState } from 'react';

interface CardProps {
	dog: Dog;
}

export default function Card({ dog }: CardProps) {
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
		setIsFavorite(favorites.includes(dog.id));
	}, [dog.id]);

	const handleFavoriteClick = () => {
		setIsFavorite(!isFavorite);
		const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
		if (!isFavorite) {
			favorites.push(dog.id);
		} else {
			const index = favorites.indexOf(dog.id);
			if (index > -1) {
				favorites.splice(index, 1);
			}
		}
		localStorage.setItem('favorites', JSON.stringify(favorites));
	};

	return (
		<div className="card">
			<Image src={dog.img} alt={dog.name} className="card-image" width={100} height={80} />
			<div className="card-header">
				<div>
					<h3 className="card-title">{dog.name}</h3>
					<p className="card-breed">{dog.breed}</p>
				</div>
				<button onClick={handleFavoriteClick} className="heart-button">
					{isFavorite ? '❤️' : '🤍'}
				</button>
			</div>
			<div className="card-details">
				<p className="card-age">Age: {dog.age}</p>
				<p className="card-zip">Zip Code: {dog.zip_code}</p>
			</div>
		</div>
	);
}
