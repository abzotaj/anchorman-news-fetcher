import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import AppIcon from "./AppIcon.jsx";
import AppTooltip from "./AppTooltip.jsx";

const AppLabel = ({ label, hasError, labelTooltip, labelIcon = 'information-fill' }) => {
	const [uniqueId] = React.useState(uuidv4());

	if (!label) {
		return null;
	}
	return (
		<div className={`app-input-label ${hasError ? 'error' : ''}`}>
			<div className={'flex flex-1 flex-row'}>
				{label}
				{!!labelTooltip && (
					<AppIcon
						className={'font-thin text-lg text-gray-600 cursor-pointer font-bold ml-1'}
						data-tip
						icon={labelIcon}
						data-for={`label-tooltip-${uniqueId}`}
					/>
				)}
				{!!labelTooltip && (
					<AppTooltip id={`label-tooltip-${uniqueId}`} placement={'right'}>
						{labelTooltip}
					</AppTooltip>
				)}
			</div>
		</div>
	);
};

export default AppLabel;
