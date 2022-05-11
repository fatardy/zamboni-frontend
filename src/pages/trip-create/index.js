import { format, differenceInHours } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../components/button';
import Dropdown from '../../components/drop-down';
import { getUsersCoupons } from '../../services/user/coupon';
import { create } from '../../services/user/trip';

import styles from './trip-create.module.scss';

export default function TripCreate() {
  const navigate = useNavigate();

  const { state: { vehicle, pickDate, dropDate } } = useLocation();

  const [coupons, setCoupons] = useState([
    { label: 'Select Discount Coupon', value: '0' },
  ]);
  const [selectedCoupon, setSelectedCoupon] = useState('0');

  console.log(vehicle);

  const cancelTap = () => {
    navigate('/');
  };

  function getStandardFormattedDateTime(date = new Date()) {
    return format(date, 'yyyy-MM-dd HH-mm-ss');
  }

  const fetchCreateTrip = async () => {
    try {
      const o = {
        pickDate: getStandardFormattedDateTime(pickDate),
        dropDate: getStandardFormattedDateTime(dropDate),
        pickLocId: `${vehicle.locId}`,
        dropLocId: `${vehicle.locId}`,
        vehId: vehicle.vehId,
        odoStart: vehicle.odoStart || 0,
        odoLimit: vehicle.odoLimit || 200,
        odoEnd: 100,
        // odoEnd: parseInt(vehicle.odoStart, 10) + parseInt(vehicle.odoLimit, 10) || 100,
      };
      // console.log('selected', selectedCoupon);
      if (selectedCoupon != 0) {
        o.coupId = `${selectedCoupon}`;
      }
      // console.log('here is obj', o);
      const { data } = await create(o);
      console.log(data?.data);
      navigate('/pay/create', {
        state: {
          invId: data?.data?.invoice.insertId,
          amount: data?.data?.amount,
        },
      });
    } catch (err) {
      toast(err?.response?.data?.error?.message || 'Something went wrong');
      console.log(err);
    }
  };

  const confirmTap = () => {
    fetchCreateTrip();
  };

  const handleChange = (e) => {
    toast('Coupon Discount will be automatically applied in the Invoice! :)');
    setSelectedCoupon(e.target.value);
  };

  const fetchCoupons = async () => {
    try {
      const { data } = await getUsersCoupons();
      console.log(data?.data);
      const coups = data?.data.map((x) => ({ ...x, label: x.name, value: x.coupId }));
      setCoupons([...coupons, ...coups]);
    } catch (err) {
      toast(err);
      // console.log('here', err?.response?.status);
      if (err?.response?.status === 403) {
        navigate('/login');
        toast('Please log in first..');
      }
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.imgCont}>
          <img className={styles.img} src={vehicle.avatar} alt="img" />
        </div>
        <h1>Confirm Booking</h1>
        <div className={styles.details}>
          <p className={styles.name}>{`${vehicle.make} ${vehicle.model}`}</p>
          {/* <p className={styles.date}>
          {`${format(pickDate, format(pickDate, 'yyyy-MM-dd HH-mm-ss'))} to
          ${format(dropDate, 'yyyy-MM-dd HH-mm-ss')}`}</p> */}
          <p className={styles.date}>
            Booking for
            {' '}
            {parseFloat((differenceInHours(dropDate, pickDate) / 24)).toFixed(2)}
            {' '}
            Days!
          </p>
          <p>
            Pickup at
            {' '}
            {vehicle.locName}
          </p>
        </div>
        <div className={styles.more}>
          <p className={styles.price}>
            $
            {vehicle.rate}
            {' '}
            / Day
          </p>
          <p className={styles.totalLbl}>
            Total Cost
          </p>
          <p className={styles.total}>
            $
            {parseInt(vehicle.rate, 10) * (differenceInHours(dropDate, pickDate) / 24)}
          </p>
        </div>
        <div className={styles.couponCont}>
          <Dropdown
            label="Select Discount"
            options={coupons}
            value={selectedCoupon}
            onChange={handleChange}
          />
        </div>
        <div className={styles.btn}>
          <Button title="Confirm" solid onClick={confirmTap} />
          <Button title="Cancel" solid={false} border={false} onClick={cancelTap} />
        </div>
      </div>
    </div>
  );
}
