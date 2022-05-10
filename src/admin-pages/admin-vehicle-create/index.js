import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import localStyles from './admin-location-create.module.scss';
import styles from '../../styles/admin-create-form.module.scss';
import TextInput from '../../components/text-input';
import Button from '../../components/button';
import { create } from '../../services/admin/vehicle';

export default function AdminVehicleCreate() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    vehId: '',
    make: '',
    model: '',
    licensePlate: '',
    locId: '',
    vtId: '',
    avatar: '',
  });

  const fetchCreate = async () => {
    try {
      await create(data);
      navigate('/admin/vehicle');
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
          <Link to="/admin/vehicle">
            ← Go Back
          </Link>
        </div>
        <div className={styles.card}>
          <div className={styles.header}>
            <h2>Create Vehicle</h2>
          </div>
          <div className={styles.form}>
            <TextInput label="Vehicle Identification (17)" value={data.vehId} onChange={(e) => { setData({ ...data, vehId: e.target.value }); }} />
            <TextInput label="Make" value={data.make} onChange={(e) => { setData({ ...data, make: e.target.value }); }} />
            <TextInput label="Model" value={data.model} onChange={(e) => { setData({ ...data, model: e.target.value }); }} />
            <TextInput label="License Plate (10)" value={data.licensePlate} onChange={(e) => { setData({ ...data, licensePlate: e.target.value }); }} />
            <TextInput label="Location ID (*)" value={data.locId} onChange={(e) => { setData({ ...data, locId: e.target.value }); }} />
            <TextInput label="Vehicle Type ID (*)" value={data.vtId} onChange={(e) => { setData({ ...data, vtId: e.target.value }); }} />
            <TextInput label="Avatar" value={data.avatar} onChange={(e) => { setData({ ...data, avatar: e.target.value }); }} />
          </div>
          <div className={styles.btn}>
            <Button solid title="Create" onClick={btnClick} />
          </div>

        </div>
      </div>
    </div>
  );
}
