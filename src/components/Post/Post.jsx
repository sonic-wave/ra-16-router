import { useNavigate, useLocation } from "react-router-dom";
import './Post.css'

export const Post = ({handlers}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { post } = location.state || {};

    const {editHandler, deleteHandler} = handlers;

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className="posts-container">
            <button className="post-backBtn" onClick={handleGoBack}>
                Go back
            </button>
            {post && (
                <div className='post-component' key={post.id}>
                    <div className='post-info'>
                        <img className='post-avatar' src='https://cs2.livemaster.ru/storage/f2/ae/61d04246632ceea41d0788fb68ar--kartiny-i-panno-kartina-ushastyj-kotenok-50h50-holst-maslo.jpg' alt='Аватар' />
                        <div className='post-additional-info'>
                            <div className='post-name'>Имя Фамилия</div>
                            <div className='post-created'>{post.created}</div>
                        </div>
                    </div>
                    <div className='post-content'>{post.content}</div>
                    <button className='post-editBtn' onClick={() => editHandler(post, navigate)}>Редактировать</button>
                    <button className='post-deleteBtn' onClick={() => deleteHandler(post.id, navigate)}>Удалить</button>
                </div>
            )}
        </div>
    );
};
