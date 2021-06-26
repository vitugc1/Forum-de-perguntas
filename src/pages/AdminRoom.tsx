import { useHistory, useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg'; 
import Button from '../components/Button';
import Question from '../components/Question';
import RoomCode from '../components/RoomCode';
//import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import '../styles/room.scss';
import { database } from '../services/firebase';

type RoomParms = {
    id: string;
}

const AdminRoom = () => {
    //const { user } = useAuth();
    const parms = useParams<RoomParms>();
    const history = useHistory();
    const roomId = parms.id;
    const { title, questions } = useRoom(roomId);

    const handleEndRoom = async () => {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/');
    }

    const handleDeletequestion =async (questionId: string) => {
        if (window.confirm('Tem certeza que você deseja excluir essa pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }
    const handleCheekQuestionAsAnswer = async (questionId: string) => {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });
    }

    const handleHighlightquestion = async (questionId: string) => {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        });
    }
    
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                            key={question.id}
                            content={question.content}
                            author={question.author}
                            isAnswered={question.isAnswered}
                            isHighlighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                    <>
                                        <button
                                        type="button"
                                        onClick={() => handleCheekQuestionAsAnswer(question.id)}
                                        >
                                            <img src={checkImg} alt="Marcar pergunta como respondida" />
                                        </button>
                                        <button
                                        type="button"
                                        onClick={() => handleHighlightquestion(question.id)}
                                        >
                                            <img src={answerImg} alt="Dar destaque à pergunta" />
                                        </button>
                                    </>
                                )}
                                <button
                                type="button"
                                onClick={() => handleDeletequestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

export default AdminRoom;

