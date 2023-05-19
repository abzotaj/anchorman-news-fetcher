import React from 'react';

const AppTooltip = ({ id, placement = 'top', type = 'dark', multiline = true, children }) => {
	return (
			<span className='ttg-text-sm font-normal'>{children}</span>
	);
};

export default AppTooltip;
