// __tests__/DepositModal.test.tsx
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import DepositModal from '../components/depositModal/DepositModal';

describe('DepositModal', () => {
  it('renderiza corretamente como Depósito', () => {
    render(
      <DepositModal
        operation="deposit"
        onChangeValue={() => {}}
        onClick={() => {}}
        onClose={() => {}}
      />
    );

    expect(screen.getByText('Depósito')).toBeInTheDocument();
    expect(screen.getByText('Realizar o depósito')).toBeInTheDocument();
  });

  it('renderiza corretamente como Saque', () => {
    render(
      <DepositModal
        operation="withdraw"
        onChangeValue={() => {}}
        onClick={() => {}}
        onClose={() => {}}
      />
    );

    expect(screen.getByText('Saque')).toBeInTheDocument();
    expect(screen.getByText('Realizar o saque')).toBeInTheDocument();
  });

  it('chama onClose ao clicar fora', () => {
    const onCloseMock = jest.fn();
    render(
      <DepositModal
        operation="deposit"
        onChangeValue={() => {}}
        onClick={() => {}}
        onClose={onCloseMock}
      />
    );

    fireEvent.click(screen.getByText('Depósito').parentElement!.parentElement!.parentElement!);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('chama onClick quando clica no botão', () => {
    const onClickMock = jest.fn();
    render(
      <DepositModal
        operation="deposit"
        onChangeValue={() => {}}
        onClick={onClickMock}
        onClose={() => {}}
      />
    );

    fireEvent.click(screen.getByText('Realizar o depósito'));
    expect(onClickMock).toHaveBeenCalled();
  });

  it('chama onChangeValue ao digitar no input', () => {
    const onChangeValueMock = jest.fn();
    render(
      <DepositModal
        operation="deposit"
        onChangeValue={onChangeValueMock}
        onClick={() => {}}
        onClose={() => {}}
      />
    );

    const input = screen.getByLabelText('Insira o valor');
    fireEvent.change(input, { target: { value: '123' } });
    expect(onChangeValueMock).toHaveBeenCalledWith(123);
  });
});
