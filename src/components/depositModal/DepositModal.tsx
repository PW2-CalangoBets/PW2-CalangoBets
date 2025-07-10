import CommonButton from "../commonButton/CommonButton";
import CommonInput from "../commonInput/CommonInput";
import CommonRadioButton from "../commonRadioButton/CommonRadioButton";
import "./DepositModal.scss";

type InputProps = {
    operation: string;
    onChagePix: () => void;
    onChangeValue: () => void;
    onClick: () => void;
};



const DepositModal = ({ operation, onChangeValue, onChagePix, onClick }: InputProps) => {

    const isSake = operation === "withdraw";

    return (
        <div className='modal-div'>
            <div className='modal-container'>
                <div>
                    <h1>{isSake ? "Saque" : "Depósito"}</h1>
                </div>
                <div className='sake-form'>
                    <CommonInput label='Insira o valor' type='number' onChange={onChangeValue} />
                    {isSake && (
                        <>
                            <CommonInput label='Insira a chave pix' type='text' onChange={onChagePix} />
                            <div className='radioButton-container'>
                                <CommonRadioButton label="Cpf" onChange={() => {}}/>
                                <CommonRadioButton label="Telefone" onChange={() => {}}/>
                            </div>
                        </> 
                    )}

                    <CommonButton label={isSake ? "Realizar o saque" : "Realizar o depósito"} onClick={onClick} />
                </div>
            </div>
        </div>
    );
}

export default DepositModal;