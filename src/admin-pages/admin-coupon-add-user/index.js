import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import localStyles from './admin-location-create.module.scss';
import styles from '../../styles/admin-create-form.module.scss';
import TextInput from '../../components/text-input';
import Button from '../../components/button';
import { addToUser } from '../../services/admin/coupon';

export default function AdminCouponAddUser() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    coupId: '',
    userId: '',
  });

  const fetchCreate = async () => {
    try {
      await addToUser(data);
      navigate('/admin/coupon');
    } catch (err) {
      const e = err?.response?.data?.error?.message || 'Something went wrong..';
      toast(e);
    }
  };

  const btnClick = async () => {
    fetchCreate();
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.backCont}>
          <Link to="/admin/coupon">
            ← Go Back
          </Link>
        </div>
        <div className={styles.card}>
          <div className={styles.header}>
            <h2>Add Coupon To User</h2>
          </div>
          <div className={styles.form}>
            <TextInput label="Coupon ID" value={data.coupId} onChange={(e) => { setData({ ...data, coupId: e.target.value }); }} />
            <TextInput label="User ID" value={data.userId} onChange={(e) => { setData({ ...data, userId: e.target.value }); }} />
          </div>
          <div className={styles.btn}>
            <Button solid title="Create" onClick={btnClick} />
          </div>

        </div>
      </div>
    </div>
  );
}
