import { useEffect, useState } from 'react';
import './Report.css';

/**
 * @param {Bool} reportIsOpen indicate if component open
 * @param {Function} closeReport callback function to close the component
 * @param {String} from {item , itemId}
 */
const Report = ({ reportIsOpen, closeReport, from }) => {
	const reportItem = from.item;
	const itemId = from.itemId;

	const [reportStyle, setReportStyle] = useState(null);
	const options = [
		{ value: 'violent', lable: 'Violent or hurmedfull contents' },
		{ value: 'spam', lable: 'Spam' },
		{ value: 'pornographi', lable: 'Pornographi' },
	];

	const sendReport = (e) => {
		e.preventDefault();
		console.log(e);
		console.log(`item:${reportItem} id:${itemId}`);
	};

	useEffect(() => {
		if (reportIsOpen) {
			setReportStyle('report open');
		} else {
			setReportStyle('report close');
		}
	}, [reportIsOpen]);

	return (
		<div className='Report'>
			{reportStyle === 'report open' && (
				<div className='reportBackGround' onClick={closeReport}></div>
			)}
			<form className={`card ${reportStyle}`} onSubmit={sendReport}>
				<div className='closeBtnDiv'>
					<button className='closeBtn' onClick={closeReport}>X</button>
				</div>
				<h1>Report {reportItem} </h1>
				<h4 style={{ margin: '0 0 2px 0' }}>Report reason</h4>
				<select name='reason' onChange={(e) => console.log(e.target.value)}>
					{options.map((option) => {
						return <option value={option.value}>{option.lable}</option>;
					})}
				</select>
				<textarea name='' id='' cols='30'></textarea>
				<button className='submit' type='submit'>Send a report</button>
			</form>
		</div>
	);
};

export default Report;
