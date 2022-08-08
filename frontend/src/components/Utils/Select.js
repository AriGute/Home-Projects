import { useEffect, useState } from 'react';
import './Select.css';

/**
 *
 * @param {String} label Label of the select
 * @param {Array} options Options for select
 * @param {Function} getChosenOption Return selected value
 * @param {Boolean} isError is the value have some error
 */

const Select = ({ label, options, getChosenOption = () => {}, isError = false }) => {
	const [isOpen, setIsOpen] = useState(null);
	const [optionsList, setOptionsList] = useState(options);
	const [labelPosition, setLabelPosition] = useState('');
	const [arrowClass, setArrowClass] = useState('arrow down');
	const [optionsClass, setOptionsClass] = useState('options close');
	const [chosenOption, setChosenOption] = useState('');
	const [optionStyle, setOptionStyle] = useState({});
	const [selectClass, setSelectClass] = useState('select');

	const openOptions = (e) => {
		e.preventDefault();
		if (isOpen) {
			setIsOpen(false);
			setOptionsClass('options close');
			return setArrowClass('arrow down');
		}
		setIsOpen(true);
		setArrowClass('arrow up');
		setOptionsClass('options open');
	};

	const search = () => {
		if (chosenOption) {
			setSelectClass('select');
			setLabelPosition('up');
			setArrowClass('arrow up');
			setOptionsClass('options open');
		} else {
			if (isError) {
				setSelectClass('select error')
			}
			setLabelPosition('');
			setOptionsClass('options close');
			setArrowClass('arrow down');
		}
		const arr = options.filter((option) => {
			return option.toLowerCase().includes(chosenOption.toLowerCase());
		});
		if (arr.length) {
			setOptionStyle({});
			return setOptionsList(arr);
		}
		setOptionStyle({ color: 'grey', pointerEvents: 'none' });
		setOptionsList(['No options']);
	};

	const isAlphabet = (e) => {
		if (e.key === 'Backspace') {
			setChosenOption(chosenOption.slice(0, -1));
		}
		if ((e.keyCode >= 48 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105)) {
			setChosenOption(chosenOption + e.key);
		}
	};

	const chooseOption = (e) => {
		setOptionsClass('options close');
		setLabelPosition('up');
		setChosenOption(e.target.innerText);
		getChosenOption(e.target.innerText);
	};

	useEffect(() => {
		if (isError) {
			return setSelectClass('select error');
		}
		setSelectClass('select');
	}, [isError]);

	return (
		<div className={selectClass} onClick={openOptions}>
			<button
				onClick={(e) => {
					openOptions(e);
				}}>
				<i className={arrowClass}></i>
			</button>
			<input
				type='text'
				value={chosenOption}
				onChange={(e) => {}}
				onKeyDown={isAlphabet}
				onKeyUp={search}
			/>
			<label className={labelPosition}>{label}</label>
			<div className={optionsClass}>
				{options ? (
					optionsList.map((option, i) => {
						return (
							<p key={i} className={'option'} onClick={chooseOption} style={optionStyle}>
								{option}
							</p>
						);
					})
				) : (
					<div>No options</div>
				)}
			</div>
		</div>
	);
};

export default Select;
