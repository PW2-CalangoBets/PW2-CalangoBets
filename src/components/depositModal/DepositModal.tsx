
import CommonButton from "../commonButton/CommonButton";
import CommonInput from "../commonInput/CommonInput";
import "./DepositModal.scss";

type InputProps = {
    operation: string;
    onChangeValue: (value: number) => void;
    onClick: () => void;
    onClose: () => void; 
};

const DepositModal = ({ operation, onChangeValue, onClick, onClose }: InputProps) => {

    const isSake = operation === "withdraw";

    return (
        <div className='modal-div' onClick={onClose}>
            <div className='modal-container' onClick={(e) => e.stopPropagation()}>
                <div>
                    <h1>{isSake ? "Saque" : "Depósito"}</h1>
                </div>
                <div className='sake-form'>
                    <CommonInput label='Insira o valor' type='number' onChange={(e) => onChangeValue(Number(e.target.value))} />
                    <CommonButton label={isSake ? "Realizar o saque" : "Realizar o depósito"} onClick={onClick} />
                </div>
            </div>
        </div>
    );
}

export default DepositModal;