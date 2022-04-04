import React from 'react';
import './modal.css';
const Modal = ({ children, style, onClick }) => {
  return (
    <div className='modal' onClick={onClick} style={style}>
      <section className='modal__main'>{children}</section>
    </div>
  );
};

export default Modal;
