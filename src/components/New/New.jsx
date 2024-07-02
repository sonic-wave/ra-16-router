import React, {useRef} from 'react'
import './New.css'
import { useNavigate } from 'react-router-dom';

export const New = ({onClickHandler}) => {
    const textareaAreaRef = useRef(null);
    const navigate = useNavigate();

    const handleCloseClick = () => {
        navigate('/');
    }

    const handleCreateClick = () => {
        if (textareaAreaRef.current) {
            onClickHandler(textareaAreaRef.current.value);
            textareaAreaRef.current.value = '';
            navigate('/');
        }
    }

  return (
    <div className='new-post-container'>
        <button className='new-post-closeBtn' onClick={handleCloseClick}>X</button>
        <textarea className='new-post-textarea' ref={textareaAreaRef}></textarea>
        <button className='new-post-createBtn' onClick={handleCreateClick}>Опубликовать</button>
    </div>
  )
}
