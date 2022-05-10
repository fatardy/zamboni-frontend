import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from '../../styles/login.module.scss';
import TextInput from '../../components/text-input';
import Button from '../../components/button';
import { authorize } from '../../services/user/auth';

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('asdf@asdf.com');
  const [errorMsg, setErrorMsg] = useState('');

  function validateEmail(e) {
    const re = /\S+@\S+\.\S+/;
    return re.test(e);
  }

  const fetchCreateUser = async () => {
    setErrorMsg(null);
    if (!validateEmail(email)) {
      setErrorMsg('Please enter a valid email');
      return;
    }

    try {
      await authorize({
        email,
        deviceId: 'onlineWebsite',
      });

      toast('Please enter the OTP sent to your email!');

      navigate('/verify-otp', { state: { email } });
    } catch (err) {
      const e = err?.response?.data?.error?.message;
      // console.log('err', e);
      setErrorMsg(e || 'Something went wrong.. ');
    }
  };

  const btnClick = async () => {
    fetchCreateUser();
  };

  const clear = () => { setErrorMsg(''); };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <p className={styles.text}>Welcome to</p>
          <p className={styles.logo}>Zamboni</p>
        </div>
        <div className={styles.form}>
          <TextInput label="Email" value={email} onChange={(e) => { setEmail(e.target.value); clear(); }} />
        </div>
        <div className={styles.btn}>
          <Button solid title="Send OTP" onClick={btnClick} />
        </div>

        <div className={styles.err}>
          <p className={styles.msg}>{errorMsg}</p>
        </div>
      </div>
    </div>
  );
}
