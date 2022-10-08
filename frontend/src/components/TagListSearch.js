import { useState } from 'react';
import './TagListSearch.css';

const TagListSearch = ({ tags, search }) => {
	const [tagsToSearch, setTagsToSearch] = useState({});
	return (
		<div className={'tagSearch'}>
			<p style={{ fontSize: '12px' }}>Search tags:</p>
			<div className='tagsList'>
				{tags.map((tagName, index) => {
					return (
						<button
							onClick={(e) => {
								if (tagsToSearch[tagName]) {
									setTagsToSearch({ ...tagsToSearch, [tagName]: false });
									return;
								}
								setTagsToSearch({ ...tagsToSearch, [tagName]: true });
							}}
							className={tagsToSearch[tagName] ? 'tagSearchButton choose' : 'tagSearchButton'}
							key={`${tagName}${index}`}>
							{tagName}
						</button>
					);
				})}
			</div>
			<button
				className={'searchButton'}
				onClick={() => {
					search(Object.keys(tagsToSearch).filter((tag) => tagsToSearch[tag]));
				}}>
				Search
			</button>
		</div>
	);
};

export default TagListSearch;
