import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import localStyles from './admin-location-create.module.scss';
import styles from '../../styles/admin-create-form.module.scss';
import TextInput from '../../components/text-input';
import Button from '../../components/button';
import { create } from '../../services/admin/firm';

export default function AdminFirmCreate() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    regNo: '',
  });

  const fetchCreate = async () => {
    try {
      await create(data);
      navigate('/admin/firm');
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
          <Link to="/admin/firm">
            ← Go Back
          </Link>
        </div>
        <div className={styles.card}>
          <div className={styles.header}>
            <h2>Create Firm</h2>
          </div>
          <div className={styles.form}>
            <TextInput label="Name" value={data.name} onChange={(e) => { setData({ ...data, name: e.target.value }); }} />
            <TextInput label="Registration No. (10)" value={data.regNo} onChange={(e) => { setData({ ...data, regNo: e.target.value }); }} />
          </div>
          <div className={styles.btn}>
            <Button solid title="Create" onClick={btnClick} />
          </div>

        </div>
      </div>
    </div>
  );
}
