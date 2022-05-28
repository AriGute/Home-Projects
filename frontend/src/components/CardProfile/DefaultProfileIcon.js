import './DefaultProfileIcon.css';

const DefaultProfileIcon = ({ name }) => {
	const fixScale = 'A'.charCodeAt();
	const acronyms = name.split(' ').map((x) => x[0]);

	function setBackgroundColor() {
		let color = (acronyms[0].charCodeAt() - fixScale) % 64;
		let saturation = calc(
			acronyms[0].charCodeAt() - fixScale,
		);
		let lightness = calc(
			acronyms[1].charCodeAt() - fixScale,
		);
		return `hsl(${color}, ${saturation}%, ${lightness}%)`;
	}

	// value in range ('A'.charCodeAt() to 'a'.charCodeAt())-'a'.charCodeAt() return value (0-100)
	function calc(x) {
		return Math.floor((20 / 13) * x);
	}

	return (
		<div
			className='icon'
			style={{ backgroundColor: setBackgroundColor() }}>
			<p className='acronyms' style={{ color: setBackgroundColor() }} >{acronyms}</p>
		</div>
	);
};

export default DefaultProfileIcon;
