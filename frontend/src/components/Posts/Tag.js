import { Link } from 'react-router-dom';
import './Tag.css';

const Tag = ({ tagName }) => {
	return (
		<Link
			className={'tag'}
			to={{
				pathname: `/search`,
				state:  tagName ,
			}}>
			{tagName}
		</Link>
	);
};

export default Tag;
