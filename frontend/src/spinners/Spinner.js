import React from 'react';

function Spinner({ color, otherCSS }) {
	return (
		<div className={`spinner-border ${color} ${otherCSS}`} role='status'>
			<span className='visually-hidden'>Loading...</span>
		</div>
	);
}

export default Spinner;
