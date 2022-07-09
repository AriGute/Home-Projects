import { useEffect, useState } from 'react';
import PostService from '../services/PostService';
import './Report.css';
import Input from './Utils/Input';
import Select from './Utils/Select';

/**
 * @param {Bool} reportIsOpen indicate if component open
 * @param {Function} closeReport callback function to close the component
 * @param {Object} from {item , itemId}
 */
const Report = ({ reportIsOpen, closeReport, from }) => {
	const reportItem = from.item;
	const itemId = from.itemId;

	const [reportReason, setReportReason] = useState();
	const [reportText, setReportText] = useState();
	const [reportStyle, setReportStyle] = useState(null);
	const options = ['Violent or harmful contents', 'Spam', 'Pornography'];

	const sendReport = (e) => {
		e.preventDefault();
		PostService.SendReport(reportReason, reportItem, itemId, reportText);
		closeReport();
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
				<div className='closeReportBtnDiv'>
					<button className='closeReportBtn' onClick={closeReport}>
						X
					</button>
				</div>
				<h1
					style={{
						alignSelf: 'center',
					}}>
					Report {reportItem}{' '}
				</h1>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-around',
						width: '-webkit-fill-available',
						alignItems: 'center',
					}}>
					<h4 style={{ margin: '0 0 2px 0' }}>Report reason:</h4>
					<Select
						label={'Report reason'}
						options={options}
						getChosenOption={(e) => setReportReason(e)}
					/>
				</div>
				<Input getInput={(e) => setReportText(e)} value={reportText} type={'textarea'} height={'full'} width={'full'} />
				<button className='submit' type='submit'>
					Send a report
				</button>
			</form>
		</div>
	);
};

export default Report;
