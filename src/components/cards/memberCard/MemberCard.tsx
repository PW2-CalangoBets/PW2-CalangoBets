import './memberCard.scss';

type MemberCardProps = {
  photo: string;
  nickname: string;
  name: string;
  description: string;
};

const MemberCard = ({ photo, nickname, name, description }: MemberCardProps) => {
  return (
    <div className="member-card">
      <img src={photo} alt={name} className="member-photo" />
      <span className="member-nickname">{nickname}</span>
      <h3 className="member-name">{name}</h3>
      <p className="member-description">{description}</p>
      <div className="member-icons">
        <i className="fa fa-facebook"></i>
        <i className="fa fa-instagram"></i>
      </div>
    </div>
  );
};

export default MemberCard;
