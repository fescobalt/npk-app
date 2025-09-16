import React, { useMemo } from 'react';
import styles from './combo-box.module.css';

export type ComboBoxType = {
  values: Array<string>,
  error?: boolean
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'list'>;

const ComboBox: React.FC<ComboBoxType> = ({ values, error, ...props }) => {
  // Generate a unique id for the datalist. Here we can use uuid as substitute
  const name = useMemo<string>(
    () => 'cmb-bx-' + String(Date.now() + Math.floor(Math.random() * 1_000 % 1_000)),
    []
  );

  return (
    <>
      <input className={`${styles.root} ${error && styles.error}`} list={name} {...props} />
      <datalist id={name}>
        {values.map(val => (
          <option key={val} value={val}></option>
        ))}
      </datalist>
    </>
  );
}

export default ComboBox;
