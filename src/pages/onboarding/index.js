import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from '../../styles/login.module.scss';
import TextInput from '../../components/text-input';
import Button from '../../components/button';
// import { createUser } from '../../services/user';
import { editProfile } from '../../services/user/user';
import CONFIG from '../../main/config';

export default function Onboarding() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    street1: '',
    street2: '',
    city: '',
    stateName: '',
    zipCode: '',
    country: '',
    avatar: '',
  });

  const fetchEditUser = async () => {
    try {
      await editProfile(user);
      navigate('/');
    } catch (err) {
      const e = err?.response?.data?.error?.message;
      // console.log('err', e);
      toast(e || 'Something went wrong..');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <p className={styles.text}>Welcome to</p>
          <p className={styles.logo}>Zamboni Rentals!</p>
          <p className={styles.text2}>Please Create Your Profile</p>
        </div>
        <div className={styles.form}>
          <TextInput label="First Name" value={user.firstName} onChange={(e) => { setUser({ ...user, firstName: e.target.value }); }} />
          <TextInput label="Last Name" value={user.lastName} onChange={(e) => { setUser({ ...user, lastName: e.target.value }); }} />
          <TextInput label="Phone Number" value={user.phoneNumber} onChange={(e) => { setUser({ ...user, phoneNumber: e.target.value }); }} />
          <TextInput label="Street Address 1" value={user.street1} onChange={(e) => { setUser({ ...user, street1: e.target.value }); }} />
          <TextInput label="Street Address 2 (Optional)" value={user.street2} onChange={(e) => { setUser({ ...user, street2: e.target.value }); }} />
          <TextInput label="City" value={user.city} onChange={(e) => { setUser({ ...user, city: e.target.value }); }} />
          <TextInput label="State" value={user.stateName} onChange={(e) => { setUser({ ...user, stateName: e.target.value }); }} />
          <TextInput label="Zip Code" value={user.zipCode} onChange={(e) => { setUser({ ...user, zipCode: e.target.value }); }} />
          <TextInput label="Country" value={user.country} onChange={(e) => { setUser({ ...user, country: e.target.value }); }} />

        </div>
        <div className={styles.btn}>
          <Button solid title="Save" onClick={fetchEditUser} />
        </div>
        {/* <div className={styles.err}>
          <p className={styles.msg}>{errorMsg}</p>
        </div> */}
      </div>
    </div>
  );
}
