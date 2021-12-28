import './loading.css';
import RotateRightSharpIcon from '@mui/icons-material/RotateRightSharp';
const Loading = () => {
	return (
		<div className='Loading'>
			<RotateRightSharpIcon
				style={{ color: 'white' }}
				color='inherit'
				fontSize='large'></RotateRightSharpIcon>
		</div>
	);
};

export default Loading;
