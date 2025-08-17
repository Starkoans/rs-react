import React from 'react';
import styles from './status-bar.module.css';

interface StatusBarProps {
  value: number;
  max?: number;
}

export const StatusBar: React.FC<StatusBarProps> = ({ value, max = 5 }) => {
  const items = Array.from({ length: max }, (_, i) => i < value);

  return (
    <div className={styles.bar}>
      {items.map((filled, i) => (
        <span
          key={i}
          className={`${styles.item} ${filled ? styles.filled : ''}`}
        />
      ))}
    </div>
  );
};
