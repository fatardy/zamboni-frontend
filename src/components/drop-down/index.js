import React from 'react';
import styles from './drop-down.module.scss';

export default function Dropdown({
  label,
  value,
  options = [],
  onChange,
}) {
  console.log(options);
  return (
    <label htmlFor="select">
      {label}
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
}
