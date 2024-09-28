import { MODAL } from '@/lib/constants/modal';
import { useState, useEffect } from 'react';
import { DefaultModal } from './types';
import ReactDOM from 'react-dom';

const types = {
  [MODAL.DEFAULT]: DefaultModal
}

export default function Modal({ isOpen, onClose, children, type = MODAL.DEFAULT }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]); 
  
  if (!isClient || !isOpen) return null;

  const Component = types[type];

  return ReactDOM.createPortal(
    <Component onClose={onClose}>{children}</Component>,
    document.body 
  );
};