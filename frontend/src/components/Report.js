import { useEffect, useState } from 'react';
import PostService from '../services/PostService';
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
		{ value: 'violent', label: 'Violent or harmful contents' },
		{ value: 'spam', label: 'Spam' },
		{ value: 'pornography', label: 'Pornography' },
	];

	const sendReport = (e) => {
		e.preventDefault();
		PostService.SendReport(e.target[1].value, reportItem, itemId, e.target[2].value)
		closeReport()
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
				<h4 style={{ margin: '0 0 2px 0' }}>Report reason:</h4>
				<select name='reason' onChange={(e) => console.log(e.target.value)}>
					{options.map((option, i) => {
						return <option key={`report${i}`} value={option.value}>{option.label}</option>;
					})}
				</select>
				<textarea name='' id='' cols='30'></textarea>
				<button className='submit' type='submit'>Send a report</button>
			</form>
		</div>
	);
};

export default Report;
