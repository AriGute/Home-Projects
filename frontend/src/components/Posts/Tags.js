import Tag from './Tag';
import './Tags.css';

const Tags = ({ tags }) => {
	return (
		<div className='tags'>
			<p style={{ fontSize: '12px'}}>tags:</p>
			<div className='tagsList'>
				{tags.map((tag, index) => (
					<Tag tagName={tag} key={`tag ${index}`} />
				))}
			</div>
		</div>
	);
};

export default Tags;
