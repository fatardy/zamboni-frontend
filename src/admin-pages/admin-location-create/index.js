import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './admin-location-create.module.scss';
import TextInput from '../../components/text-input';
// import { createUser } from '../../services/user';
import Button from '../../components/button';
// import CONFIG from '../../main/config';
import { create } from '../../services/admin/location';

export default function AdminLocationCreate() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    phoneNumber: 0,
    email: '',
    street1: '',
    street2: '',
    city: '',
    stateName: '',
    zipCode: '',
    country: '',
  });

  const fetchCreate = async () => {
    try {
      await create(data);
      navigate('/admin/location');
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
          <Link to="/admin/locations">
            ← Go Back
          </Link>
        </div>
        <div className={styles.card}>
          <div className={styles.header}>
            <h2>Create Location</h2>
          </div>
          <div className={styles.form}>
            <TextInput label="Name" value={data.name} onChange={(e) => { setData({ ...data, name: e.target.value }); }} />
            <TextInput label="Phone" type="number" value={data.phoneNumber} onChange={(e) => { setData({ ...data, phoneNumber: e.target.value }); }} />
            <TextInput label="Email" value={data.email} onChange={(e) => { setData({ ...data, email: e.target.value }); }} />
            <TextInput label="Street 1" value={data.street1} onChange={(e) => { setData({ ...data, street1: e.target.value }); }} />
            <TextInput label="Street 2" value={data.street2} onChange={(e) => { setData({ ...data, street2: e.target.value }); }} />
            <TextInput label="City" value={data.city} onChange={(e) => { setData({ ...data, city: e.target.value }); }} />
            <TextInput label="State" value={data.stateName} onChange={(e) => { setData({ ...data, stateName: e.target.value }); }} />
            <TextInput label="Zip Code" value={data.zipCode} onChange={(e) => { setData({ ...data, zipCode: e.target.value }); }} />
            <TextInput label="Country" value={data.country} onChange={(e) => { setData({ ...data, country: e.target.value }); }} />
          </div>
          <div className={styles.btn}>
            <Button solid title="Create" onClick={btnClick} />
          </div>

        </div>
      </div>
    </div>
  );
}
