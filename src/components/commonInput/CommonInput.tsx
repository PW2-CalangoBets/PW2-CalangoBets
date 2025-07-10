import "./CommonInput.scss";

type InputProps = {
  label: string;
  type: string;
  onChange: () => void;
};


const CommonInput = ({ label, type, onChange }: InputProps) => {
  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <input className="input-field" onChange={onChange} type={type} />
    </div>
  );
};
export default CommonInput;