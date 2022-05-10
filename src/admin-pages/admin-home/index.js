import React from 'react';
import { Link } from 'react-router-dom';
import styles from './admin-home.module.scss';
import navDivStyles from '../../styles/nav-div.module.scss';

export default function AdminHome() {
  return (
    <div className={styles.container}>

      <div className={navDivStyles.navContainer}>
        <div className={navDivStyles.outerBox}>
          <Link to="/admin/locations">
            <div className={navDivStyles.box}>
              <p className={navDivStyles.title}>→</p>
              <p className={navDivStyles.value}>Locations</p>
            </div>
          </Link>
        </div>
        <div className={navDivStyles.outerBox}>
          <Link to="/admin/vehicle-types">
            <div className={navDivStyles.box}>
              <p className={navDivStyles.title}>→</p>
              <p className={navDivStyles.value}>Vehicle Types</p>
            </div>
          </Link>
        </div>
        <div className={navDivStyles.outerBox}>
          <Link to="/admin/vehicles">
            <div className={navDivStyles.box}>
              <p className={navDivStyles.title}>→</p>
              <p className={navDivStyles.value}>Vehicles</p>
            </div>
          </Link>
        </div>
        <div className={navDivStyles.outerBox}>
          <Link to="/admin/trips">
            <div className={navDivStyles.box}>
              <p className={navDivStyles.title}>→</p>
              <p className={navDivStyles.value}>Trips</p>
            </div>
          </Link>
        </div>
      </div>

      <div className={navDivStyles.navContainer}>
        <div className={navDivStyles.outerBox}>
          <Link to="/admin/invoices">
            <div className={navDivStyles.box}>
              <p className={navDivStyles.title}>→</p>
              <p className={navDivStyles.value}>Invoices</p>
            </div>
          </Link>
        </div>
        <div className={navDivStyles.outerBox}>
          <Link to="/admin/payments">
            <div className={navDivStyles.box}>
              <p className={navDivStyles.title}>→</p>
              <p className={navDivStyles.value}>Payments</p>
            </div>
          </Link>
        </div>
        <div className={navDivStyles.outerBox}>
          <Link to="/admin/coupons">
            <div className={navDivStyles.box}>
              <p className={navDivStyles.title}>→</p>
              <p className={navDivStyles.value}>Coupons</p>
            </div>
          </Link>
        </div>
        <div className={navDivStyles.outerBox}>
          <Link to="/admin/firms">
            <div className={navDivStyles.box}>
              <p className={navDivStyles.title}>→</p>
              <p className={navDivStyles.value}>Firms</p>
            </div>
          </Link>
        </div>

      </div>

      <div className={navDivStyles.navContainer}>
        <div className={navDivStyles.outerBox}>
          <Link to="/admin/users">
            <div className={navDivStyles.box}>
              <p className={navDivStyles.title}>→</p>
              <p className={navDivStyles.value}>Users</p>
            </div>
          </Link>
        </div>
        <div className={navDivStyles.outerBox} />
        <div className={navDivStyles.outerBox} />
        <div className={navDivStyles.outerBox} />
      </div>
    </div>
  );
}
