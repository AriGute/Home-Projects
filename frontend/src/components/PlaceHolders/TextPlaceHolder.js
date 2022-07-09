import './TextPlaceHolder.css';
const TextPlaceHolder = ({ rows, color }) => {
	const styleProps = { height: '20px', backgroundColor: color, margin: '5px', borderRadius: '5px' };
	let skeleton = [];
	for (let i = 0; i < rows; i++) {
		skeleton.push(<div style={styleProps} key={i}></div>);
	}

	return (
		<div className='TextPlaceHolder' style={{ display: 'flex', flexDirection: 'column' }}>
			{skeleton}
		</div>
	);
};

export default TextPlaceHolder;
