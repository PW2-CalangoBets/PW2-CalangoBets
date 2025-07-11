import "./CommonButton.scss";

type InputProps = {
  label: string;
  onClick: () => void;
};


const CommonButton = ({ label, onClick }: InputProps) => {
  return (
    <button className="common-button" onClick={onClick}>{label}</button>
  );
};
export default CommonButton;