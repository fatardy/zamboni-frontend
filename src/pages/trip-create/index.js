import { format, differenceInHours } from 'date-fns';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/button';
import styles from './trip-create.module.scss';

export default function TripCreate() {
  const navigate = useNavigate();

  const { state: { vehicle, pickDate, dropDate } } = useLocation();

  console.log(vehicle);

  const cancelTap = () => {
    navigate('/');
  };

  const confirmTap = () => {

  };

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
        <div className={styles.btn}>
          <Button title="Confirm" solid onClick={confirmTap} />
          <Button title="Cancel" solid={false} border={false} onClick={cancelTap} />
        </div>
      </div>
    </div>
  );
}
