import React from 'react';

export function Input(props) {
	return (
		<div>
			<div className='form-group'>
				<input className='form-control' {...props} />
			</div>
		</div>
	);
}

export function PostButton(props) {
	return (
		<button type='submit' className=' button' tabindex='0' onClick={(event) => props.handleCreateSubmit(event)}>
			<div className='visible content'>CONTINUE </div>
			<div className='hidden content'>
				<i className='right arrow icon' />
			</div>
		</button>
	);
}
