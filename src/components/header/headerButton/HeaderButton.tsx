import './headerButton.scss';

type HeaderButtonProps = {
  label: string;
  isSpecial: boolean;
  onClick: () => void;
};

const HeaderButton = ({ label, isSpecial, onClick }: HeaderButtonProps) => {
  return (
    <button
      className={`header-button${isSpecial ? ' special' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default HeaderButton;