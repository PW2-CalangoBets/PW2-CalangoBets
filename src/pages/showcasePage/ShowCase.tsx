import "./ShowCase.scss";
import AllMemberCards from '../../components/allMemberCards/AllMemberCards';
import LogInForm from '../../components/authForms/logInForm/LogInForm';
import SignUpForm from '../../components/authForms/signUpForm/signUpForm';
import MainHeader from '../../components/header/MainHeader';
import GamesCarretel from "../../components/gamesCarretel/GamesCarretel";
import ItemList from "../../components/itemList/ItemList";
import CommonButton from "../../components/common/commonButton/CommonButton";
import CommonInput from "../../components/common/commonInput/CommonInput";
import CommonRadioButton from "../../components/common/commonRadioButton/CommonRadioButton";
import LastPlayed from "../../components/lastPlayed/LastPlayed";
import DepositModal from "../../components/depositModal/DepositModal";
import { useState } from "react";

const userLastGames = [
    {
        name: "Fortune Tiger",
        image: "./src/assets/games/fortune-tiger.webp",
        link: "/#/jogos/fortune-tiger"
    }
];

const availableGames = [
    {
        name: "Fortune Tiger",
        image: "./src/assets/games/fortune-tiger.webp",
        link: "/#/jogos/fortune-tiger",
        subtitle: "PG SOFT"
    },
    {
        name: "Fortune Tiger",
        image: "./src/assets/games/fortune-tiger.webp",
        link: "/#/jogos/fortune-tiger",
        subtitle: "PG SOFT"
    },
    {
        name: "Fortune Tiger",
        image: "./src/assets/games/fortune-tiger.webp",
        link: "/#/jogos/fortune-tiger",
        subtitle: "PRAGMATIC PLAY"
    }
]


const ShowCase = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [operation, setOperation] = useState("deposit");

    return (
        <div className="showcase-page">
            <h1 className="showcase-title">Vitrine dos componentes</h1>

            <div className="showcase-container">
                <div >
                    <MainHeader />
                </div>
                <div className="showcase-description">
                    <h1>Header</h1>
                    <p>Cabeçalho de todas as páginas</p>
                </div>
            </div>


            <div className="showcase-container">
                <div >
                    <AllMemberCards />
                </div>
                <div className="showcase-description">
                    <h1>Cards dos membros</h1>
                    <p>Renderiza os cartões dos membros na página sobre, mostrando o nome e descrição dos criadores.</p>
                </div>
            </div>



            <div className="showcase-container">
                <div className="showcase-component">
                    <SignUpForm
                        handleSubmit={() => { }}
                        email={"Geregotango@gmail.com"}
                        setEmail={() => { }}
                        password={"geregog123"}
                        setPassword={() => { }}
                        confirmPassword={"geregog123"}
                        setConfirmPassword={() => { }}
                        success={"Sucess"}
                        error={"Error"}
                        image={"Imagem"}
                    />
                </div>
                <div>
                    <h1>Formulário de Cadastro</h1>
                    <p>Renderiza o formulário de cadastro de usuário na aplicação, todo novo usuário precisa cadastrar-se para entrar no site.</p>
                </div>
            </div>
            <div className="showcase-container">
                <div>
                    <LogInForm
                        handleSubmit={() => { }}
                        email={"Geregotango@gmail.com"}
                        setEmail={() => { }}
                        password={"geregog123"}
                        setPassword={() => { }}
                        error={"Error"}
                        image={"Imagem"}

                    />
                </div>
                <div>
                    <h1>Formulário de Login</h1>
                    <p>Renderiza o formulário de login, após criar a conta, o usuário pode logar na aplicação através desse componente.</p>
                </div>
            </div>

            <div className="showcase-container">
                <div>
                    <GamesCarretel height="240px" title="Em alta" games={availableGames} />
                    <LastPlayed games={userLastGames} count={3} width='400px' height='60px' />
                </div>
                <div>
                    <h1>Lista de jogos disponíveis</h1>
                    <p>Componente que renderiza a lista de jogos disponíveis, ao clica-la, o usuário é redirecionado para o jogo</p>
                </div>
            </div>


            <div className="showcase-container">
                <div>
                    <CommonButton label="Aperte-me" onClick={() => { }} />
                    <CommonInput label="Insira o nome" type="text" onChange={() => { }} />
                    <CommonRadioButton label="Opção 1" onChange={() => { }} />
                    <CommonRadioButton label="Opção 2" onChange={() => { }} />
                </div>
                <div>
                    <h1>Componentes comuns</h1>
                    <p>Itens simples, comum a toda aplicação</p>
                </div>
            </div>

            <div className="showcase-container">
                <div>
                    <ItemList
                        key={1}
                        operation={"Depósito"}
                        date={new Date(Date.now()).toLocaleString()}
                        value={100}
                        accountTotal={1000}
                    />
                </div>
                <div>
                    <h1>Item do Histórico de transações</h1>
                    <p>Lista de transações, que mostram a data, quantidade e valor da conta que foi efetuado a transferência</p>
                </div>
            </div>
            <div className="showcase-container-copy">
                <div>
                    <CommonButton label="Depositar" onClick={() => { setOperation("deposit");setIsModalOpen(true) }} />
                    <CommonButton label="Sacar" onClick={() => { setOperation("withdraw");setIsModalOpen(true) }} />
                    {isModalOpen && (
                        <DepositModal
                            operation={operation}
                            onClick={() => {
                                setIsModalOpen(false);
                            }}
                            onChangeValue={(value: number) => { console.log(value) }}
                            onClose={() => setIsModalOpen(false)}
                        />
                    )}
                </div>

                <div>
                    <h1>Modal de Transação</h1>
                    <p>Modal de transações, disponível na tela de realizar transações</p>
                </div>

            </div>



        </div>
    );
}

export default ShowCase;