import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import localStyles from './admin-location-create.module.scss';
import styles from '../../styles/admin-create-form.module.scss';
import TextInput from '../../components/text-input';
import Button from '../../components/button';
import { create } from '../../services/user/payment';

export default function PayCreate() {
  const navigate = useNavigate();
  const { state: { invId, amount } } = useLocation();

  const [data, setData] = useState({
    method: '',
    cardNo: '',
  });

  const fetchCreate = async () => {
    if (!['VISA', 'MASTERCARD', 'RUPAY', 'OTHER'].includes(data.method)) {
      toast('Please only select one of the payment methods: VISA, MASTERCARD, RUPAY, OTHER');
      return;
    }
    if (data.cardNo.length !== 16) {
      toast('Card Number has to be 16 digits.. Please check again');
      return;
    }
    try {
      const resp = await create({
        method: data.method,
        cardNo: data.cardNo,
        amount,
        invId: `${invId}`,
      });
      console.log(resp?.data?.data);
      toast('Thank you for paying! :)');
      navigate('/trip');
    } catch (err) {
      const e = err?.response?.data?.error?.message || 'Something went wrong..';
      toast(e);
    }
  };

  const btnClick = async () => {
    fetchCreate();
  };

  const payLaterClick = async () => {
    navigate('/trip');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* <div className={styles.backCont}>
          <Link to="/trip">
            ← Pay Later
          </Link>
        </div> */}
        <div className={styles.card}>
          <div className={styles.header}>
            <h2>Pay</h2>
          </div>
          <div className={styles.form}>
            <TextInput disabled label="Amount" value={amount} onChange={(e) => { setData({ ...data, amount: e.target.value }); }} />
            <TextInput label="Method (VISA | MASTERCARD | RUPAY | OTHER)" value={data.method} onChange={(e) => { setData({ ...data, method: e.target.value }); }} />
            <TextInput label="Card No (16 Digit)" type="number" value={data.cardNo} onChange={(e) => { setData({ ...data, cardNo: e.target.value }); }} />
          </div>
          <div className={styles.btn}>
            <Button solid title="Make Payment" onClick={btnClick} />
            <Button title="Pay Later" onClick={payLaterClick} border={false} solid={false} />
          </div>

        </div>
      </div>
    </div>
  );
}
