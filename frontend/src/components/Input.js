import { useEffect, useState } from 'react';
import './Input.css';

/**
 *
 * @param {Function} getInput callback function to set the value
 * @param {Boolean0} isError boolean to set an error
 * @param {String} errorText the text of the error that you want to show
 * @param {String} type type of input
 * @param {Boolean} required input required?
 * @param {Number} height height of input with default setting
 * @param {Number} width width of input with default setting
 * @param {Number} errorMarginTop error message margin top with default setting
 * @param {Number} errorMarginLeft error message margin left with default setting
 * @param {String} errorColor color of error
 *
 */

const Input = ({
	getInput,
	isError,
	error = '',
	type = 'text',
	required = false,
	height = 15,
	width = 160,
	errorMarginTop = 6,
	errorMarginLeft = 3,
	errorColor = 'hsl(0deg 77% 42%)',
}) => {
	const openError = {
		color: errorColor,
		left: `${errorMarginLeft}px`,
		top: `${height + errorMarginTop}px`,
		fontSize: '10px',
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

	const requiredError = 'You Missed something?';

	const requiredCheck = (e) => {
		debugger
		if (required) {
			if (e.target.value === '') {
				setInputStyle('inputContent error');
				setErrorTextStyle(openError);
				setErrorText(requiredError);
				getInput(null);

			} else {
				setInputStyle('inputContent');
				setErrorTextStyle(closeError);
				getInput(e.target.value);
			}
		} else {
			setInputStyle('inputContent');
			setErrorTextStyle(closeError);
			setErrorText(error);
			getInput(e.target.value);
		}
	};

	useEffect(() => {
		if (isError) {
			setInputStyle('inputContent error');
			setErrorText(error);
			setErrorTextStyle(openError);
		} else {
			setInputStyle('inputContent');
			setErrorTextStyle(closeError);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isError]);

	return (
		<div>
			<form className='errorContainer'>
				<input
					className={inputStyle}
					style={{ width: `${width}px`, height: `${height}px` }}
					onChange={(e) => requiredCheck(e)}
					type={type}
				/>
				<span style={errorTextStyle} className={'errorText'}>
					{errorText}
				</span>
			</form>
		</div>
	);
};

export default Input;
