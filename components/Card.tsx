import Image from 'next/image';
import '../styles/Card.css';

interface CardProps {
	dog: {
		id: string;
		img: string;
		name: string;
		breed: string;
	};
}

export default function Card({ dog }: CardProps) {
	return (
		<div className="card">
			<Image src={dog.img} alt={dog.name} className="card-image" width={100} height={80} />
			<h3 className="card-title">{dog.name}</h3>
			<p className="card-breed">{dog.breed}</p>
		</div>
	);
}
