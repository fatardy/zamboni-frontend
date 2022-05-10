import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './button.module.scss';

export default function Button({
  title,
  border,
  solid,
  onClick,
}) {
  return (
    <div
      className={classNames([
        { [styles.container]: true },
        // { [styles.success]: success },
        // { [styles.error]: !success },
        { [styles.trans]: !solid },
        { [styles.solid]: solid },
        { [styles.noBorder]: !border },
      ])}
      onClick={onClick}
      onKeyUp={() => {}}
      role="button"
      tabIndex={0}
    >
      <p
        className={classNames([
          { [styles.ptrans]: !solid },
          { [styles.psolid]: solid },
        ])}
      >
        {title}

      </p>
    </div>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  solid: PropTypes.bool.isRequired,
  border: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  border: true,
};
