import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from '../../styles/login.module.scss';
import TextInput from '../../components/text-input';
import Button from '../../components/button';
// import { createUser } from '../../services/user';
import CONFIG from '../../main/config';
import { sendOtp, verifyOtp } from '../../services/user/auth';

export default function VerifyOtp() {
  const { state: { email } } = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchVerifyOtp = async () => {
    setErrorMsg(null);

    try {
      const { data } = await verifyOtp({
        email,
        otp,
        deviceId: 'asdf',
      });
      // console.log(data);
      localStorage.setItem('@token', data.access_token);
      const userId = data?.data?.userId;
      CONFIG.AUTH_TOKEN = data.access_token;
      CONFIG.USER_ID = userId;
      if (data.isNewUser) {
        navigate('/onboarding');
        return;
      }
      navigate('/');
    } catch (err) {
      const e = err?.response?.data?.error?.message;
      // console.log('err', e);
      setErrorMsg(e || 'Something went wrong.. ');
    }
  };

  const fetchResendOtp = async () => {
    setErrorMsg('');
    try {
      await sendOtp({ email });
      toast('Resent OTP to your email!');
    } catch (err) {
      const e = err?.response?.data?.error?.message || 'Something went wrong..';
      toast(e);
    }
  };

  const clear = () => { setErrorMsg(''); };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <p className={styles.text}>{email}</p>
          <p className={styles.logo}>Enter OTP</p>
        </div>
        <div className={styles.form}>
          <TextInput label="Otp" value={otp} onChange={(e) => { setOtp(e.target.value); clear(); }} />
        </div>
        <div className={styles.btn}>
          <Button solid title="Create Account" onClick={fetchVerifyOtp} />
          <Button border={false} solid={false} title="Resend OTP" onClick={fetchResendOtp} />
        </div>

        <div className={styles.err}>
          <p className={styles.msg}>{errorMsg}</p>
        </div>
      </div>
    </div>
  );
}
