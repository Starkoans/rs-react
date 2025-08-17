'use client';

import { useEffect, useState } from 'react';
import styles from './cat-detail.module.css';
import cn from 'classnames';
import { messages } from '@app/lib/messages';

interface Props {
  onClose?: () => void;
  isOpen?: boolean;
  children: React.ReactNode;
}

export function Drawer({ onClose, isOpen, children }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(false);
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 200);
  };

  if (isOpen)
    return (
      <div
        className={cn(styles.backdrop, {
          [styles.visible]: isVisible,
          [styles.hidden]: !isVisible,
        })}
        onClick={handleClose}
      >
        <div
          className={cn(styles.drawer, {
            [styles.visible]: isVisible,
            [styles.hidden]: !isVisible,
          })}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.closeBtn} onClick={handleClose}>
            {messages.buttons.close}
          </button>
          {children}
        </div>
      </div>
    );
}
