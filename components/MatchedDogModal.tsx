import React from 'react';
import Modal from './Modal';
import { Dog } from '@/types';
import Image from 'next/image';

interface MatchedDogModalProps {
	isOpen: boolean;
	onClose: () => void;
	matchedDog: Dog | null;
}

const MatchedDogModal = ({ isOpen, onClose, matchedDog }: MatchedDogModalProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			{matchedDog && (
				<div className="matched-dog">
					<h2>Matched Dog</h2>
					<div className="card">
						<Image
							src={matchedDog.img}
							alt={matchedDog.name}
							className="card-image"
							width={100}
							height={80}
						/>
						<div className="card-header">
							<div>
								<h3 className="card-title">{matchedDog.name}</h3>
								<p className="card-breed">{matchedDog.breed}</p>
							</div>
						</div>
						<div className="card-details">
							<p className="card-age">Age: {matchedDog.age}</p>
							<p className="card-zip">Zip Code: {matchedDog.zip_code}</p>
						</div>
					</div>
					<button
						onClick={() => alert('Congrats! You have a new family member!')}
						className="contact-the-shelter-button"
					>
						Contact the shelter
					</button>
				</div>
			)}
		</Modal>
	);
};

export default MatchedDogModal;
