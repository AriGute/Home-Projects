import "./ProfileIcon.css";

const ProfileIcon = ({ name }) => {
  
  let acronyms = name.split(" ").map((x) => x[0]);
  
  function backgroundColor() {

  }

  return <div className="icon">{acronyms}</div>;
};

export default ProfileIcon;
