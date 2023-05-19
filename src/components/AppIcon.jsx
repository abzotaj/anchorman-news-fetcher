import React from 'react';

const AppIcon = ({ icon, className, ...props }) => {
	return <span className={`app-icon ri-${icon} ${className ? className : ''} `} {...props} />;
};

export default AppIcon;
