
import MainHeader from '../../components/header/MainHeader';
import './accountPage.scss';
import saveIcon from '../../assets/saveIcon.png';
import editPen from '../../assets/editPen.png';
import siteLogo from '/logo.png';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { getUserInfoApi } from '../../api/userApi';
import { updateUser } from '../../api/userApi';
import { getAllGamesApi } from '../../api/gameApi';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export type Game = {
  id: string;
  playerId: string;
  gameName: string;
  date: string;
  accountCdb: number;
  cdb: number;
  result: "WIN" | "LOSE";
};

type UserInfo = {
  name: string;
  email: string;
  cdb: number;
  totalDeposit: number;
  wins: number;
  looses: number;
}

const AccountPage = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [editing, setEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [name, setNome] = useState('');

  const chartData = {
    labels: games.map((game) => new Date(game.date).toLocaleDateString("pt-BR")),
    datasets: [
      {
        label: "Saldo após o jogo (CDB)",
        data: games.map((game) =>
          game.result === "WIN"
            ? game.accountCdb + game.cdb
            : game.accountCdb - game.cdb
        ),
        borderColor: "#5ce1e6",
        fill: false,
        tension: 0.1
      }
    ]
  };

  const maxValue = Math.max(...games.map((game) =>
    game.result === "WIN"
      ? game.accountCdb + game.cdb
      : game.accountCdb - game.cdb
  ),
    0
  );
  const adjustedMax = Math.ceil((maxValue / 200) + 1) * 200;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      x: { ticks: { color: "white" } },
      y: {
        min: 0,
        max: adjustedMax,
        ticks: { color: "white", stepSize: 200 }
      }
    }
  };

  const fetchUser = async () => {
    try {
      const data = await getUserInfoApi();
      setUser(data);
    } catch (err) {
      console.error("Erro ao buscar dados do usuário", err);
    }
  };

  const fetchGames = async () => {
    try {
      const response = await getAllGamesApi({ page: 0, size: 20 });
      setGames(response.content);
    } catch (err) {
      console.error("Erro ao buscar jogos", err);
    }
  };

  const updateUserMethod = async () => {
    try {
      await updateUser({ name });
      fetchUser();
      alert("Nome atualizado");
    } catch (err) {
      console.error("Erro ao buscar dados do usuário", err);
    }
    setEditing(false);
  }

  useEffect(() => {
    fetchUser();
    fetchGames();
  }, []);



  return (
    <div className='accountPage-container'>
      <MainHeader />

      <img src={siteLogo} className='logo-background'></img>

      <div className="account-content">
        <div className="left-panel">
          <div className='pfp-and-name-container'>
            {/* <h1>{`Usuário `}<b>{`#${user?.uid.substring(0, 6)}`}</b></h1> */}

            <div className="pfp-container">
              <img className="pfp" src={"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"} alt="Foto de perfil" />
              <input
                type="file"
                accept="image/*"


                style={{ display: 'none' }}
              />
            </div>
          </div>

          <p>E-mail: <span>{user?.email}</span></p>
          {editing ? (
            <>
              <div className='editing-container'>
                <p>Nome: <input className='editable-input' value={name} onChange={e => { setNome(e.target.value); setHasChanges(true); }} /></p>
              </div>
            </>
          ) : (
            <>
              <div className='editing-container'>
                <p>Nome: <span className="editable">{user?.name}</span></p>
                <button className="start-edit" onClick={() => setEditing(true)}>
                  <img src={editPen} alt="Editar dados" />
                </button>
              </div>
            </>
          )}

          <p>Saldo: <b>{`${user?.cdb}`} CDB (Calangos de Bolso)</b></p>
          <p>Dinheiro gasto: <b>{`${user?.totalDeposit}`} R$</b></p>
          <p>Ganhos totais: <b>{`${user?.wins}`} R$</b></p>
          <p>Percas totais: <b>{`${user?.looses}`} R$</b></p>
        </div>


        <div className="right-panel">
          <p>Histórico de jogos</p>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {hasChanges && (
        <button className="floating-save">
          <img src={saveIcon} alt="Salvar" onClick={updateUserMethod} />
        </button>
      )}
    </div>
  );
};

export default AccountPage;
