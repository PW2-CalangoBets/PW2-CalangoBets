import './headerLink.scss';

type HeaderLinkProps = {
  linkName: React.ReactNode;
  onClick: () => void;
};

const HeaderLink = ({ linkName, onClick }: HeaderLinkProps) => {
  return (
    <button className="header-link" onClick={onClick}>
      {linkName}
    </button>
  );
};

export default HeaderLink;
