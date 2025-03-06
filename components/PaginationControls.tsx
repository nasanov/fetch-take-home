import React from 'react';

interface PaginationControlsProps {
	page: number;
	setPage: (page: number) => void;
	totalPages: number;
}

const PaginationControls = ({ page, setPage, totalPages }: PaginationControlsProps) => {
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
			<button
				disabled={page === totalPages}
				onClick={() => setPage(page + 1)}
				className={`pagination-button ${
					page === totalPages ? 'pagination-button-disabled' : 'pagination-button-enabled'
				}`}
			>
				Next
			</button>
		</div>
	);
};

export default PaginationControls;
