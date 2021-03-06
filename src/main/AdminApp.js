import classNames from 'classnames';
import React, { useEffect } from 'react';
import {
  Outlet,
  Link,
  useNavigate,
  NavLink,
} from 'react-router-dom';
// import Header from '../components/header';
import styles from '../styles/header.module.scss';
import CONFIG from './config';

export default function AdminApp() {
  const navigate = useNavigate();

  useEffect(() => {
    let token;
    if (CONFIG.AUTH_TOKEN) {
      token = CONFIG.AUTH_TOKEN;
    } else {
      token = localStorage.getItem('@token');
    }

    if (token == null) {
      navigate('/admin/login');
    }

    // CONFIG.IS_ADMIN = true; why?
    CONFIG.AUTH_TOKEN = token;
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Link to="/admin">
            <h3>
              Zamboni Rentals
              {' '}
              <i>Admin</i>
            </h3>
          </Link>

          <div className={styles.nav}>
            {/* <NavLink
              // className={({ isActive }) => classNames([
              //   { [styles.active]: isActive },
              // ])}
              style={({ isActive }) => ({
                display: 'block',
                margin: '1rem 0',
                color: isActive ? 'red' : '',
              })}
              to="/admin"
            >
              <p>Dashboard</p>
            </NavLink> */}
            <NavLink
              className={({ isActive }) => classNames([
                { [styles.active]: isActive },
              ])}
              to="/admin/"
            >
              Menu
            </NavLink>
            {/* <NavLink
              className={({ isActive }) => classNames([
                { [styles.active]: isActive },
              ])}
              to="/admin/users"
            >
              Users
            </NavLink>
            <NavLink
              className={({ isActive }) => classNames([
                { [styles.active]: isActive },
              ])}
              to="/admin/stocks"
            >
              Stocks
            </NavLink>
            <NavLink
              className={({ isActive }) => classNames([
                { [styles.active]: isActive },
              ])}
              to="/admin/schedule"
            >
              Schedule
            </NavLink>
            <NavLink
              className={({ isActive }) => classNames([
                { [styles.active]: isActive },
              ])}
              to="/admin/transactions"
            >
              Transactions
            </NavLink> */}
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
