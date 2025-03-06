import React from 'react';

interface PaginationControlsProps {
	page: number;
	setPage: (page: number) => void;
}

const PaginationControls = ({ page, setPage }: PaginationControlsProps) => {
	return (
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
			<button onClick={() => setPage(page + 1)} className={`pagination-button`}>
				Next
			</button>
		</div>
	);
};

export default PaginationControls;
