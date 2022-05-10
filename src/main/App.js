import classNames from 'classnames';
import React, { useEffect } from 'react';
import {
  Outlet,
  Link,
  useNavigate,
  NavLink,
} from 'react-router-dom';
import styles from '../styles/header.module.scss';
import CONFIG from './config';

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    let userId;
    if (CONFIG.USER_ID) {
      userId = CONFIG.USER_ID;
    } else {
      userId = localStorage.getItem('userId');
    }

    if (userId == null) {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Link to="/">
            <h3>Zamboni Rentals</h3>
          </Link>

          <div className={styles.nav}>
            <NavLink
              className={({ isActive }) => classNames([
                { [styles.active]: isActive },
              ])}
              to="/"
            >
              Market
            </NavLink>
            <NavLink
              className={({ isActive }) => classNames([
                { [styles.active]: isActive },
              ])}
              to="/portfolio"
            >
              Portfolio
            </NavLink>
            <NavLink
              className={({ isActive }) => classNames([
                { [styles.active]: isActive },
              ])}
              to="/limit-order"
            >
              Limit Orders
            </NavLink>
            <NavLink
              className={({ isActive }) => classNames([
                { [styles.active]: isActive },
              ])}
              to="/history"
            >
              History
            </NavLink>
            <NavLink
              className={({ isActive }) => classNames([
                { [styles.active]: isActive },
              ])}
              to="/account"
            >
              Account
            </NavLink>
            {/* <Link to="/history">
              <p className={styles.item}>History</p>
            </Link>
            <Link to="/account">
              <p className={styles.item}>Account</p>
            </Link> */}
          </div>
        </div>
      </div>

      <div className={styles.outletContainer}>
        <div className={styles.main}>
          <Outlet />

        </div>
      </div>
    </>
  );
}
