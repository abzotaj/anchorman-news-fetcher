import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import AppIcon from "./AppIcon.jsx";
import AppTooltip from "./AppTooltip.jsx";

const AppButton = ({
                    text,
                    icon,
                    iconClass,
                    iconRight = true,
                    tooltip,
                    loading = false,
                    className = 'btn btn-primary',
                    ...props
                }) => {
    const [uniqueId] = React.useState(uuidv4());

    const _onClick = (e) => {
        if (loading || props.disabled) {
            if (e) {
                e.preventDefault();
            }
        } else if (props.onClick) {
            props.onClick(e);
        }
    };

    const renderIcon = (className) => {
        if (icon && !loading) {
            return <AppIcon icon={icon} className={`${iconClass} ${className}`} />;
        }
        return null;
    };

    return (
        <button
            {...props}
            className={className}
            onClick={_onClick}
            disabled={props.disabled || loading}
            data-tip
            data-for={`cta-button-tooltip-${uniqueId}`}
        >
            <div className={'flex relative items-center justify-center w-full h-full'}>
                {!iconRight && renderIcon(text ? 'mr-2' : '')}
                <span className={loading ? 'invisible' : 'visible'}>{text}</span>
                {iconRight && renderIcon(text ? 'ml-2' : '')}
                {loading && (
                    <p className={'absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center'}>
                        <AppIcon icon={'loader-4-line'} className={'animate-spin'} />
                    </p>
                )}
            </div>
            {!!tooltip && (
                <AppTooltip id={`cta-button-tooltip-${uniqueId}`} placement={'right'}>
                    {tooltip}
                </AppTooltip>
            )}
        </button>
    );
};

export default AppButton;
