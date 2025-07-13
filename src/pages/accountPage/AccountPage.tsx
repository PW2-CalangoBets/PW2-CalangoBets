import { useEffect, useRef, useState } from 'react';
import MainHeader from '../../components/header/MainHeader';
import './accountPage.scss';
import { auth, db } from "../../database/firebase";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import editPen from '../../assets/editPen.png';
import { Line } from 'react-chartjs-2';
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

const AccountPage = () => {
  const user = auth.currentUser;
  const [pfp, setPfp] = useState<string | null>(null);
  const [docId, setDocId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState("(83) 99408-5691");
  const [nome, setNome] = useState(' ');
  const [saldo, setSaldo] = useState('0');
  const data = {
    labels: ['Dia 1', 'Dia 2', 'Dia 3', 'Dia 4', 'Dia 5', 'Dia 6', 'Dia 7'],
    datasets: [
      {
        label: 'Valores',
        data: [300, 450, 200, 550, 500, 650, 1000],
        fill: false,
        borderColor: '#5ce1e6',
        tension: 0
      }
    ]
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: 'white' } },
      tooltip: { enabled: true }
    },
    scales: {
      x: { ticks: { color: 'white' } },
      y: { ticks: { color: 'white' } }
    }
  };

  useEffect(() => {
    const fetchPfp = async () => {
      if (!user?.email) return;

      const q = query(collection(db, "contas"), where("email", "==", user.email));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((d) => {
        const data = d.data();
        if (data.pfp) setPfp(data.pfp);
        if (data.nome) setNome(data.nome);
        if (data.telefone) setPhone(data.telefone);
        if (data.saldo) setSaldo(data.saldo);
        setDocId(d.id);
      });
    };

    fetchPfp();
  }, [user]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!docId || !e.target.files) return;

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;

      await updateDoc(doc(db, "contas", docId), { pfp: base64String });
      setPfp(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleChangePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    console.log(docId);
    if (!docId) return;
    await updateDoc(doc(db, "contas", docId), {
      nome: nome,
      telefone: phone
    });
    setHasChanges(false);
    setEditing(false);
  };

  return (
    <div className='accountPage-container'>
      <MainHeader />

      <div className="account-content">
        <div className="left-panel">
          <div className='pfp-and-name-container'>
            <h1>{`Usuário `}<b>{`#${user?.uid.substring(0, 6)}`}</b></h1>

            <div className="pfp-container">
              <img className="pfp" src={pfp || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"} alt="Foto de perfil" />
              <button className="edit-pfp" onClick={handleChangePhoto}>
                <img src={editPen} alt="Editar foto" />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>
          
          <p>E-mail: <span>{email}</span></p>
          {editing ? (
            <>
              <input value={nome} onChange={e => { setNome(e.target.value); setHasChanges(true); }} />
              <input value={phone} onChange={e => { setPhone(e.target.value); setHasChanges(true); }} />
            </>
          ) : (
            <>
              <div className='editing-container'>
                <p>Nome: <span className="editable">{nome}</span></p>
                <button className="start-edit" onClick={() => setEditing(true)}>
                  <img src={editPen} alt="Editar dados" />
                </button>
              </div>
              <div className='editing-container'>
                <p>Telefone: <span className="editable">{phone}</span></p>
                <button className="start-edit" onClick={() => setEditing(true)}>
                  <img src={editPen} alt="Editar dados" />
                </button>
              </div>
            </>
          )}

          <p>Saldo: <b>{`${saldo}`} CDB (Calangos de Bolso)</b></p>
        </div>

        <div className="right-panel" style={{ background: '#260e69', borderRadius: '1rem', padding: '1rem' }}>
          <Line data={data} options={options} />
        </div>
      </div>

      {hasChanges && (
        <button className="floating-save" onClick={handleSave}>Salvar</button>
      )}
    </div>
  );
};

export default AccountPage;
