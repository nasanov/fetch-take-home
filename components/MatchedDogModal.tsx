import React from 'react';
import Modal from './Modal';
import Card from './Card';
import { Dog } from '@/types';

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
					<Card dog={matchedDog} />
					<button onClick={() => alert('Congrats! You have a new family member!')}>
						Contact the shelter
					</button>
				</div>
			)}
		</Modal>
	);
};

export default MatchedDogModal;
