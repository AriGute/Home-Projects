import './CardProfile.css';
import DefaultProfileIcon from './DefaultProfileIcon';


const CardProfile = ({profile}) => {
	return <div className='card cardProfile'>
		<p>autor name :{profile.name}</p>
		<DefaultProfileIcon name={profile.name}/>
	</div>;
};

export default CardProfile;
