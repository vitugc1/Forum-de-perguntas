import { useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import IllustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

const Home = () => {
    const history = useHistory();
    const { user,  signInWithgoogle } = useAuth()

    const [roomCode, setRoomCode] =useState('');
    
    const handleCreateRoom = async () => {
        if (!user) {
          await signInWithgoogle()
        }
        
        history.push('/rooms/new')
    }

    const handleJoinRoom = async (event: FormEvent) => {
        event.preventDefault();

        if(roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()) {
            alert('Room does not exists.');
            return;
        }

        if(roomRef.val().endedAt) {
            alert('Room already closed.');
            return;
        }

        history.push(`/rooms/${roomCode}`);
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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                        type="text" 
                        placeholder="Digite o código da sala"
                        onChange={event => setRoomCode(event.target.value)}
                        value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Home;
