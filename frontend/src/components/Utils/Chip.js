import './Chip.css';

/**
 *
 * @param {String} label Label of chip
 * @param {Function} deleteChip DeleteChip
 * @returns
 */

const Chip = ({ label = '', deleteChip = () => {} }) => {
	return (
		<div className={label !== '' ? 'chip' : 'chip error'}>
			<p>{label}</p>
			<div className='deleteChip' onClick={deleteChip}>x</div>
		</div>
	);
};

export default Chip;
