import React, { useRef, useEffect } from 'react'
import './Edit.css'
import { useNavigate } from 'react-router-dom';

export const Edit = ({ postInfo, onSubmitHandler }) => {
  const textareaAreaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (textareaAreaRef.current) {
      textareaAreaRef.current.value = postInfo.content;
    }
  }, [postInfo]);

  const handleCloseClick = () => {
    navigate('/');
  }

  const handleSaveClick = () => {
    if (textareaAreaRef.current) {
      const value = {
        id: postInfo.id,
        content: textareaAreaRef.current.value
      }
      onSubmitHandler(value);
      textareaAreaRef.current.value = '';
      navigate('/');
    }
  }

  return (
    <div className='new-post-container'>
      <button className='new-post-closeBtn' onClick={handleCloseClick}>X</button>
      <textarea className='new-post-textarea' ref={textareaAreaRef}></textarea>
      <button className='new-post-createBtn' onClick={handleSaveClick}>Сохранить</button>
    </div>
  )
}
