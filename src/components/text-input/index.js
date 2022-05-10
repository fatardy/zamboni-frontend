import React from 'react';
import PropTypes from 'prop-types';
import styles from './text-input.module.scss';

export default function TextInput({
  label,
  required,
  value,
  onChange,
  type,
  disabled,
}) {
  return (
    <div className={styles.container}>
      <p className={styles.label}>{label}</p>
      <input
        className={styles.input}
        name={label}
        required={required}
        // minLength="4"
        // maxLength="8"
        // size="10"
        value={value}
        onChange={onChange}
        type={type}
        disabled={disabled}
      />
    </div>
  );
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

TextInput.defaultProps = {
  required: false,
  type: 'text',
  disabled: false,
};
