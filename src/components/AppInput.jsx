import React from 'react';
import AppLabel from "./AppLabel.jsx";
import AppIcon from "./AppIcon.jsx";
import renderErrorMessage from "../constants/ErrorMessages.jsx";

const AppInput = React.forwardRef(
    (
        {
            label,
            showErrorMessage = true,
            errors = {},
            containerClassName,
            defaultErrorMessage = '',
            successMessage = '',
            message = '',
            icon,
            labelIcon,
            labelTooltip,
            passwordInput = false,
            prefix,
            ...props
        },
        ref
    ) => {
        const { name } = props;

        const shouldShowErrorMessage = !!(showErrorMessage && errors && errors[name]);

        const [showPassword, setShowPassword] = React.useState(true);

        const renderMessage = (text) => {
            if (typeof text === 'string' || typeof text === 'number') {
                return text;
            }
            return text();
        };

        return (
            <div className={`mb-4 ${containerClassName ? containerClassName : ''}`}>
                <AppLabel
                    label={label}
                    hasError={errors && errors[name]}
                    labelIcon={labelIcon}
                    labelTooltip={labelTooltip}
                />
                <div className='relative'>
                    <div className={'flex flex-row'}>
                        {!!prefix && (
                            <div
                                className={
                                    'flex justify-center items-center bg-gray-50 px-3 border-y-1 border-l-1 border-gray-300'
                                }
                            >
                                <span className={'ttg-text-sm text-gray-800'}>{prefix}</span>
                            </div>
                        )}
                        <input
                            ref={ref}
                            {...props}
                            className={`app-input ${errors && errors[name] ? 'error' : ''} ${
                                props.className ? props.className : ''
                            } ${passwordInput ? '!pr-20' : ''}`}
                            autoComplete='autocomplete_off_hack_rsp!bnbdp'
                            onChange={(e) => {
                                if (!props.disabled && props.onChange) {
                                    props.onChange(e);
                                }
                            }}
                            type={passwordInput && showPassword ? 'password' : props.type}
                        />
                    </div>
                    {!!passwordInput && (
                        <span className={'ttg-input-show-hide-action'} onClick={() => setShowPassword(!showPassword)}>
							{showPassword ? 'Show' : 'Hide'}
						</span>
                    )}
                    {(!!icon || !!errors[name]) && (
                        <AppIcon
                            className={`ttg-input-icon ${errors[name] ? 'error' : ''}`}
                            icon={errors[name] ? 'error-warning-fill' : icon}
                        />
                    )}
                </div>

                <span className={`app-input-error-message ${shouldShowErrorMessage ? 'visible' : 'invisible'}`}>
					{errors &&
                        errors[name] &&
                        renderErrorMessage(errors[name].type, props, defaultErrorMessage, errors[name].message)}
				</span>
                <span className={`app-input-success-message ${successMessage ? 'visible' : 'invisible'}`}>
					{renderMessage(successMessage)}
				</span>
                <span className={`app-input-message ${message ? 'visible' : 'invisible'}`}>
					{renderMessage(message)}
				</span>
            </div>
        );
    }
);

export default AppInput;
