import './CardProfile.css';
import DefaultProfileIcon from './DefaultProfileIcon';
import Utils from '../../services/Utils';

const CardProfile = ({ profile }) => {
	let date = Utils.DateFormat(profile.lastActiveAt);
	return (
		<div className='card cardProfile'>
			<DefaultProfileIcon
				name={`${profile.firstName} ${profile.lastName}`}
			/>
			<div className='details'>
				<p>
					{profile.firstName} {profile.lastName}
				</p>
				<p>
					Last seen: <br />
					{date.toString()}
				</p>
			</div>
		</div>
	);
};

export default CardProfile;
