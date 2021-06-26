import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import IllustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';


const NewRoom = () => {
    const { user } = useAuth();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');

    const handleCreateRoom = async (event: FormEvent) => {
        event.preventDefault();

        if (newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebase = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })
        history.push(`/rooms/${firebase.key}`);
    }
    
    return (
        <div id="page-auth">
            <aside>
                <img src={IllustrationImg} alt="ilustração oerguntas e respostas" />
                <strong>Crie salas Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                        type="text" 
                        placeholder="Nome da sala"
                        onChange={event => setNewRoom(event.target.value)}
                        value={newRoom}
                        />
                        <Button type="submit">
                           Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar e uma sala existente? <Link to="/">clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}

export default NewRoom;
