import { useEffect, useState } from 'react';
import './Input.css';

/**
 *
 * @param {Function} getInput callback function to set the value
 * @param {String} value current value and set first value of component
 * @param {Boolean} isError boolean to set an error
 * @param {String} error the text of the error that you want to show
 * @param {String} type type of input
 * @param {Boolean} required input required?
 * @param {Number} height height of input with default setting
 * @param {Number} width width of input with default setting
 * @param {Number} errorMarginTop error message margin top with default setting
 * @param {Number} errorMarginLeft error message margin left with default setting
 * @param {String} errorColor color of error
 * @param {String} errorFontSize change error font size in px
 * @param {String} fontSize change font size in px
 * @param {Boolean} autoComplete form autoComplete on or off
 *
 */

const Input = ({
	getInput = () => {},
	value = '',
	isError,
	error = '',
	type = 'text',
	required = false,
	height = 20,
	width = 160,
	errorMarginTop = 3,
	errorMarginLeft = 3,
	errorColor = 'var(--error-color)',
	errorFontSize='12px',
	fontSize ='14px',
	autoComplete,
}) => {
	const style = {
		width: width,
		height: height,
	};

	if (width === 'full') {
		style.width = '-webkit-fill-available';
	}
	if (height === 'full') {
		style.height = '-webkit-fill-available';
	}

	const openError = {

		color: errorColor,
		left: `${errorMarginLeft}px`,
		top: `${height + errorMarginTop}px`,
		fontSize: errorFontSize,
	};
	const closeError = {
		color: errorColor,
		left: `${errorMarginLeft}px`,
		top: '0px',
		fontSize: '7px',
	};

	const [errorText, setErrorText] = useState(error);
	const [inputStyle, setInputStyle] = useState('inputContent');
	const [errorTextStyle, setErrorTextStyle] = useState(closeError);

	const requiredError = 'Do you missed something?';

	const requiredCheck = (e) => {
		if (required) {
			if (e.target.value === '') {
				setInputStyle('inputContent error');
				setErrorTextStyle(openError);
				setErrorText(requiredError);
				return getInput(null);
			}
			setInputStyle('inputContent');
			setErrorTextStyle(closeError);
			return getInput(e.target.value);
		}
		setInputStyle('inputContent');
		setErrorTextStyle(closeError);
		setErrorText(error);
		return getInput(e.target.value);
	};

	useEffect(() => {
		if (isError) {
			setInputStyle('inputContent error');
			setErrorText(error);
			return setErrorTextStyle(openError);
		}
		setInputStyle('inputContent');
		setErrorTextStyle(closeError);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isError]);

	return (
		<div className='inputContainer' style={style} autoComplete={autoComplete ? 'on' : 'off'}>
			{type === 'textarea' ? (
				<textarea
					className={inputStyle}
					onChange={(e) => requiredCheck(e)}
					value={value ? value : ''}
					style={{ fontSize: fontSize }}
				/>
			) : (
				<input
					className={inputStyle}
					onChange={(e) => requiredCheck(e)}
					type={type}
					value={value ? value : ''}
					style={{ fontSize: fontSize }}
				/>
			)}
			<span style={errorTextStyle} className={'errorText'}>
				{errorText}
			</span>
		</div>
	);
};

export default Input;
