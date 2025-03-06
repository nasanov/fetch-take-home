import Image from 'next/image';
import '../styles/Card.css';
import { Dog } from '@/types';

interface CardProps {
	dog: Dog;
}

export default function Card({ dog }: CardProps) {
	return (
		<div className="card">
			<Image src={dog.img} alt={dog.name} className="card-image" width={100} height={80} />
			<h3 className="card-title">{dog.name}</h3>
			<p className="card-breed">{dog.breed}</p>
			<div className="card-details">
				<p className="card-age">Age: {dog.age}</p>
				<p className="card-zip">Zip Code: {dog.zip_code}</p>
			</div>
		</div>
	);
}
