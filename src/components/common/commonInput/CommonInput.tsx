import "./CommonInput.scss";

type InputProps = {
  label: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CommonInput = ({ label, type, onChange }: InputProps) => {
  const id = label.replace(/\s+/g, '-').toLowerCase(); // gera um id único baseado no label

  return (
    <div className="input-container">
      <label className="input-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="input-field"
        type={type}
        onChange={onChange}
      />
    </div>
  );
};

export default CommonInput;
