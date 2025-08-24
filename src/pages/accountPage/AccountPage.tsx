
import MainHeader from '../../components/header/MainHeader';
import './accountPage.scss';
import saveIcon from '../../assets/saveIcon.png';
import editPen from '../../assets/editPen.png';
import siteLogo from '/logo.png';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { getUserInfoApi } from '../../api/userApi';
import { updateUser } from '../../api/userApi';

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
  const [editing, setEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [name, setNome] = useState('');
  const data = {
    labels: ['07/07', '08/07', '09/07', '10/07', '11/07', '12/07', '13/07'],
    datasets: [
      {
        label: 'Saldo',
        data: [300, 450, 200, 550, 500, 650, 1000],
        fill: false,
        borderColor: '#5ce1e6',
        tension: 0
      }
    ]
  };
  const maxValue = data.datasets[0].data.reduce((a, b) => Math.max(a, b), 0);
  const adjustedMax = Math.ceil(((maxValue) / 200) + 1) * 200;

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      x: { ticks: { color: 'white' } },
      y: {
        min: 0,
        max: adjustedMax,
        ticks: {
          color: 'white',
          stepSize: 200
        }
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

  const updateUserMethod = async () => {
    try {
      await updateUser({name});
      fetchUser();
      alert("Nome atualizado");
    } catch (err) {
      console.error("Erro ao buscar dados do usuário", err);
    }
    setEditing(false);
  }

  useEffect(() => {
    fetchUser();
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
          <Line data={data} options={options} />
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
