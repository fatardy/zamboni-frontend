import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import localStyles from './admin-location-create.module.scss';
import styles from '../../styles/admin-create-form.module.scss';
import TextInput from '../../components/text-input';
import Button from '../../components/button';
import { create } from '../../services/admin/coupon';

export default function AdminCouponCreate() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    percent: 0,
    flatRate: 0,
    startDate: '2022-05-11 17-24-20',
    endDate: '2022-05-21 17-24-20',
  });

  const fetchCreate = async () => {
    try {
      console.log(data);
      await create(data);
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
            <h2>Create Coupon</h2>
          </div>
          <div className={styles.form}>
            <TextInput label="Name" value={data.name} onChange={(e) => { setData({ ...data, name: e.target.value }); }} />
            <TextInput label="Percent (*Either percent/rate)" type="number" value={data.percent} onChange={(e) => { setData({ ...data, percent: e.target.value }); }} />
            <TextInput label="Flat Rate (*Either percent/rate)" type="number" value={data.flatRate} onChange={(e) => { setData({ ...data, flatRate: e.target.value }); }} />
            <TextInput label="Start Date (yyyy-mm-dd hh-mm-ss)" value={data.startDate} onChange={(e) => { setData({ ...data, startDate: e.target.value }); }} />
            <TextInput label="End Date (yyyy-mm-dd hh-mm-ss)" value={data.endDate} onChange={(e) => { setData({ ...data, endDate: e.target.value }); }} />
          </div>
          <div className={styles.btn}>
            <Button solid title="Create" onClick={btnClick} />
          </div>

        </div>
      </div>
    </div>
  );
}
