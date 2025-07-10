import "./CommonRadioButton.scss";

type InputProps = {
  label: string;
  onChange: () => void;
};

const CommonRadioButton = ({ label, onChange }: InputProps) => {
  return (
    
    <div className="radio-container">
      <label className="radio-label">
        <input
          className="radio-input"
          type="radio"
          onChange={onChange}
          name="common-radio-group"
        />
        {label}
      </label>
    </div>
  );
};

export default CommonRadioButton;